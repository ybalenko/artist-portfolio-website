# Yulia Balenko Artist Portfolio — Technical Requirements

**Status:** Draft v0.1  
**Date:** June 22, 2026  
**Related documents:** [Business Requirements](./BUSINESS_REQUIREMENTS.md), [High-Level Design](./HIGH_LEVEL_DESIGN.md)  
**Selected stack:** Astro, TypeScript, AWS

## 1. Purpose

Define a simple, low-cost technical solution for the P0 artist portfolio. The solution must support approximately 100 artworks, cloud image uploads, one administrator, moderated comments, and double-opt-in mailing-list collection.

The target operating cost is **$0–$5 USD per month**, excluding domain registration. AWS free allowances and introductory credits may change, so cost controls are part of the design rather than an assumption.

## 2. Requirement language

- **Must:** required for P0.
- **Should:** expected unless implementation evidence justifies a simpler alternative.
- **May:** optional improvement.

## 3. Technology constraints

- The implementation must use Astro, TypeScript, and AWS.
- Public pages must be statically generated unless a later approved design decision changes the rendering model.
- Client-side JavaScript must be limited to features that require interaction.
- Infrastructure must be defined in TypeScript and be reproducible.
- Selected AWS services, component responsibilities, data flow, and deployment topology are defined in the [High-Level Design](./HIGH_LEVEL_DESIGN.md).

## 4. Frontend requirements

### 4.1 Public pages

The Astro build must generate:

- `/` — home page
- `/works` — gallery with medium and year filters
- `/works/[slug]` — one page for each published artwork
- `/about` — biography and artist statement
- `/resume` — configurable résumé sections
- `/privacy` — short privacy notice
- `/unsubscribe` and confirmation-result pages
- `/404` — not-found page

Public pages must contain meaningful HTML without requiring JavaScript. JavaScript may enhance filtering, image viewing, comments, and forms.

### 4.2 Gallery

- Medium and year filters must be usable together.
- Initial controlled media are `Oil` and `Watercolor`.
- Filter state should be represented in URL query parameters so it can be shared and restored.
- Filtering may run in the browser because the initial catalog is approximately 100 items.
- The gallery must provide a useful empty state when no artwork matches.

### 4.3 Artwork page

- Display the primary image first and provide accessible navigation through additional images.
- Use responsive image sources and reserve image dimensions to prevent layout shift.
- Include title, medium, year, dimensions, description, and series only when values exist.
- Include a comments component that reads from the API after the main page loads.
- Include unique title, description, canonical URL, and social-preview metadata.

### 4.4 Administration interface

- `/admin/**` must require a valid Cognito session.
- The administration interface may be a client-rendered Astro island because it is not public or search-indexed.
- It must provide artwork, profile, résumé, public links, comments, and subscriber management.
- Destructive actions must request confirmation.
- Publish operations must display `queued`, `building`, `succeeded`, or `failed` status.
- Administrative forms must preserve unsaved input when a recoverable API error occurs.

## 5. Backend requirements

### 5.1 API design

Use an API Gateway HTTP API. Lambda handlers must be small TypeScript modules grouped by domain rather than one unrestricted handler.

Public routes:

- `GET /artworks/{artworkId}/comments`
- `POST /artworks/{artworkId}/comments`
- `POST /subscriptions`
- `GET /subscriptions/confirm`
- `POST /subscriptions/unsubscribe`

Administrator routes:

- CRUD routes for artworks and artwork images
- CRUD routes for profile, résumé sections, and public links
- Hide, restore, and delete routes for published comments
- Read/export route for confirmed subscribers
- Presigned image-upload route
- Content-build trigger and build-status routes

### 5.2 API behavior

- Requests and responses must use JSON except direct S3 uploads and CSV subscriber export.
- All input must be validated on the server with shared TypeScript schemas.
- Public error messages must not expose stack traces, AWS identifiers, moderation reasons, or configuration.
- Administrator routes must use an API Gateway Cognito JWT authorizer.
- APIs must return stable machine-readable error codes alongside human-readable messages.
- API Gateway throttling and Lambda concurrency limits must constrain accidental or abusive cost growth.

