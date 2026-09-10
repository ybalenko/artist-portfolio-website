# Milestone 9 Plan — Automated Website Testing with Playwright

**Status:** In progress  
**Created:** September 7, 2026  
**Milestone goal:** Add repeatable browser regression tests for the current public website, runnable locally and in pull-request CI, using Playwright and TypeScript.  
**Implementation progress:** 11/24 tasks — 46%

The owner approved starting M9 implementation with Home page tests using POM on September 7, 2026. M8 retains unfinished backend work and its release gates.

## Confirmed decisions

- Use Playwright for website browser testing.
- Use Page Object Model (POM) with small TypeScript page/component objects and test-scoped fixtures (D-058, CR-069).
- Track implementation tasks and verification evidence in this milestone.
- Cover current public pages and responsive behavior, including Contacts with mocked API responses.
- Keep backend tests, security remediation, infrastructure assertions, deployed API checks, and actual SES delivery verification in [Milestone 8](./milestone-8.md).
- Keep Exhibitions disabled and mailing-list signup hidden and deferred.
- Record the testing boundary in D-057 and the documentation request in CR-068.
- Keep one CI retry for diagnosis, but fail CI if any test passes only on retry using `--fail-on-flaky-tests` (D-061, CR-076).

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
- `playwright.config.ts`, the Home, Portfolio, and shared layout suites under `tests/e2e/` are implemented. Earlier GitHub runs succeeded; the updated flaky-test policy awaits remote verification. The [Home catalog](../testing/home-test-cases.md) maps 16 page-specific cases, the [Portfolio catalog](../testing/portfolio-test-cases.md) maps 31, and the [shared layout catalog](../testing/shared-layout-test-cases.md) maps 11 scenarios on each page: 207 executions across three projects.
- Provide separate builds/server configurations for the unconfigured Contacts form and the form configured with a test-only API URL. Do not inherit a production API URL from the developer environment.
- Intercept contact requests with deterministic responses and use synthetic visitor data. An unexpected contact request must fail the test instead of reaching a live API.
- Make ordinary regression runs independent of live S3 images, PDFs, social sites, and AWS credentials by using fixtures and request interception where needed. Keep real asset availability checks separate.
- Initial matrix: installed Chrome via `channel: "chrome"`, using `chrome-desktop` (1440 × 1000), `chrome-mobile` (390 × 844 mobile/touch emulation), and `chrome-tablet` (768 × 1024 with touch). Owner requested using existing browsers; Firefox/WebKit automation is deferred. Playwright cannot drive installed Safari directly. Emulation does not close the broader technical requirements §10 browser/device checks.
- Prefer accessible locators and assertions of visitor-visible outcomes. Avoid fixed sleeps and assertions tied to incidental markup or exact artwork counts.
- Keep generated reports, traces, and screenshots out of Git. Bound CI artifact retention and use only synthetic contact data in diagnostics.
- Local commands: `npm run test:e2e:check`, `npm run test:e2e:home`, `npm run test:e2e:portfolio`, `npm run test:e2e:layout`, `npm run test:e2e`, `npm run test:e2e:ui`, and `npm run test:e2e:report`. The suite uses two workers, 30-second tests (60 seconds for the six-journey SHARED-08 keyboard case), 5-second assertions, no local retries, one retry in CI, HTML reports, and failure screenshots/traces. CI is configured to retain diagnostics for seven days; remote upload and retrieval remain unverified.
- The current test server builds to ignored `.playwright/site/` and serves `127.0.0.1:4322` with `PUBLIC_CONTACT_API_URL` forced empty; an existing server is not reused. Configured/mock Contacts builds are still open.

### Page Object Model structure

