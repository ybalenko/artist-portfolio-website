import assert from "node:assert/strict";
import { before, describe, it, type TestContext } from "node:test";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

let handler: typeof import("./contact-message.ts").handler;

before(async () => {
  Object.assign(process.env, {
    ALLOWED_ORIGINS: "https://example.com,https://www.example.com",
    ABUSE_SALT_PARAMETER_NAME: "/test/salt",
    MAX_MESSAGE_LENGTH: "5000",
    MAX_NAME_LENGTH: "100",
    MESSAGE_RATE_LIMIT_PER_HOUR: "5",
    RECIPIENT_EMAIL_PARAMETER_NAME: "/test/recipient",
    SES_SENDER_EMAIL_PARAMETER_NAME: "/test/sender",
    THROTTLE_TABLE_NAME: "test-throttle",
    AWS_REGION: "us-east-1",
  });
  ({ handler } = await import("./contact-message.ts"));
});

const visitor = {
  name: "Visitor Name",
  email: "Visitor@Example.org",
  message: "Studio visit question",
  company: "",
};
const event = (
  payload: unknown = visitor,
  options: { origin?: string; userAgent?: string; sourceIp?: string } = {},
) => ({
  body: JSON.stringify(payload),
  headers: {
    origin: options.origin ?? "https://example.com",
    "user-agent": options.userAgent ?? "browser-a",
  },
  requestContext: {
    http: { method: "POST", sourceIp: options.sourceIp ?? "203.0.113.10" },
  },
});

const fail = () => {
  throw new Error("Unexpected AWS request or log");
};

function blockSideEffects(t: TestContext) {
  const mocks = [
    t.mock.method(SSMClient.prototype, "send", fail),
    t.mock.method(DynamoDBClient.prototype, "send", fail),
    t.mock.method(SESv2Client.prototype, "send", fail),
    t.mock.method(console, "error", fail),
  ];
  return () => mocks.forEach((mock) => assert.equal(mock.mock.callCount(), 0));
}

function mockAws(
  t: TestContext,
  attemptCount?: () => number,
  sendFailure?: Error,
) {
  const parameters: GetParameterCommand[] = [];
  const updates: UpdateItemCommand[] = [];
  const emails: SendEmailCommand[] = [];
  t.mock.method(SSMClient.prototype, "send", async (command: unknown) => {
    assert.ok(command instanceof GetParameterCommand);
    parameters.push(command);
    const value =
      command.input.Name === "/test/salt"
        ? "test-only-secret-salt"
        : command.input.Name === "/test/recipient"
          ? "artist-inbox@example.net"
          : command.input.Name === "/test/sender"
            ? "verified-sender@example.net"
            : undefined;
    assert.ok(value);
    return { Parameter: { Value: value } };
  });
  t.mock.method(DynamoDBClient.prototype, "send", async (command: unknown) => {
    assert.ok(command instanceof UpdateItemCommand);
    updates.push(command);
    return { Attributes: { attempts: { N: String(attemptCount?.() ?? 1) } } };
  });
  t.mock.method(SESv2Client.prototype, "send", async (command: unknown) => {
    assert.ok(command instanceof SendEmailCommand);
    emails.push(command);
    if (sendFailure) throw sendFailure;
    return {};
  });
  return { parameters, updates, emails };
}

