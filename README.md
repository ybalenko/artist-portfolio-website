# Yulia Balenko — Artist Portfolio

An artwork-first website for artist **Yulia Balenko**, presenting approximately 100 oil and watercolor works, press coverage, current/past/upcoming exhibitions, a résumé PDF, and visitor contact options.

> **Project status:** Planning and architecture. The P0 requirements and high-level design are drafts; implementation has not started.

## Vision

The portfolio takes inspiration from the restrained, image-led presentation of the [David Hockney website](https://www.hockney.com/home). The Portfolio interaction specifically references its [Drawings — 2010s page](https://www.hockney.com/index.php/works/drawings/2010s): one prominent image, an ordered thumbnail gallery, and minimal interface. The new site will establish its own visual identity.

## Planned features

- Home landing page with artist statement
- Images-only Portfolio with accessible carousel
- Press page
- Exhibitions submenu with Current, Past, and Upcoming destinations
- Resume navigation that opens the current résumé PDF
- Contacts page with Privacy Notice and protected Leave a message form
- Navigation for Press, Exhibitions, Portfolio, Resume, and Contacts
- Code-managed artwork, Press, Exhibitions, résumé, Contacts, and navigation content
- Protected Leave a message form
- Double-opt-in mailing-list signup and unsubscribe
- Accessible, responsive, and search-friendly public pages
- Build-time optimized web images

The initial release will not include sales, payments, visitor accounts, favorites, analytics, video, or newsletter campaign tools.

## Planned technology

| Area | Technology |
| --- | --- |
| Web application | Astro and TypeScript |
| Public rendering | Static generation and CDN delivery |
| Hosting and deployment | AWS Amplify Hosting |
| API | Amazon API Gateway and AWS Lambda |
| Dynamic data | Amazon DynamoDB for subscriptions |
| Images | Astro build pipeline and Amplify CDN |
| Email | Amazon SES |
| Bot protection | Cloudflare Turnstile |
| Infrastructure as code | AWS CDK with TypeScript |

The architecture is code-managed and static-first: Home, Press, Exhibitions, Portfolio, Resume, Contacts, navigation, and images deploy from the repository. Contact delivery and subscriptions use serverless APIs. The target operating cost is **$0–$5 USD per month**, excluding the domain.

## Documentation

- [Business requirements](./BUSINESS_REQUIREMENTS.md) — goals, scope, visitor experience, and acceptance criteria
- [High-level design](./HIGH_LEVEL_DESIGN.md) — architecture, components, data flows, and key tradeoffs
- [Technical requirements](./TECHNICAL_REQUIREMENTS.md) — implementation, security, accessibility, testing, and deployment requirements

## Roadmap

1. Confirm the content schema, image preparation, visual design, domain, and AWS decisions.
2. Scaffold the Astro application and AWS CDK infrastructure.
3. Build Home, navigation, Press, Exhibitions, Portfolio carousel, Resume, and Contacts.
4. Implement contact delivery and mailing-list enrollment.
5. Complete accessibility, security, performance, backup, and cost checks.
6. Add the initial artwork collection and launch.

## Guiding principles

- **Artwork comes first.** Interface and typography should support the work rather than compete with it.
- **Accessible by default.** Core visitor and administrator journeys target WCAG 2.2 AA.
- **Privacy-conscious.** No advertising, behavioral tracking, or analytics cookies are planned.
- **Secure and maintainable.** Public content is versioned in Git, operational access is restricted, and infrastructure is reproducible.
- **Small on purpose.** The system is designed for one artist and avoids unnecessary platform complexity.

## License

Source-code licensing and artwork usage terms have not yet been selected. Unless explicitly stated otherwise, the artwork and written content are not licensed for reuse.
