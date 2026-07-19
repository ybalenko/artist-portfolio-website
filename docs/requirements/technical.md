# Yulia Balenko Artist Portfolio — Technical Requirements

**Status:** Draft v0.5  
**Updated:** June 23, 2026  
**Related documents:** [Business Requirements](./business.md), [High-Level Design](../architecture/high-level-design.md)  
**Selected stack:** Astro, TypeScript, AWS

## 1. Purpose and constraints

Implement a code-managed static artist website. Only contact delivery and mailing-list signup require dynamic serverless APIs.

- Use Astro and TypeScript.
- Host static output on AWS Amplify Hosting.
- Store public content in Git, not a content database.
- Deploy public changes through the code workflow.
- Use minimal client-side JavaScript.
- Target $0–$5 USD per month, excluding the domain.
- Do not add visitor analytics or advertising.

## 2. Source-managed content

The repository contains typed, build-validated content for:

- Artist statement
- Home carousel images
- Press entries
- Current, Past, and Upcoming exhibitions
- Ordered Portfolio images and accessibility text
- Public contact and social links
- Privacy Notice
- Résumé PDF
- Navigation and shared text

Press and Exhibition entries may use a `published` flag. Invalid content must fail the build, and Git provides history and rollback.

## 3. Routes and navigation

- `/` — Home with artist statement
- `/press`
- `/exhibitions` — single Exhibitions page with Current, Past, and Upcoming sections
- `/exhibitions/current` — redirects to `/exhibitions/#current`
- `/exhibitions/past` — redirects to `/exhibitions/#past`
- `/exhibitions/upcoming` — redirects to `/exhibitions/#upcoming`
- `/portfolio`
- `/resume` — redirect to résumé PDF
- `/contacts` — public links, Leave a message, Privacy Notice, mailing signup
- mailing confirmation/unsubscribe result and not-found pages

There must be no About or standalone Privacy route.

Primary navigation is Home, Press, Exhibitions, Portfolio, Resume, and Contacts. Exhibitions exposes Current, Past, and Upcoming as page-level section controls, not as a header submenu.

- Links work without a client-side router.
- Current page and exhibition subsection are identified visually and accessibly.
- Section controls support pointer and keyboard interaction.
- Resume is labeled as a PDF destination.

## 4. Page requirements

### 4.1 Home

- Render the complete artist statement as static HTML.
- Render any Home carousel images from a manually managed Home carousel data source, separate from Portfolio artwork data.
- Store Home carousel image files outside GitHub in the same AWS-hosted image location used for Portfolio images, under the `portfolio/home-carousel/` prefix, and reference them with public `https` URLs from `src/data/homeCarousel.ts`.
- Keep the Home carousel compact so it supports the artist statement rather than becoming a second Portfolio gallery.
- Do not duplicate the Portfolio gallery or Portfolio carousel behavior.
- Provide unique title, description, canonical URL, and social metadata.

### 4.2 Press

- Render published entries in configured order.
- Support title, text, source, date, and optional `https` URL.
- Require understandable text or a URL.
- Identify external links and apply safe attributes.

### 4.3 Exhibitions

- Render Current, Past, and Upcoming from validated content.
- Render the three exhibition statuses as sections on `/exhibitions`.
- Support title, venue, location, dates, description, optional image, and optional `https` URL.
- Validate that end date is not before start date.
- Show an explicit empty state when a category has no entries.
- Exhibition status is editorially assigned; it is not inferred at runtime.

### 4.4 Portfolio