## 6. Content and data requirements

### 6.1 Source of truth

DynamoDB is the source of truth for artwork metadata, profile content, résumé content, comments, subscriber state, and configuration. S3 is the source of truth for original and processed images.

The Astro build must read only published public content from DynamoDB. Draft content must never appear in generated output, the sitemap, or social metadata.

### 6.2 DynamoDB design

Use one DynamoDB table for P0 to simplify billing, backup, and infrastructure. The table must support these entity types:

- Artwork
- Artwork image
- Comment
- Artist profile and public links
- Résumé section and entry
- Subscriber
- Site configuration
- Content-build status

The access patterns must support:

- All published artworks for a build
- Artwork by ID or unique slug
- Artwork images in display order
- Approved comments for one artwork, newest first, with cursor pagination
- All résumé sections and entries in display order
- Subscriber by normalized-email hash
- Confirmed subscriber export

Secondary indexes must be added only for an identified access pattern. Table scans are acceptable during the static build for the initial catalog, but public API requests must use key-based queries.

### 6.3 Data rules

- IDs must be non-sequential UUIDs.
- Public artwork slugs must be unique and stable after publication unless Yulia explicitly changes them.
- Email addresses must be normalized before comparison.
- Subscriber keys must use a one-way email hash rather than raw email text.
- Confirmation and unsubscribe tokens must be random, single-purpose, time-bounded, and stored only as hashes.
- Timestamps must be stored in UTC ISO 8601 format.
- Rejected comments must not be written to DynamoDB or application logs.

## 7. Image pipeline

### 7.1 Upload

- The administrator requests a short-lived presigned S3 upload URL.
- Uploads go directly from the browser to a private S3 prefix; Lambda must not proxy image bytes.
- P0 accepted source formats should be JPEG, PNG, and WebP.
- The proposed default maximum is 30 MB per source image and 10 images per artwork; validate these defaults using representative files before implementation is finalized.
- The upload UI must show progress and actionable failure messages.

### 7.2 Processing

An S3 object-created event must invoke an image-processing Lambda that:

- Verifies the actual file type and rejects malformed files.
- Corrects EXIF orientation.
- Removes location and unnecessary camera metadata.
- Converts output to the sRGB color space while preserving suitable visual quality.
- Creates responsive variants, initially targeting widths near 480, 960, and 1600 pixels.
- Produces WebP plus a broadly supported fallback format.
- Stores variants under non-guessable or content-versioned keys.
- Records processing state and dimensions in DynamoDB.

An artwork cannot be published until its primary image has processed successfully.

### 7.3 Delivery and protection

- Original uploads must not be publicly readable.
- CloudFront must use Origin Access Control to read processed objects from a private S3 bucket.
- Public responses should use long-lived cache headers and versioned object keys.
- The UI must not provide a download button.
- The solution may discourage drag and context-menu downloads, but must not claim to prevent copying or screenshots.

## 8. Comments and moderation

### 8.1 Submission flow

1. Validate display name and comment length.
2. Verify the Turnstile token server-side.
3. Apply API throttling and short-term abuse limits.
4. Reject URLs and obvious spam using deterministic rules.
5. Send remaining text to Amazon Bedrock Guardrails using `ApplyGuardrail`.
6. Apply content filters and denied-topic rules for harassment, hate, insults, sexual content, violence, misconduct, spam, and clearly off-topic content.
7. Store only approved comments.

### 8.2 Behavior

- Visitors must receive the same generic `202 Accepted` result whether moderation approves or rejects a submission.
- If Turnstile or moderation cannot be reached, the system must fail closed: do not publish or store the comment.
- Display name and text must be escaped when rendered.
- Proposed limits are 50 characters for display names and 1,000 characters for comments.
- Only one reply level is permitted.
- Root comments and replies must be returned newest first.
- Use cursor pagination, initially 20 root comments per request.
- Artist replies must require authentication and include an `isArtist` marker set only by the server.
- The artist may hide, restore, or permanently delete approved comments.
- Deleting a root comment must also remove its replies after administrator confirmation.
- No comment notification is sent.

