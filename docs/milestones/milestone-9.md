# Milestone 9 Plan — Automated Website Testing with Playwright

**Status:** In progress  
**Created:** September 7, 2026  
**Milestone goal:** Add repeatable browser regression tests for the current public website, runnable locally and in pull-request CI, using Playwright and TypeScript.  
**Implementation progress:** 7/24 tasks — 29%

The owner approved starting M9 implementation with Home page tests using POM on September 7, 2026. M8 retains unfinished backend work and its release gates.

## Confirmed decisions

- Use Playwright for website browser testing.
- Use Page Object Model (POM) with small TypeScript page/component objects and test-scoped fixtures (D-058, CR-069).
- Track implementation tasks and verification evidence in this milestone.
- Cover current public pages and responsive behavior, including Contacts with mocked API responses.
- Keep backend tests, security remediation, infrastructure assertions, deployed API checks, and actual SES delivery verification in [Milestone 8](./milestone-8.md).
- Keep Exhibitions disabled and mailing-list signup hidden and deferred.
- Record the testing boundary in D-057 and the documentation request in CR-068.

## 1. Scope

- Playwright setup, TypeScript tests, deterministic fixtures, local commands, and pull-request CI configuration.
- Home content and supporting visuals; shared navigation and public social links.
- Portfolio sections, selected artwork and metadata, carousel controls, URL state, keyboard interaction, and focus/gallery restoration.
- Resume navigation to the configured PDF and the fallback Resume page.
- Disabled Exhibitions fallback, hidden navigation entry, and legacy redirects.
- Contacts required fields, browser validation, disabled setup state, accessible pending/success/error states, and retry behavior using mocked responses.
- Responsive and keyboard checks on representative narrow mobile, tablet, and desktop viewports.
- Test reports, failure diagnostics, and maintainer instructions.

## 2. Out of scope

- Backend unit/integration/security tests, CDK assertions, live contact submissions, SES delivery, and inspection of AWS logs or DynamoDB data; these remain in M8.
- Public deployment and live S3/PDF availability verification; these remain in M7. Browser tests check the configured PDF destination without proving the live file's type, size, caching, or accessibility.
- Re-enabling Exhibitions or adding mailing-list functionality and tests.
- Full accessibility certification, performance benchmarking, and screenshot comparison baselines.
- Product redesign, unrelated fixes, or changes to external services and repository branch-protection settings.

## 3. Technical baseline

- Run browser tests against a locally served production Astro build, using the repository's supported Node/npm environment.
- `playwright.config.ts` and the Home suite under `tests/e2e/` are implemented. A GitHub workflow under `.github/workflows/` remains planned. The [Home case catalog](../testing/home-test-cases.md) maps all 22 cases and documents local execution.
- Provide separate builds/server configurations for the unconfigured Contacts form and the form configured with a test-only API URL. Do not inherit a production API URL from the developer environment.
- Intercept contact requests with deterministic responses and use synthetic visitor data. An unexpected contact request must fail the test instead of reaching a live API.
- Make ordinary regression runs independent of live S3 images, PDFs, social sites, and AWS credentials by using fixtures and request interception where needed. Keep real asset availability checks separate.
- Initial matrix: installed Chrome via `channel: "chrome"`, using `chrome-desktop` (1440 × 1000), `chrome-mobile` (390 × 844 mobile/touch emulation), and `chrome-tablet` (768 × 1024 with touch). Owner requested using existing browsers; Firefox/WebKit automation is deferred. Playwright cannot drive installed Safari directly. Emulation does not close the broader technical requirements §10 browser/device checks.
- Prefer accessible locators and assertions of visitor-visible outcomes. Avoid fixed sleeps and assertions tied to incidental markup or exact artwork counts.
- Keep generated reports, traces, and screenshots out of Git. Bound CI artifact retention and use only synthetic contact data in diagnostics.
- Local commands: `npm run test:e2e:check`, `npm run test:e2e:home`, `npm run test:e2e`, `npm run test:e2e:ui`, and `npm run test:e2e:report`. The suite uses two workers, 30-second tests, 5-second assertions, no local retries, one retry in CI, HTML reports, and failure screenshots/traces. CI upload/retention is not implemented.
- The current test server builds to ignored `.playwright/site/` and serves `127.0.0.1:4322` with `PUBLIC_CONTACT_API_URL` forced empty; an existing server is not reused. Configured/mock Contacts builds are still open.

### Page Object Model structure