- Render only an ordered image gallery and carousel interface.
- Do not render filters, prices, comments, purchase controls, or video.
- Organize images into code-managed `landscapes`, `stilllife`, and `other` sections.
- Each image record includes `name`, `medium`, `size`, `year`, and `availability` metadata.
- Sort published images newest first within each section by `year`; preserve manifest order for images from the same year.
- Display the selected image metadata on the Portfolio page and in the carousel.
- Follow the portfolio interaction pattern of the [David Hockney Drawings — 2010s page](https://www.hockney.com/index.php/works/drawings/2010s): a prominent selected image with a supporting thumbnail collection and minimal surrounding interface.
- On initial load, display the first configured image prominently and expose the complete ordered thumbnail gallery.
- Selecting a thumbnail updates the prominent image and carousel state without leaving the page.
- Carousel URL state must identify the selected image and support refresh/share.
- Provide visible previous, next, and close controls.
- Move focus into the carousel when opened and restore it to the originating thumbnail when closed.
- Make background content inert while open.
- Support keyboard control and optional touch swipe without requiring gestures.
- Provide meaningful alternative text for every image.
- Generate responsive variants with explicit dimensions to prevent layout shift.
- Lazy-load off-screen thumbnails and preload only the adjacent carousel images.

### 4.5 Resume

- `/resume` redirects to a versioned or cache-safe PDF in the static deployment.
- Serve it as `application/pdf` over HTTPS.
- Keep it at or below 10 MB and label links as PDF.
- The PDF itself should be accessible.

### 4.6 Contacts

- Render configured public contact and social links.
- Render the Privacy Notice with a linkable section anchor.
- Provide Leave a message fields for name, email, and message.
- Proposed limits are 100 name and 5,000 message characters.
- Provide accessible pending, success, validation-error, and temporary-failure states.
- Provide mailing-list signup with email and optional name.

## 5. Dynamic API

Use API Gateway HTTP API, TypeScript Lambda, DynamoDB, and SES.

Operations:

- Submit a contact message.
- Start, confirm, and unsubscribe a mailing-list subscription.
- Export confirmed subscribers through a protected operational script.

All write operations must validate server-side, enforce payload/rate limits, verify Turnstile, avoid leaking implementation details, and handle retries idempotently.

## 6. Contact-message delivery

1. Validate name, email, message, deployed origin, and Turnstile token.
2. Apply abuse throttling and a hidden honeypot where appropriate.
3. Reject header injection, URLs/spam patterns, and unsafe control characters.
4. Send through SES from a verified site address to a configured private artist address.
5. Set the validated visitor address as `Reply-To`; never use it as the SES sender.
6. Return success only after SES accepts the message.

Messages must not be stored in DynamoDB. Logs must not contain message bodies, names, or email addresses. Delivery metadata uses short retention, while the recipient mailbox copy follows the Privacy Notice.

## 7. Mailing list

- Email is required; name is optional.
- Turnstile and rate limits protect signup and resend behavior.
- Use double opt-in with hashed, single-use, expiring tokens.
- Use a keyed digest for email lookup.
- Do not reveal whether an address is already subscribed.
- Prevent email scanners from causing unintended confirmation or unsubscribe.
- Record consent time and consent-text version.
- Re-subscription requires new confirmation.
- SES uses SPF, DKIM, and DMARC.
- Bounce and complaint events suppress further sends.
- Define retention for pending and unsubscribed records before launch.

## 8. Security and privacy

- Validate all dynamic input server-side.
- Restrict API CORS to the deployed site origin.
- Use least-privilege Lambda and operational roles.
- Store secrets and the private recipient address in Parameter Store or Secrets Manager.
- Apply CSP, HSTS, MIME-sniffing, referrer, and framing protections.
- Do not log personal messages, emails, tokens, or unnecessary IP addresses.
- Protected scripts use short-lived AWS credentials.
- The Contacts Privacy Notice identifies AWS, SES, Turnstile, mailbox delivery, retention, and deletion/contact procedures.
- Subscriber exports are encrypted and restricted.

## 9. Build and deployment

- GitHub is the canonical source repository.
- Pin Node, Astro, and package versions and commit the lockfile.
- Pull requests run formatting, type checks, content validation, tests, security checks, and `astro build`.
- Merging to production triggers Amplify deployment.
- Use Amplify's integration or GitHub OIDC rather than stored AWS keys.
- Fail builds on invalid navigation, dates, URLs, image references, alt text, or missing résumé PDF.
- Keep only web-appropriate images in Git; private high-resolution originals remain outside deployment.
- Generate responsive variants during build.
- A failed build leaves the previous deployment online.

## 10. Quality, operations, and cost

- Core journeys must meet WCAG 2.2 AA.
- Public HTML and assets are CDN-delivered.
- Use responsive images, lazy loading below the fold, and minimal JavaScript.
- Representative mobile pages target LCP ≤ 2.5 seconds and CLS ≤ 0.1.
- Generate sitemap, robots rules, canonical URLs, and Open Graph metadata.
- Test current Safari and Chrome on mobile and Safari, Chrome, Firefox, and Edge on desktop.
- Bound Lambda retries and use dead-letter handling where asynchronous work is used.
- Back up DynamoDB or enable point-in-time recovery.
- Use seven-day operational log retention unless justified otherwise.
- Configure API/email quotas and $1/$5 AWS budget alerts.
- Do not use RDS, NAT Gateway, AWS WAF, Cognito, Bedrock, or fixed-cost compute.

## 11. Testing and acceptance

Testing must cover:

- Home default route and artist statement
- Exact primary navigation and Exhibitions section controls
- Press and Exhibition content, empty states, dates, and external links
- Portfolio containing only images/carousel
- Carousel URL state, focus, keyboard, controls, touch, and gallery restoration
- Resume redirect, PDF type, size, caching, and accessibility
- Contacts Privacy Notice, validation, Turnstile, spam controls, SES delivery, and failure states
- No personal message data in DynamoDB or logs
- Mailing double opt-in, unsubscribe, bounce, complaint, and abuse controls
- Build validation, rollback, backup, and cost controls

P0 is technically ready when business acceptance criteria pass, the site deploys from a clean checkout, invalid content cannot deploy, private form data is not exposed, and recovery procedures have been exercised once.

## 12. Decisions required before implementation

1. Same-tab or new-tab Resume behavior.
2. Separate Exhibition pages versus one page with sections.
3. Contact recipient, retention wording, and message limits.
4. Visible carousel titles versus accessibility text only.
5. Image dimensions and repository-size budget.
6. Content schemas, ordering, domain, AWS ownership, budget, and launch date.
