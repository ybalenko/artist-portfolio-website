# Milestone 8 Plan — Protected Leave a Message Form

**Status:** In progress  
**Created:** July 19, 2026  
**Milestone goal:** Implement the Contacts page Leave a message workflow with server-side validation, basic abuse controls, and private email delivery while keeping mailing-list signup hidden and deferred.
**Implementation progress:** 43/50 tasks — 86%

## Confirmed decisions

- The owner registered a domain and wants to start implementing the Leave a message form.
- Implement only the Leave a message form now.
- Keep mailing-list signup hidden and deferred.
- Do not commit the private recipient email address to the repository.
- Use the public browser environment variable `PUBLIC_CONTACT_API_URL` for the contact API endpoint.
- Store private email delivery settings outside GitHub.
- Skip Turnstile/CAPTCHA bot protection for now by owner request.
- Use `https://yuliabalenko.com` as the canonical Contacts origin.
- Allow both `https://yuliabalenko.com` and `https://www.yuliabalenko.com` while both domains are active.
- Keep one week of Lambda operational logs and about 25 hours of non-message throttling fingerprints.

## 1. Scope

Milestone 8 includes:

1. Replace the Contacts draft message UI with a real form shell.
2. Add frontend validation and accessible pending/success/error states.
3. Add a public environment-variable hook for the contact API.
4. Keep the form disabled until required public configuration exists.
5. Add a hidden honeypot field.
6. Submit message payloads to a future API endpoint.
7. Implement the AWS contact backend after external prerequisites are ready.
8. Send validated messages through SES to a private recipient address stored outside the repository.
9. Update Contacts privacy copy and setup documentation.

## 2. Out of scope

- Mailing-list signup
- Newsletter campaigns
- Subscriber storage
- Browser-based inbox or message history
- Storing contact message bodies in DynamoDB
- Committing private email addresses, AWS credentials, or other secrets
- Purchasing, transferring, or changing domains without explicit owner approval
- Deploying external AWS/Cloudflare changes without explicit owner approval

## 3. Architecture baseline

```text
Contacts page
  ├─ validates name/email/message in browser
  └─ POSTs to PUBLIC_CONTACT_API_URL
      └─ API Gateway
          └─ Contact Lambda
              ├─ validates origin, payload, and honeypot
              ├─ rejects abuse/spam/header injection
              └─ sends through SES
                  └─ private artist inbox
```

The browser uses only public configuration. Lambda owns all private delivery details.

## 4. Implementation plan

### Step 1 — Planning and tracking

- [x] Record the owner request to begin Leave a message implementation.
- [x] Record the decision to start Milestone 8 before Milestone 7 is fully complete.
- [x] Move protected message delivery from backlog into Milestone 8.
- [x] Create this Milestone 8 plan.
- [x] Confirm mailing-list signup remains out of scope, hidden, and deferred.
- [x] Record owner decision to skip Turnstile/CAPTCHA for now.

### Step 2 — Contacts frontend

- [x] Add public contact form configuration for the API URL.
- [x] Convert the draft Contacts message block into a real HTML form.
- [x] Add required name, email, and message fields.
- [x] Visibly mark name, email, and message as required.
- [x] Enforce proposed 100-character name and 5,000-character message limits.
- [x] Add accessible live status messaging for setup, validation, success, and failure states.
- [x] Add a hidden honeypot field.
- [x] Add JSON submission to the configured contact API.
- [x] Keep the submit button disabled until the API URL is configured.

### Step 3 — Backend prerequisites

- [x] Confirm the exact production custom domain and deployed origin.
- [x] Confirm whether the custom domain is connected to Amplify before form launch.
- [x] Verify an SES sender identity.
- [ ] Move SES out of sandbox if required for the selected sender/recipient flow.
- [x] Store the private recipient email outside the repository.
- [x] Decide diagnostic retention for delivery metadata.

### Step 4 — AWS contact backend

- [x] Add infrastructure for API Gateway, Lambda, permissions, and runtime settings.
- [x] Implement Lambda payload validation.
- [x] Implement origin/CORS enforcement for the deployed site origin.
- [x] Implement honeypot handling and abuse throttling.
- [x] Implement SES send with verified sender and visitor `Reply-To`.
- [x] Prevent message bodies, names, emails, and tokens from being logged.
- [x] Configure safe generic API responses for success and failure.
- [ ] Configure Amplify with `PUBLIC_CONTACT_API_URL`.

### Step 5 — Documentation and verification

