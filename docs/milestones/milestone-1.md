# Milestone 1 Plan — Home Page

**Status:** Complete  
**Created:** June 24, 2026  
**Milestone goal:** Deliver the first locally runnable desktop Home page for the Yulia Balenko artist portfolio.
**Implementation progress:** 28/28 tasks — 100%

## Confirmed decisions

- Temporary artist-statement copy is acceptable for Milestone 1.
- A temporary artwork image and temporary meaningful alternative text are acceptable.
- `docs/design/mockups/mockup image 01.png` is the approved visual baseline.
- Unfinished navigation destinations will open simple “Coming soon” placeholder pages.
- Header wordmark displays as `Yulia Balenko`.
- Footer text is `© 2026 Yulia Balenko. All rights reserved.`
- The footer includes the public Facebook page link.
- Milestone 1 targets desktop web browsers only. Mobile and tablet responsiveness are deferred.

## 1. Scope

Milestone 1 includes:

1. Scaffold the Astro and TypeScript application.
2. Create the Home page at `/`.
3. Implement the shared desktop header.
4. Display the artist name and primary navigation.
5. Display the Home artwork/hero image.
6. Display the artist statement.
7. Implement the footer with copyright text.
8. Add the approved public Facebook page link to the footer.
9. Apply the approved visual direction from `docs/design/mockups/mockup image 01.png`.
10. Add simple placeholder pages for unfinished navigation destinations.
11. Make the application runnable through documented local commands.
12. Verify desktop layout, accessibility basics, and production build output.

## 2. Out of scope

- Press page content
- Exhibition pages and submenu behavior beyond the header presentation needed on Home
- Portfolio gallery and carousel
- Resume PDF and redirect
- Contacts page and message form
- Mailing-list API
- AWS infrastructure and deployment
- Content-management or administration tools
- Mobile and tablet layouts

## 3. Design baseline

The Home page will follow the approved Hockney-inspired mockup:

- White background
- Centered maximum-width content container
- Tall, spacious header
- `Yulia Balenko` wordmark in Lato with wide letter spacing
- Right-aligned primary navigation
- Magenta Home accent based on `#ae2a5e`
- Large artwork image
- Compact light-neutral artist-statement area
- Lato typography throughout
- Minimal square-edged interface without cards, gradients, or decorative shadows
- Footer separated by a section-colored top rule

The implementation will reproduce the design system and layout, not the exact pixel dimensions of the composite mockup image.

## 4. Proposed page structure

```text
Home (/)
├── Skip link
├── Header
│   ├── Yulia Balenko wordmark
│   └── Desktop navigation
├── Main
│   ├── Hero artwork
│   └── Artist Statement
└── Footer
    └── © 2026 Yulia Balenko. All rights reserved.
```

Primary navigation labels:

- Home
- Press
- Exhibitions
- Portfolio
- Resume
- Contacts

## 5. Implementation plan

### Step 1 — Project foundation

- [x] Initialize Astro with TypeScript strict mode.
- [x] Add package scripts for development, build, preview, type checking, and formatting.
- [x] Pin the chosen Node/package-manager expectations.
- [x] Update `.gitignore` for Astro, Node, generated output, local environment files, and macOS files.
- [x] Add local setup and run instructions to the README.

### Step 2 — Design foundation

- [x] Define reusable CSS variables for colors, typography, spacing, container width, borders, and breakpoints.
- [x] Add Lato as a locally served application dependency or self-hosted font asset to avoid a runtime third-party font request.
- [x] Add global normalization and accessible focus styles.
- [x] Establish responsive image and container defaults.

### Step 3 — Shared layout

- [x] Create a base Astro layout with metadata and page landmarks.
- [x] Create reusable Header, Navigation, and Footer components.
- [x] Mark Home as the current page using accessible navigation markup.
- [x] Add a skip-to-content link.
- [x] Link incomplete destinations to clear “Coming soon” placeholder pages.

### Step 4 — Home content

- [x] Add a temporary Home artwork asset with temporary meaningful alternative text.
- [x] Render temporary artist-statement copy as semantic HTML.
- [x] Match the approved desktop proportions and spacing.
- [x] Preserve the artwork's aspect ratio and avoid layout shift.

### Step 5 — Footer

- [x] Add the copyright owner, current agreed year, and rights statement.
- [x] Add the approved public Facebook page link.
- [x] Match the mockup's compact typography and magenta top rule.
- [x] Keep the footer at the natural end of short and long pages without fixed positioning.

