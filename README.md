# Yulia Balenko — Artist Portfolio

An artwork-first website for artist **Yulia Balenko**, built as a simple static portfolio for an amateur artist. The site presents an artist statement, an image portfolio, a résumé PDF, and visitor contact options; Exhibitions are scaffolded but temporarily disabled.

> **Project status:** Milestones 1, 2, 3, 5, and 6 are complete. Press has been removed from the current website scope. Milestone 7, AWS deployment and cloud Portfolio images, is in progress at **31/43 tasks (72%)**. The next milestone action is to record the Amplify URL/build status and verify the deployed Portfolio page plus Resume PDF navigation. Track current progress in [Project status](./docs/project/status.md).

## Vision

The portfolio takes inspiration from the restrained, image-led presentation of the [David Hockney website](https://www.hockney.com/home). The Portfolio interaction specifically references its [Drawings — 2010s page](https://www.hockney.com/index.php/works/drawings/2010s): one prominent image, an ordered thumbnail gallery, and minimal interface. The new site will establish its own visual identity.

## Current implementation

- Astro and TypeScript project foundation.
- Home page as the default landing page with the final artist statement, a buttonless compact curated carousel, and an aligned artist portrait.
- S3-hosted Home carousel and artist portrait images under `portfolio/home-carousel/`, referenced from repository metadata without storing image files in GitHub.
- Shared header navigation for Home, Portfolio, Resume, and Contacts. Resume opens the S3-hosted résumé PDF in a new browser tab.
- Exhibitions scaffold with Current, Past, and Upcoming section controls is kept in code but hidden behind `featureFlags.exhibitions` until the content update workflow is decided.
- Clear empty states for exhibition sections until real content is available.
- Contacts page with draft Privacy Notice, copyright notice, Facebook link, disabled message form, and disabled mailing-list signup.
- Portfolio gallery and carousel with Landscapes, Still life, and Other sections, selected-image metadata, free-text status metadata, newest-first section ordering, and local-manifest-driven S3 images.
- S3-hosted résumé PDF configured from `src/data/resume.ts`; `/resume/` remains a fallback link page.
- AWS Amplify build configuration and deployment/image runbooks.
- Footer copyright and Facebook social link.
- Documentation and milestone tracking under `docs/`.

## Remaining work

- Record the Amplify app URL and build status.
- Verify the deployed public site, especially Portfolio cloud images, Resume PDF navigation, and the disabled Exhibitions fallback.
- Decide the Exhibitions content update workflow, add real exhibition content, and re-enable the feature flag when ready.
- Publish real content for empty or draft areas, including the Portfolio `Other` section.
- Final résumé PDF replacement workflow.
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
| Images                 | AWS cloud storage and Astro metadata |
| Email                  | Amazon SES                           |
| Bot protection         | Cloudflare Turnstile                 |
| Infrastructure as code | AWS CDK with TypeScript              |

The architecture is code-managed and static-first: Home, Exhibitions, Portfolio, Resume, Contacts, navigation, and images deploy from the repository. Contact delivery and subscriptions use serverless APIs. The target operating cost is **$0–$5 USD per month**, excluding the domain.

## Documentation

- [Documentation index](./docs/README.md) — organized entry point for project documentation
- [Business requirements](./docs/requirements/business.md) — goals, scope, visitor experience, and acceptance criteria
- [High-level design](./docs/architecture/high-level-design.md) — architecture, components, data flows, and key tradeoffs
- [Technical requirements](./docs/requirements/technical.md) — implementation, security, accessibility, testing, and deployment requirements
- [Project status](./docs/project/status.md) — current milestone, progress, blockers, and roadmap
- [Project process](./docs/project/process.md) — milestone lifecycle, tracking, verification, and handoff workflow
- [Project backlog](./docs/project/backlog.md) — future work that has not been moved into an active milestone
- [Change request log](./docs/project/change-requests.md) — user-requested scope, design, process, and rework changes
- [Decision log](./docs/project/decisions.md) — approved project and milestone decisions
- [AWS Amplify deployment runbook](./docs/deployment/aws-amplify.md) — deployment steps and settings
- [Portfolio and Home cloud image runbook](./docs/deployment/portfolio-images.md) — cloud image upload and metadata workflow
- [Portfolio manifest design](./docs/deployment/portfolio-manifest.md) — local/S3 JSON catalog for Portfolio images and metadata
- [Milestone 6](./docs/milestones/milestone-6.md) — completed Resume PDF navigation milestone
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

| Milestone | Scope                                          | Status      |
| --------- | ---------------------------------------------- | ----------- |
| M1        | Desktop Home page and local project foundation | Complete    |
| M2        | Contacts page                                  | Complete    |
| M3        | Exhibitions scaffold and section controls      | Complete    |
| M5        | Portfolio gallery and carousel                 | Complete    |
| M6        | Resume PDF navigation                          | Complete    |
| M7        | AWS deployment and cloud Portfolio images      | In progress |

Future milestone boundaries are provisional until their plans are approved.

## Guiding principles

- **Artwork comes first.** Interface and typography should support the work rather than compete with it.
- **Accessible by default.** Core visitor and administrator journeys target WCAG 2.2 AA.
- **Privacy-conscious.** No advertising, behavioral tracking, or analytics cookies are planned.
- **Secure and maintainable.** Public content is versioned in Git, operational access is restricted, and infrastructure is reproducible.
- **Small on purpose.** The system is designed for one artist and avoids unnecessary platform complexity.

## License

Source-code licensing and artwork usage terms have not yet been selected. Unless explicitly stated otherwise, the artwork and written content are not licensed for reuse.
