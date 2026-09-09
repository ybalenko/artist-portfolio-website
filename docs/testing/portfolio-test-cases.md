# Portfolio Page Browser Test Cases

**Milestone:** [M9 — Playwright testing](../milestones/milestone-9.md)  
**Created:** September 8, 2026  
**Updated:** September 9, 2026
**Implementation:** [Portfolio specs](../../tests/e2e/specs/portfolio.spec.ts), [PortfolioPage](../../tests/e2e/pages/PortfolioPage.ts), and [PortfolioCarousel](../../tests/e2e/components/PortfolioCarousel.ts)

These scenarios define the implemented Portfolio browser coverage. They follow the project's [Page Object Model requirements](../requirements/technical.md#page-object-model-pom): page and component objects own locators and visitor actions, specs own expectations, and fixtures provide deterministic external artwork responses. The same cases run in installed Chrome through the existing `chrome-desktop`, `chrome-mobile`, and `chrome-tablet` projects unless a case states otherwise.

The tests should select representative published artwork from fixture data instead of depending on a fixed item count. This allows the manifest to change without weakening checks for section behavior, metadata, navigation, or accessibility. Routine tests must not depend on live S3 availability.

Common header, footer, navigation, keyboard, and responsive checks run on Portfolio through the [Shared layout catalog](./shared-layout-test-cases.md). PORTFOLIO-03 has moved to SHARED-02/03; remaining IDs are retained.

## Test cases

| ID           | Scenario                                    | Expected result                                                                                                                                   |
| ------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORTFOLIO-01 | Open `/portfolio/` and refresh              | Both responses succeed; the Portfolio page remains visible with its selected section and artwork state restored from the URL.                     |
| PORTFOLIO-02 | Inspect metadata and page headings          | Approved title, description, English document language, Portfolio eyebrow, and one `Selected works` H1 are present.                               |
| PORTFOLIO-04 | Inspect Portfolio section controls          | Landscapes, Still life, and Other controls appear in order inside a navigation region labeled `Portfolio sections`.                               |
| PORTFOLIO-05 | Inspect initial section                     | The first populated section is active, has `aria-current="true"`, and is the only visible gallery section.                                        |
| PORTFOLIO-06 | Change populated section                    | Selecting another populated section makes only that control/current gallery active and selects its first published artwork.                       |
| PORTFOLIO-07 | Open configured empty section               | Other becomes active and shows the `Coming soon` message; no selected artwork, metadata, or thumbnails are shown in that section.                 |
| PORTFOLIO-08 | Return from empty to populated section      | A populated gallery returns with its first artwork selected and its section/image URL state applied.                                              |
| PORTFOLIO-09 | Inspect initial selected artwork            | The feature image has the representative artwork's source, intrinsic dimensions, and meaningful alternative text.                                 |
| PORTFOLIO-10 | Inspect selected artwork metadata           | Name, Medium, Size, Year, and Status labels show the representative manifest values; `available` is presented as `Available`.                     |
| PORTFOLIO-11 | Select a thumbnail                          | The chosen thumbnail becomes the only current thumbnail; the feature image, metadata, carousel image data, and URL hash change to that artwork.   |
| PORTFOLIO-12 | Inspect thumbnail accessibility             | The thumbnail region has a section-specific accessible label, each control has a distinct selection label, and only one thumbnail is current.     |
| PORTFOLIO-13 | Open carousel from the feature artwork      | An accessible modal dialog named `Artwork carousel` opens on the selected artwork and focus moves to Close.                                       |
| PORTFOLIO-14 | Open carousel from a thumbnail              | Double-clicking a representative thumbnail opens the carousel on that artwork and records that thumbnail as the focus-return target.              |
| PORTFOLIO-15 | Inspect carousel artwork and metadata       | The modal image and all five metadata values match the selected gallery artwork.                                                                  |
| PORTFOLIO-16 | Use carousel Previous and Next controls     | Each control selects the adjacent artwork and synchronizes the modal, underlying gallery selection, metadata, current thumbnail, and URL hash.    |
| PORTFOLIO-17 | Verify carousel wraparound                  | Previous from the first artwork selects the last; Next from the last selects the first.                                                           |
| PORTFOLIO-18 | Use carousel arrow keys                     | Arrow Left and Arrow Right perform the same synchronized previous/next changes while the modal is open.                                           |
| PORTFOLIO-19 | Close carousel with its button              | The dialog is hidden, gallery content is interactive again, and focus returns to the feature artwork or thumbnail that opened it.                 |
| PORTFOLIO-20 | Close carousel with Escape                  | Escape closes the dialog and restores gallery interaction and focus to the opening control.                                                       |
| PORTFOLIO-21 | Inspect modal background isolation          | While open, gallery content has `aria-hidden="true"` and is inert; both attributes are removed when the carousel closes.                          |
| PORTFOLIO-22 | Load a section-and-artwork deep link        | A valid `#section-id/artwork-id` URL activates the requested section/artwork without opening the carousel.                                        |
| PORTFOLIO-23 | Refresh and share selected artwork URL      | Refreshing or opening the generated section/artwork URL in a new page restores the same section, feature image, metadata, and current thumbnail.  |
| PORTFOLIO-24 | Support legacy artwork and section hashes   | A valid artwork-only hash selects its owning section/artwork; a valid section-only hash selects that section's first artwork or its empty state.  |
| PORTFOLIO-25 | Ignore an invalid hash safely               | An unknown hash causes no runtime error and leaves the default populated gallery usable.                                                          |
| PORTFOLIO-26 | Verify keyboard access and focus visibility | Section controls, feature artwork, thumbnails, and carousel controls are reachable in a logical order and show a visible focus indicator.         |
| PORTFOLIO-27 | Check responsive layout and overflow        | At each configured project size, controls, feature artwork, metadata, thumbnails, and modal remain usable with no unintended page-level overflow. |
| PORTFOLIO-28 | Load without JavaScript                     | The initial populated gallery, selected image, metadata, and thumbnails remain visible; scripted section switching and carousel are unavailable.  |
| PORTFOLIO-29 | Capture uncaught browser errors             | Normal section, thumbnail, carousel, hash, and close interactions produce no uncaught page errors.                                                |
| PORTFOLIO-30 | Use layout after section changes            | Header navigation and footer Facebook remain usable in empty and populated sections; popup opening preserves the section URL.                     |
| PORTFOLIO-31 | Isolate shared layout during carousel       | Tab and Shift+Tab wrap inside the modal; header, footer, and skip link are inert.                                                                 |
| PORTFOLIO-32 | Restore layout after closing carousel       | Close/Escape restore background interaction and focus; Facebook preserves section/artwork/metadata; header navigation works.                      |

