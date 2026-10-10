import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  MAX_REQUEST_BODY_BYTES,
  MAX_BASE64_BODY_BYTES,
  parseRequestBody,
  RequestBodyTooLargeError,
} from "./request-body.ts";

const atLimit = "{}" + " ".repeat(MAX_REQUEST_BODY_BYTES - 2);

describe("contact request body size boundary", () => {
  for (const encoded of [false, true]) {
    const represent = (body: string) =>
      encoded ? Buffer.from(body).toString("base64") : body;
    it(`accepts the exact byte limit (${encoded ? "base64" : "plain"})`, () => {
      assert.deepEqual(parseRequestBody(represent(atLimit), encoded), {});
    });
    it(`rejects one byte over before parsing or decoding (${encoded ? "base64" : "plain"})`, (t) => {
      const body = represent(atLimit + " ");
      const parse = t.mock.method(JSON, "parse", () => {
        throw new Error("must not parse");
      });
      const decode = t.mock.method(Buffer, "from", () => {
        throw new Error("must not decode");
      });
      assert.throws(
        () => parseRequestBody(body, encoded),
        RequestBodyTooLargeError,
      );
      assert.equal(parse.mock.callCount(), 0);
      assert.equal(decode.mock.callCount(), 0);
    });
  }

  it("counts UTF-8 bytes rather than JavaScript string length", () => {
    const body = JSON.stringify({ message: "界".repeat(11_000) });
    assert.ok(body.length < MAX_REQUEST_BODY_BYTES);
    assert.throws(() => parseRequestBody(body), RequestBodyTooLargeError);
  });

  it("rejects an excessive encoded representation before decoding", (t) => {
    const decode = t.mock.method(Buffer, "from", () => {
      throw new Error("must not decode");
    });
    assert.throws(
      () => parseRequestBody("A".repeat(MAX_BASE64_BODY_BYTES + 1), true),
      RequestBodyTooLargeError,
    );
    assert.equal(decode.mock.callCount(), 0);
  });

  it("allows maximum current fields even with six-byte JSON escapes", () => {
    const body =
      '{"name":"' +
      "\\u754c".repeat(100) +
      '","email":"' +
      "\\u0061".repeat(254) +
      '","message":"' +
      "\\u754c".repeat(5000) +
      '","company":""}';
    assert.ok(Buffer.byteLength(body) < MAX_REQUEST_BODY_BYTES);
    assert.equal(parseRequestBody(body).message, "界".repeat(5000));
  });

  it("rejects malformed base64, JSON, and non-object payloads", () => {
    for (const body of ["A", "!!!!", "e30=\n", "e=30", "===="]) {
      assert.throws(() => parseRequestBody(body, true));
    }
    for (const body of [
      undefined,
      null,
      42,
      "",
      "{",
      "null",
      "[]",
      '"text"',
      "true",
    ]) {
      assert.throws(() => parseRequestBody(body));
    }
  });
});
