# Project Decision Log

This file records approved decisions that affect implementation or more than one milestone. New decisions are appended; existing history should not be silently rewritten.

| ID    | Date       | Decision                                                                              | Reason / impact                                                       | Status        |
| ----- | ---------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------- |
| D-001 | 2026-06-22 | Use Astro and TypeScript                                                              | Content-focused static framework with minimal client JavaScript       | Active        |
| D-002 | 2026-06-22 | Use AWS for hosting and serverless services                                           | Selected hosting platform                                             | Active        |
| D-003 | 2026-06-23 | Manage public content through Git and code                                            | Removes CMS, administrator UI, and content database                   | Active        |
| D-004 | 2026-06-23 | Use Amplify Hosting for the static site                                               | Git-connected builds and CDN delivery                                 | Active        |
| D-005 | 2026-06-23 | Home is `/` and contains the artist statement                                         | Home is the default landing page                                      | Active        |
| D-006 | 2026-06-23 | Primary navigation is Home, Press, Exhibitions, Portfolio, Resume, Contacts           | Defines the public information architecture                           | Active        |
| D-007 | 2026-06-23 | Exhibitions has Current, Past, and Upcoming destinations                              | Required submenu structure                                            | Active        |
| D-008 | 2026-06-23 | Portfolio contains only images and an accessible carousel                             | Removes filters, descriptions, comments, and commerce from Portfolio  | Active        |
| D-009 | 2026-06-23 | Resume links to a static PDF                                                          | Avoids an HTML résumé content model                                   | Active        |
| D-010 | 2026-06-23 | Contacts contains Privacy Notice and Leave a message                                  | Combines contact and privacy content                                  | Active        |
| D-011 | 2026-06-23 | Contact messages are delivered through SES without application persistence            | Minimizes stored personal data                                        | Active        |
| D-012 | 2026-06-23 | Use the Hockney site as layout/design inspiration without copying content or identity | Establishes visual direction                                          | Active        |
| D-013 | 2026-06-24 | Milestone 1 is desktop-only                                                           | Mobile and tablet layouts are deferred                                | Active for M1 |
| D-014 | 2026-06-24 | Temporary Home statement and artwork are acceptable in Milestone 1                    | Allows implementation before final content exists                     | Active for M1 |
| D-015 | 2026-06-24 | Unfinished navigation destinations use Coming soon placeholders in Milestone 1        | Prevents broken navigation                                            | Active for M1 |
| D-016 | 2026-06-24 | Footer text is `© 2026 Yulia Balenko. All rights reserved.`                           | Approved copyright presentation                                       | Active        |
| D-017 | 2026-06-24 | `docs/design/mockups/mockup image 01.png` is the Milestone 1 visual baseline          | Defines Home layout and visual acceptance reference                   | Active for M1 |
| D-018 | 2026-06-25 | Add `https://www.facebook.com/YuliaBalenkoArt` as the public Facebook page link       | Makes the approved social media destination available from the footer | Active        |
| D-019 | 2026-06-25 | Display the header wordmark as `Yulia Balenko` instead of all uppercase               | Matches the approved public artist-name casing                        | Active        |
| D-020 | 2026-06-25 | Make Milestone 2 the static Contacts page instead of Press                            | Prioritizes contact/privacy/social layout before Press content        | Active        |
| D-021 | 2026-06-25 | Keep Contacts message and mailing-list forms disabled until backend configuration     | Allows UI review while deferring AWS/API/CAPTCHA/email implementation | Active for M2 |
| D-022 | 2026-06-25 | Make Milestone 3 the Exhibitions page instead of Press                                | Prioritizes exhibition navigation and empty states before Press       | Active        |
| D-023 | 2026-06-25 | Use clear empty states for exhibition sections until real content is available        | Avoids inventing exhibition entries                                   | Active for M3 |
| D-024 | 2026-06-26 | Track material user-requested changes in `docs/project/change-requests.md`            | Creates a dedicated log for scope, design, process, and rework items  | Active        |
| D-025 | 2026-06-26 | Defer Milestone 4 Press and start Milestone 5 Portfolio                               | Prioritizes image gallery and carousel implementation before Press    | Active        |
| D-026 | 2026-06-26 | Keep temporary Portfolio test images in ignored `public/artwork-local/`               | Allows local gallery testing without checking test artwork into Git   | Active for M5 |

## Adding a decision

Add a new row with:

- Next sequential ID
- Decision date
- Concise decision statement
- Reason and affected scope
- Status: `Proposed`, `Active`, `Superseded`, or `Reversed`

If a decision changes, add a new decision and mark the previous one `Superseded`; preserve the original record.