Follow [technical requirements §11](../requirements/technical.md#page-object-model-pom). Page/component objects contain locators and visitor actions; specs contain scenarios and expected outcomes. Fixtures create objects per test and own deterministic network/time setup. Use composition for shared UI and keep Home carousel and Portfolio carousel behavior separate.

HomePage and PortfolioPage compose SiteLayout, which owns SiteHeader, SiteFooter, main, and skip-link locators. Shared specs are parameterized through a test-scoped page fixture. `@home` and `@portfolio` tags select page-specific and shared coverage together; existing case IDs are retained and migrated cases are mapped in the shared catalog (D-062, CR-078).

Structure (Home/Portfolio/shared layout objects and specs exist; remaining page objects will be added as needed):

```text
tests/e2e/
  pages/          HomePage, PortfolioPage, ContactsPage,
                  ResumePage (fallback), ExhibitionsPage (disabled)
  components/     SiteLayout, SiteHeader, SiteFooter, HomeCarousel, PortfolioCarousel
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
- [x] Test Portfolio sections, initial selection, thumbnail selection, metadata, and configured empty states.
- [x] Test Portfolio carousel opening, previous/next controls, and closing.
- [x] Test carousel URL selection, refresh/share behavior, and gallery context restoration.
- [x] Test carousel keyboard controls, focus entry/restoration, and inert background behavior.
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
- Pull-request CI executes the suite, fails for persistent failures and tests that pass only on retry, and retains useful diagnostics for a documented bounded period.
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

**Date:** 2026-09-09
**Result:** In progress — shared layout migration implemented; the full 207-execution local matrix passed with the strict CI policy, verifying the carousel focus fix (DEF-001 closed). Remaining page coverage and remote CI verification stay open.

### Automated checks

- 2026-09-09 regression skill run: `CI=true npm run test:e2e -- --fail-on-flaky-tests` — exit 0; 207/207 passed in 827.1 seconds (13.8 minutes): 48 Home, 93 Portfolio, and 66 shared-layout executions, with 69 per Chrome desktop/mobile-emulated/tablet project. Parsed the generated HTML report data: zero unexpected failures, flaky tests, skipped tests, or runner errors. Report: `playwright-report/index.html` (ignored local artifact). PORTFOLIO-13/19/20/21/31/32 passed in all three projects, closing DEF-001. No new defects found. The first sandboxed attempt exited 1 before tests because port 4322 binding was denied (EPERM); the approved retry ran the full suite. No application/test code changed. Documentation formatting and `git diff --check` passed after recording results.

- Shared layout discovery checks: `npm run test:e2e:home -- --list` selects 81 executions, `npm run test:e2e:portfolio -- --list` selects 126, and `npm run test:e2e:layout -- --list` selects 66. Python set comparisons verified the page commands are disjoint and their union equals all 207 tests. Catalog checks matched all 16 Home, 31 Portfolio, and 11 shared IDs; 106 relative documentation links resolved.
- Shared layout initial desktop run: `npm run test:e2e -- --project=chrome-desktop --grep 'SHARED|PORTFOLIO-3[012]'` — 24/25 passed in 2.4 minutes; PORTFOLIO-31 demonstrated that Tab escaped the carousel. Local failure diagnostics are retained under ignored `.playwright/shared-layout-initial-desktop/`. The first sandboxed attempt could not bind port 4322; the approved browser run produced the result above.
- Shared layout type/build checks: `npm run test:e2e:check` — passed; `npm run check` — 0 errors, warnings, or hints. `npm run test:e2e -- --list` discovers 207 executions in three files.
- 2026-09-09 CI documentation move: `npm run format:check` and `git diff --check` — passed. Python checks resolved all 76 relative links across the seven affected documents, confirmed the Home CI section was removed and all 22 Home cases remained, and verified M9 still has 11/24 completed tasks.
- 2026-09-09 final checks: `npm run format:check`, `npm run test:e2e:check`, and `git diff --check` — passed after the CI policy and documentation updates.
- `node /private/tmp/artist-portfolio-verify-flaky-ci.cjs` — passed four local exit-status checks using the installed Playwright runner and `CI=true`. Two temporary tests asserted `expect(testInfo.retry).toBe(1)`: each failed attempt 0 and passed attempt 1. The old `npm run test:e2e` command exited 0; the updated workflow command `npm run test:e2e -- --fail-on-flaky-tests` exited 1. A clean passing control exited 0, and a persistent failure failed both attempts and exited 1. JSON reports verified test counts, classifications, retry numbers, and attempt statuses; no runner errors occurred.
- The emulation parsed the actual workflow command and inherited the repository's CI retry configuration. An isolated temporary config selected only synthetic tests and disabled the Astro server/browser use because this check targets runner exit behavior. The initial harness filter matched no tests; removing its incorrect start anchor corrected the harness before the four checks passed. Temporary spec/config files were removed. Logs and JSON evidence remain locally in ignored `.playwright/ci-flake-verification-wVa8oU/`; the harness is local-only under `/private/tmp/`.
- Workflow YAML parse and policy assertions — passed; no step/job `continue-on-error`, and diagnostics still run under `${{ !cancelled() }}`. This is local verification, not a GitHub execution of the updated workflow.
- `npm run format:check` — passed after formatting the documentation updates.
- `git diff --check` — passed.
- Python documentation check during planning — all relative Markdown links in the nine planning documents resolved; checklist counts at that point were M9 0/24 and M8 45/57.
- `npm run test:e2e:check` — passed; Playwright configuration, fixtures, POM objects, and specs have no TypeScript errors.
- `npm run build:e2e` — passed; generated eight static pages in the isolated `.playwright/site/` directory with contact API configuration forced empty.
- First `npm run test:e2e:home -- --project=chrome-desktop` run — 20/22 passed and exposed an incorrect Portfolio-heading test assumption plus a real Home carousel reduced-motion timer defect.
- `npm run test:e2e:home` after correcting the assertion and timer behavior — passed all 66 executions: 22 cases in installed Chrome desktop, mobile-emulated, and tablet-size projects in 3.6 minutes.
- `npm run check` — passed with 0 errors, 0 warnings, and 0 hints after the Home carousel fix and test implementation.
- `npm run test:e2e:ui -- --help` — passed, confirming the Playwright UI command is available. Headed and debug commands use the same installed-Chrome projects and are documented in the Home testing guide.
- GitHub Actions workflow validation — `.github/workflows/frontend-ci.yml` parses as YAML and defines a read-only pull-request/manual workflow for `main`. It installs with `npm ci`, confirms runner Chrome, runs formatting, Astro, and test TypeScript checks plus all implemented browser suites, and retains reports/traces for seven days. The job has not yet run on GitHub, so remote execution and artifact retrieval remain unverified.
- First Portfolio desktop run — 26/29 passed; three test implementation issues were corrected without production changes.
- Corrected Portfolio desktop run — passed all 29 cases.
- Initial Portfolio matrix — 83/87 passed and exposed a real narrow-mobile defect where intrinsic modal content pushed Previous/Next below the fixed viewport.
- Targeted mobile regression after constraining the carousel grid to viewport height — passed `PORTFOLIO-16`, `PORTFOLIO-17`, `PORTFOLIO-27`, and `PORTFOLIO-29`.
- Final `npm run test:e2e:portfolio` — passed all 87 executions: 29 cases in installed Chrome desktop, mobile-emulated, and tablet-size projects in 5.8 minutes.
- Final `npm run test:e2e` using the exact GitHub Actions command — passed all 153 implemented Home and Portfolio executions across the three Chrome projects in 9.0 minutes.
- HOME-17 flake regression — after replacing the fixed 100 ms assumption with synchronization on an observed reduced-motion media-query event, `HOME-17` passed 10/10 consecutive desktop repetitions and the full `npm run test:e2e:home` passed all 66 executions across the three Chrome projects in 4.0 minutes.

### Manual checks

- 2026-09-09 project skill scope (CR-080): moved `regression-testing` into `.agents/skills/regression-testing/` and verified the personal installation is absent. Skill YAML, README links, formatting, and `git diff --check` passed. No test suite was run for this relocation; progress remains 11/24, with existing blockers and next actions unchanged.

- 2026-09-09 defect tracking (CR-079): created the [central defect log](../project/defects.md), compared imported statuses against M9 verification and the M8 security review, and reviewed both README indexes. Pending focus/deployed security verification remains pending; M9 stays 11/24. Documentation formatting, relative-link existence checks, and `git diff --check` passed. No application code changed or browser tests rerun for this documentation task.

- Shared layout rework (CR-078/D-062): migrated HOME-05–09/20 and PORTFOLIO-03 to shared cases with IDs preserved in the catalogs; retained Home content/carousel/layout/no-JavaScript checks and Portfolio gallery checks. Reused PortfolioPage for the second-page URL restoration test. Fixed the exposed carousel defect by isolating all sibling branches outside the modal, preserving prior inert/aria-hidden states, and wrapping Tab/Shift+Tab within its controls. M9 remains 11/24 because other public-page and remote-CI acceptance tasks are still open.
- 2026-09-09 documentation reorganization (CR-077): moved all three CI guidance paragraphs from Home test cases into the shared [Frontend CI guide](../testing/frontend-ci.md); Home now links to it, as do both READMEs. Workflow behavior, M9 progress (11/24), blockers, and next action are unchanged.
- Read-only GitHub API inspection confirmed successful earlier pull-request runs [#2](https://github.com/ybalenko/artist-portfolio-website/actions/runs/34309615557) and [#3](https://github.com/ybalenko/artist-portfolio-website/actions/runs/34312999144), both on September 8 Pacific time. Detailed log access returned HTTP 403, so the reported two original failures and artifact contents remain unverified. Historical first-run limitations below describe the earlier implementation sessions.
- Reviewed both READMEs, technical requirements, architecture, and the Home CI guide; synchronized the stricter CI policy and remaining remote checks. M9 remains 11/24 tasks (46%); no additional acceptance task is complete from local exit-status emulation alone.
- Reviewed technical requirements §§9–11 and M8 test/release obligations; M9 covers browser regression testing and keeps backend verification in M8.
- Reviewed business requirements; this milestone adds quality tooling without changing visitor-facing product scope.
- At planning completion, M8 was active at 45/57 tasks and M9 had 24 unchecked tasks. M9 Home implementation is now active; M8 retains its 45/57 backend progress and release gates.
- 2026-09-07 POM clarification: reviewed official Playwright POM/fixture guidance and documented page/component/spec responsibilities, test-scoped objects, and identical local/CI usage. Expanded the existing foundation task; no implementation checkbox was completed. Business scope and M8 testing ownership are unchanged.
- 2026-09-08 Portfolio scenario design: reviewed the implemented gallery, manifest model, browser requirements, and POM boundary; documented 29 cases covering sections, empty state, representative artwork and metadata, thumbnails, modal controls, wraparound, URL restoration, keyboard/focus behavior, inert background, responsive layout, JavaScript fallback, and runtime errors. Test implementation remains open, so the checklist count is unchanged.
- Home verification covered direct load/refresh, metadata and approved copy, exact navigation and active state, internal/external destinations, deterministic image layout, carousel order/timing/hover/reduced-motion behavior, desktop/mobile/tablet layout, keyboard/skip-link behavior, no-JavaScript fallback, and uncaught runtime errors.
- The first browser run demonstrated failure diagnostics through an HTML report, screenshots, traces, and error context. After fixes, the complete initial matrix passed with 66/66 passing executions.
- Portfolio verification covers three sections and the configured empty state, representative artwork/metadata, thumbnails, modal controls and wraparound, deep-link/refresh/share state, keyboard and focus restoration, inert background, responsive layout, JavaScript fallback, and runtime errors. The responsive suite found and verified a fix for mobile modal controls falling outside the viewport.

### Known limitations

- Home and Portfolio tests and local scripts exist. Resume, disabled Exhibitions, Contacts, remote verification of the updated flaky-test policy, and artifact inspection remain open. The reorganized full browser suite passed local verification with the strict CI policy on September 9 (207/207).
- Earlier GitHub runs succeeded, but the updated workflow has not been pushed or run remotely and branch protection remains unverified. Until the check is required in GitHub, merging a pull request whose test job fails may still be possible.
- Browser downloads were declined; the initial suite uses installed Chrome. Safari, Firefox, and WebKit have not been verified.
- Current M7 public verification and M8 backend blockers remain tracked in their existing milestones.

### Deferred work

- Backend testing remains in M8; public deployment verification remains in M7.
- Mailing-list/enabled Exhibitions coverage, visual baselines, full accessibility audits, and live-site/device testing remain outside the initial suite.

**Next action:** Implement the Resume and disabled Exhibitions browser journeys, then add configured/unconfigured Contacts test builds and mocked form scenarios. GitHub workflow verification and backend remediation remain open in M9 and M8 respectively.