## POM implementation

`PortfolioPage` composes `SiteLayout`, which owns the shared `SiteHeader` and `SiteFooter` objects, and exposes Portfolio page, section, selected-artwork, metadata, thumbnail, and URL-state locators/actions. `PortfolioCarousel` owns the dialog, image, metadata, controls, and open/close actions. It remains separate from `HomeCarousel` because the two controls and behaviors differ.

`portfolio.spec.ts` contains the scenario expectations, including active/current states, metadata values, focus, inert background, URL restoration, and responsive layout. Test-scoped fixtures construct the objects and fulfill artwork requests with deterministic local responses. The fixture data exposes representative first, middle, and last published artwork for populated sections plus the configured empty section, without encoding fixed gallery totals in assertions.

## Coverage boundaries

- The automated suite checks browser behavior against the local production build. It does not prove that public S3 objects are currently available; deployed asset verification remains in M7.
- Chrome mobile/tablet projects are viewport and touch emulation, not physical-device or Safari coverage.
- These cases check specific keyboard, focus, modal, labeling, and layout requirements. They do not constitute full WCAG certification.
- Updating Portfolio content may change representative fixture values. Behavior assertions and the required five-field metadata contract remain stable.

## Commands

```bash
npm run test:e2e:portfolio -- --project=chrome-desktop
npm run test:e2e:portfolio
npm run test:e2e:portfolio -- --project=chrome-desktop --headed --workers=1
npm run test:e2e:portfolio -- --project=chrome-desktop --grep PORTFOLIO-13 --debug
npm run test:e2e:ui
npm run test:e2e:report
```

The Portfolio spec contains 31 cases (93 executions). `npm run test:e2e:portfolio` selects these plus the 11 shared layout cases on Portfolio using `@portfolio`, for 42 cases per project and 126 executions across the three installed-Chrome projects.
