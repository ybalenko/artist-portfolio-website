# Project Documentation

This folder contains the working documentation for the Yulia Balenko artist portfolio website.

Current project state: Milestones 1, 2, 3, 5, and 6 are complete. Press is out of scope and Exhibitions remains disabled. M7 is blocked at **31/43 tasks (72%)** pending Amplify evidence. M8 protected Leave a message is at **52/57 tasks (91%)**: 28 backend/infrastructure tests and 21 configured-form browser checks pass, with deployed security, SES delivery, and privacy checks pending. M9 Playwright testing is at **14/24 tasks (58%)**: 207 Home/Portfolio/shared-layout cases and a separate 21-case configured Contacts suite passed locally across three Chrome projects. The configured CI step awaits remote verification. Turnstile/CAPTCHA and mailing-list signup remain deferred.

Local setup requires Node 22.13.0 or newer in the Node 22 line and npm 10; see the root README.

## Requirements

- [Business requirements](./requirements/business.md)
- [Technical requirements](./requirements/technical.md)

## Architecture

- [High-level design](./architecture/high-level-design.md)

## Security

- [Contact form security review](./security/contact-form-review.md)

## Project management

- [Project status](./project/status.md)
- [Project process](./project/process.md)
- [Defect log](./project/defects.md)
- [Project backlog](./project/backlog.md)
- [Change request log](./project/change-requests.md)
- [Decision log](./project/decisions.md)

## Deployment

- [AWS Amplify deployment runbook](./deployment/aws-amplify.md)
- [Portfolio cloud image runbook](./deployment/portfolio-images.md)
- [Leave a message form runbook](./deployment/contact-form.md)
- [Portfolio manifest design](./deployment/portfolio-manifest.md)
- [Local Portfolio manifest](./deployment/manifest.json)

## Milestones

- [Milestone 1 — Home Page](./milestones/milestone-1.md)
- [Milestone 2 — Contacts Page](./milestones/milestone-2.md)
- [Milestone 3 — Exhibitions Scaffold and Section Controls](./milestones/milestone-3.md)
- [Milestone 5 — Portfolio Gallery and Carousel](./milestones/milestone-5.md)
- [Milestone 6 — Resume PDF Navigation](./milestones/milestone-6.md)
- [Milestone 7 — AWS Deployment and Cloud Portfolio Images](./milestones/milestone-7.md)
- [Milestone 8 — Protected Leave a Message Form](./milestones/milestone-8.md)
- [Milestone 9 — Automated Website Testing with Playwright](./milestones/milestone-9.md)

## Testing

- [Regression testing skill](../.agents/skills/regression-testing/SKILL.md) — invoke `$regression-testing` in this project to run Playwright, summarize results, and track confirmed bugs

- [Shared layout test cases](./testing/shared-layout-test-cases.md) — common header, footer, navigation, and keyboard checks on Home and Portfolio
- [Frontend CI guide](./testing/frontend-ci.md) — shared workflow, flaky-test policy, artifacts, and required merge check

M9 tracks browser setup, coverage, local commands, pull-request CI, and verification. Tests use Page Object Model (POM); see [technical requirements §11](./requirements/technical.md#page-object-model-pom). The [Home](./testing/home-test-cases.md), [Portfolio](./testing/portfolio-test-cases.md), and [shared layout](./testing/shared-layout-test-cases.md) catalogs describe 207 executions across installed Chrome desktop/mobile/tablet projects, all verified locally on October 9. A separate configured Contacts suite adds 21 passing mocked-API executions. [Frontend CI](../.github/workflows/frontend-ci.yml) runs both modes on pull requests to `main` with `--fail-on-flaky-tests`; the new step, artifact inspection, and required-status setting remain unverified remotely. See the [root README](../README.md#local-development) for commands. Resume, disabled Exhibitions, remaining Contacts coverage, Safari manual checks, and later Firefox/WebKit automation remain open. M8 retains backend security, infrastructure, deployed API, real delivery, and privacy tests.

Deferred future work:

- Résumé PDF replacement/versioning workflow
- Mailing-list backend

## Design references

- [Approved Milestone 1 mockup](<./design/mockups/mockup image 01.png>)

## Implemented pages

- Home — default landing page with the final artist statement, a buttonless compact curated carousel, an aligned artist portrait separate from Portfolio artwork, and responsive layout behavior.
- Home carousel and artist portrait images — S3-hosted images belong under the `portfolio/home-carousel/` prefix and are referenced from `src/data/homeCarousel.ts`.
- Contacts — contact page with one consolidated Notice section containing Copyright Notice and Privacy Notice, Facebook link, visibly marked required fields on the Leave a message form, API-gated message delivery, CDK contact API infrastructure, and no visible mailing-list signup; the footer also includes a more visible blue Facebook icon.
- Exhibitions — scaffolded single page with Current, Past, and Upcoming section controls. The public navigation is currently hidden behind `featureFlags.exhibitions` until the content update workflow is decided.
- Portfolio — image gallery and carousel with Landscapes, Still life, and Other sections, selected-image metadata, free-text status metadata, newest-first section ordering, and local-manifest-driven S3 images. Other currently shows an empty state until published manifest images are added.
- Resume — primary navigation opens the S3-hosted résumé PDF in a new browser tab; `/resume/` remains a fallback link page configured from `src/data/resume.ts`.
- Responsive behavior — current public pages adapt across narrow, tablet, and desktop viewports.
- Deployment — `amplify.yml`, AWS Amplify setup notes, and cloud image runbooks are present; Amplify URL/build status still needs to be recorded.

AWS deployment and cloud Portfolio images are blocked pending public verification evidence for Milestone 7. Protected Leave a message delivery is in progress for Milestone 8. Playwright Home and Portfolio browser automation is implemented in Milestone 9 while other page suites remain open. Mailing-list behavior, final résumé PDF replacement workflow, final content curation, and public deployment verification remain planned future work.
