# Contact Form Security Review

**Review date:** August 22, 2026  
**Scope:** Contacts frontend, contact Lambda, CDK infrastructure, dependency audit, and documented privacy controls  
**Result:** Remediation in progress; CF-SEC-001 fixed locally and awaiting deployed verification

## Executive summary

The form uses several sound controls: server-side validation, exact browser-origin matching, a honeypot, generic responses, encrypted private configuration, short retention, and no intentional logging or application storage of message content. However, the current public API is not ready to deploy because its only send-rate control can be bypassed by changing a caller-controlled header, and current dependencies include reported high-severity vulnerabilities.

CORS is a browser policy, not authentication. A direct client can send the approved `Origin` header itself, so origin checking must not be treated as the primary abuse boundary.

## Findings

| ID         | Severity | Status        | Finding                                                                                                                                                                                                                                                                                                                                                                                                                                                | Required remediation                                                                                                                                                                                           |
| ---------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CF-SEC-001 | High     | Fixed locally | The original DynamoDB throttle fingerprint included caller-controlled `User-Agent` and origin, and the stack lacked API-stage throttling and Lambda reserved concurrency. The implementation now uses only salt, API Gateway source IP, and hour bucket; applies a five-request burst/one-request-per-second stage throttle; and caps Lambda at two concurrent executions. Unit tests confirm origin and user-agent changes cannot reset the identity. | Verify direct-client and concurrent behavior after deployment. Reconsider Turnstile before launch if residual spam risk remains unacceptable.                                                                  |
| CF-SEC-002 | High     | Open          | `npm audit --audit-level=moderate` reported 12 known vulnerabilities: 8 high and 4 moderate, including reports affecting Astro, sharp/libvips, PostCSS, fast-uri, YAML tooling, brace-expansion, nanoid, and SVGO. Exploitability in this static site has not yet been established.                                                                                                                                                                    | Update non-breaking dependencies, deliberately upgrade Astro to a patched release, rerun the audit, and regression-test the build and public pages. Do not use a forced upgrade without reviewing its changes. |
| CF-SEC-003 | Medium   | Open          | The Lambda decodes and parses the complete body before enforcing field limits, and the synthesized API has no explicit request-size control.                                                                                                                                                                                                                                                                                                           | Reject excessive raw or encoded body byte length before decoding and `JSON.parse`; add an upstream size control where the selected AWS service supports it.                                                    |
| CF-SEC-004 | Medium   | Open          | The Lambda role grants `ses:SendEmail` on `*`.                                                                                                                                                                                                                                                                                                                                                                                                         | Restrict sending to the verified identity ARN and/or enforce the configured sender with an IAM `ses:FromAddress` condition.                                                                                    |
| CF-SEC-005 | Low      | Open          | No automated tests cover origin rejection, throttle bypass/concurrency, body-size handling, injection characters, honeypot behavior, email construction, or privacy-safe logging.                                                                                                                                                                                                                                                                      | Add unit tests and synthesized-infrastructure assertions for the security boundaries, plus deployed negative-path checks.                                                                                      |
| CF-SEC-006 | Low      | Open          | The Privacy Notice says personal information is not shared with third parties, although AWS delivery services and the mailbox provider process it.                                                                                                                                                                                                                                                                                                     | Replace the absolute statement with accurate service-provider/processor wording before enabling the form.                                                                                                      |

## Positive controls observed

- Server-side required-field, length, email, header-character, body-character, and basic spam validation.
- Exact allowlist matching for the apex and `www` production origins.
- Visitor email is used as `Reply-To`, not as the SES sender.
- Plain-text email construction and generic API responses.
- `Cache-Control: no-store` on Lambda responses.
- Private recipient, sender, and abuse salt are loaded from encrypted SSM parameters and excluded from source control.
- Logs intentionally contain only a generic event and safe error type; message content is not stored in DynamoDB.
- CloudWatch retention is one week and throttle records expire.
- SSM access is limited to the three named parameters.

## Evidence

- The original `npm run contact:synth` showed a public `POST /contact` route with `AuthorizationType: NONE`; the default API stage had no throttle settings and the Lambda had no reserved-concurrency setting.
- After CF-SEC-001 remediation, `npm run contact:synth` passed and produced `ThrottlingBurstLimit: 5`, `ThrottlingRateLimit: 1`, and `ReservedConcurrentExecutions: 2`.
- `npm run contact:test` passed 6 rate-limit regression tests covering origin/user-agent invariance, source-IP/hour/salt separation, stored-key privacy, and the configured limit boundary.
- `npm run check` passed with zero errors, warnings, or hints.
- `npm audit --audit-level=moderate` completed against the npm registry and reported 12 vulnerabilities: 8 high and 4 moderate.
- The original source review confirmed that the rate-limit key combined salt, origin, source IP, caller-controlled user agent, and hour bucket. CF-SEC-001 remediation removed origin and user agent from the key and added independent stage/concurrency controls.
- No contact-form security test files were found.

## Release gate

Do not deploy the contact API or enable `PUBLIC_CONTACT_API_URL` until CF-SEC-001 through CF-SEC-004 are fixed and verified. CF-SEC-005 test coverage must exercise those fixes before launch. CF-SEC-006 must be resolved before accepting visitor messages.

After remediation, rerun formatting, Astro diagnostics, production build, dependency audit, CDK synthesis, handler tests, and deployed happy/negative-path checks. Record the results in Milestone 8.
