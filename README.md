# Yulia Balenko — Artist Portfolio

An artwork-first portfolio website for artist **Yulia Balenko**. The site is designed to showcase approximately 100 oil and watercolor works, share the artist's background and résumé, and provide thoughtful ways for visitors to engage.

> **Project status:** Planning and architecture. The P0 requirements and high-level system design are complete in draft form; implementation has not started yet.

## Vision

The portfolio takes inspiration from the restrained, image-led presentation of the [David Hockney website](https://www.hockney.com/home), while establishing its own visual identity. The experience will be fast, accessible, easy to browse on any screen, and simple for the artist to maintain without editing code.

## Planned features

- Image-focused home page and gallery
- Gallery filtering by medium and year
- Individual pages with responsive image galleries and artwork details
- About page, artist statement, and configurable résumé
- Secure administration for artwork, images, content, and display order
- Draft, published, featured, and unpublished artwork states
- Moderated visitor comments with one level of replies
- Visibly labeled artist replies
- Double-opt-in mailing-list signup and unsubscribe
- Accessible, responsive, and search-friendly public pages
- Private originals and optimized web image delivery

The initial release will not include sales, payments, visitor accounts, favorites, analytics, video, or newsletter campaign tools.

## Planned technology

| Area | Technology |
| --- | --- |
| Web application | Astro and TypeScript |
| Public rendering | Static generation and CDN delivery |
| Hosting and deployment | AWS Amplify Hosting |
| API | Amazon API Gateway and AWS Lambda |
| Data | Amazon DynamoDB |
| Images | Amazon S3, Lambda processing, and CloudFront |
| Administrator authentication | Amazon Cognito |
| Email | Amazon SES |
| Comment moderation | Amazon Bedrock Guardrails and local rules |
| Bot protection | Cloudflare Turnstile |
| Infrastructure as code | AWS CDK with TypeScript |

The architecture is static-first: public portfolio content is generated as complete HTML, while comments, subscriptions, uploads, and administration use serverless APIs. The target operating cost is **$0–$5 USD per month**, excluding the domain.

## Documentation

- [Business requirements](./BUSINESS_REQUIREMENTS.md) — goals, scope, visitor experience, and acceptance criteria
- [High-level design](./HIGH_LEVEL_DESIGN.md) — architecture, components, data flows, and key tradeoffs
- [Technical requirements](./TECHNICAL_REQUIREMENTS.md) — implementation, security, accessibility, testing, and deployment requirements

## Roadmap

1. Confirm the remaining content, visual-design, domain, and AWS account decisions.
2. Scaffold the Astro application and AWS CDK infrastructure.
3. Build the public portfolio and responsive image pipeline.
4. Add the protected content-management experience.
5. Implement moderated comments and mailing-list enrollment.
6. Complete accessibility, security, performance, backup, and cost checks.
7. Add the initial artwork collection and launch.

## Guiding principles

- **Artwork comes first.** Interface and typography should support the work rather than compete with it.
- **Accessible by default.** Core visitor and administrator journeys target WCAG 2.2 AA.
- **Privacy-conscious.** No advertising, behavioral tracking, or analytics cookies are planned.
- **Secure and maintainable.** Originals remain private, administrator actions require authentication, and infrastructure is reproducible.
- **Small on purpose.** The system is designed for one artist and avoids unnecessary platform complexity.

## License

Source-code licensing and artwork usage terms have not yet been selected. Unless explicitly stated otherwise, the artwork and written content are not licensed for reuse.
