# Project Status

**Last updated:** July 18, 2026  
**Current phase:** Milestone 7 implementation in progress  
**Current milestone:** Milestone 7 — AWS Deployment and Cloud Portfolio Images (in progress)

## Milestone overview

| Milestone | Scope                                          | Status      | Tasks | Progress | Plan                                        |
| --------- | ---------------------------------------------- | ----------- | ----: | -------: | ------------------------------------------- |
| M1        | Desktop Home page and local project foundation | Complete    | 28/28 |     100% | [Milestone 1](../milestones/milestone-1.md) |
| M2        | Contacts page                                  | Complete    | 16/16 |     100% | [Milestone 2](../milestones/milestone-2.md) |
| M3        | Exhibitions page and section controls          | Complete    | 18/18 |     100% | [Milestone 3](../milestones/milestone-3.md) |
| M4        | Press page                                     | Deferred    |     — |        — | To be created later                         |
| M5        | Portfolio gallery and carousel                 | Complete    | 22/22 |     100% | [Milestone 5](../milestones/milestone-5.md) |
| M6        | Resume                                         | Planned     |     — |        — | To be created                               |
| M7        | AWS deployment and cloud Portfolio images      | In progress | 31/43 |      72% | [Milestone 7](../milestones/milestone-7.md) |

Future milestone boundaries are provisional until their plans are approved.

## Status definitions

| Status      | Meaning                                                                  |
| ----------- | ------------------------------------------------------------------------ |
| Planned     | Scope is known at a high level, but the plan is not approved             |
| Ready       | Plan, decisions, and acceptance criteria are approved                    |
| In progress | Implementation has started                                               |
| Blocked     | Progress cannot continue without a decision or external change           |
| Complete    | All acceptance criteria are verified and completion evidence is recorded |

## Current milestone summary

### Milestone 7 — AWS Deployment and Cloud Portfolio Images

- **Status:** In progress
- **Progress source:** Checked implementation tasks in [Milestone 7](../milestones/milestone-7.md)
- **Target:** Desktop web browsers only
- **Open blockers:** Amplify URL and build status are needed before public verification.
- **Deferred:** Custom domain, contact form backend, mailing-list backend, CAPTCHA, SES, and final image optimization pipeline
- **Next action:** Record the Amplify URL/build status and verify the deployed Portfolio carousel against the latest manifest-backed artwork sections.

## Project-level open decisions

- Final domain and AWS account ownership
- Final content schemas and ordering
- Final Home artwork
- Final résumé behavior
- Exhibition route presentation
- Image dimensions and repository-size budget
- Budget and launch date
- Final Portfolio image hosting strategy

See the [Decision log](./decisions.md) for resolved decisions and [Project process](./process.md) for update rules.

## Recent progress

| Date       | Update                                                      |
| ---------- | ----------------------------------------------------------- |
| 2026-07-18 | Justified Home artist statement body text                   |
| 2026-07-18 | Added final Home artist statement text                      |
| 2026-07-18 | Removed Home carousel heading and caption                   |
| 2026-07-18 | Fixed Home carousel CSS to use explicit square image size   |
| 2026-07-18 | Moved Home carousel above statement and centered it         |
| 2026-07-18 | Made Home carousel source artwork asset square              |
| 2026-07-18 | Made Home carousel image square and smaller                 |
| 2026-07-18 | Added separate compact Home carousel beside statement       |
| 2026-07-14 | Removed availability value restriction from Portfolio data  |
| 2026-07-14 | Fixed invalid Portfolio manifest availability values        |
| 2026-07-09 | Sorted all Portfolio sections newest first by artwork year  |
| 2026-07-09 | Changed Exhibitions to page sections without header submenu |
| 2026-07-09 | Wired Portfolio to local manifest data source               |
| 2026-07-09 | Added Other Portfolio section/tab                           |
| 2026-07-09 | Added Portfolio UI status metadata display                  |
| 2026-07-09 | Simplified manifest availability to only `available`        |
| 2026-07-09 | Designed proposed S3 Portfolio manifest format              |
| 2026-07-09 | Removed deleted Still life image from Portfolio metadata    |
| 2026-07-07 | Added Portfolio metadata fields and display                 |
| 2026-07-07 | Sorted Still life Portfolio images newest-first by year     |
| 2026-07-04 | Added 18 Still life S3 image URLs to Portfolio metadata     |
| 2026-07-04 | Aligned Exhibitions and Portfolio section submenu styling   |
| 2026-07-04 | Added Portfolio Landscapes and Still life section change    |
| 2026-06-28 | Owner reported AWS Amplify deployment was created           |
| 2026-06-28 | Verified local format, Astro check, and production build    |
| 2026-06-28 | Started Milestone 7 and added Amplify/image runbooks        |
| 2026-06-28 | Created Milestone 7 AWS deployment plan                     |
| 2026-06-26 | Fixed local 404 asset requests for Home and touch icons     |
| 2026-06-26 | Milestone 5 Portfolio completed after live browser tests    |
| 2026-06-26 | Implemented Portfolio gallery with local-only test images   |
| 2026-06-26 | Deferred Milestone 4 and started Milestone 5 Portfolio      |
| 2026-06-26 | Fixed CR-005 vertical Exhibitions header submenu            |
| 2026-06-26 | Added project change-request tracking document              |
| 2026-06-25 | Updated Exhibitions header submenu toward Hockney style     |
| 2026-06-25 | Milestone 3 Exhibitions pages completed and verified        |
| 2026-06-25 | Milestone 3 Exhibitions implementation started              |
| 2026-06-25 | Reduced Contacts page subheading font sizes                 |
| 2026-06-25 | Milestone 2 Contacts page completed and verified            |
| 2026-06-25 | Milestone 2 Contacts implementation started                 |
| 2026-06-25 | Updated header wordmark casing to `Yulia Balenko`           |
| 2026-06-25 | Added approved Facebook page link to the footer             |
| 2026-06-24 | Project documents reorganized under `docs/`                 |
| 2026-06-24 | Milestone 1 completed; all original tasks verified          |
| 2026-06-24 | Astro Home page and five placeholder routes implemented     |
| 2026-06-24 | Milestone 1 implementation started                          |
| 2026-06-24 | Milestone 1 plan approved and ready for implementation      |
| 2026-06-24 | Project tracking and agent workflow created                 |
