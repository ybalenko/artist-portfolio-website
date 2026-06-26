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

## New request template

When adding a new row, use the next sequential ID.

```md
| CR-### | YYYY-MM-DD | Short request summary | Area | Proposed | Target milestone or `TBD` | Initial notes, related files, or decision links |
```
