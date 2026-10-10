# Contact Form Security Review

**Review date:** August 22, 2026  
**Scope:** Contacts frontend, contact Lambda, CDK infrastructure, dependency audit, and documented privacy controls  
**Result:** Remediation in progress; CF-SEC-001 fixed locally and awaiting deployed verification. CF-SEC-002 closed October 9 after a clean audit and upgrade regression verification.

## Executive summary

The form uses several sound controls: server-side validation, exact browser-origin matching, a honeypot, generic responses, encrypted private configuration, short retention, and no intentional logging or application storage of message content. The API is not ready to deploy: the throttle, request-size, and restricted SES permission fixes are local and still need deployed verification. The original dependency audit is historical; the October 9 updated lockfile reports zero vulnerabilities, with all 207 browser checks passing.

CORS is a browser policy, not authentication. A direct client can send the approved `Origin` header itself, so origin checking must not be treated as the primary abuse boundary.

## Findings

| ID         | Severity                              | Status        | Finding                                                                                                                                                                                                                                                                                                                                                                                                                                                | Required remediation                                                                                                                          |
| ---------- | ------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| CF-SEC-001 | High                                  | Fixed locally | The original DynamoDB throttle fingerprint included caller-controlled `User-Agent` and origin, and the stack lacked API-stage throttling and Lambda reserved concurrency. The implementation now uses only salt, API Gateway source IP, and hour bucket; applies a five-request burst/one-request-per-second stage throttle; and caps Lambda at two concurrent executions. Unit tests confirm origin and user-agent changes cannot reset the identity. | Verify direct-client and concurrent behavior after deployment. Reconsider Turnstile before launch if residual spam risk remains unacceptable. |
| CF-SEC-002 | High (critical on October 9 re-audit) | Closed        | Historical August audit: 12 findings. October 9 pre-fix audit: 16 (1 critical, 11 high, 4 moderate). Astro, CDK, and transitive updates now pass a clean install and audit with zero vulnerabilities, plus all 207 browser checks.                                                                                                                                                                                                                     | No remaining dependency remediation from this audit; rerun audits before future deployment. See October 9 evidence below and M8.              |
| CF-SEC-003 | Medium                                | Fixed locally | JSON capped at 32 KiB; base64 representation and decoded length checked before allocation/parsing. Generic 413 precedes honeypot and AWS calls; 20 backend tests pass. HTTP API has no custom upstream body-validation setting.                                                                                                                                                                                                                        | Verify deployed gateway size handling and absence of message delivery/storage/logging; see request-size evidence and runbook.                 |
| CF-SEC-004 | Medium                                | Fixed locally | The Lambda role now grants `ses:SendEmail` only on the deployment-selected SES identity ARN and with an exact `ses:FromAddress` condition. The required sender parameter excludes IAM wildcard characters.                                                                                                                                                                                                                                             | Confirm parameter, verified identity, runtime SSM sender, and deployed role policy align before live delivery testing.                        |
| CF-SEC-005 | Low                                   | Fixed locally | Twenty-eight mocked handler/parser/rate-limit and synthesized-infrastructure tests cover origin, validation, injection/spam, honeypot, throttling, body size, SES email fields, safe logging, CORS, gateway/concurrency, SSM scope, TTL, and retention.                                                                                                                                                                                                | Verify deployed negative paths, direct clients, and real concurrency; mocked counts do not prove deployed behavior.                           |
| CF-SEC-006 | Low                                   | Closed        | Contacts notice now names AWS/SES and the recipient mailbox provider, explains their processing/retention and limited application records, and removes the absolute non-sharing claim. Built output verified.                                                                                                                                                                                                                                          | Recheck wording if the delivery provider or data flow changes.                                                                                |

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

## October 9 security coverage and privacy correction

CF-SEC-005 is fixed locally (CR-084): 28 backend/infrastructure tests pass. Mocked handler cases cover negative input and no-side-effect paths, normalized SES Reply-To/plain-text content, rate-limit keys across rotated headers and simulated parallel requests, and generic/PII-safe delivery-failure logging. Synthesis assertions check CORS, gateway limits, Lambda concurrency, TTL/retention, and scoped SSM/SES policies. The parallel test supplies sequential atomic attempt counts; actual DynamoDB contention and direct-client behavior still require deployed checks. CF-SEC-005 remains verification pending.

CF-SEC-006 is closed (CR-084/D-066). Built Contacts HTML names Amazon Web Services/SES as submission and delivery processors and the mailbox provider as recipient/storage provider, explains application data retention, and no longer says messages are never shared with third parties. `npm run check` and `npm run build` pass; the form remains disabled pending API setup.

## October 9 configured-form test security audit

The configured browser suite uses a reserved `.invalid` API hostname and synthetic visitor data. A browser-context request guard aborts unexpected external HTTP requests and all non-GET/HEAD local HTTP requests, including requests from additional pages. Each mocked contact request must use POST, `Content-Type: application/json`, and the local preview origin. An unregistered contact request is aborted and fails the test. Service workers are disabled in the Playwright configuration. The mock asserts the exact outgoing payload, including an empty honeypot field, before returning a controlled response.

`CI=true npm run test:e2e:contacts -- --fail-on-flaky-tests` passed 21/21 across desktop, mobile-emulated, and tablet Chrome with no retries: pending/success, native invalid-email rejection, API 400/413 correction feedback, 429 throttling feedback, 502/network failure, and retry. The prior 15-case run passed before the guard and negative-response expansion. These tests demonstrate browser behavior and that the harness does not permit live browser submissions during this run. They do not exercise API Gateway, Lambda, DynamoDB, SES, actual CORS enforcement, mailbox delivery, deployed logs, or direct clients. CF-SEC-001/003/004/005 remain pending deployed verification; this browser result is not a release sign-off.