Follow [technical requirements §11](../requirements/technical.md#page-object-model-pom). Page/component objects contain locators and visitor actions; specs contain scenarios and expected outcomes. Fixtures create objects per test and own deterministic network/time setup. Use composition for shared UI and keep Home carousel and Portfolio carousel behavior separate.

Structure (HomePage, SiteHeader, SiteFooter, HomeCarousel, fixtures, and Home specs now exist; other objects will be added as needed):

```text
tests/e2e/
  pages/          HomePage, PortfolioPage, ContactsPage,
                  ResumePage (fallback), ExhibitionsPage (disabled)
  components/     SiteHeader, SiteFooter, HomeCarousel, PortfolioCarousel
  fixtures/       Test-scoped objects, API mocks, public-asset fixtures
  specs/          Page journeys, shared navigation, responsive checks
```

Use the same page objects for local and GitHub Actions runs and across browser/viewport projects. No additional POM library or large BasePage hierarchy is planned. The Resume PDF is an external destination tested through link behavior, not a separate page model.

## 4. Implementation plan

Only the checkboxes in this section contribute to progress. Planning/documentation work does not count as test implementation.

### Step 1 — Test foundation

- [x] Install and lock the Playwright test dependency; add TypeScript configuration, POM page/component/spec directories, and test-scoped object fixtures; verify the structure with the first Home scenario.
- [ ] Add production-build/server orchestration for both unconfigured and mocked-configured Contacts modes.
- [x] Add deterministic external-asset fixtures and contact request interception that prevents live submissions.
- [x] Configure and document the browser/viewport matrix, isolation, timeouts, and failure diagnostics.
- [x] Add local test/UI scripts and ignore generated test artifacts.

### Step 2 — Public page journeys

- [x] Test Home as the default route, artist statement, portrait, and current Home carousel behavior.
- [x] Test exact primary navigation, active-page indication, internal destinations, and configured public social links.
- [ ] Test Portfolio sections, initial selection, thumbnail selection, metadata, and configured empty states.
- [ ] Test Portfolio carousel opening, previous/next controls, and closing.
- [ ] Test carousel URL selection, refresh/share behavior, and gallery context restoration.
- [ ] Test carousel keyboard controls, focus entry/restoration, and inert background behavior.
- [ ] Test Resume PDF labeling, configured destination, new-tab behavior, and fallback page link.
- [ ] Test disabled Exhibitions fallback, absent navigation entry, and legacy route redirects.

### Step 3 — Contacts browser behavior

- [ ] Test Privacy Notice/public links, visibly required fields, and hidden mailing-list signup.
- [ ] Test the unconfigured form's disabled state and absence of submissions.
- [ ] Test browser required-field, email, and length validation before submission.
- [ ] Test configured submission payload, pending state, and accessible success feedback using a mocked API.
- [ ] Test mocked validation rejection, server/network failure, and successful retry with accessible feedback.

### Step 4 — Responsive coverage and CI

- [ ] Verify current public pages at the selected mobile, tablet, and desktop widths, including usable navigation and no unintended horizontal page overflow.
- [ ] Verify keyboard access and visible focus for navigation, Portfolio section controls, Resume links, and Contacts fields/actions across the selected projects.
- [x] Add a pull-request CI workflow that installs dependencies/browsers, builds, runs the agreed suite, and reports failure through its exit status.
- [ ] Verify CI failure diagnostics and bounded report/artifact retention without credentials or real visitor data.

### Step 5 — Handoff and acceptance

- [ ] Document clean-checkout setup, local/UI/CI commands, fixtures, coverage boundaries, and how to investigate failures in the README documentation.
- [ ] Run the full agreed suite and relevant existing checks, record local/CI evidence and any remaining manual browser coverage, and synchronize milestone/status/README summaries.

## 5. Deliverables

- Playwright configuration, TypeScript page/component objects, test-scoped fixtures, browser specs, and npm scripts.
- Pull-request CI workflow with failure diagnostics.
- Maintainer setup and troubleshooting instructions.
- Verified coverage and commands/results recorded here, with backend evidence linked to M8.

## 6. Acceptance criteria

M9 is complete when:

- A clean checkout can install prerequisites and run the agreed browser suite against local production output using documented commands.
- Browser specs use the documented POM structure: reusable UI locators/actions reside in page/component objects, assertions remain in specs, mocks remain in fixtures/helpers, and object instances are isolated per test.
- All in-scope journeys pass across the documented browser/viewport matrix; coverage is mapped to the implementation checklist.
- Both Contacts configuration modes are exercised, and all contact responses are mocked without live API calls or email delivery.
- Tests run without AWS credentials and ordinary regression results do not depend on live external assets.
- Pull-request CI executes the suite, exposes failures, and retains useful diagnostics for a documented bounded period.
- Keyboard, focus, carousel URL/restoration, responsive layout, and configured PDF-link behavior have recorded results.
- Backend test obligations and M8 release gates remain intact; mocked browser success is not counted as actual delivery/security verification.
- Every implementation task is verified, evidence and limitations are recorded, and status/README documentation is consistent. Unverified CI execution remains open until evidence is available.

## 7. Risks and mitigations

| Risk                                                          | Mitigation                                                                                                              |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Live API or asset dependency makes tests unsafe or unreliable | Use a test-only API URL, intercept requests, and supply deterministic public-asset fixtures.                            |
| Content changes cause irrelevant failures                     | Assert behavior and required content contracts; avoid fixed artwork totals and incidental text/markup.                  |
| Mocked success is mistaken for backend readiness              | Keep M8 backend acceptance and release gates separate and link evidence explicitly.                                     |
| Browser matrix increases CI time                              | Start with the documented representative matrix and measure runtime before expanding coverage.                          |
| Emulation is mistaken for full device/browser verification    | Report emulated projects and remaining real-browser/device checks separately.                                           |
| Tests reveal existing behavior gaps                           | Record failures and affected requirements; track material fixes through change control instead of weakening assertions. |

## 8. Deferred decisions

- CI artifact retention and later Firefox/WebKit automation timing remain open. Initial Chrome projects and viewport sizes are recorded above (D-060).
- Visual screenshot baselines, automated accessibility scanning, and performance budgets can be considered after the initial suite.
- Real-device/browser testing tooling and ongoing live-site smoke-test scheduling remain outside this initial automation milestone.

## Verification record

**Date:** 2026-09-07  
**Result:** In progress — Home suite implemented and passed locally in the initial Chrome matrix.

### Automated checks

- `npm run format:check` — passed after formatting the documentation updates.
- `git diff --check` — passed.
- Python documentation check during planning — all relative Markdown links in the nine planning documents resolved; checklist counts at that point were M9 0/24 and M8 45/57.
- `npm run test:e2e:check` — passed; Playwright configuration, fixtures, POM objects, and specs have no TypeScript errors.
- `npm run build:e2e` — passed; generated eight static pages in the isolated `.playwright/site/` directory with contact API configuration forced empty.
- First `npm run test:e2e:home -- --project=chrome-desktop` run — 20/22 passed and exposed an incorrect Portfolio-heading test assumption plus a real Home carousel reduced-motion timer defect.
- `npm run test:e2e:home` after correcting the assertion and timer behavior — passed all 66 executions: 22 cases in installed Chrome desktop, mobile-emulated, and tablet-size projects in 3.6 minutes.
- `npm run check` — passed with 0 errors, 0 warnings, and 0 hints after the Home carousel fix and test implementation.
- `npm run test:e2e:ui -- --help` — passed, confirming the Playwright UI command is available. Headed and debug commands use the same installed-Chrome projects and are documented in the Home testing guide.
- GitHub Actions workflow validation — `.github/workflows/frontend-ci.yml` parses as YAML and defines a read-only pull-request/manual workflow for `main`. It installs with `npm ci`, confirms runner Chrome, runs formatting, Astro, and test TypeScript checks plus all Home projects, and retains reports/traces for seven days. The job has not yet run on GitHub, so remote execution and artifact retrieval remain unverified.

### Manual checks

- Reviewed technical requirements §§9–11 and M8 test/release obligations; M9 covers browser regression testing and keeps backend verification in M8.
- Reviewed business requirements; this milestone adds quality tooling without changing visitor-facing product scope.
- At planning completion, M8 was active at 45/57 tasks and M9 had 24 unchecked tasks. M9 Home implementation is now active; M8 retains its 45/57 backend progress and release gates.
- 2026-09-07 POM clarification: reviewed official Playwright POM/fixture guidance and documented page/component/spec responsibilities, test-scoped objects, and identical local/CI usage. Expanded the existing foundation task; no implementation checkbox was completed. Business scope and M8 testing ownership are unchanged.
- Home verification covered direct load/refresh, metadata and approved copy, exact navigation and active state, internal/external destinations, deterministic image layout, carousel order/timing/hover/reduced-motion behavior, desktop/mobile/tablet layout, keyboard/skip-link behavior, no-JavaScript fallback, and uncaught runtime errors.
- The first browser run demonstrated failure diagnostics through an HTML report, screenshots, traces, and error context. After fixes, the complete initial matrix passed with 66/66 passing executions.

### Known limitations

- Home tests and local scripts exist. Other page suites, configured Contacts test builds, and GitHub Actions workflow/execution evidence remain open.
- The GitHub Actions workflow exists, but its first remote run and branch-protection requirement have not been verified or configured. Until the check is required in GitHub, a repository administrator can still merge a pull request whose test job fails.
- Browser downloads were declined; the initial suite uses installed Chrome. Safari, Firefox, and WebKit have not been verified.
- Current M7 public verification and M8 backend blockers remain tracked in their existing milestones.

### Deferred work

- Backend testing remains in M8; public deployment verification remains in M7.
- Mailing-list/enabled Exhibitions coverage, visual baselines, full accessibility audits, and live-site/device testing remain outside the initial suite.

**Next action:** Run the workflow on a GitHub pull request, inspect the report artifact, and make `Home Playwright tests` a required `main` status check; then implement the Portfolio POM suite. Backend remediation stays in M8.
