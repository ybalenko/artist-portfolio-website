# Project Status

**Last updated:** October 9, 2026
**Current phase:** Milestone 8 configured-form verification and deployment readiness
**Current milestone:** Milestone 8 — Protected Leave a message form (In progress); M9 browser coverage remains unfinished

## Milestone overview

| Milestone | Scope                                          | Status      | Tasks | Progress | Plan                                        |
| --------- | ---------------------------------------------- | ----------- | ----: | -------: | ------------------------------------------- |
| M1        | Desktop Home page and local project foundation | Complete    | 28/28 |     100% | [Milestone 1](../milestones/milestone-1.md) |
| M2        | Contacts page                                  | Complete    | 16/16 |     100% | [Milestone 2](../milestones/milestone-2.md) |
| M3        | Exhibitions scaffold and section controls      | Complete    | 18/18 |     100% | [Milestone 3](../milestones/milestone-3.md) |
| M5        | Portfolio gallery and carousel                 | Complete    | 22/22 |     100% | [Milestone 5](../milestones/milestone-5.md) |
| M6        | Resume PDF navigation                          | Complete    |   6/6 |     100% | [Milestone 6](../milestones/milestone-6.md) |
| M7        | AWS deployment and cloud Portfolio images      | Blocked     | 31/43 |      72% | [Milestone 7](../milestones/milestone-7.md) |
| M8        | Protected Leave a message form                 | In progress | 52/57 |      91% | [Milestone 8](../milestones/milestone-8.md) |
| M9        | Automated website testing with Playwright      | In progress | 14/24 |      58% | [Milestone 9](../milestones/milestone-9.md) |

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
- **Target:** Responsive mobile and desktop browsers
- **Open blockers:** The bypassable throttle and missing gateway/concurrency controls are fixed locally and await deployed verification. Dependency finding CF-SEC-002 is closed after a zero-vulnerability audit. CF-SEC-003 through CF-SEC-005 are fixed locally and CF-SEC-006 is closed; 28 backend/infrastructure tests and 21 configured-form browser checks pass. Live gateway throttling/size/CORS, SES policy/sender, delivery, and log/storage verification remain pending. AWS/Amplify configuration remains open; the contact API must not be deployed yet.
- **Deferred:** Visible mailing-list signup, Turnstile/CAPTCHA bot protection, mailing-list backend, subscriber storage, newsletter workflow, and final image optimization pipeline
- **Next action:** After separate deployment approval, deploy and configure the API URL in Amplify, then verify SES permission/sender alignment, request-size rejection, direct-client throttling, CORS, delivery, and log/storage privacy. Confirm whether SES sandbox exit is needed.

### Milestone 7 — AWS Deployment and Cloud Portfolio Images

- **Status:** Blocked pending public deployment evidence
- **Progress source:** Checked implementation tasks in [Milestone 7](../milestones/milestone-7.md)
- **Target:** Desktop web browsers only
- **Open blockers:** Amplify URL and build status are needed before public verification.
- **Deferred:** Final image optimization pipeline
- **Next action:** Record the Amplify URL/build status and verify the deployed Portfolio page, Resume PDF navigation, and disabled Exhibitions fallback.

### Milestone 9 — Automated Website Testing with Playwright

- **Status:** In progress; owner approved starting with Home page tests using POM. M8 retains unfinished backend work.
- **Progress source:** Checked implementation tasks in [Milestone 9](../milestones/milestone-9.md), currently 14/24 (58%).
- **Target:** Browser regression tests for current public pages and responsive layouts, with mocked Contacts API responses and local/pull-request CI execution.
- **Open blockers:** Earlier GitHub pull-request runs succeeded; the updated flaky-test policy and configured Contacts CI step await a remote run and artifact inspection. Making the job a required merge check needs a GitHub repository setting. Existing M7 deployment and M8 backend blockers remain in their milestones; other page coverage is unfinished M9 work.
- **Boundary:** Backend security tests, infrastructure assertions, deployed API checks, and real SES delivery verification stay in M8.
- **Next action:** Verify the updated workflow on GitHub and inspect its artifacts after an approved push; configure the required `main` status check separately. Continue Resume, disabled Exhibitions, and remaining unconfigured Contacts journeys.

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

