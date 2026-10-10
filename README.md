# Yulia Balenko — Artist Portfolio

An artwork-first website for artist **Yulia Balenko**, built as a simple static portfolio for an amateur artist. The site presents an artist statement, an image portfolio, a résumé PDF, and visitor contact options; Exhibitions are scaffolded but temporarily disabled.

> **Project status:** Milestones 1, 2, 3, 5, and 6 are complete. Milestone 7 is blocked at **31/43 tasks (72%)** pending Amplify evidence. Milestone 8, protected Leave a message, is in progress at **52/57 tasks (91%)**: 28 backend/infrastructure tests and 21 configured-form browser checks pass, while deployed security, SES delivery, and privacy checks remain. Milestone 9 browser testing is in progress at **14/24 tasks (58%)**: the original 207 Home/Portfolio/shared-layout checks and the separate 21-case configured Contacts suite passed locally across three Chrome projects. CI changes await a remote run. Exhibitions, Turnstile/CAPTCHA, and mailing-list signup remain deferred. See [Project status](./docs/project/status.md).

## Vision

The portfolio takes inspiration from the restrained, image-led presentation of the [David Hockney website](https://www.hockney.com/home). The Portfolio interaction specifically references its [Drawings — 2010s page](https://www.hockney.com/index.php/works/drawings/2010s): one prominent image, an ordered thumbnail gallery, and minimal interface. The new site will establish its own visual identity.

## Current implementation

- Astro and TypeScript project foundation.
- Home page as the default landing page with the final artist statement, a buttonless compact curated carousel, and an aligned artist portrait.
- S3-hosted Home carousel and artist portrait images under `portfolio/home-carousel/`, referenced from repository metadata without storing image files in GitHub.
- Shared header navigation for Home, Portfolio, Resume, and Contacts. Resume opens the S3-hosted résumé PDF in a new browser tab.
- Exhibitions scaffold with Current, Past, and Upcoming section controls is kept in code but hidden behind `featureFlags.exhibitions` until the content update workflow is decided.
- Clear empty states for exhibition sections until real content is available.
- Contacts page with one consolidated Notice section containing Copyright Notice and Privacy Notice, Facebook link, visibly marked required fields on the Leave a message form, API-gated message delivery, and no visible mailing-list signup.
- Public Contacts configuration via `PUBLIC_CONTACT_API_URL`, with CDK contact API infrastructure under `infra/contact-form/` and private recipient email, SES sender, and abuse salt intentionally kept out of GitHub.
- Portfolio gallery and carousel with Landscapes, Still life, and Other sections, selected-image metadata, free-text status metadata, newest-first section ordering, and local-manifest-driven S3 images.
- S3-hosted résumé PDF configured from `src/data/resume.ts`; `/resume/` remains a fallback link page.
- AWS Amplify build configuration and deployment/image runbooks.
- Footer copyright and more visible blue Facebook social link.
- Responsive layout support for current public pages across narrow, tablet, and desktop viewports.
- Documentation and milestone tracking under `docs/`.

## Remaining work

- Extend the M9 browser suites to Resume, disabled Exhibitions, and remaining Contacts states; verify pull-request CI.
- Record the Amplify app URL and build status.
- Verify the deployed public site, especially Portfolio cloud images, Resume PDF navigation, and the disabled Exhibitions fallback.
- Verify the locally remediated contact-form security findings through the deployed API, then configure Amplify with `PUBLIC_CONTACT_API_URL` and verify delivery.
- Decide the Exhibitions content update workflow, add real exhibition content, and re-enable the feature flag when ready.
- Publish real content for empty or draft areas, including the Portfolio `Other` section.
- Final résumé PDF replacement workflow.
- Double-opt-in mailing-list signup and unsubscribe using a later AWS backend milestone.
- Search-friendly public pages and deeper accessibility verification.
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
| Spam controls          | Honeypot and backend throttling      |
| Infrastructure as code | AWS CDK with TypeScript              |
| Browser testing        | Playwright, TypeScript, POM (M9)     |

The architecture is code-managed and static-first: Home, Exhibitions, Portfolio, Resume, Contacts, navigation, and images deploy from the repository. Contact delivery and subscriptions use serverless APIs. The target operating cost is **$0–$5 USD per month**, excluding the domain.

## Documentation

- [Documentation index](./docs/README.md) — organized entry point for project documentation
- [Business requirements](./docs/requirements/business.md) — goals, scope, visitor experience, and acceptance criteria
- [High-level design](./docs/architecture/high-level-design.md) — architecture, components, data flows, and key tradeoffs
- [Technical requirements](./docs/requirements/technical.md) — implementation, security, accessibility, testing, and deployment requirements
- [Project status](./docs/project/status.md) — current milestone, progress, blockers, and roadmap
- [Project process](./docs/project/process.md) — milestone lifecycle, tracking, verification, and handoff workflow
- [Regression testing skill](./.agents/skills/regression-testing/SKILL.md) — project-only `$regression-testing` workflow for Playwright reports and defect filing
- [Defect log](./docs/project/defects.md) — known defects, severity, status, and verification evidence
- [Project backlog](./docs/project/backlog.md) — future work that has not been moved into an active milestone
- [Change request log](./docs/project/change-requests.md) — user-requested scope, design, process, and rework changes
- [Decision log](./docs/project/decisions.md) — approved project and milestone decisions
- [Deployment runbooks](./docs/deployment/) — hosting, cloud images, contact infrastructure, and content deployment guidance
- [Contact form security review](./docs/security/contact-form-review.md) — findings, evidence, remediation, and release gate
- [Portfolio manifest design](./docs/deployment/portfolio-manifest.md) — local/S3 JSON catalog for Portfolio images and metadata
- [Milestone plans](./docs/milestones/) — scope, checklists, acceptance criteria, and verification records
- [Playwright test cases](./docs/testing/) — page scenario catalogs, POM mappings, fixtures, and execution guidance
- [Frontend CI guide](./docs/testing/frontend-ci.md) — shared workflow, flaky-test policy, artifacts, and required merge check
- [Agent instructions](./AGENTS.md) — required workflow for future coding agents

## Local development

The project uses Node.js 22 (at least 22.13.0) and npm 10. Update an older Node 22 installation before installing dependencies. If you use `nvm`, the repository's `.nvmrc` selects the expected Node major version.

```bash
nvm use
npm install
npm run dev
```

Astro prints the local URL, normally [http://localhost:4321/](http://localhost:4321/). Other useful commands are:

```bash
npm run check        # Type and Astro diagnostics
npm run build        # Production build
npm run contact:synth # Synthesize the Contact API CDK stack
npm run contact:test # Run Contact API handler, body-size, and rate-limit tests
npm run preview      # Preview the production build locally
npm run format:check # Verify formatting
```

The browser suites use Playwright and Page Object Model (POM), with the same TypeScript page/component objects for local and GitHub Actions execution. Use installed Google Chrome; no browser download is needed for the current setup. Safari can be checked manually; Firefox/WebKit automation is deferred.

```bash
npm run test:e2e:check # Check test/config TypeScript
npm run test:e2e:home -- --project=chrome-desktop # Start with desktop Chrome
npm run test:e2e:home # Home-specific and Home shared cases: 81 executions
npm run test:e2e:portfolio # Portfolio-specific and Portfolio shared cases: 126 executions
npm run test:e2e:layout # Shared layout on both pages: 66 executions
npm run test:e2e       # Unconfigured Home/Portfolio/shared suites: 207 executions
npm run test:e2e:contacts # Configured Contacts with a mocked API: 21 executions
npm run test:e2e:home -- --project=chrome-desktop --headed --workers=1 # Watch tests run
npm run test:e2e:ui   # Interactive runner
npm run test:e2e:home -- --project=chrome-desktop --grep HOME-12 --debug # Step through one case
npm run test:e2e:report # Open the latest HTML report
```

The test previews use `--ignore-lock` so Playwright owns startup and shutdown. The default suite builds into ignored `.playwright/site/` on port 4322 with the contact API URL empty. The configured Contacts suite builds separately on port 4323 with a reserved `.invalid` API URL; Playwright intercepts every submission, so no email is sent. Reports and traces are ignored locally. [Frontend CI](./.github/workflows/frontend-ci.yml) runs both suites for pull requests to `main`, with one diagnostic retry and `--fail-on-flaky-tests`; the new configured step awaits remote verification and artifact inspection. See the [Playwright test cases](./docs/testing/) for coverage. Resume, disabled Exhibitions, and remaining Contacts states are still open in M9. `npm run contact:test` remains backend testing under M8.

## Roadmap

| Milestone | Scope                                          | Status      |
| --------- | ---------------------------------------------- | ----------- |
| M1        | Desktop Home page and local project foundation | Complete    |
| M2        | Contacts page                                  | Complete    |
| M3        | Exhibitions scaffold and section controls      | Complete    |
| M5        | Portfolio gallery and carousel                 | Complete    |
| M6        | Resume PDF navigation                          | Complete    |
| M7        | AWS deployment and cloud Portfolio images      | Blocked     |
| M8        | Protected Leave a message form                 | In progress |
| M9        | Automated website testing with Playwright      | In progress |

Future milestone boundaries are provisional until their plans are approved.

## Guiding principles

- **Artwork comes first.** Interface and typography should support the work rather than compete with it.
- **Accessible by default.** Core visitor and administrator journeys target WCAG 2.2 AA.
- **Privacy-conscious.** No advertising, behavioral tracking, or analytics cookies are planned.
- **Secure and maintainable.** Public content is versioned in Git, operational access is restricted, and infrastructure is reproducible.
- **Small on purpose.** The system is designed for one artist and avoids unnecessary platform complexity.

## License

Source-code licensing and artwork usage terms have not yet been selected. Unless explicitly stated otherwise, the artwork and written content are not licensed for reuse.
