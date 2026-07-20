import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { createHash } from "node:crypto";

const allowedOrigins = requiredEnv("ALLOWED_ORIGINS")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const abuseSaltParameterName = requiredEnv("ABUSE_SALT_PARAMETER_NAME");
const maxMessageLength = Number(requiredEnv("MAX_MESSAGE_LENGTH"));
const maxNameLength = Number(requiredEnv("MAX_NAME_LENGTH"));
const messageRateLimitPerHour = Number(
  requiredEnv("MESSAGE_RATE_LIMIT_PER_HOUR"),
);
const recipientEmailParameterName = requiredEnv(
  "RECIPIENT_EMAIL_PARAMETER_NAME",
);
const sesSenderEmailParameterName = requiredEnv(
  "SES_SENDER_EMAIL_PARAMETER_NAME",
);
const throttleTableName = requiredEnv("THROTTLE_TABLE_NAME");

const dynamoDb = new DynamoDBClient({});
const ses = new SESv2Client({});
const ssm = new SSMClient({});

const parameterCache = new Map<string, string>();

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
}

interface ValidContactMessage {
  name: string;
  email: string;
  message: string;
}

interface HttpResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

export const handler = async (event: any): Promise<HttpResponse> => {
  const origin = getHeader(event, "origin");
  const corsOrigin = getAllowedOrigin(origin);

  if (!corsOrigin) {
    return jsonResponse(403, { ok: false }, undefined);
  }

  if (event?.requestContext?.http?.method !== "POST") {
    return jsonResponse(405, { ok: false }, corsOrigin);
  }

  let parsedBody: ContactPayload;

  try {
    parsedBody = parseBody(event);
  } catch {
    return jsonResponse(400, { ok: false }, corsOrigin);
  }

  const honeypot = normalizeOptionalString(parsedBody.company);

  if (honeypot) {
    return jsonResponse(200, { ok: true }, corsOrigin);
  }

  const validationResult = validateContactPayload(parsedBody);

  if (!validationResult.ok) {
    return jsonResponse(400, { ok: false }, corsOrigin);
  }

  try {
    const isRateLimited = await applyRateLimit(event, corsOrigin);

    if (isRateLimited) {
      return jsonResponse(429, { ok: false }, corsOrigin);
    }

    const [recipientEmail, senderEmail] = await Promise.all([
      getSecureParameter(recipientEmailParameterName),
      getSecureParameter(sesSenderEmailParameterName),
    ]);

    await sendContactEmail({
      contactMessage: validationResult.value,
      recipientEmail,
      senderEmail,
    });

    return jsonResponse(200, { ok: true }, corsOrigin);
  } catch (error) {
    console.error("contact_message_failed", {
      errorName: error instanceof Error ? error.name : "UnknownError",
    });

    return jsonResponse(502, { ok: false }, corsOrigin);
  }
};

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getHeader(event: any, name: string): string {
  const headers = event?.headers ?? {};
  const targetName = name.toLowerCase();
  const matchingHeaderName = Object.keys(headers).find(
    (headerName) => headerName.toLowerCase() === targetName,
  );

  if (!matchingHeaderName) {
    return "";
  }

  return String(headers[matchingHeaderName] ?? "");
}

function getAllowedOrigin(origin: string): string | undefined {
  return allowedOrigins.includes(origin) ? origin : undefined;
}

function parseBody(event: any): ContactPayload {
  const body = event?.isBase64Encoded
    ? Buffer.from(String(event?.body ?? ""), "base64").toString("utf8")
    : String(event?.body ?? "");

  return JSON.parse(body) as ContactPayload;
}

function normalizeOptionalString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validateContactPayload(
  payload: ContactPayload,
): { ok: true; value: ValidContactMessage } | { ok: false } {
  const name = normalizeOptionalString(payload.name);
  const email = normalizeOptionalString(payload.email).toLowerCase();
  const message = normalizeOptionalString(payload.message);

  if (!name || !email || !message) {
    return { ok: false };
  }

  if (name.length > maxNameLength || message.length > maxMessageLength) {
    return { ok: false };
  }

  if (!isValidEmail(email)) {
    return { ok: false };
  }

  if (hasUnsafeHeaderCharacters(name) || hasUnsafeHeaderCharacters(email)) {
    return { ok: false };
  }

  if (hasUnsafeBodyCharacters(message) || looksLikeObviousSpam(message)) {
    return { ok: false };
  }

  return {
    ok: true,
    value: {
      email,
      message,
      name,
    },
  };
}