Known defects and verification status are indexed in the [defect log](./defects.md). Creating the log does not change milestone progress, blockers, or next implementation actions.

See the [Decision log](./decisions.md) for resolved decisions and [Project process](./process.md) for update rules.

## Recent progress

| Date       | Update                                                                                                                                                                            |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-09 | Security-audited configured Contacts tests: strict browser-context request guard and 413/429 cases; 21/21 pass with no retries. Deployed checks still pending.                    |
| 2026-10-09 | Configured Contacts test API suite passed 15/15 across three Chrome projects; corrected HTTP 400 feedback. M8 52/57 (91%); M9 14/24 (58%). CI configured suite awaits remote run. |
| 2026-10-09 | Added security-boundary and infrastructure tests (28/28 pass); corrected AWS/mailbox Privacy Notice. M8 50/57 (88%); deployed checks pending.                                     |
| 2026-10-09 | Narrowed contact SES permission to a selected identity ARN and exact From address; 21 tests and CDK synthesis pass. M8 50/57 (88%); deployed verification pending.                |
| 2026-10-09 | Security review: 20 tests and 266 independent size checks pass; no size bypass found. Live CF-SEC-003 verification remains pending.                                               |
| 2026-10-09 | Added 32 KiB pre-parse body rejection; 20 backend tests pass. M8 47/57 (82%); live size checks pending.                                                                           |
| 2026-10-09 | Closed dependency finding CF-SEC-002: zero audit vulnerabilities, clean install/build/synthesis, six backend tests and all 207 browser tests passed; M8 resumes at 46/57 (81%).   |
| 2026-09-09 | Passed all 207 Playwright regressions; closed DEF-001                                                                                                                             |
| 2026-09-09 | Moved regression testing skill into the project only                                                                                                                              |
| 2026-09-09 | Created central defect log with M9 regressions and M8 security findings                                                                                                           |
| 2026-09-09 | Moved shared CI guidance to a separate testing document                                                                                                                           |
| 2026-09-09 | Verified CI rejects flaky tests with temporary retry emulation                                                                                                                    |
| 2026-09-08 | Stabilized HOME-17 reduced-motion event synchronization                                                                                                                           |
| 2026-09-08 | Passed 87 Portfolio tests and fixed mobile carousel controls                                                                                                                      |
| 2026-09-08 | Defined 29 Portfolio page Playwright scenarios using POM                                                                                                                          |
| 2026-09-07 | Added GitHub pull-request CI for the Home Playwright suite                                                                                                                        |
| 2026-09-07 | Passed 66 Home tests across three installed-Chrome configurations                                                                                                                 |
| 2026-09-07 | Fixed Home carousel response to a changed reduced-motion setting                                                                                                                  |
| 2026-09-07 | Started M9 Home POM tests using installed Chrome                                                                                                                                  |
| 2026-09-07 | Adopted POM for M9 browser tests; refined requirements and plan                                                                                                                   |
| 2026-09-07 | Planned M9 Playwright browser testing; kept backend testing in M8                                                                                                                 |
| 2026-08-22 | Removed origin from contact throttle and added regression tests                                                                                                                   |
| 2026-08-22 | Fixed bypassable contact throttle and added infrastructure limits                                                                                                                 |
| 2026-08-22 | Documented contact-form security review and release blockers                                                                                                                      |
| 2026-07-21 | Improved responsive layout for current public pages                                                                                                                               |
| 2026-07-19 | Rewrote Contacts Contact messages notice in plain English                                                                                                                         |
| 2026-07-19 | Paused CDK deployment; no AWS resources were created locally                                                                                                                      |
| 2026-07-19 | Confirmed SES sender identity verification                                                                                                                                        |
| 2026-07-19 | Confirmed private SSM contact parameters exist                                                                                                                                    |
| 2026-07-19 | Added domain contact email enhancement to backlog                                                                                                                                 |
| 2026-07-19 | Added CDK contact API backend infrastructure                                                                                                                                      |
| 2026-07-19 | Fixed Contacts Notice eyebrow font treatment                                                                                                                                      |
| 2026-07-19 | Restored Contacts Notice eyebrow and removed Notice header                                                                                                                        |
| 2026-07-19 | Refined Contacts Notice heading hierarchy and casing                                                                                                                              |
| 2026-07-19 | Consolidated Contacts notices and hid mailing-list section                                                                                                                        |
| 2026-07-19 | Marked Contacts required fields and refreshed notices                                                                                                                             |
| 2026-07-19 | Removed Turnstile requirement from current contact form scope                                                                                                                     |
| 2026-07-19 | Started Milestone 8 protected Leave a message form                                                                                                                                |
| 2026-07-19 | Added Contacts form config and setup runbook                                                                                                                                      |
| 2026-07-19 | Revised main README project status summary                                                                                                                                        |
| 2026-07-19 | Refreshed README and project docs for latest Home/footer UI                                                                                                                       |
| 2026-07-19 | Made footer Facebook icon blue and more visible                                                                                                                                   |
| 2026-07-19 | Added Home artist portrait beside buttonless carousel                                                                                                                             |
| 2026-07-19 | Removed duplicate Home statement heading and boxed text                                                                                                                           |
| 2026-07-19 | Changed Home carousel arrows to angle characters                                                                                                                                  |
| 2026-07-19 | Changed Home carousel controls to borderless arrows                                                                                                                               |
| 2026-07-19 | Disabled Exhibitions with feature flag and added backlog                                                                                                                          |
| 2026-07-19 | Added completed Milestone 6 Resume PDF navigation plan                                                                                                                            |
| 2026-07-19 | Changed Resume navigation to open PDF in a new tab                                                                                                                                |
| 2026-07-19 | Verified public S3 résumé PDF URL                                                                                                                                                 |
| 2026-07-19 | Added static Resume page with S3 PDF link                                                                                                                                         |
| 2026-07-19 | Fixed Home carousel button color cascade                                                                                                                                          |
| 2026-07-19 | Set exact Home carousel button inactive and hover colors                                                                                                                          |
| 2026-07-19 | Updated Home carousel hover buttons to red background                                                                                                                             |
| 2026-07-19 | Inverted Home carousel button colors                                                                                                                                              |
| 2026-07-19 | Matched Home carousel controls to Portfolio button styling                                                                                                                        |
| 2026-07-19 | Added Home page eyebrow and page title                                                                                                                                            |
| 2026-07-19 | Removed Press from current website scope and navigation                                                                                                                           |
| 2026-07-19 | Moved Home carousel side controls outside the image                                                                                                                               |
| 2026-07-19 | Moved Home carousel controls to left and right image edges                                                                                                                        |
| 2026-07-19 | Published seven S3 Home carousel images                                                                                                                                           |
| 2026-07-19 | Updated Home carousel S3 prefix to `portfolio/home-carousel/`                                                                                                                     |
| 2026-07-19 | Switched Home carousel image storage from GitHub to S3                                                                                                                            |
| 2026-07-18 | Added dedicated Home carousel image upload folder                                                                                                                                 |
| 2026-07-18 | Justified Home artist statement body text                                                                                                                                         |
| 2026-07-18 | Added final Home artist statement text                                                                                                                                            |
| 2026-07-18 | Removed Home carousel heading and caption                                                                                                                                         |
| 2026-07-18 | Fixed Home carousel CSS to use explicit square image size                                                                                                                         |
| 2026-07-18 | Moved Home carousel above statement and centered it                                                                                                                               |
| 2026-07-18 | Made Home carousel source artwork asset square                                                                                                                                    |
| 2026-07-18 | Made Home carousel image square and smaller                                                                                                                                       |
| 2026-07-18 | Added separate compact Home carousel beside statement                                                                                                                             |
| 2026-07-14 | Removed availability value restriction from Portfolio data                                                                                                                        |
| 2026-07-14 | Fixed invalid Portfolio manifest availability values                                                                                                                              |
| 2026-07-09 | Sorted all Portfolio sections newest first by artwork year                                                                                                                        |
| 2026-07-09 | Changed Exhibitions to page sections without header submenu                                                                                                                       |
| 2026-07-09 | Wired Portfolio to local manifest data source                                                                                                                                     |
| 2026-07-09 | Added Other Portfolio section/tab                                                                                                                                                 |
| 2026-07-09 | Added Portfolio UI status metadata display                                                                                                                                        |
| 2026-07-09 | Simplified manifest availability to only `available`                                                                                                                              |
| 2026-07-09 | Designed proposed S3 Portfolio manifest format                                                                                                                                    |
| 2026-07-09 | Removed deleted Still life image from Portfolio metadata                                                                                                                          |
| 2026-07-07 | Added Portfolio metadata fields and display                                                                                                                                       |
| 2026-07-07 | Sorted Still life Portfolio images newest-first by year                                                                                                                           |
| 2026-07-04 | Added 18 Still life S3 image URLs to Portfolio metadata                                                                                                                           |
| 2026-07-04 | Aligned Exhibitions and Portfolio section submenu styling                                                                                                                         |
| 2026-07-04 | Added Portfolio Landscapes and Still life section change                                                                                                                          |
| 2026-06-28 | Owner reported AWS Amplify deployment was created                                                                                                                                 |
| 2026-06-28 | Verified local format, Astro check, and production build                                                                                                                          |
| 2026-06-28 | Started Milestone 7 and added Amplify/image runbooks                                                                                                                              |
| 2026-06-28 | Created Milestone 7 AWS deployment plan                                                                                                                                           |
| 2026-06-26 | Fixed local 404 asset requests for Home and touch icons                                                                                                                           |
| 2026-06-26 | Milestone 5 Portfolio completed after live browser tests                                                                                                                          |
| 2026-06-26 | Implemented Portfolio gallery with local-only test images                                                                                                                         |
| 2026-06-26 | Deferred Milestone 4 and started Milestone 5 Portfolio                                                                                                                            |
| 2026-06-26 | Fixed CR-005 vertical Exhibitions header submenu                                                                                                                                  |
| 2026-06-26 | Added project change-request tracking document                                                                                                                                    |
| 2026-06-25 | Updated Exhibitions header submenu toward Hockney style                                                                                                                           |
| 2026-06-25 | Milestone 3 Exhibitions pages completed and verified                                                                                                                              |
| 2026-06-25 | Milestone 3 Exhibitions implementation started                                                                                                                                    |
| 2026-06-25 | Reduced Contacts page subheading font sizes                                                                                                                                       |
| 2026-06-25 | Milestone 2 Contacts page completed and verified                                                                                                                                  |
| 2026-06-25 | Milestone 2 Contacts implementation started                                                                                                                                       |
| 2026-06-25 | Updated header wordmark casing to `Yulia Balenko`                                                                                                                                 |
| 2026-06-25 | Added approved Facebook page link to the footer                                                                                                                                   |
| 2026-06-24 | Project documents reorganized under `docs/`                                                                                                                                       |
| 2026-06-24 | Milestone 1 completed; all original tasks verified                                                                                                                                |
| 2026-06-24 | Astro Home page and five placeholder routes implemented                                                                                                                           |
| 2026-06-24 | Milestone 1 implementation started                                                                                                                                                |
| 2026-06-24 | Milestone 1 plan approved and ready for implementation                                                                                                                            |
| 2026-06-24 | Project tracking and agent workflow created                                                                                                                                       |
