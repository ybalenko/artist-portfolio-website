# Project Status

**Last updated:** July 19, 2026  
**Current phase:** Milestone 8 implementation in progress  
**Current milestone:** Milestone 8 — Protected Leave a message form (in progress)

## Milestone overview

| Milestone | Scope                                          | Status      | Tasks | Progress | Plan                                        |
| --------- | ---------------------------------------------- | ----------- | ----: | -------: | ------------------------------------------- |
| M1        | Desktop Home page and local project foundation | Complete    | 28/28 |     100% | [Milestone 1](../milestones/milestone-1.md) |
| M2        | Contacts page                                  | Complete    | 16/16 |     100% | [Milestone 2](../milestones/milestone-2.md) |
| M3        | Exhibitions scaffold and section controls      | Complete    | 18/18 |     100% | [Milestone 3](../milestones/milestone-3.md) |
| M5        | Portfolio gallery and carousel                 | Complete    | 22/22 |     100% | [Milestone 5](../milestones/milestone-5.md) |
| M6        | Resume PDF navigation                          | Complete    |   6/6 |     100% | [Milestone 6](../milestones/milestone-6.md) |
| M7        | AWS deployment and cloud Portfolio images      | Blocked     | 31/43 |      72% | [Milestone 7](../milestones/milestone-7.md) |
| M8        | Protected Leave a message form                 | In progress | 42/49 |      86% | [Milestone 8](../milestones/milestone-8.md) |

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

### Milestone 8 — Protected Leave a message form

- **Status:** In progress
- **Progress source:** Checked implementation tasks in [Milestone 8](../milestones/milestone-8.md)
- **Target:** Desktop web browsers only
- **Open blockers:** Contact API deployment is paused; generated API URL and Amplify `PUBLIC_CONTACT_API_URL` configuration are still needed before the form can send messages.
- **Deferred:** Visible mailing-list signup, Turnstile/CAPTCHA bot protection, mailing-list backend, subscriber storage, newsletter workflow, and final image optimization pipeline
- **Next action:** When ready, deploy the contact API stack from AWS CloudShell or another AWS-configured CDK environment, then configure Amplify with the generated `PUBLIC_CONTACT_API_URL`.

### Milestone 7 — AWS Deployment and Cloud Portfolio Images

- **Status:** Blocked pending public deployment evidence
- **Progress source:** Checked implementation tasks in [Milestone 7](../milestones/milestone-7.md)
- **Target:** Desktop web browsers only
- **Open blockers:** Amplify URL and build status are needed before public verification.
- **Deferred:** Final image optimization pipeline
- **Next action:** Record the Amplify URL/build status and verify the deployed Portfolio page, Resume PDF navigation, and disabled Exhibitions fallback.

## Project-level open decisions

- Amplify custom-domain public verification evidence
- Contact API deployment approval and generated API URL
- Final content schemas and ordering
- Final Home carousel S3 image set
- Final résumé PDF replacement workflow
- Exhibitions content update workflow and re-enable timing
- Image dimensions and repository-size budget
- Budget and launch date
- Final Portfolio image hosting strategy
- SES sandbox production-access need after deployed delivery testing

See the [Decision log](./decisions.md) for resolved decisions and [Project process](./process.md) for update rules.

## Recent progress

