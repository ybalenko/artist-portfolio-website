# Milestone 5 Plan — Portfolio Gallery and Carousel

**Status:** Complete  
**Created:** June 26, 2026  
**Milestone goal:** Replace the Portfolio placeholder with an images-only gallery and carousel using local-only test artwork assets.
**Implementation progress:** 22/22 tasks — 100%

## Confirmed decisions

- Milestone 4 Press is deferred; Milestone 5 Portfolio starts next.
- Portfolio contains only images and carousel behavior.
- No filters, artwork descriptions, prices, comments, purchasing, or video are included.
- Test artwork images are stored locally under `public/artwork-local/`.
- `public/artwork-local/` is ignored by Git so test images are not checked into GitHub.
- Source-managed Portfolio metadata may reference local-only image paths.
- If local images are missing in a clean checkout, the page may show broken image placeholders until local test images or final assets are added.
- Desktop web browser layout is the active target for this milestone.

## 1. Scope

Milestone 5 includes:

1. Defer Milestone 4 Press in project tracking.
2. Create this Milestone 5 plan.
3. Add Git ignore rules for local-only artwork test assets.
4. Create a local-only test image folder.
5. Add temporary local test artwork images.
6. Add source-managed Portfolio image metadata.
7. Replace the `/portfolio/` Coming soon placeholder.
8. Display one prominent selected image.
9. Display an ordered thumbnail gallery.
10. Allow thumbnail selection to update the prominent image.
11. Add an accessible carousel/lightbox opened from the selected image or thumbnails.
12. Provide previous, next, and close controls.
13. Support keyboard navigation for Escape, previous, and next.
14. Keep the interface minimal and artwork-focused.
15. Apply desktop styling consistent with previous milestones.
16. Verify formatting, Astro diagnostics, and production build.

## 2. Out of scope

- Real artwork files
- Final image optimization pipeline
- Upload tooling
- Cloud image storage
- Portfolio filters
- Visible artwork descriptions or prices
- Sales, comments, visitor accounts, and favorites
- Mobile and tablet refinements
- Press and Resume implementation

## 3. Design and technical baseline

The Portfolio page follows the existing Hockney-inspired visual direction:

- White background
- Lato typography
- Minimal surrounding interface
- One prominent artwork image
- Ordered thumbnail strip/grid
- Square-edged controls
- Magenta accent for active and interactive states

Local assets:

```text
public/
  artwork-local/        # ignored by Git
```

A local image such as:

```text
public/artwork-local/test-01.svg
```

is referenced by the website as:

```text
/artwork-local/test-01.svg
```

## 4. Implementation plan

### Step 1 — Tracking and asset strategy

- [x] Record the decision to defer Milestone 4 and start Milestone 5.
- [x] Update roadmap/status tracking.
- [x] Create this Milestone 5 plan.
- [x] Add `public/artwork-local/` to `.gitignore`.
- [x] Create local-only temporary artwork images.

### Step 2 — Portfolio data

- [x] Add typed Portfolio image metadata.
- [x] Reference local-only image paths.
- [x] Include meaningful alternative text for every image.

### Step 3 — Portfolio page

- [x] Replace the `/portfolio/` Coming soon placeholder.
- [x] Render the prominent selected image.
- [x] Render the ordered thumbnail gallery.
- [x] Add active selected-image state.
- [x] Add minimal page intro without artwork descriptions.

### Step 4 — Carousel behavior

- [x] Open carousel/lightbox from Portfolio images.
- [x] Add previous and next controls.
- [x] Add close control.
- [x] Support keyboard previous, next, and Escape.
- [x] Restore page context when the carousel closes.
- [x] Keep carousel state shareable or internally identifiable enough for this milestone.

### Step 5 — Styling

- [x] Apply desktop Portfolio layout styling.
- [x] Style thumbnails and active state.
- [x] Style carousel overlay and controls.
- [x] Preserve existing navigation/footer behavior.

### Step 6 — Verification

- [x] Run formatting, Astro check, and production build.
- [x] Verify `/portfolio/` no longer shows Coming soon.
- [x] Verify local test images load when present.
- [x] Verify thumbnail selection and carousel controls.

## 5. Deliverables

- Gitignored local artwork test folder
- Temporary local test images
- Portfolio image metadata file
- Implemented `/portfolio/` page
- Prominent image display
- Thumbnail gallery
- Carousel/lightbox with controls
- Updated tracking documentation
- Successful verification commands

## 6. Acceptance criteria

Milestone 5 is complete when:

- Milestone 4 is documented as deferred.
- `/portfolio/` no longer displays the Coming soon placeholder.
- Portfolio displays only images plus minimal navigation/control UI.
- A prominent selected image appears on page load.
- Thumbnails are visible in configured order.
- Selecting a thumbnail updates the prominent image.
- Carousel opens from Portfolio images.
- Carousel supports previous, next, close, and keyboard Escape.
- Local test images are not tracked by Git.
- `npm run build` completes successfully.

## 7. Risks and mitigations

| Risk                                      | Mitigation                                                                 |
| ----------------------------------------- | -------------------------------------------------------------------------- |
| Local-only images are absent in GitHub CI | Use static paths and document that final deployable assets are future work |
| Carousel accessibility grows complex      | Keep Milestone 5 controls simple and verify keyboard basics                |
| Real artwork dimensions are unknown       | Use temporary SVGs with consistent dimensions for layout testing           |

## 8. Deferred decisions

- Final artwork files
- Whether final images are committed, deployed from private local assets, or hosted in S3/CloudFront
- Final image dimensions and optimization pipeline
- Whether carousel state must use URL query/hash in the final release
- Mobile/tablet carousel behavior

## 9. Verification record

**Date:** June 26, 2026  
**Result:** Passed

### Automated checks

- `npm run format:check` — passed
- `npm run check` — passed with 0 errors, warnings, or hints across 19 files
- `npm run build` — passed; nine static pages generated
- Chrome headless live browser interaction test — passed
- Chrome headless focused interaction test — passed

### Manual checks

- Confirmed generated `/portfolio/` no longer contains Coming soon content.
- Confirmed generated `/portfolio/` contains the prominent image, thumbnail gallery, and carousel markup.
- Confirmed generated `/portfolio/` references local test images under `/artwork-local/`.
- Confirmed local test images exist under ignored `public/artwork-local/`.
- Confirmed `git status --ignored` reports `public/artwork-local/` as ignored.
- Confirmed Portfolio page loads in Chrome from local Astro preview.
- Confirmed all local test images load in Chrome.
- Confirmed thumbnail click updates selected image, active thumbnail, carousel image, and URL hash.
- Confirmed prominent image opens the carousel.
- Confirmed carousel sets background content to inert and `aria-hidden`.
- Confirmed carousel focus moves to the close button when opened.
- Confirmed Next and Previous buttons update image, active thumbnail, and hash.
- Confirmed ArrowLeft and ArrowRight keyboard navigation work while the carousel is open.
- Confirmed Escape closes the carousel and restores focus.
- Confirmed Close button closes the carousel and restores focus.
- Confirmed thumbnail double-click opens the carousel.
- Confirmed hash changes select the corresponding image.
- Fixed hash-change handling during live testing so shared/changed Portfolio hashes update the selected image without a full page reload.

### Known limitations

- Real artwork is not available yet.
- Local test images are intentionally not tracked by Git.
- Desktop browser layout is the target for this milestone.

### Deferred work

- Press page
- Final artwork assets
- Final image hosting and optimization strategy
- Mobile/tablet refinement
