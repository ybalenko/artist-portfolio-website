# Milestone 1 Plan — Home Page

**Status:** Ready  
**Created:** June 24, 2026  
**Milestone goal:** Deliver the first locally runnable desktop Home page for the Yulia Balenko artist portfolio.
**Implementation progress:** 0/27 tasks — 0%

## Confirmed decisions

- Temporary artist-statement copy is acceptable for Milestone 1.
- A temporary artwork image and temporary meaningful alternative text are acceptable.
- `mockup/mockup image 01.png` is the approved visual baseline.
- Unfinished navigation destinations will open simple “Coming soon” placeholder pages.
- Footer text is `© 2026 Yulia Balenko. All rights reserved.`
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
8. Apply the approved visual direction from `mockup/mockup image 01.png`.
9. Add simple placeholder pages for unfinished navigation destinations.
10. Make the application runnable through documented local commands.
11. Verify desktop layout, accessibility basics, and production build output.

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
- `YULIA BALENKO` wordmark in uppercase Lato with wide letter spacing
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
│   ├── YULIA BALENKO wordmark
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

- [ ] Initialize Astro with TypeScript strict mode.
- [ ] Add package scripts for development, build, preview, type checking, and formatting.
- [ ] Pin the chosen Node/package-manager expectations.
- [ ] Update `.gitignore` for Astro, Node, generated output, local environment files, and macOS files.
- [ ] Add local setup and run instructions to the README.

### Step 2 — Design foundation

- [ ] Define reusable CSS variables for colors, typography, spacing, container width, borders, and breakpoints.
- [ ] Add Lato as a locally served application dependency or self-hosted font asset to avoid a runtime third-party font request.
- [ ] Add global normalization and accessible focus styles.
- [ ] Establish responsive image and container defaults.

### Step 3 — Shared layout

- [ ] Create a base Astro layout with metadata and page landmarks.
- [ ] Create reusable Header, Navigation, and Footer components.
- [ ] Mark Home as the current page using accessible navigation markup.
- [ ] Add a skip-to-content link.
- [ ] Link incomplete destinations to clear “Coming soon” placeholder pages.

### Step 4 — Home content

- [ ] Add a temporary Home artwork asset with temporary meaningful alternative text.
- [ ] Render temporary artist-statement copy as semantic HTML.
- [ ] Match the approved desktop proportions and spacing.
- [ ] Preserve the artwork's aspect ratio and avoid layout shift.

### Step 5 — Footer

- [ ] Add the copyright owner, current agreed year, and rights statement.
- [ ] Match the mockup's compact typography and magenta top rule.
- [ ] Keep the footer at the natural end of short and long pages without fixed positioning.

### Step 6 — Verification

- [ ] Run Astro type checking and production build.
- [ ] Verify local development and production preview commands.
- [ ] Check Home at representative 1280 px, 1440 px, and 1920 px desktop widths.
- [ ] Test keyboard navigation, skip link, focus visibility, and semantic landmarks.
- [ ] Confirm image loading, alt text, font loading, metadata, favicon behavior, and absence of console errors.
- [ ] Confirm there is no horizontal overflow or unintended layout movement.

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

| Risk | Mitigation |
|---|---|
| Final copy or artwork is unavailable | Use clearly identified temporary assets and replace them in a later milestone |
| Mobile/tablet behavior is not implemented | Record it as deferred work and avoid treating desktop completion as final-site responsiveness |
| Navigation targets are not implemented yet | Link to explicit “Coming soon” placeholder pages |
| Font loading changes layout | Self-host Lato and preload only the required weights |
| Large artwork slows local and production rendering | Use an appropriately sized responsive source and Astro optimization |

## 10. Deferred decisions

- Final artist-statement copy
- Final Home artwork and alternative text
- Mobile and tablet layouts

## 11. Verification record

**Date:** Not started  
**Result:** Not started

### Automated checks

- None yet

### Manual checks

- None yet

### Known limitations

- Milestone 1 is desktop-only.
- Artist statement and Home artwork are temporary.

### Deferred work

- Final statement copy
- Final Home artwork and alternative text
- Mobile and tablet layouts