| Date       | Update                                                        |
| ---------- | ------------------------------------------------------------- |
| 2026-07-19 | Paused CDK deployment; no AWS resources were created locally  |
| 2026-07-19 | Confirmed SES sender identity verification                    |
| 2026-07-19 | Confirmed private SSM contact parameters exist                |
| 2026-07-19 | Added domain contact email enhancement to backlog             |
| 2026-07-19 | Added CDK contact API backend infrastructure                  |
| 2026-07-19 | Fixed Contacts Notice eyebrow font treatment                  |
| 2026-07-19 | Restored Contacts Notice eyebrow and removed Notice header    |
| 2026-07-19 | Refined Contacts Notice heading hierarchy and casing          |
| 2026-07-19 | Consolidated Contacts notices and hid mailing-list section    |
| 2026-07-19 | Marked Contacts required fields and refreshed notices         |
| 2026-07-19 | Removed Turnstile requirement from current contact form scope |
| 2026-07-19 | Started Milestone 8 protected Leave a message form            |
| 2026-07-19 | Added Contacts form config and setup runbook                  |
| 2026-07-19 | Revised main README project status summary                    |
| 2026-07-19 | Refreshed README and project docs for latest Home/footer UI   |
| 2026-07-19 | Made footer Facebook icon blue and more visible               |
| 2026-07-19 | Added Home artist portrait beside buttonless carousel         |
| 2026-07-19 | Removed duplicate Home statement heading and boxed text       |
| 2026-07-19 | Changed Home carousel arrows to angle characters              |
| 2026-07-19 | Changed Home carousel controls to borderless arrows           |
| 2026-07-19 | Disabled Exhibitions with feature flag and added backlog      |
| 2026-07-19 | Added completed Milestone 6 Resume PDF navigation plan        |
| 2026-07-19 | Changed Resume navigation to open PDF in a new tab            |
| 2026-07-19 | Verified public S3 résumé PDF URL                             |
| 2026-07-19 | Added static Resume page with S3 PDF link                     |
| 2026-07-19 | Fixed Home carousel button color cascade                      |
| 2026-07-19 | Set exact Home carousel button inactive and hover colors      |
| 2026-07-19 | Updated Home carousel hover buttons to red background         |
| 2026-07-19 | Inverted Home carousel button colors                          |
| 2026-07-19 | Matched Home carousel controls to Portfolio button styling    |
| 2026-07-19 | Added Home page eyebrow and page title                        |
| 2026-07-19 | Removed Press from current website scope and navigation       |
| 2026-07-19 | Moved Home carousel side controls outside the image           |
| 2026-07-19 | Moved Home carousel controls to left and right image edges    |
| 2026-07-19 | Published seven S3 Home carousel images                       |
| 2026-07-19 | Updated Home carousel S3 prefix to `portfolio/home-carousel/` |
| 2026-07-19 | Switched Home carousel image storage from GitHub to S3        |
| 2026-07-18 | Added dedicated Home carousel image upload folder             |
| 2026-07-18 | Justified Home artist statement body text                     |
| 2026-07-18 | Added final Home artist statement text                        |
| 2026-07-18 | Removed Home carousel heading and caption                     |
| 2026-07-18 | Fixed Home carousel CSS to use explicit square image size     |
| 2026-07-18 | Moved Home carousel above statement and centered it           |
| 2026-07-18 | Made Home carousel source artwork asset square                |
| 2026-07-18 | Made Home carousel image square and smaller                   |
| 2026-07-18 | Added separate compact Home carousel beside statement         |
| 2026-07-14 | Removed availability value restriction from Portfolio data    |
| 2026-07-14 | Fixed invalid Portfolio manifest availability values          |
| 2026-07-09 | Sorted all Portfolio sections newest first by artwork year    |
| 2026-07-09 | Changed Exhibitions to page sections without header submenu   |
| 2026-07-09 | Wired Portfolio to local manifest data source                 |
| 2026-07-09 | Added Other Portfolio section/tab                             |
| 2026-07-09 | Added Portfolio UI status metadata display                    |
| 2026-07-09 | Simplified manifest availability to only `available`          |
| 2026-07-09 | Designed proposed S3 Portfolio manifest format                |
| 2026-07-09 | Removed deleted Still life image from Portfolio metadata      |
| 2026-07-07 | Added Portfolio metadata fields and display                   |
| 2026-07-07 | Sorted Still life Portfolio images newest-first by year       |
| 2026-07-04 | Added 18 Still life S3 image URLs to Portfolio metadata       |
| 2026-07-04 | Aligned Exhibitions and Portfolio section submenu styling     |
| 2026-07-04 | Added Portfolio Landscapes and Still life section change      |
| 2026-06-28 | Owner reported AWS Amplify deployment was created             |
| 2026-06-28 | Verified local format, Astro check, and production build      |
| 2026-06-28 | Started Milestone 7 and added Amplify/image runbooks          |
| 2026-06-28 | Created Milestone 7 AWS deployment plan                       |
| 2026-06-26 | Fixed local 404 asset requests for Home and touch icons       |
| 2026-06-26 | Milestone 5 Portfolio completed after live browser tests      |
| 2026-06-26 | Implemented Portfolio gallery with local-only test images     |
| 2026-06-26 | Deferred Milestone 4 and started Milestone 5 Portfolio        |
| 2026-06-26 | Fixed CR-005 vertical Exhibitions header submenu              |
| 2026-06-26 | Added project change-request tracking document                |
| 2026-06-25 | Updated Exhibitions header submenu toward Hockney style       |
| 2026-06-25 | Milestone 3 Exhibitions pages completed and verified          |
| 2026-06-25 | Milestone 3 Exhibitions implementation started                |
| 2026-06-25 | Reduced Contacts page subheading font sizes                   |
| 2026-06-25 | Milestone 2 Contacts page completed and verified              |
| 2026-06-25 | Milestone 2 Contacts implementation started                   |
| 2026-06-25 | Updated header wordmark casing to `Yulia Balenko`             |
| 2026-06-25 | Added approved Facebook page link to the footer               |
| 2026-06-24 | Project documents reorganized under `docs/`                   |
| 2026-06-24 | Milestone 1 completed; all original tasks verified            |
| 2026-06-24 | Astro Home page and five placeholder routes implemented       |
| 2026-06-24 | Milestone 1 implementation started                            |
| 2026-06-24 | Milestone 1 plan approved and ready for implementation        |
| 2026-06-24 | Project tracking and agent workflow created                   |
