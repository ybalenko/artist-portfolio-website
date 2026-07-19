# Project Documentation

This folder contains the working documentation for the Yulia Balenko artist portfolio website.

Current project state: Milestones 1, 2, 3, 5, and 6 are complete. Press has been removed from the current website scope. Exhibitions are scaffolded but temporarily disabled behind a feature flag. Milestone 7, AWS deployment and cloud Portfolio images, is in progress at **31/43 tasks (72%)**. The next milestone action is to record the Amplify URL/build status and verify the deployed Portfolio page, Resume PDF navigation, and disabled Exhibitions fallback.

## Requirements

- [Business requirements](./requirements/business.md)
- [Technical requirements](./requirements/technical.md)

## Architecture

- [High-level design](./architecture/high-level-design.md)

## Project management

- [Project status](./project/status.md)
- [Project process](./project/process.md)
- [Project backlog](./project/backlog.md)
- [Change request log](./project/change-requests.md)
- [Decision log](./project/decisions.md)

## Deployment

- [AWS Amplify deployment runbook](./deployment/aws-amplify.md)
- [Portfolio cloud image runbook](./deployment/portfolio-images.md)
- [Portfolio manifest design](./deployment/portfolio-manifest.md)
- [Local Portfolio manifest](./deployment/manifest.json)

## Milestones

- [Milestone 1 — Home Page](./milestones/milestone-1.md)
- [Milestone 2 — Contacts Page](./milestones/milestone-2.md)
- [Milestone 3 — Exhibitions Scaffold and Section Controls](./milestones/milestone-3.md)
- [Milestone 5 — Portfolio Gallery and Carousel](./milestones/milestone-5.md)
- [Milestone 6 — Resume PDF Navigation](./milestones/milestone-6.md)
- [Milestone 7 — AWS Deployment and Cloud Portfolio Images](./milestones/milestone-7.md)

Deferred future work:

- Résumé PDF replacement/versioning workflow
- Mailing list and Leave a message backend

## Design references

- [Approved Milestone 1 mockup](<./design/mockups/mockup image 01.png>)

## Implemented pages

- Home — default landing page with the final artist statement and a centered compact curated carousel separate from Portfolio artwork.
- Home carousel images — S3-hosted images belong under the `portfolio/home-carousel/` prefix and are referenced from `src/data/homeCarousel.ts`.
- Contacts — static contact page with draft privacy/copyright sections, Facebook link, disabled message form, and disabled mailing-list signup.
- Exhibitions — scaffolded single page with Current, Past, and Upcoming section controls. The public navigation is currently hidden behind `featureFlags.exhibitions` until the content update workflow is decided.
- Portfolio — image gallery and carousel with Landscapes, Still life, and Other sections, selected-image metadata, free-text status metadata, newest-first section ordering, and local-manifest-driven S3 images. Other currently shows an empty state until published manifest images are added.
- Resume — primary navigation opens the S3-hosted résumé PDF in a new browser tab; `/resume/` remains a fallback link page configured from `src/data/resume.ts`.
- Deployment — `amplify.yml`, AWS Amplify setup notes, and cloud image runbooks are present; Amplify URL/build status still needs to be recorded.

AWS deployment and cloud Portfolio images are in progress for Milestone 7. Backend form wiring, mailing-list behavior, final résumé PDF replacement workflow, final content curation, and public deployment verification remain planned future work.
