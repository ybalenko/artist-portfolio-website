# Home Page Browser Test Cases

**Milestone:** [M9 — Playwright testing](../milestones/milestone-9.md)  
**Updated:** September 7, 2026  
**Implementation:** [Home specs](../../tests/e2e/specs/home.spec.ts), [HomePage](../../tests/e2e/pages/HomePage.ts)

The initial suite uses installed Google Chrome through Playwright's `chrome` channel. The projects are `chrome-desktop` (1440 × 1000), `chrome-mobile` (390 × 844 with mobile/touch emulation), and `chrome-tablet` (768 × 1024 with touch). All 22 cases run in each project. Mobile and tablet configurations do not represent physical devices or Safari verification. WebKit/Firefox automation is deferred; the installed Safari app can be used for manual checks.

## Test cases

| ID      | Scenario                                    | Expected result                                                                                                            |
| ------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| HOME-01 | Open `/` and refresh                        | Both responses succeed and Home remains visible.                                                                           |
| HOME-02 | Inspect metadata                            | Approved title, description, and English document language are present.                                                    |
| HOME-03 | Inspect heading                             | Home eyebrow and one Artist Statement H1 are visible.                                                                      |
| HOME-04 | Read artist statement                       | All three approved paragraphs appear completely and in order.                                                              |
| HOME-05 | Inspect navigation                          | Home, Portfolio, Resume, Contacts appear in order; Exhibitions is absent.                                                  |
| HOME-06 | Inspect current destination                 | Only Home has the active class and `aria-current="page"`.                                                                  |
| HOME-07 | Follow internal navigation and wordmark     | Portfolio and Contacts open; Home link and wordmark return to Home.                                                        |
| HOME-08 | Open Resume                                 | Configured PDF destination opens in a new tab; Home remains open.                                                          |
| HOME-09 | Inspect footer and open Facebook            | Approved copyright and accessible social link appear; correct destination opens.                                           |
| HOME-10 | Inspect portrait                            | Configured image and alternative text render in a square area.                                                             |
| HOME-11 | Inspect initial carousel                    | First configured published image, dimensions, alternative text, and live position are correct; no carousel buttons appear. |
| HOME-12 | Advance time to seven seconds               | Image remains unchanged before the boundary, then image metadata and position advance together.                            |
| HOME-13 | Advance through all slides                  | Published display order is followed and the last slide wraps to the first.                                                 |
| HOME-14 | Hover over carousel                         | Rotation pauses while the pointer remains over the carousel.                                                               |
| HOME-15 | Repeatedly enter and leave carousel         | Rotation resumes with one timer and does not skip slides.                                                                  |
| HOME-16 | Load with reduced motion                    | Automatic rotation remains inactive.                                                                                       |
| HOME-17 | Change reduced motion after rotation starts | Enabling reduced motion stops rotation; disabling it resumes rotation.                                                     |
| HOME-18 | Inspect project viewport                    | Images align side by side above the statement at wider widths and stack at narrow widths; no horizontal page overflow.     |
| HOME-19 | Resize to 320, 390, and 640 pixels          | Images stack; content, navigation, and footer remain visible without horizontal page overflow.                             |
| HOME-20 | Use Tab and Enter                           | Skip link moves focus to main content; navigation has visible focus and works from the keyboard.                           |
| HOME-21 | Disable JavaScript                          | Statement, portrait, first image, footer, and ordinary navigation remain usable.                                           |
| HOME-22 | Rotate carousel and navigate away/back      | No uncaught browser JavaScript errors; Home remains usable.                                                                |

## Fixtures and POM conventions

- `HomePage` composes `SiteHeader`, `SiteFooter`, and `HomeCarousel`; these objects expose locators and visitor actions. Assertions live in specs.
- Test-scoped fixtures create isolated page objects and browser contexts. Unexpected writes and external requests are blocked and fail the test. No AWS credentials or live contact API are required.
- Known S3 images use a deterministic square SVG response. PDF and Facebook destinations use harmless HTML responses at their configured URLs. These checks verify browser navigation and image layout, not live asset availability, native PDF rendering, or real artwork appearance.
- The approved statement is a separate expected-copy fixture. Image expectations come from configured published metadata so adding artwork does not require changing fixed image counts.
- Carousel timing tests control the browser clock. Other cases use reduced motion to keep images stable. Hover cases exercise pointer input even in the mobile/touch project; they do not claim touch-only hover behavior.
- Runtime-error and network guards apply to every test and popup.

## Running locally

Use the repository Node/npm setup and an installed Google Chrome. Browser downloads are not needed for this initial matrix.

```bash
npm ci
npm run test:e2e:check
npm run test:e2e:home -- --project=chrome-desktop
npm run test:e2e:home
npm run test:e2e:home -- --project=chrome-desktop --headed --workers=1
npm run test:e2e:ui
npm run test:e2e:home -- --project=chrome-desktop --grep HOME-12 --debug
npm run test:e2e:report
```

`--headed` displays the Chrome window while tests run; `--workers=1` makes them run sequentially so their actions are easier to follow. UI Mode provides an interactive test list and action timeline. Debug mode opens Playwright Inspector for stepping through the selected case.

Playwright builds into ignored `.playwright/site/` and starts a local preview server on `127.0.0.1:4322`. The contact API URL is forced empty for this Home build. An existing server is not reused, so the suite cannot accidentally test stale output. Keep the port free before running.

Failure screenshots/traces and HTML reports live in ignored `test-results/` and `playwright-report/`. Open the report to inspect failures; rerun a case with `npm run test:e2e:home -- --project=chrome-desktop --grep HOME-17`.

## GitHub pull-request CI

[Frontend CI](../../.github/workflows/frontend-ci.yml) runs for every pull request targeting `main` and can also be started manually from GitHub's Actions tab. The `Home Playwright tests` job uses Chrome already installed on GitHub's Ubuntu runner and executes `npm ci`, formatting, Astro/TypeScript validation, Playwright TypeScript validation, and the full Home matrix. It uses read-only repository permissions and no application secrets or AWS credentials.

The job uploads `playwright-report/` and `test-results/` as `home-playwright-report-<attempt>` for seven days, including successful runs. Open the workflow run in GitHub and download the artifact from its **Artifacts** section. A failed command makes the job fail. The first remote run must be verified before this is counted as proven CI behavior.

To prevent a merge when this job fails, configure a `main` branch ruleset after the first run and require the **Home Playwright tests** status check. The workflow creates the check; the repository rule enforces it. Branch-protection configuration is an external GitHub change and has not been made by this repository update.

## Verification and limitations

The September 7, 2026 run passed all 66 executions: 22 cases in each of the desktop, mobile-emulated, and tablet-size installed-Chrome projects. Detailed command evidence is recorded in [M9's verification record](../milestones/milestone-9.md#verification-record). The generated local HTML report can be reopened with `npm run test:e2e:report` until a later test run replaces it.

- The initial Home suite does not cover zero/one-image build fixtures; these are additional scenarios for later coverage.
- Shared navigation is exercised from Home and its linked routes. Full Portfolio/Contacts/Resume/Exhibitions test suites remain open in M9.
- Browser automation does not certify accessibility. Safari manual checks, physical devices, visual artwork review, and live S3/PDF checks remain separate.
- Backend tests and contact release gates remain in M8.