- [x] Add `.env.example` with public contact form variables only.
- [x] Add Leave a message setup runbook.
- [x] Update Contacts privacy copy for the prepared delivery workflow.
- [x] Remove draft notice labels from Contacts notice sections.
- [x] Refresh Contacts notices so they match the current API-pending, no-Turnstile, mailing-list-hidden status.
- [x] Remove the visible mailing-list section from the Contacts page.
- [x] Remove the visible Bot protection subsection from the Contacts page.
- [x] Consolidate Copyright Notice and Privacy Notice into one Contacts Notice section.
- [x] Remove only the Notice section eyebrow and render Notice subsection headings as sentence-case `h2` text.
- [x] Restore the Notice eyebrow and remove the large Notice header.
- [x] Fix the Notice eyebrow CSS so it uses the shared eyebrow font treatment.
- [x] Update project status, backlog, decision log, change request log, and README summaries.
- [x] Run local format and Astro checks after frontend changes.
- [x] Verify the unconfigured local form is disabled and does not submit.
- [ ] Verify a configured test API happy path.
- [ ] Verify validation-error, API-failure, and retry states.
- [ ] Verify deployed CORS behavior from the approved domain.
- [ ] Verify SES delivery with the visitor email as `Reply-To`.
- [ ] Verify no message content is stored or logged by the application.
- [x] Verify mailing-list signup remains hidden.
- [x] Improve responsive layout for current public pages.

## 5. Deliverables

- Contacts Leave a message form shell with environment-based enablement
- Contact API payload contract
- AWS backend implementation for protected message delivery
- SES delivery to a private recipient address stored outside the repository
- Updated Contacts privacy copy
- Updated setup documentation and milestone tracking

## 6. Acceptance criteria

Milestone 8 is complete when:

- The Contacts page has a working Leave a message form for name, email, and message.
- The form remains disabled when required public configuration is missing.
- The API accepts requests only from the approved deployed site origin.
- Valid messages are delivered through SES to the private artist inbox.
- Visitor email is used as `Reply-To`, not as the SES sender.
- Message bodies, names, and email addresses are not logged or stored by the application.
- Visitors see accessible pending, success, validation-error, and temporary-failure states.
- Mailing-list signup remains hidden and deferred.
- Setup steps and required environment variables are documented.

## 7. Risks and mitigations

| Risk                                      | Mitigation                                                                              |
| ----------------------------------------- | --------------------------------------------------------------------------------------- |
| Private email is accidentally committed   | Store recipient in Parameter Store or Secrets Manager, never in Git                     |
| SES sender cannot be verified immediately | Use a verified single email first, then move to a domain sender later                   |
| API accepts unwanted origins              | Lock CORS and origin checks to the final deployed site origin                           |
| Form appears usable before backend exists | Keep submit disabled until API URL is configured                                        |
| Spam increases without CAPTCHA            | Use honeypot handling, throttling, strict validation, and add Turnstile later if needed |
| Message content appears in logs           | Log only safe metadata and generic outcomes                                             |

## 8. Deferred decisions

- Future domain sender identity after the initial verified single-email sender launch
- Turnstile/CAPTCHA provider and timing if basic abuse controls are not enough

## Verification record

**Date:** July 19, 2026  
**Result:** In progress

### Automated checks