Bedrock moderation is usage-priced. The implementation must log only aggregate counts and latency, not rejected text.

## 9. Mailing-list flow

### 9.1 Signup

- Accept email and optional name.
- Normalize the email and create or update a `pending` subscriber record.
- Generate a single-use confirmation token with a proposed 24-hour expiry.
- Send a confirmation URL through SES.
- Do not expose whether an address is already subscribed.

### 9.2 Confirmation and unsubscribe

- Confirmation changes subscriber state to `confirmed` and records consent time and consent-text version.
- Unsubscribe changes state to `unsubscribed`; it must not require sign-in.
- Re-subscription must require a new double-opt-in confirmation.
- Confirmation and unsubscribe pages must show generic success or expired-link states without exposing subscriber data.
- P0 sends only operational confirmation and unsubscribe-related email, not newsletters.

### 9.3 SES

- Verify the sending domain and configure SPF, DKIM, and DMARC.
- Request SES production access before launch.
- Email templates must include the artist name, reason for the email, and privacy contact.
- Bounce and complaint handling should suppress further operational sends to affected addresses.

## 10. Authentication and security

- Cognito public self-registration must be disabled.
- Only Yulia's administrator account may be provisioned for P0.
- Administrator authentication should require a strong password and TOTP multi-factor authentication.
- Access tokens must be short-lived and refreshed using Cognito-supported flows.
- S3 upload URLs must expire quickly and restrict object key, file type, and size.
- AWS IAM roles must follow least privilege; build, API, and image-processing roles must be separate.
- Secrets must be held in AWS Systems Manager Parameter Store or Secrets Manager, not source code or browser bundles.
- Public responses must include appropriate Content Security Policy, HSTS, MIME-sniffing, referrer, and framing headers.
- Logs must not contain email addresses, comment bodies, tokens, original filenames, or authentication credentials.
- Dependencies must be checked for known vulnerabilities during continuous integration.

## 11. Privacy

- Do not add visitor analytics, advertising scripts, or behavioral tracking.
- Store only the personal information required for comments and mailing signup.
- Commenters provide a public display name but no email address.
- The privacy page must identify the use of AWS, SES, Bedrock moderation, and Turnstile where applicable.
- Subscriber export must require administrator authentication and must not be cached.
- A subscriber-deletion procedure must exist even if the P0 UI handles only unsubscribe.

## 12. Performance, accessibility, and SEO

### 12.1 Performance

- Public content must be statically generated and CDN-delivered.
- Use responsive images, lazy loading below the fold, explicit image dimensions, and minimal client JavaScript.
- Lab testing on representative mobile pages should target LCP at or below 2.5 seconds, CLS at or below 0.1, and INP at or below 200 ms.
- Comments must load after the primary artwork content and must not block image display.

### 12.2 Accessibility

- Core public and administrator journeys should meet WCAG 2.2 AA.
- All functions must be keyboard operable with visible focus.
- Images require editable alternative text before publication.
- Forms need programmatic labels, clear validation, and status announcements.
- The image viewer and comment threads must use semantic, screen-reader-friendly structures.
- Turnstile integration must retain an accessible fallback and understandable failure state.

### 12.3 SEO

- Generate `sitemap.xml` and `robots.txt` during the Astro build.
- Generate unique titles, descriptions, canonical URLs, and Open Graph metadata.
- Exclude drafts, administrator routes, APIs, and confirmation URLs from indexing.
- Artwork pages should include appropriate structured data when supported by validated schema vocabulary.

## 13. Reliability and backup

- Enable S3 versioning for original artwork and processed assets.
- Retain noncurrent image versions for a limited recovery window, proposed as 30 days.
- Enable DynamoDB point-in-time recovery if its measured cost remains inside the monthly budget; otherwise schedule encrypted exports to a backup S3 prefix.
- Infrastructure must be reproducible from AWS CDK.
- Document restoration of DynamoDB content, S3 images, Cognito administrator access, and Amplify deployment.
- A failed content build must leave the last successful public deployment online.
- CloudWatch log retention should default to 7 days to control cost.

## 14. Deployment and environments

### 14.1 Environments

