# Milestone 3 Plan — Exhibitions Page

**Status:** Complete  
**Created:** June 25, 2026  
**Milestone goal:** Replace the Exhibitions placeholder with Current, Past, and Upcoming exhibition destinations and accessible navigation.
**Implementation progress:** 18/18 tasks — 100%

## Confirmed decisions

- Milestone 3 is the Exhibitions page. Press is deferred to a later milestone.
- Exhibitions has three destinations: Current, Past, and Upcoming.
- `/exhibitions/` forwards visitors to `/exhibitions/current/`.
- Real exhibition content is not available yet.
- Empty exhibition sections show clear empty-state messages rather than invented content.
- Exhibition content is source-managed in typed project files.
- Desktop styling follows the existing Hockney-inspired visual direction.

## 1. Scope

Milestone 3 includes:

1. Add source-managed exhibition section data.
2. Replace the `/exhibitions/` placeholder.
3. Create `/exhibitions/current/`.
4. Create `/exhibitions/past/`.
5. Create `/exhibitions/upcoming/`.
6. Add accessible section navigation for Current, Past, and Upcoming.
7. Add the Exhibitions submenu to the primary navigation.
8. Provide clear empty states for sections without content.
9. Apply desktop styling consistent with previous milestones.
10. Verify routes, navigation, accessibility basics, and production build output.

## 2. Out of scope

- Real exhibition entries
- Exhibition images
- Date-based automatic categorization
- Browser-based content editing
- Mobile and tablet layout work beyond preserving existing desktop-first behavior
- Press, Portfolio, and Resume implementation

## 3. Design baseline

The Exhibitions pages follow the existing site language:

- White page background
- Centered maximum-width content container
- Lato typography
- Magenta accent color
- Light-neutral content panels
- Minimal square-edged interface
- Desktop-first layout consistent with Home and Contacts

## 4. Proposed route structure

```text
Exhibitions
├── /exhibitions/ → /exhibitions/current/
├── /exhibitions/current/
├── /exhibitions/past/
└── /exhibitions/upcoming/
```

## 5. Implementation plan

### Step 1 — Tracking and roadmap

- [x] Update the project roadmap so Milestone 3 is Exhibitions.
- [x] Record the Milestone 3 scope decision.
- [x] Create this Milestone 3 plan.

### Step 2 — Content model

- [x] Add typed exhibition section data.
- [x] Add empty arrays for Current, Past, and Upcoming entries.

### Step 3 — Routes

- [x] Replace the `/exhibitions/` placeholder.
- [x] Add `/exhibitions/current/`.
- [x] Add `/exhibitions/past/`.
- [x] Add `/exhibitions/upcoming/`.
- [x] Forward `/exhibitions/` to `/exhibitions/current/`.

### Step 4 — Navigation

- [x] Add Current, Past, and Upcoming section navigation to Exhibitions pages.
- [x] Add the Exhibitions submenu to the primary navigation.
- [x] Mark active exhibition pages visually and accessibly.

### Step 5 — Empty states and styling

- [x] Add clear empty-state messages for all empty sections.
- [x] Apply desktop styling consistent with previous milestones.

### Step 6 — Verification

- [x] Run formatting, Astro check, and production build.
- [x] Verify generated routes and navigation state.

## 6. Deliverables

- Exhibition content data file
- `/exhibitions/` redirect/forward behavior
- `/exhibitions/current/`
- `/exhibitions/past/`
- `/exhibitions/upcoming/`
- Exhibitions section navigation
- Primary navigation Exhibitions submenu
- Empty states for sections without content
- Updated milestone/status/decision tracking
- Successful production build

## 7. Acceptance criteria

Milestone 3 is complete when:

- `/exhibitions/` no longer displays the Coming soon placeholder.
- `/exhibitions/current/`, `/exhibitions/past/`, and `/exhibitions/upcoming/` build successfully.
- Visitors can navigate between Current, Past, and Upcoming.
- Empty sections show clear messages.
- Exhibitions primary navigation is visually active for exhibition subsection pages.
- The current exhibition subsection is marked with `aria-current="page"`.
- The primary navigation exposes Current, Past, and Upcoming submenu links.
- `npm run build` completes successfully.

## 8. Risks and mitigations

| Risk                                    | Mitigation                                                         |
| --------------------------------------- | ------------------------------------------------------------------ |
| Real exhibition content is unavailable  | Use empty states and source-managed arrays instead of fake content |
| Submenu is difficult to access          | Support pointer and keyboard focus with normal links               |
| `/exhibitions/` redirect varies by host | Verify generated output and revisit hosting behavior before launch |

## 9. Deferred decisions

- Real Current exhibition entries
- Real Past exhibition entries
- Real Upcoming exhibition entries
- Exhibition images
- Final exhibition ordering
- Whether `/exhibitions/` should remain a redirect or become an overview page

## 10. Verification record

**Date:** June 25, 2026  
**Result:** Passed

### Automated checks

- `npm run format:check` — passed
- `npm run check` — passed with 0 errors, warnings, or hints across 18 files
- `npm run build` — passed; nine static pages generated

### Manual checks

- Confirmed generated `/exhibitions/` redirects to `/exhibitions/current/`.
- Confirmed generated `/exhibitions/current/`, `/exhibitions/past/`, and `/exhibitions/upcoming/` exist.
- Confirmed generated exhibition pages contain the Current, Past, and Upcoming section navigation.
- Confirmed generated exhibition pages contain the primary navigation Exhibitions submenu.
- Confirmed generated Current, Past, and Upcoming pages each mark the current subsection with `aria-current="page"`.
- Confirmed generated pages contain clear empty-state messages and no Coming soon placeholder content.

### Known limitations

- Exhibition sections contain no real entries yet.
- Milestone remains desktop-first.

### Deferred work

- Real exhibition content
- Exhibition images
- Mobile/tablet refinement

### Maintenance verification

**Date:** June 25, 2026  
**Result:** Passed

- Updated the header Exhibitions submenu styling toward the Hockney reference: small vertical dropdown, lowercase links, light accent panel, and white separators.
- `npm run format:check` — passed
- `npm run check` — passed with 0 errors, warnings, or hints across 18 files
- `npm run build` — passed; nine static pages generated

**Date:** June 26, 2026  
**Result:** Passed

- Reopened CR-005 because the top header Exhibitions submenu was still displaying horizontally.
- Updated the primary navigation CSS so the horizontal flex layout applies only to the top-level navigation list.
- `npm run format:check` — passed
- `npm run check` — passed with 0 errors, warnings, or hints across 18 files
- `npm run build` — passed; nine static pages generated
- Confirmed built CSS contains `.primary-navigation > ul` as the horizontal flex rule.
- Confirmed built CSS keeps `.navigation-submenu` as `display: grid`, so the header Exhibitions submenu displays vertically.
- Confirmed built CSS keeps `.section-navigation` horizontal for the in-page Exhibitions section links.
