# Yulia Balenko — Artist Portfolio

An artwork-first website for artist **Yulia Balenko**, built as a simple static portfolio for an amateur artist. The site presents an artist statement, exhibitions, future press coverage, a future image portfolio, a résumé PDF, and visitor contact options.

> **Project status:** Milestones 1, 2, 3, and 5 are complete. Milestone 4, the Press page, is deferred. Milestone 6, Resume, is awaiting planning. Track current progress in [Project status](./docs/project/status.md).

## Vision

The portfolio takes inspiration from the restrained, image-led presentation of the [David Hockney website](https://www.hockney.com/home). The Portfolio interaction specifically references its [Drawings — 2010s page](https://www.hockney.com/index.php/works/drawings/2010s): one prominent image, an ordered thumbnail gallery, and minimal interface. The new site will establish its own visual identity.

## Current implementation

- Astro and TypeScript project foundation.
- Home page as the default landing page with temporary artist statement and artwork.
- Shared header navigation for Home, Press, Exhibitions, Portfolio, Resume, and Contacts.
- Exhibitions header submenu with Current, Past, and Upcoming links.
- Exhibitions routes for `/exhibitions/current/`, `/exhibitions/past/`, and `/exhibitions/upcoming/`.
- Clear empty states for exhibition sections until real content is available.
- Contacts page with draft Privacy Notice, copyright notice, Facebook link, disabled message form, and disabled mailing-list signup.
- Portfolio gallery and carousel using local-only test artwork images.
- Footer copyright and Facebook social link.
- Documentation and milestone tracking under `docs/`.

## Planned features

- Press page for publications, articles, interviews, and public mentions.
- Images-only Portfolio with accessible gallery and carousel.
- Resume navigation that opens the current résumé PDF.
- Real exhibition content and optional exhibition images.
- Code-managed artwork, Press, Exhibitions, résumé, Contacts, and navigation content.
- Protected Leave a message form using a later AWS backend milestone.
- Double-opt-in mailing-list signup and unsubscribe using a later AWS backend milestone.
- Accessible, responsive, and search-friendly public pages.
- Build-time optimized web images.

The initial release will not include sales, payments, visitor accounts, favorites, analytics, video, comments, browser-based content editing, or newsletter campaign tools.

## Planned technology

| Area                   | Technology                           |
| ---------------------- | ------------------------------------ |
| Web application        | Astro and TypeScript                 |
| Public rendering       | Static generation and CDN delivery   |
| Hosting and deployment | AWS Amplify Hosting                  |
| API                    | Amazon API Gateway and AWS Lambda    |
| Dynamic data           | Amazon DynamoDB for subscriptions    |
| Images                 | Astro build pipeline and Amplify CDN |
| Email                  | Amazon SES                           |
| Bot protection         | Cloudflare Turnstile                 |
| Infrastructure as code | AWS CDK with TypeScript              |

The architecture is code-managed and static-first: Home, Press, Exhibitions, Portfolio, Resume, Contacts, navigation, and images deploy from the repository. Contact delivery and subscriptions use serverless APIs. The target operating cost is **$0–$5 USD per month**, excluding the domain.

## Documentation

- [Documentation index](./docs/README.md) — organized entry point for project documentation
- [Business requirements](./docs/requirements/business.md) — goals, scope, visitor experience, and acceptance criteria
- [High-level design](./docs/architecture/high-level-design.md) — architecture, components, data flows, and key tradeoffs
- [Technical requirements](./docs/requirements/technical.md) — implementation, security, accessibility, testing, and deployment requirements
- [Project status](./docs/project/status.md) — current milestone, progress, blockers, and roadmap
- [Project process](./docs/project/process.md) — milestone lifecycle, tracking, verification, and handoff workflow
- [Change request log](./docs/project/change-requests.md) — user-requested scope, design, process, and rework changes
- [Decision log](./docs/project/decisions.md) — approved project and milestone decisions
- [Agent instructions](./AGENTS.md) — required workflow for future coding agents

## Local development

The project uses Node.js 22 and npm 10. If you use `nvm`, the repository's `.nvmrc` selects the expected Node major version.

```bash
nvm use
npm install
npm run dev
```

Astro prints the local URL, normally [http://localhost:4321/](http://localhost:4321/). Other useful commands are:

```bash
npm run check        # Type and Astro diagnostics
npm run build        # Production build
npm run preview      # Preview the production build locally
npm run format:check # Verify formatting
```

## Roadmap

| Milestone | Scope                                              | Status   |
| --------- | -------------------------------------------------- | -------- |
| M1        | Desktop Home page and local project foundation     | Complete |
| M2        | Contacts page                                      | Complete |
| M3        | Exhibitions pages and submenu                      | Complete |
| M4        | Press page                                         | Deferred |
| M5        | Portfolio gallery and carousel                     | Complete |
| M6        | Resume                                             | Planned  |
| M7        | Mailing list, AWS deployment, and launch readiness | Planned  |

Future milestone boundaries are provisional until their plans are approved.

## Guiding principles

- **Artwork comes first.** Interface and typography should support the work rather than compete with it.
- **Accessible by default.** Core visitor and administrator journeys target WCAG 2.2 AA.
- **Privacy-conscious.** No advertising, behavioral tracking, or analytics cookies are planned.
- **Secure and maintainable.** Public content is versioned in Git, operational access is restricted, and infrastructure is reproducible.
- **Small on purpose.** The system is designed for one artist and avoids unnecessary platform complexity.

## License

Source-code licensing and artwork usage terms have not yet been selected. Unless explicitly stated otherwise, the artwork and written content are not licensed for reuse.
