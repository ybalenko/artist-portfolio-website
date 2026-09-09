# Home Page Browser Test Cases

**Milestone:** [M9 — Playwright testing](../milestones/milestone-9.md)  
**Updated:** September 9, 2026
**Implementation:** [Home specs](../../tests/e2e/specs/home.spec.ts), [HomePage](../../tests/e2e/pages/HomePage.ts)

The initial suite uses installed Google Chrome through Playwright's `chrome` channel. The projects are `chrome-desktop` (1440 × 1000), `chrome-mobile` (390 × 844 with mobile/touch emulation), and `chrome-tablet` (768 × 1024 with touch). All 16 Home-specific cases run in each project. Another 11 shared layout cases run on Home through the shared suite. Mobile and tablet configurations do not represent physical devices or Safari verification. WebKit/Firefox automation is deferred; the installed Safari app can be used for manual checks.

Shared workflow setup, failure handling, and reports are documented in the [Frontend CI guide](./frontend-ci.md).

Common header, footer, navigation, keyboard, and layout coverage lives in the [Shared layout catalog](./shared-layout-test-cases.md), including the migration mapping for HOME-05–09 and HOME-20.

## Test cases

| ID      | Scenario                                    | Expected result                                                                                                            |
| ------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| HOME-01 | Open `/` and refresh                        | Both responses succeed and Home remains visible.                                                                           |
| HOME-02 | Inspect metadata                            | Approved title, description, and English document language are present.                                                    |
| HOME-03 | Inspect heading                             | Home eyebrow and one Artist Statement H1 are visible.                                                                      |
| HOME-04 | Read artist statement                       | All three approved paragraphs appear completely and in order.                                                              |
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
| HOME-21 | Disable JavaScript                          | Statement, portrait, and first carousel image remain usable; shared navigation/footer checks are in SHARED-11.             |
| HOME-22 | Rotate carousel and navigate away/back      | No uncaught browser JavaScript errors; Home remains usable.                                                                |

## Fixtures and POM conventions

- `HomePage` composes `SiteLayout` and `HomeCarousel`; the layout owns `SiteHeader` and `SiteFooter`. These objects expose locators and visitor actions. Assertions live in specs.
- Test-scoped fixtures create isolated page objects and browser contexts. Unexpected writes and external requests are blocked and fail the test. No AWS credentials or live contact API are required.
- Known S3 images use a deterministic square SVG response. PDF and Facebook destinations use harmless HTML responses at their configured URLs. These checks verify browser navigation and image layout, not live asset availability, native PDF rendering, or real artwork appearance.
- The approved statement is a separate expected-copy fixture. Image expectations come from configured published metadata so adding artwork does not require changing fixed image counts.
- Carousel timing tests control the browser clock. HOME-17 also waits for an observed media-query `change` event before advancing fake time, so the test does not race the reduced-motion listener. Other cases use reduced motion to keep images stable. Hover cases exercise pointer input even in the mobile/touch project; they do not claim touch-only hover behavior.
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

## Verification and limitations

The reorganized suite contains 16 Home-specific scenarios (48 executions) plus 11 shared scenarios on Home (33 executions). `npm run test:e2e:home` selects both using `@home`, for 81 executions. The original IDs are preserved; migrated cases are listed in the shared catalog. Current verification is tracked in M9.

Historical verification before the shared-suite migration:

The September 8, 2026 run passed all 66 executions: 22 cases in each of the desktop, mobile-emulated, and tablet-size installed-Chrome projects. HOME-17 also passed ten consecutive desktop repetitions after its event synchronization was corrected. Detailed command evidence is recorded in [M9's verification record](../milestones/milestone-9.md#verification-record). The generated local HTML report can be reopened with `npm run test:e2e:report` until a later test run replaces it.

- The initial Home suite does not cover zero/one-image build fixtures; these are additional scenarios for later coverage.
- Shared navigation and footer behavior are exercised independently on Home and Portfolio by the shared suite. Portfolio is implemented; Contacts, Resume, and disabled Exhibitions suites remain open in M9.
- Browser automation does not certify accessibility. Safari manual checks, physical devices, visual artwork review, and live S3/PDF checks remain separate.
- Backend tests and contact release gates remain in M8.
