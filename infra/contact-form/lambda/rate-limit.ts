import { createHash } from "node:crypto";

interface RateLimitIdentity {
  abuseSalt: string;
  sourceIp: string;
  hourBucket: string;
}

export function createRateLimitKey({
  abuseSalt,
  sourceIp,
  hourBucket,
}: RateLimitIdentity): string {
  const fingerprint = createHash("sha256")
    .update([abuseSalt, sourceIp, hourBucket].join("|"))
    .digest("hex");

  return `contact#${hourBucket}#${fingerprint}`;
}

export function isRateLimitExceeded(attempts: number, limit: number): boolean {
  return attempts > limit;
}