### Step 6 — Verification

- [x] Run Astro type checking and production build.
- [x] Verify local development and production preview commands.
- [x] Check Home at representative 1280 px, 1440 px, and 1920 px desktop widths.
- [x] Test keyboard navigation, skip link, focus visibility, and semantic landmarks.
- [x] Confirm image loading, alt text, font loading, metadata, favicon behavior, and absence of console errors.
- [x] Confirm there is no horizontal overflow or unintended layout movement.

## 6. Deliverables

- Runnable Astro/TypeScript project
- Home page at `/`
- Reusable Header, Navigation, and Footer components
- Desktop styles and design tokens
- Home artwork and artist-statement content wired into the page
- Copyright footer
- Updated README with local setup commands
- Successful production build
- Brief Milestone 1 verification record

## 7. Local run expectation

The documented workflow should be equivalent to:

```bash
npm install
npm run dev
```

The terminal must display the local URL, normally `http://localhost:4321/`. A production check must also succeed:

```bash
npm run build
npm run preview
```

## 8. Acceptance criteria

Milestone 1 is complete when:

- A clean checkout can install dependencies and run locally using the README.
- `/` loads successfully without server or browser-console errors.
- Header, artist name, navigation, hero artwork, artist statement, and footer are present.
- Home is visually marked as the current navigation item.
- Footer displays `© 2026 Yulia Balenko. All rights reserved.`
- Layout is visually correct at agreed desktop widths.
- All visible controls are keyboard operable with visible focus.
- The page has semantic header, navigation, main, heading, image, statement, and footer markup.
- The hero image has meaningful alternative text and does not visibly distort.
- Every unfinished destination opens a clear “Coming soon” placeholder page.
- `npm run build` completes successfully.

## 9. Risks and mitigations

| Risk                                               | Mitigation                                                                                    |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Final copy or artwork is unavailable               | Use clearly identified temporary assets and replace them in a later milestone                 |
| Mobile/tablet behavior is not implemented          | Record it as deferred work and avoid treating desktop completion as final-site responsiveness |
| Navigation targets are not implemented yet         | Link to explicit “Coming soon” placeholder pages                                              |
| Font loading changes layout                        | Self-host Lato and preload only the required weights                                          |
| Large artwork slows local and production rendering | Use an appropriately sized responsive source and Astro optimization                           |

## 10. Deferred decisions

- Final artist-statement copy
- Final Home artwork and alternative text
- Mobile and tablet layouts

## 11. Verification record

**Date:** June 24, 2026  
**Result:** Passed

### Automated checks

- `npm install` — passed; lockfile created from pinned dependencies
- `npm run check` — passed with 0 errors, warnings, or hints across 15 files
- `npm run build` — passed; six static pages generated
- `npm run format:check` — passed
- Development server — passed; Home and all five placeholder routes returned HTTP 200
- Production preview — passed; generated Home page and assets returned successfully

### Manual checks

- Compared Home against the approved mockup at 1280 px, 1440 px, and 1920 px desktop widths — passed
- Verified header, navigation, artwork, statement, footer, exact copyright text, and Facebook footer link — passed
- Verified Home current-page styling and `aria-current="page"` — passed
- Verified skip link, keyboard focus styles, semantic landmarks, image alternative text, and explicit image dimensions — passed
- Verified local Lato assets, page metadata, favicon, stable image ratio, and no horizontal overflow at target widths — passed

### Known limitations

- Milestone 1 is desktop-only.
- Artist statement and Home artwork are temporary.
- Navigation destinations contain Milestone 1 placeholder content only.

### Deferred work

- Final statement copy
- Final Home artwork and alternative text
- Mobile and tablet layouts

### Maintenance verification

**Date:** June 25, 2026  
**Result:** Passed

- Added the approved public Facebook page link to the footer.
- `npm run format:check` — passed
- `npm run check` — passed with 0 errors, warnings, or hints across 15 files
- `npm run build` — passed; six static pages generated
- Confirmed generated Home HTML contains the footer Facebook link with `target="_blank"` and `rel="noopener noreferrer"`.

**Date:** June 25, 2026  
**Result:** Passed

- Updated the header wordmark to display as `Yulia Balenko`.
- `npm run format:check` — passed
- `npm run check` — passed with 0 errors, warnings, or hints across 15 files
- `npm run build` — passed; six static pages generated
- Confirmed generated Home HTML contains the wordmark text `Yulia Balenko`.
