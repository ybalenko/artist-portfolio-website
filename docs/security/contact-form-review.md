# Contact Form Security Review

**Review date:** August 22, 2026  
**Scope:** Contacts frontend, contact Lambda, CDK infrastructure, dependency audit, and documented privacy controls  
**Result:** Remediation required before deployment

## Executive summary

The form uses several sound controls: server-side validation, exact browser-origin matching, a honeypot, generic responses, encrypted private configuration, short retention, and no intentional logging or application storage of message content. However, the current public API is not ready to deploy because its only send-rate control can be bypassed by changing a caller-controlled header, and current dependencies include reported high-severity vulnerabilities.

CORS is a browser policy, not authentication. A direct client can send the approved `Origin` header itself, so origin checking must not be treated as the primary abuse boundary.

## Findings

| ID         | Severity | Finding                                                                                                                                                                                                                                                                             | Required remediation                                                                                                                                                                                                                      |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CF-SEC-001 | High     | The DynamoDB throttle fingerprint includes caller-controlled `User-Agent`. An attacker can rotate that value to receive a new five-message allowance. The public API route has no authorization, API-stage throttle, WAF, or Lambda reserved-concurrency cap.                       | Base the application throttle on a stable salted network fingerprint rather than `User-Agent`; add API Gateway throttling and Lambda reserved concurrency. Reconsider Turnstile before launch if residual spam risk remains unacceptable. |
| CF-SEC-002 | High     | `npm audit --audit-level=moderate` reported 12 known vulnerabilities: 8 high and 4 moderate, including reports affecting Astro, sharp/libvips, PostCSS, fast-uri, YAML tooling, brace-expansion, nanoid, and SVGO. Exploitability in this static site has not yet been established. | Update non-breaking dependencies, deliberately upgrade Astro to a patched release, rerun the audit, and regression-test the build and public pages. Do not use a forced upgrade without reviewing its changes.                            |
| CF-SEC-003 | Medium   | The Lambda decodes and parses the complete body before enforcing field limits, and the synthesized API has no explicit request-size control.                                                                                                                                        | Reject excessive raw or encoded body byte length before decoding and `JSON.parse`; add an upstream size control where the selected AWS service supports it.                                                                               |
| CF-SEC-004 | Medium   | The Lambda role grants `ses:SendEmail` on `*`.                                                                                                                                                                                                                                      | Restrict sending to the verified identity ARN and/or enforce the configured sender with an IAM `ses:FromAddress` condition.                                                                                                               |
| CF-SEC-005 | Low      | No automated tests cover origin rejection, throttle bypass/concurrency, body-size handling, injection characters, honeypot behavior, email construction, or privacy-safe logging.                                                                                                   | Add unit tests and synthesized-infrastructure assertions for the security boundaries, plus deployed negative-path checks.                                                                                                                 |
| CF-SEC-006 | Low      | The Privacy Notice says personal information is not shared with third parties, although AWS delivery services and the mailbox provider process it.                                                                                                                                  | Replace the absolute statement with accurate service-provider/processor wording before enabling the form.                                                                                                                                 |

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

- `npm run contact:synth` passed and showed a public `POST /contact` route with `AuthorizationType: NONE`; the default API stage had no throttle settings and the Lambda had no reserved-concurrency setting.
- `npm run check` passed with zero errors, warnings, or hints.
- `npm audit --audit-level=moderate` completed against the npm registry and reported 12 vulnerabilities: 8 high and 4 moderate.
- Source review confirmed that the rate-limit key combines salt, origin, source IP, caller-controlled user agent, and hour bucket.
- No contact-form security test files were found.

## Release gate

Do not deploy the contact API or enable `PUBLIC_CONTACT_API_URL` until CF-SEC-001 through CF-SEC-004 are fixed and verified. CF-SEC-005 test coverage must exercise those fixes before launch. CF-SEC-006 must be resolved before accepting visitor messages.

After remediation, rerun formatting, Astro diagnostics, production build, dependency audit, CDK synthesis, handler tests, and deployed happy/negative-path checks. Record the results in Milestone 8.