## October 9 SES permission remediation

CF-SEC-004 is fixed locally (CR-083/D-065). CDK now requires a verified sender email as a deployment parameter and scopes `ses:SendEmail` to that SES identity ARN in the stack's partition, region, and account. An exact `ses:FromAddress` condition also restricts the message sender. The parameter pattern excludes IAM wildcard characters. [AWS SES authorization guidance](https://docs.aws.amazon.com/ses/latest/dg/control-user-access.html) supports identity ARNs and this From address condition. The sender address remains outside repository files; CloudFormation `NoEcho` masks parameter displays but does not hide the resulting IAM policy from authorized policy readers, as [AWS parameter guidance](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html) notes.

The synthesized-policy regression and all 21 contact tests passed, as did CDK synthesis. Before enabling delivery, verify the deployment parameter equals both the verified SES identity and the runtime SSM sender value, then inspect the deployed role policy and send a controlled test message. A mismatch denies sending rather than widening the permission. No AWS resources were changed during this local remediation.

## October 9 request-size remediation

CF-SEC-003 is fixed locally (CR-082/D-064). The 32,768-byte UTF-8 JSON limit accommodates current maximum fields including JSON escaping. Base64 is capped at 43,692 bytes, checked for standard padded syntax, and its decoded length is calculated before `Buffer.from`; malformed bodies return 400. Caller-supplied Content-Length is ignored. Oversized allowed-origin POSTs return generic 413 with CORS/no-store before parsing, honeypot, AWS calls, or logging.

All 20 backend tests passed, including boundary cases and mocked valid maximum-length Unicode submissions. Astro diagnostics, production build, and CDK synthesis passed. HTTP API has a [10 MB service payload quota](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-quotas.html), but [no request validation or direct WAF integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html). No custom upstream limit was invented or deployed. The application cap cannot prevent initial event buffering/invocation cost; existing throttling/concurrency limits remain necessary. Deployed size checks remain pending in the [runbook](../deployment/contact-form.md#request-size-boundary). Other release gates remain in force.

## Follow-up security verification — October 9

**Verdict:** No exploitable size-cap bypass found in the reviewed local implementation. CF-SEC-003 remains fixed locally with live verification pending, not a production security sign-off.

- Reran `npm run contact:test`: 20/20 passed (exit 0). Instrumented tests confirm oversized allowed-origin POSTs do not invoke JSON parsing, base64 decoding, SSM, DynamoDB, SES, or application error logging. Invalid origin/method responses precede body processing.
- Ran an independent temporary harness, `/tmp/artist-request-size-review.mjs`, under Node 22.23.3: 266/266 checks passed (exit 0). It constructs JSON at every byte size from 32,752 through 32,784 using ASCII, two-byte, three-byte, and four-byte UTF-8 characters, in plain and base64 representations (264 cases), plus two 5 MiB oversized representations. Exact-limit bodies pass; all over-limit cases reject. The base64 padding arithmetic covers decoded overflow even when encoded length remains within 43,692 bytes.
- `npm run contact:synth` passed; reviewed HTTP API burst 5/rate 1 and Lambda concurrency 2. The limit runs inside Lambda after ingress/event materialization. It does not prevent request-buffering or invocation charges, and oversized requests do not increment the application DynamoDB throttle. Existing gateway/concurrency controls remain necessary. AWS documents the [HTTP API payload quota](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-quotas.html) and [lack of request validation/direct WAF integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html).
- **Informational hardening, not a demonstrated size bypass:** `Buffer.toString("utf8")` replaces invalid UTF-8 with U+FFFD; a base64 JSON string containing byte `FF` is accepted with replacement. Noncanonical pad bits are also accepted (`e31=` decodes to `{}`). Therefore the parser enforces bounded base64 shape/length, not fully canonical encoding or strict UTF-8. The raw decoded byte cap still holds. Consider fatal UTF-8 decoding and canonical base64 validation in future input-hardening work; no runtime changes were made by this review. See [Node Buffer encoding behavior](https://nodejs.org/api/buffer.html#buffers-and-character-encodings).
- Deployed gateway encoding, service-limit responses, and absence of delivery/storage/logging still require the runbook checks after deployment approval. M8 remains 47/57; no new acceptance criterion was closed.

## October 9 dependency remediation

- Fresh audit: 16 findings (1 critical, 11 high, 4 moderate), superseding the historical August counts.
- Astro 7.0.2 → 7.3.8; CDK library 2.261.0 → 2.273.0. Compatible transitive updates include sharp 0.35.5, PostCSS 8.5.29, devalue 5.9.4, YAML 2.9.1, and bundled brace-expansion 5.0.12. No forced upgrades or overrides.
- Clean installation and final audit passed with zero vulnerabilities. Astro diagnostics, production build, test TypeScript, six rate-limit tests, and CDK synthesis passed. All 207 browser checks passed with no flaky tests or skips; see [M8](../milestones/milestone-8.md#verification-record).
- Threat review: the site produces static HTML and does not expose Astro SSR/image processing as a public server; build tooling still handles repository assets. Dependency findings were remediated rather than dismissed on that basis. Reviewed the [Astro release](https://github.com/withastro/astro/releases/tag/astro%407.3.8) and its installed preview implementation; the isolated test server now uses `--ignore-lock` to prevent agent auto-backgrounding. Synthesized API controls retain their previous limits; unrelated contact findings remain release gates.

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
