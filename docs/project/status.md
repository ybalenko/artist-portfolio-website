# Project Status

**Last updated:** July 4, 2026  
**Current phase:** Milestone 7 implementation in progress  
**Current milestone:** Milestone 7 — AWS Deployment and Cloud Portfolio Images (in progress)

## Milestone overview

| Milestone | Scope                                          | Status      | Tasks | Progress | Plan                                        |
| --------- | ---------------------------------------------- | ----------- | ----: | -------: | ------------------------------------------- |
| M1        | Desktop Home page and local project foundation | Complete    | 28/28 |     100% | [Milestone 1](../milestones/milestone-1.md) |
| M2        | Contacts page                                  | Complete    | 16/16 |     100% | [Milestone 2](../milestones/milestone-2.md) |
| M3        | Exhibitions pages and submenu                  | Complete    | 18/18 |     100% | [Milestone 3](../milestones/milestone-3.md) |
| M4        | Press page                                     | Deferred    |     — |        — | To be created later                         |
| M5        | Portfolio gallery and carousel                 | Complete    | 22/22 |     100% | [Milestone 5](../milestones/milestone-5.md) |
| M6        | Resume                                         | Planned     |     — |        — | To be created                               |
| M7        | AWS deployment and cloud Portfolio images      | In progress | 22/42 |      52% | [Milestone 7](../milestones/milestone-7.md) |

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
- **Open blockers:** Amplify URL and build status are needed before public verification. S3 image storage still requires owner action or explicit approval before external changes.
- **Deferred:** Custom domain, contact form backend, mailing-list backend, CAPTCHA, SES, and final image optimization pipeline
- **Next action:** Add Landscape cloud image URLs, then record the Amplify URL/build status and verify public routes.

## Project-level open decisions

- Final domain and AWS account ownership
- Final content schemas and ordering
- Final Home statement and artwork
- Final résumé behavior
- Exhibition route presentation
- Image dimensions and repository-size budget
- Budget and launch date
- Final Portfolio image hosting strategy

See the [Decision log](./decisions.md) for resolved decisions and [Project process](./process.md) for update rules.

## Recent progress

| Date       | Update                                                    |
| ---------- | --------------------------------------------------------- |
| 2026-07-04 | Added 18 Still life S3 image URLs to Portfolio metadata   |
| 2026-07-04 | Aligned Exhibitions and Portfolio section submenu styling |
| 2026-07-04 | Added Portfolio Landscapes and Still life section change  |
| 2026-06-28 | Owner reported AWS Amplify deployment was created         |
| 2026-06-28 | Verified local format, Astro check, and production build  |
| 2026-06-28 | Started Milestone 7 and added Amplify/image runbooks      |
| 2026-06-28 | Created Milestone 7 AWS deployment plan                   |
| 2026-06-26 | Fixed local 404 asset requests for Home and touch icons   |
| 2026-06-26 | Milestone 5 Portfolio completed after live browser tests  |
| 2026-06-26 | Implemented Portfolio gallery with local-only test images |
| 2026-06-26 | Deferred Milestone 4 and started Milestone 5 Portfolio    |
| 2026-06-26 | Fixed CR-005 vertical Exhibitions header submenu          |
| 2026-06-26 | Added project change-request tracking document            |
| 2026-06-25 | Updated Exhibitions header submenu toward Hockney style   |
| 2026-06-25 | Milestone 3 Exhibitions pages completed and verified      |
| 2026-06-25 | Milestone 3 Exhibitions implementation started            |
| 2026-06-25 | Reduced Contacts page subheading font sizes               |
| 2026-06-25 | Milestone 2 Contacts page completed and verified          |
| 2026-06-25 | Milestone 2 Contacts implementation started               |
| 2026-06-25 | Updated header wordmark casing to `Yulia Balenko`         |
| 2026-06-25 | Added approved Facebook page link to the footer           |
| 2026-06-24 | Project documents reorganized under `docs/`               |
| 2026-06-24 | Milestone 1 completed; all original tasks verified        |
| 2026-06-24 | Astro Home page and five placeholder routes implemented   |
| 2026-06-24 | Milestone 1 implementation started                        |
| 2026-06-24 | Milestone 1 plan approved and ready for implementation    |
| 2026-06-24 | Project tracking and agent workflow created               |