- `local`: local Astro development with mocked or sandbox AWS dependencies.
- `production`: the public AWS environment.
- A permanent paid staging environment is not required for P0.
- Temporary preview deployments may be created for major visual changes and removed afterward.

### 14.2 Continuous delivery

- GitHub is the canonical source repository.
- Pull requests must run formatting, type checking, unit tests, an Astro production build, and dependency checks.
- Merges to the production branch trigger an Amplify build and deployment.
- Publishing content triggers an Amplify incoming webhook or equivalent authenticated build action without requiring a code commit.
- The Amplify build role may read published content but must not write application data.
- Infrastructure changes must be deployed through CDK and reviewed separately from content changes.

## 15. Cost controls

- Configure an AWS Budget with alerts at proposed monthly thresholds of $1 and $5.
- Prefer provisioned DynamoDB capacity within the applicable free allowance for the predictable P0 workload; revisit after measuring real usage.
- Set reserved concurrency on public Lambda functions.
- Use API Gateway throttling on public routes.
- Keep log retention short and avoid logging request bodies.
- Do not enable AWS WAF in P0; free Turnstile plus API throttling provides the required bot control at lower fixed cost.
- Limit automatic image variants to the documented set.
- The administrator must not be able to enable unbudgeted AWS services from the application UI.
- Review Amplify build minutes, S3 storage, CloudFront transfer, Lambda, API Gateway, DynamoDB, Bedrock, and SES usage monthly during the first three months.

## 16. Testing requirements

- Unit tests for validation, data mapping, moderation decisions, tokens, and permission checks.
- Integration tests for DynamoDB access patterns, S3 presigned uploads, SES requests, and build triggers.
- End-to-end tests for gallery filtering, artwork display, administrator publishing, image upload, comments, double opt-in, and unsubscribe.
- Accessibility checks in automated tests plus manual keyboard and screen-reader smoke tests.
- Test image processing with portrait, landscape, large, rotated, color-profiled, corrupt, and unsupported files.
- Test moderation with allowed art discussion and every configured rejection category.
- Test that rejected comments and sensitive values never enter application logs.
- Test mobile layouts in current Safari and Chrome and desktop layouts in current Safari, Chrome, Firefox, and Edge.

## 17. Technical acceptance criteria

The P0 implementation is technically ready when:

- A clean checkout can be built and deployed using documented commands.
- CDK can create the required AWS resources without manual permission edits, apart from account/domain verification steps.
- Yulia can authenticate, upload images, create an artwork, and publish it.
- A successful content build produces an indexable artwork page and updates the sitemap.
- Original images remain private while processed variants load through CloudFront.
- Gallery filtering works by medium and year on mobile and desktop.
- Approved comments appear without a site rebuild; rejected comments are neither displayed nor stored.
- Artist replies are authenticated and visibly labeled.
- Double opt-in, expired confirmation, unsubscribe, and re-subscribe flows work.
- Draft content and administrator APIs cannot be accessed publicly.
- Backup and restoration steps have been exercised once.
- Performance, accessibility, security, and cost-control checks pass.

## 18. Items to confirm before implementation

1. Typical and maximum source-image size and format.
2. Final required artwork fields and treatment of unknown or approximate years.
3. Whether comments are enabled globally or per artwork.
4. Final comment length, pagination, and image-count limits.
5. Home-page composition and visual design.
6. Public email and social links.
7. Domain name and AWS account ownership.
8. Acceptance of Turnstile as the one non-AWS runtime service.
9. Approval of the proposed $1 and $5 AWS budget alerts.

## 19. References

- [Astro deployment on AWS](https://docs.astro.build/en/guides/deploy/aws/)
- [AWS Amplify support for Astro](https://docs.aws.amazon.com/amplify/latest/userguide/astro-support.html)
- [Amplify incoming build webhooks](https://docs.aws.amazon.com/amplify/latest/userguide/create-incoming-webhook.html)
- [Amazon Bedrock Guardrails ApplyGuardrail](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use-independent-api.html)
- [Secure static sites with S3 and CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/getting-started-secure-static-website-cloudformation-template.html)