function isValidEmail(email: string): boolean {
  if (email.length > 254) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hasUnsafeHeaderCharacters(value: string): boolean {
  return /[\r\n\x00-\x1f\x7f]/.test(value);
}

function hasUnsafeBodyCharacters(value: string): boolean {
  return /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value);
}

function looksLikeObviousSpam(message: string): boolean {
  const urlMatches = message.match(/https?:\/\/|www\./gi) ?? [];
  const htmlAnchorMatches = message.match(/<\s*a\s+href/gi) ?? [];

  return urlMatches.length > 2 || htmlAnchorMatches.length > 0;
}

async function applyRateLimit(event: any, origin: string): Promise<boolean> {
  const abuseSalt = await getSecureParameter(abuseSaltParameterName);
  const hourBucket = new Date().toISOString().slice(0, 13);
  const sourceIp = String(event?.requestContext?.http?.sourceIp ?? "unknown");
  const userAgent = getHeader(event, "user-agent");
  const fingerprint = createHash("sha256")
    .update([abuseSalt, origin, sourceIp, userAgent, hourBucket].join("|"))
    .digest("hex");
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 25;

  const updateResult = await dynamoDb.send(
    new UpdateItemCommand({
      TableName: throttleTableName,
      Key: {
        throttleKey: {
          S: `contact#${hourBucket}#${fingerprint}`,
        },
      },
      UpdateExpression:
        "SET expiresAt = if_not_exists(expiresAt, :expiresAt) ADD attempts :one",
      ExpressionAttributeValues: {
        ":expiresAt": {
          N: String(expiresAt),
        },
        ":one": {
          N: "1",
        },
      },
      ReturnValues: "UPDATED_NEW",
    }),
  );

  const attempts = Number(updateResult.Attributes?.attempts?.N ?? "1");

  return attempts > messageRateLimitPerHour;
}

async function getSecureParameter(parameterName: string): Promise<string> {
  const cachedValue = parameterCache.get(parameterName);

  if (cachedValue) {
    return cachedValue;
  }

  const parameterResult = await ssm.send(
    new GetParameterCommand({
      Name: parameterName,
      WithDecryption: true,
    }),
  );
  const value = parameterResult.Parameter?.Value?.trim();

  if (!value) {
    throw new Error("Secure parameter is empty or missing.");
  }

  parameterCache.set(parameterName, value);

  return value;
}

async function sendContactEmail({
  contactMessage,
  recipientEmail,
  senderEmail,
}: {
  contactMessage: ValidContactMessage;
  recipientEmail: string;
  senderEmail: string;
}) {
  const subject = `Website message from ${contactMessage.name}`;
  const body = [
    "A visitor submitted the Leave a message form.",
    "",
    `Name: ${contactMessage.name}`,
    `Email: ${contactMessage.email}`,
    "",
    "Message:",
    contactMessage.message,
  ].join("\n");

  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: senderEmail,
      ReplyToAddresses: [contactMessage.email],
      Destination: {
        ToAddresses: [recipientEmail],
      },
      Content: {
        Simple: {
          Subject: {
            Charset: "UTF-8",
            Data: subject,
          },
          Body: {
            Text: {
              Charset: "UTF-8",
              Data: body,
            },
          },
        },
      },
    }),
  );
}

function jsonResponse(
  statusCode: number,
  body: Record<string, boolean>,
  origin: string | undefined,
): HttpResponse {
  const headers: Record<string, string> = {
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8",
  };

  if (origin) {
    headers["access-control-allow-origin"] = origin;
    headers.vary = "Origin";
  }

  return {
    body: JSON.stringify(body),
    headers,
    statusCode,
  };
}