describe("contact API security boundaries", () => {
  it("rejects unapproved, missing, or lookalike origins before AWS access", async (t) => {
    const assertNoEffects = blockSideEffects(t);
    for (const origin of [
      "",
      "https://evil.example",
      "https://example.com.evil.test",
      "http://example.com",
      "https://example.com/",
    ]) {
      const response = await handler(event(visitor, { origin }));
      assert.equal(response.statusCode, 403);
      assert.equal(response.body, '{"ok":false}');
      assert.equal(response.headers["access-control-allow-origin"], undefined);
    }
    assertNoEffects();
  });

  it("rejects invalid fields, injection characters, and spam without side effects", async (t) => {
    const assertNoEffects = blockSideEffects(t);
    const invalid = [
      { ...visitor, name: "" },
      { ...visitor, name: "x".repeat(101) },
      { ...visitor, name: "Visitor\r\nBcc: intruder@example.org" },
      { ...visitor, name: "Visitor\u0000Name" },
      { ...visitor, email: "invalid" },
      { ...visitor, email: "v@example.org\nBcc:intruder@example.org" },
      { ...visitor, email: "a".repeat(255) + "@example.org" },
      { ...visitor, message: "" },
      { ...visitor, message: "x".repeat(5001) },
      { ...visitor, message: "Message\u0000body" },
      { ...visitor, message: "<a href='https://spam.example'>link</a>" },
      {
        ...visitor,
        message: "https://a.example https://b.example https://c.example",
      },
    ];
    for (const payload of invalid) {
      const response = await handler(event(payload));
      assert.equal(response.statusCode, 400);
      assert.equal(response.body, '{"ok":false}');
      assert.equal(response.headers["cache-control"], "no-store");
    }
    assertNoEffects();
  });

  it("silently accepts honeypot input without consuming throttle or sending", async (t) => {
    const assertNoEffects = blockSideEffects(t);
    const response = await handler(
      event({ ...visitor, company: "automated sender" }),
    );
    assert.equal(response.statusCode, 200);
    assert.equal(response.body, '{"ok":true}');
    assertNoEffects();
  });

  it("builds a plain-text SES message with validated Reply-To and no stored personal fields", async (t) => {
    const { parameters, updates, emails } = mockAws(t);
    const log = t.mock.method(console, "error", fail);
    const before = Date.now();
    const response = await handler(event(visitor));
    assert.equal(response.statusCode, 200);
    assert.equal(
      response.headers["access-control-allow-origin"],
      "https://example.com",
    );
    assert.equal(response.headers["cache-control"], "no-store");
    assert.equal(updates.length, 1);
    assert.equal(emails.length, 1);
    assert.equal(log.mock.callCount(), 0);
    assert.ok(
      parameters.every((command) => command.input.WithDecryption === true),
    );
    assert.equal(updates[0].input.TableName, "test-throttle");
    assert.equal(updates[0].input.ReturnValues, "UPDATED_NEW");
    assert.equal(
      updates[0].input.UpdateExpression,
      "SET expiresAt = if_not_exists(expiresAt, :expiresAt) ADD attempts :one",
    );
    const key = updates[0].input.Key?.throttleKey?.S ?? "";
    assert.ok(key);
    assert.equal(key.includes("203.0.113.10"), false);
    assert.equal(key.includes("Visitor"), false);
    assert.equal(key.includes("test-only-secret-salt"), false);
    assert.ok(
      Number(updates[0].input.ExpressionAttributeValues?.[":expiresAt"]?.N) >=
        Math.floor(before / 1000) + 25 * 3600 - 2,
    );
    assert.ok(
      Number(updates[0].input.ExpressionAttributeValues?.[":expiresAt"]?.N) <=
        Math.floor(Date.now() / 1000) + 25 * 3600 + 2,
    );
    assert.equal(
      JSON.stringify(updates[0].input).includes(visitor.email),
      false,
    );
    assert.equal(
      JSON.stringify(updates[0].input).includes(visitor.message),
      false,
    );
    const mail = emails[0].input;
    assert.equal(mail.FromEmailAddress, "verified-sender@example.net");
    assert.deepEqual(mail.ReplyToAddresses, ["visitor@example.org"]);
    assert.deepEqual(mail.Destination?.ToAddresses, [
      "artist-inbox@example.net",
    ]);
    assert.equal(mail.Content?.Simple?.Subject?.Charset, "UTF-8");
    assert.equal(mail.Content?.Simple?.Body?.Text?.Charset, "UTF-8");
    assert.ok(mail.Content?.Simple?.Subject?.Data?.includes(visitor.name));
    assert.ok(
      mail.Content?.Simple?.Body?.Text?.Data?.includes(visitor.message),
    );
    assert.equal(mail.Content?.Simple?.Body?.Html, undefined);
  });

  it("enforces the attempt limit despite rotated headers and parallel calls", async (t) => {
    let attempts = 0;
    const { updates, emails } = mockAws(t, () => ++attempts);
    const responses = [];
    for (let i = 0; i < 5; i++)
      responses.push(
        await handler(
          event(visitor, {
            origin: i % 2 ? "https://www.example.com" : "https://example.com",
            userAgent: `rotated-${i}`,
          }),
        ),
      );
    const parallel = await Promise.all(
      [5, 6, 7].map((i) =>
        handler(event(visitor, { userAgent: `parallel-${i}` })),
      ),
    );
    assert.deepEqual(
      responses.map((response) => response.statusCode),
      [200, 200, 200, 200, 200],
    );
    assert.deepEqual(
      parallel.map((response) => response.statusCode),
      [429, 429, 429],
    );
    assert.equal(emails.length, 5);
    assert.equal(updates.length, 8);
    assert.equal(
      new Set(updates.map((command) => command.input.Key?.throttleKey?.S)).size,
      1,
    );
    for (const response of parallel)
      assert.equal(response.body, '{"ok":false}');
  });

  it("returns a generic error and logs no visitor fields when SES fails", async (t) => {
    const error = new Error(
      `Synthetic SES failure: ${visitor.name} ${visitor.email} ${visitor.message}`,
    );
    mockAws(t, undefined, error);
    const log = t.mock.method(console, "error", () => {});
    const response = await handler(event(visitor));
    assert.equal(response.statusCode, 502);
    assert.equal(response.body, '{"ok":false}');
    assert.equal(log.mock.callCount(), 1);
    const serialized = JSON.stringify(log.mock.calls[0].arguments);
    for (const field of [visitor.name, visitor.email, visitor.message])
      assert.equal(serialized.includes(field), false);
    assert.equal(serialized.includes("Synthetic SES failure"), false);
  });
});
