import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createRateLimitKey, isRateLimitExceeded } from "./rate-limit.ts";

const identity = {
  abuseSalt: "test-only-secret-salt",
  sourceIp: "203.0.113.10",
  hourBucket: "2026-08-22T17",
};

describe("contact message rate limiting", () => {
  it("does not let origin or user-agent changes reset the identity", () => {
    const apexRequest = {
      ...identity,
      origin: "https://yuliabalenko.com",
      userAgent: "browser-a",
    };
    const wwwRequest = {
      ...identity,
      origin: "https://www.yuliabalenko.com",
      userAgent: "attacker-controlled-agent",
    };

    assert.equal(
      createRateLimitKey(apexRequest),
      createRateLimitKey(wwwRequest),
    );
  });

  it("separates source IP addresses", () => {
    assert.notEqual(
      createRateLimitKey(identity),
      createRateLimitKey({ ...identity, sourceIp: "203.0.113.11" }),
    );
  });

  it("separates hourly windows", () => {
    assert.notEqual(
      createRateLimitKey(identity),
      createRateLimitKey({ ...identity, hourBucket: "2026-08-22T18" }),
    );
  });

  it("uses the secret salt in the fingerprint", () => {
    assert.notEqual(
      createRateLimitKey(identity),
      createRateLimitKey({ ...identity, abuseSalt: "another-secret-salt" }),
    );
  });

  it("does not expose the source IP or salt in the stored key", () => {
    const key = createRateLimitKey(identity);

    assert.equal(key.includes(identity.sourceIp), false);
    assert.equal(key.includes(identity.abuseSalt), false);
  });

  it("allows the configured number of attempts and rejects the next one", () => {
    assert.equal(isRateLimitExceeded(5, 5), false);
    assert.equal(isRateLimitExceeded(6, 5), true);
  });
});