- `npm run format:check` — passed.
- `npm run check` — passed with 0 errors, 0 warnings, and 0 hints.
- `npm run build` — passed and generated 8 pages.
- `npm run format:check` — passed after responsive layout enhancement.
- `npm run check` — passed after responsive layout enhancement with 0 errors, 0 warnings, and 0 hints.
- `npm run build` — passed after responsive layout enhancement and generated 8 pages.
- Generated `dist/_astro/*.css` was inspected and confirmed the old `html` 1024px minimum width is absent and 900px, 640px, and 420px responsive breakpoints are present.
- `npm run build` — passed after rewriting the Contacts `Contact messages` notice copy and generated 8 pages.
- `npm run format:check` — passed after rewriting the Contacts `Contact messages` notice copy.
- `npm run format:check` — passed after SES sender verification tracking updates.
- `npm run format:check` — passed after documenting paused CDK deployment status.
- `npm run contact:synth` — passed and synthesized API Gateway, Lambda, DynamoDB throttling, SSM parameter access, SES send permission, allowed `https://yuliabalenko.com` / `https://www.yuliabalenko.com` origins, and `ContactApiUrl` output. The command emitted npm's experimental CommonJS/ESM warning and CDK's feature-flag notice, but exited successfully.
- `npx cdk deploy --app "node infra/contact-form/cdk-app.mjs" --require-approval never` — stopped before deployment with `Unable to resolve AWS account to use`; no AWS resources were created or changed from the local environment.
- `npm audit --audit-level=high` — passed with no high or critical advisories; npm reported 4 moderate advisories in the Astro language-server YAML dependency chain.
- `rg -n "contact_message_failed|console\\.|ALLOWED_ORIGINS|ReplyToAddresses|GetParameterCommand|UpdateItemCommand|SendEmailCommand|message\\.body|contactMessage\\.message" infra/contact-form/lambda/contact-message.ts infra/contact-form/cdk-app.mjs` — confirmed allowed origins are configured in CDK, private settings are read from SSM, throttling uses DynamoDB, SES uses `ReplyToAddresses`, message body is only passed to SES email content, and logging is limited to `contact_message_failed` with safe error metadata.
- `rg -n "turnstileToken|challenges.cloudflare|PUBLIC_TURNSTILE|Turnstile site key|Turnstile token" src docs/deployment/contact-form.md docs/milestones/milestone-8.md dist/contacts/index.html .env.example` — no active current-scope references found.
- `rg -n "required|Notice|Draft notice|DRAFT NOTICE|basic abuse controls|CAPTCHA and Turnstile" dist/contacts/index.html` — confirmed required field markers, current notice labels/copy, and no active `Draft notice` label in built Contacts output.
- `rg -n "Mailing list|Bot protection|Draft notice|DRAFT NOTICE" dist/contacts/index.html` — no results, confirming removed Contacts page sections/labels are absent from the built output.
- `rg -n "<h2 id=\"notice-title\">Notice|Copyright Notice|Privacy Notice" dist/contacts/index.html` — confirmed the single Notice section contains both Copyright Notice and Privacy Notice in the built output.
- `rg -n "Contact form|Social media|<p class=\"eyebrow\">Notice|<h3|Copyright notice|Privacy notice|Contact messages|Social media links|Cookies and analytics" dist/contacts/index.html` — confirmed Contact form and Social media eyebrows remain, the Notice eyebrow and notice `h3` elements are absent, and Notice subsection headings render as sentence-case `h2` text.
- `rg -n "<p class=\"eyebrow\" id=\"notice-eyebrow\">Notice|<h2 id=\"notice-title\">Notice|Copyright notice|Privacy notice|<h3" dist/contacts/index.html` — confirmed the Notice eyebrow is restored, the large Notice header is absent, Notice subsection headings remain sentence-case `h2` text, and no `h3` notice headings are present.
- `rg -n "notice-section p:not\\(.eyebrow\\)|notice-section p \\{|<p class=\"eyebrow\" id=\"notice-eyebrow\">Notice" src/styles/global.css src/pages/contacts.astro docs/milestones/milestone-8.md` — confirmed Notice body paragraph styling excludes `.eyebrow` and the Notice eyebrow remains in the Contacts markup.
- `rg -n "notice-section p:not\\(.eyebrow\\)|notice-section p \\{" src/styles/global.css` — confirmed there is no broad `.notice-section p` rule overriding the shared eyebrow font treatment.

### Manual checks

- Static output check: `dist/contacts/index.html` contains `Send message — setup in progress`, the setup-in-progress status copy, and a disabled submit button when contact environment variables are not configured.
- Source CSS check: current public pages now have responsive rules for the header/navigation, Home visuals, Contacts grid, Resume panel, Portfolio thumbnails/metadata/carousel, footer, shared panels, and disabled Exhibitions fallback.
- Static output check: `dist/contacts/index.html` contains the updated Privacy Notice wording, "basic abuse controls", and no Turnstile widget markup.
- Static output check: `dist/contacts/index.html` contains visible `required` text for Name, Email, and Message.
- Static output check: Contacts Copyright Notice and Privacy Notice use `Notice` eyebrow labels instead of `Draft notice`.
- Static output check: Contacts has no visible Mailing list or Bot protection section in the built output.
- Static output check: Contact form, Social media, and Notice eyebrows remain visible in the Contacts markup.
- Source copy check: Contacts `Contact messages` notice was rewritten in plain English while preserving the privacy meaning.
- Source CSS check: Notice body copy styles no longer apply to `.eyebrow`, allowing the restored Notice eyebrow to use the shared eyebrow font, color, spacing, and uppercase treatment.
- Static output check: Notice eyebrow is restored and the large Notice header remains removed.
- Source check: `infra/contact-form/` defines the contact backend without private email addresses or secret values committed to the repository.
- Source check: the canonical origin is `https://yuliabalenko.com`; `https://www.yuliabalenko.com` remains allowed for launch.
- Owner-reported AWS check: `aws ssm get-parameters` for `/yulia-balenko/contact/recipient-email`, `/yulia-balenko/contact/ses-sender-email`, and `/yulia-balenko/contact/abuse-salt` returned no invalid parameters.
- Owner-reported AWS check: SES sender identity verification status was confirmed through CloudShell.

### Known limitations

- Form does not send until the contact API stack is deployed and Amplify is configured with `PUBLIC_CONTACT_API_URL`.
- Local CDK deployment is paused because the local environment cannot resolve an AWS account; deploy later from AWS CloudShell or another AWS-configured CDK environment.

### Deferred work

- Mailing-list signup remains hidden and deferred.
- Turnstile/CAPTCHA bot protection is deferred for now.
