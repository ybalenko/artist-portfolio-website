# Shared Layout Browser Test Cases

**Milestone:** [M9 — Playwright testing](../milestones/milestone-9.md)  
**Updated:** September 9, 2026  
**Implementation:** [Shared specs](../../tests/e2e/specs/site-layout.spec.ts), [layout fixture](../../tests/e2e/fixtures/site-layout.ts), and [SiteLayout](../../tests/e2e/components/SiteLayout.ts)

These 11 scenarios run independently on both Home and Portfolio in the desktop, mobile-emulated, and tablet-size Chrome projects: 22 page/scenario combinations and 66 executions. Reports identify the page for each case. Other public pages can join this matrix when their M9 suites are implemented.

## Test cases

| ID        | Scenario                                | Expected result                                                                                                                                                                                               |
| --------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SHARED-01 | Inspect layout landmarks                | Exactly one header, main region, and footer are visible.                                                                                                                                                      |
| SHARED-02 | Inspect primary navigation              | Home, Portfolio, Resume, and Contacts appear in order with approved destinations; disabled Exhibitions is absent.                                                                                             |
| SHARED-03 | Inspect active destination              | Only the originating page's link has `aria-current="page"` and the active style.                                                                                                                              |
| SHARED-04 | Follow wordmark and internal links      | From each originating page, wordmark/Home opens `/`, Portfolio opens `/portfolio/`, and Contacts opens `/contacts/`.                                                                                          |
| SHARED-05 | Open Resume                             | The configured mocked PDF destination opens in a new tab; the originating page remains open at its original URL.                                                                                              |
| SHARED-06 | Inspect footer copyright                | Scrolling to the footer reveals the approved copyright text and artist name.                                                                                                                                  |
| SHARED-07 | Open footer Facebook link               | Its accessible label, URL, new-tab target, and opener protection are correct; the mocked destination opens and the originating URL is preserved.                                                              |
| SHARED-08 | Activate shared links with the keyboard | Wordmark, every header destination, and footer Facebook link are reachable using Tab, have visible focus, and activate with Enter.                                                                            |
| SHARED-09 | Activate skip link                      | First Tab reveals and focuses the skip link; Enter moves focus to main content.                                                                                                                               |
| SHARED-10 | Check responsive shared layout          | At the project width and 320/390/640 pixels, links fit the viewport and receive pointer events, header/main/footer do not overlap, and the page has no horizontal overflow. The footer is scrolled into view. |
| SHARED-11 | Disable JavaScript                      | Header navigation, footer copyright, and the mocked Facebook popup remain usable.                                                                                                                             |

## POM responsibilities

`HomePage` and `PortfolioPage` each compose `SiteLayout`, which owns `SiteHeader`, `SiteFooter`, main, and the skip link. Existing `page.header`, `page.footer`, and `page.main` accessors delegate to that same layout instance. `SiteHeader` owns navigation locators and Resume opening; `SiteFooter` owns footer locators and Facebook opening. `SiteLayout.tabTo()` traverses with actual Tab presses and a document-size bound instead of forcing focus.

The fixture selects the page object per test. SHARED-08 has a 60-second timeout for its six independent keyboard navigation journeys; other tests use the standard 30-second timeout. The shared spec defines expectations once and parameterizes them by page; page objects contain no assertions. Existing network/runtime guards and synthetic image/PDF/social responses apply to every page and popup. Portfolio-specific section and modal interactions stay in the [Portfolio suite](./portfolio-test-cases.md).

## Migration from page suites

Existing case IDs are retained for traceability; removed IDs are not reused.

| Previous case | Shared coverage         |
| ------------- | ----------------------- |
| HOME-05       | SHARED-02               |
| HOME-06       | SHARED-03               |
| HOME-07       | SHARED-04               |
| HOME-08       | SHARED-05               |
| HOME-09       | SHARED-06 and SHARED-07 |
| HOME-20       | SHARED-08 and SHARED-09 |
| PORTFOLIO-03  | SHARED-02 and SHARED-03 |

HOME-18/19 retain Home image/statement layout checks; their shared header/footer checks move to SHARED-10. HOME-21 retains static Home content checks; shared navigation/footer behavior moves to SHARED-11. HOME-22 still navigates away and back as part of its Home carousel/runtime-error journey.

## Commands and boundaries

```bash
npm run test:e2e:layout # Shared cases on Home and Portfolio
npm run test:e2e:home # Home content plus Home shared cases
npm run test:e2e:portfolio # Portfolio gallery/modal plus Portfolio shared cases
npm run test:e2e # All suites, with each shared page/case run once
```

Page suites use `@home` and `@portfolio` tags, including their matching shared cases. `--project=chrome-desktop` selects one viewport. Case-specific debugging remains available, for example `npm run test:e2e -- --grep SHARED-07 --project=chrome-desktop`.

These checks exercise local browser behavior with mocked external destinations. Live asset availability, native PDF rendering, physical-device checks, and full accessibility certification remain outside this suite. See [Frontend CI](./frontend-ci.md) for failure policy and diagnostics and [M9 verification](../milestones/milestone-9.md#verification-record) for measured results.
