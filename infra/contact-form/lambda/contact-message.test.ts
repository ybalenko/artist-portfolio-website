import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SESv2Client } from "@aws-sdk/client-sesv2";
import { SSMClient } from "@aws-sdk/client-ssm";
import { MAX_REQUEST_BODY_BYTES } from "./request-body.ts";

let handler: typeof import("./contact-message.ts").handler;
before(async () => {
  Object.assign(process.env, {
    ALLOWED_ORIGINS: "https://example.com",
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

const event = (body: unknown, encoded = false) => ({
  body,
  isBase64Encoded: encoded,
  headers: { origin: "https://example.com", "content-length": "1" },
  requestContext: { http: { method: "POST", sourceIp: "203.0.113.1" } },
});

describe("contact handler rejects bodies before side effects", () => {
  for (const encoded of [false, true]) {
    it(`returns generic 413 with CORS and no-store for ${encoded ? "base64" : "plain"} bodies`, async (t) => {
      const body = JSON.stringify({
        company: "bot",
        message: "x".repeat(MAX_REQUEST_BODY_BYTES),
      });
      const request = event(
        encoded ? Buffer.from(body).toString("base64") : body,
        encoded,
      );
      const fail = () => {
        throw new Error("unexpected side effect");
      };
      const spies = [
        t.mock.method(SSMClient.prototype, "send", fail),
        t.mock.method(DynamoDBClient.prototype, "send", fail),
        t.mock.method(SESv2Client.prototype, "send", fail),
        t.mock.method(console, "error", fail),
        t.mock.method(JSON, "parse", fail),
        t.mock.method(Buffer, "from", fail),
      ];
      const response = await handler(request);
      assert.equal(response.statusCode, 413);
      assert.equal(response.body, '{"ok":false}');
      assert.equal(
        response.headers["access-control-allow-origin"],
        "https://example.com",
      );
      assert.equal(response.headers["cache-control"], "no-store");
      for (const spy of spies) assert.equal(spy.mock.callCount(), 0);
    });
  }

  it("returns 400 for malformed payloads without AWS calls or logging", async (t) => {
    const fail = () => {
      throw new Error("unexpected side effect");
    };
    const spies = [
      t.mock.method(SSMClient.prototype, "send", fail),
      t.mock.method(DynamoDBClient.prototype, "send", fail),
      t.mock.method(SESv2Client.prototype, "send", fail),
      t.mock.method(console, "error", fail),
    ];
    for (const body of [null, undefined, "null", "[]", "{", "{}"])
      assert.equal((await handler(event(body))).statusCode, 400);
    assert.equal((await handler(event("!!!!", true))).statusCode, 400);
    for (const spy of spies) assert.equal(spy.mock.callCount(), 0);
  });

  for (const encoded of [false, true]) {
    it(`preserves valid maximum-length Unicode submission (${encoded ? "base64" : "plain"})`, async (t) => {
      const ssm = t.mock.method(SSMClient.prototype, "send", async () => ({
        Parameter: { Value: "test@example.com" },
      }));
      const db = t.mock.method(DynamoDBClient.prototype, "send", async () => ({
        Attributes: { attempts: { N: "1" } },
      }));
      const send = t.mock.method(
        SESv2Client.prototype,
        "send",
        async () => ({}),
      );
      const body = JSON.stringify({
        name: "界".repeat(100),
        email: "visitor@example.com",
        message: "界".repeat(5000),
        company: "",
      });
      const response = await handler(
        event(encoded ? Buffer.from(body).toString("base64") : body, encoded),
      );
      assert.equal(response.statusCode, 200);
      assert.equal(db.mock.callCount(), 1);
      assert.equal(send.mock.callCount(), 1);
      // SSM can be served by the existing warm-invocation cache.
      assert.ok(ssm.mock.callCount() <= 3);
    });
  }

  it("preserves a bounded honeypot response and existing origin/method rejection", async () => {
    assert.equal((await handler(event('{"company":"bot"}'))).statusCode, 200);
    assert.equal(
      (
        await handler({
          ...event("{}"),
          headers: { origin: "https://unapproved.example" },
        })
      ).statusCode,
      403,
    );
    assert.equal(
      (
        await handler({
          ...event("{}"),
          requestContext: { http: { method: "GET" } },
        })
      ).statusCode,
      405,
    );
  });
});
