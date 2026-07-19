# Change Request Log

This document tracks user-requested changes that affect scope, behavior, design, documentation, process, or previously completed milestone work.

Use this log for requests that are larger than routine implementation details or typo fixes. Small code adjustments can stay in the active milestone verification notes unless they change the agreed result.

## Status definitions

| Status      | Meaning                                                       |
| ----------- | ------------------------------------------------------------- |
| Proposed    | Requested but not yet accepted, planned, or sized             |
| Accepted    | Approved for implementation but not started                   |
| In progress | Implementation or documentation update is underway            |
| Done        | Implemented and verified                                      |
| Deferred    | Valid request intentionally moved to a later milestone        |
| Rejected    | Not accepted; reason must be recorded                         |
| Superseded  | Replaced by a newer change request or decision                |
| Reversed    | Implemented earlier, then intentionally rolled back or undone |

## When to add a change request

Add a row when the user asks to:

- Change requirements, scope, navigation, page behavior, or visual design.
- Rework something already implemented or verified.
- Add, remove, or defer milestone deliverables.
- Change project process, documentation structure, or tracking expectations.
- Make a decision that does not belong only in one milestone checklist.

Also update related requirements, design, milestone plans, status, decisions, README files, or implementation files when the change affects them.

## Change requests

| ID     | Date       | Request                                | Area    | Status | Target milestone | Resolution / notes                                                                                                                                                                                                                                   |
| ------ | ---------- | -------------------------------------- | ------- | ------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CR-001 | 2026-06-26 | Create a dedicated change-request log  | Process | Done   | Project-wide     | Added this document and linked it from project documentation. Future material user-requested changes should be recorded here and synchronized with related artifacts.                                                                                |
| CR-002 | 2026-06-25 | Add Facebook page link to footer       | UI      | Done   | M1 maintenance   | Added the approved Facebook page link to the footer.                                                                                                                                                                                                 |
| CR-003 | 2026-06-25 | Display header name as `Yulia Balenko` | UI      | Done   | M1 maintenance   | Updated the header wordmark casing from all uppercase to title case.                                                                                                                                                                                 |
| CR-004 | 2026-06-25 | Reduce Contacts subheading font sizes  | UI      | Done   | M2 maintenance   | Adjusted Contacts subheading scale so section headings do not visually overpower the page header.                                                                                                                                                    |
| CR-005 | 2026-06-25 | Restyle Exhibitions header submenu     | UI      | Done   | M3 maintenance   | Reopened on 2026-06-26 because the top Exhibitions submenu still displayed horizontally. Fixed the header navigation CSS so only the top-level menu uses horizontal flex layout, allowing the Exhibitions submenu to display as a vertical dropdown. |
| CR-006 | 2026-06-26 | Update root and docs README files      | Docs    | Done   | Project-wide     | Refreshed README summaries for current milestones and added explicit README maintenance instructions to agent guidance.                                                                                                                              |
| CR-007 | 2026-06-26 | Defer Press and start Portfolio        | Scope   | Done   | M5               | Deferred Milestone 4 Press and started Milestone 5 Portfolio. Portfolio will use local-only test images under `public/artwork-local/`, ignored by Git.                                                                                               |
| CR-008 | 2026-06-26 | Fix local 404 asset requests           | Quality | Done   | Maintenance      | Moved the Home artwork to a stable public path and added Apple touch icon files/links so dev-server browser requests stop returning 404.                                                                                                             |
| CR-009 | 2026-06-28 | Plan AWS deployment milestone          | Scope   | Done   | M7               | Created Milestone 7 plan for AWS Amplify public deployment and cloud-hosted Portfolio images. Mailing list and Leave a message backend are deferred to a later iteration.                                                                            |
| CR-010 | 2026-07-04 | Add Portfolio sections                 | UI      | Done   | M7               | Updated Portfolio to organize images into `landscapes` and `stilllife` sections while preserving the image-only gallery and carousel behavior.                                                                                                       |
| CR-011 | 2026-07-04 | Align page submenu styling             | UI      | Done   | M7               | Made Exhibitions section navigation and Portfolio section navigation use the same font size, uppercase treatment, padding, panel background, and active/hover color.                                                                                 |
| CR-012 | 2026-07-04 | Add Still life cloud images            | Content | Done   | M7               | Replaced temporary Still life images with 18 public S3 image URLs and verified their dimensions from downloaded temporary copies. Landscapes remain on local temporary images pending final URLs.                                                    |
| CR-013 | 2026-07-07 | Sort Still life newest first           | Content | Done   | M7               | Reordered Still life Portfolio images by the year in each S3 URL, newest year first; images within the same year keep their filename sequence.                                                                                                       |
| CR-014 | 2026-07-07 | Add artwork metadata fields            | UI      | Done   | M7               | Added name, medium, size, and year fields to Portfolio image records and displayed selected-image metadata on the Portfolio page and carousel. Placeholder values remain where final artwork metadata is not yet provided.                           |
| CR-015 | 2026-07-09 | Remove deleted Still life image        | Content | Done   | M7               | Removed `yulia-art-2025-05` from Portfolio metadata because the corresponding S3 object was removed.                                                                                                                                                 |
| CR-016 | 2026-07-09 | Design Portfolio manifest              | Docs    | Done   | M7               | Added a proposed S3-hosted JSON manifest design and example file so Portfolio images and metadata can later move out of hardcoded TypeScript lists while keeping the site static.                                                                    |
| CR-017 | 2026-07-09 | Add artwork availability metadata      | Content | Done   | M7               | Added an `availability` manifest field. Superseded by CR-018 for allowed values; the current manifest uses only `available`.                                                                                                                         |
| CR-018 | 2026-07-09 | Restrict artwork availability values   | Content | Done   | M7               | Removed alternate manifest availability values. The current manifest design allows only `availability: "available"`.                                                                                                                                 |
| CR-019 | 2026-07-09 | Display artwork status in Portfolio UI | UI      | Done   | M7               | Added a visible `Status` metadata field to the Portfolio page and carousel, mapping `availability: "available"` to the visitor-facing label `Available`.                                                                                             |
| CR-020 | 2026-07-09 | Add Other Portfolio section            | UI      | Done   | M7               | Added an `Other` Portfolio section/tab with a temporary local placeholder image and updated the manifest design, requirements, README summaries, and tracking docs.                                                                                  |
| CR-021 | 2026-07-09 | Wire Portfolio to local manifest       | Data    | Done   | M7               | Replaced hardcoded Portfolio image records with build-time loading from `docs/deployment/manifest.json`; unpublished manifest records remain hidden and empty sections show an empty state.                                                          |
| CR-022 | 2026-07-09 | Remove Exhibitions header submenu      | UI      | Done   | M7 maintenance   | Removed Current/Past/Upcoming from the primary-navigation dropdown and made `/exhibitions/` a single page with Portfolio-style section controls. Legacy status URLs redirect to matching hash sections.                                              |
| CR-023 | 2026-07-09 | Sort Portfolio sections newest first   | Content | Done   | M7               | Portfolio now sorts published images newest first by artwork `year` in every section, including Landscapes, Still life, and Other. Manifest order remains the tie-breaker for works from the same year.                                              |
| CR-024 | 2026-07-14 | Make artwork availability free text    | Content | Done   | M7               | Removed the manifest restriction that only allowed `availability: "available"`. Availability remains required but can now contain any non-empty manually typed public status text.                                                                   |
| CR-025 | 2026-07-18 | Add separate compact Home carousel     | UI      | Done   | M7 maintenance   | Replaced the full-width temporary Home artwork with a compact manually curated Home carousel placed beside the artist statement. Home carousel images are configured separately from Portfolio artwork.                                              |
| CR-026 | 2026-07-18 | Center Home carousel above statement   | UI      | Done   | M7 maintenance   | Updated the Home layout so the square Home carousel is centered at the top of the page with the artist statement below it.                                                                                                                           |
| CR-027 | 2026-07-18 | Add final Home artist statement        | Content | Done   | M7 maintenance   | Replaced the temporary Home artist statement with the owner-provided final artist statement text.                                                                                                                                                    |
| CR-028 | 2026-07-18 | Justify Home artist statement text     | UI      | Done   | M7 maintenance   | Rolled back centered Home statement text and justified only the statement body copy.                                                                                                                                                                 |

## New request template

When adding a new row, use the next sequential ID.

```md
| CR-### | YYYY-MM-DD | Short request summary | Area | Proposed | Target milestone or `TBD` | Initial notes, related files, or decision links |
```
