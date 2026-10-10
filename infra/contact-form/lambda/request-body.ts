// Allows the current field limits even when each UTF-16 code unit is JSON-escaped.
export const MAX_REQUEST_BODY_BYTES = 32 * 1024;
export const MAX_BASE64_BODY_BYTES = 4 * Math.ceil(MAX_REQUEST_BODY_BYTES / 3);

export class RequestBodyTooLargeError extends Error {}

export function parseRequestBody(
  body: unknown,
  isBase64Encoded = false,
): Record<string, unknown> {
  if (typeof body !== "string") {
    throw new Error("Invalid request body.");
  }

  // Check the representation actually received, never the caller's Content-Length.
  const limit = isBase64Encoded
    ? MAX_BASE64_BODY_BYTES
    : MAX_REQUEST_BODY_BYTES;
  if (body.length > limit || Buffer.byteLength(body, "utf8") > limit) {
    throw new RequestBodyTooLargeError();
  }

  let json = body;
  if (isBase64Encoded) {
    // API Gateway supplies standard padded base64. Reject malformed encodings
    // rather than relying on Buffer's permissive whitespace/character handling.
    if (body.length % 4 !== 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(body)) {
      throw new Error("Invalid request body.");
    }
    const padding = body.endsWith("==") ? 2 : body.endsWith("=") ? 1 : 0;
    const decodedBytes = (body.length / 4) * 3 - padding;
    if (decodedBytes > MAX_REQUEST_BODY_BYTES) {
      throw new RequestBodyTooLargeError();
    }
    json = Buffer.from(body, "base64").toString("utf8");
  }

  const parsed: unknown = JSON.parse(json);
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Invalid request body.");
  }
  return parsed as Record<string, unknown>;
}
