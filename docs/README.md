# Project Documentation

This folder contains the working documentation for the Yulia Balenko artist portfolio website.

Current project state: Milestones 1, 2, 3, and 5 are complete. Milestone 4, the Press page, is deferred. Milestone 7, AWS deployment and cloud Portfolio images, is in progress.

## Requirements

- [Business requirements](./requirements/business.md)
- [Technical requirements](./requirements/technical.md)

## Architecture

- [High-level design](./architecture/high-level-design.md)

## Project management

- [Project status](./project/status.md)
- [Project process](./project/process.md)
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
- [Milestone 3 — Exhibitions Page](./milestones/milestone-3.md)
- [Milestone 5 — Portfolio Gallery and Carousel](./milestones/milestone-5.md)
- [Milestone 7 — AWS Deployment and Cloud Portfolio Images](./milestones/milestone-7.md)

Deferred and planned future milestones:

- Milestone 4 — Press Page (deferred)
- Milestone 6 — Resume
- Mailing list and Leave a message backend — deferred to a later iteration

## Design references

- [Approved Milestone 1 mockup](<./design/mockups/mockup image 01.png>)

## Implemented pages

- Home — default landing page with temporary artist statement and artwork.
- Contacts — static contact page with draft privacy/copyright sections, Facebook link, disabled message form, and disabled mailing-list signup.
- Exhibitions — Current, Past, and Upcoming static routes with empty states and a header submenu.
- Portfolio — image gallery and carousel with Landscapes, Still life, and Other sections, selected-image metadata, and local-manifest-driven S3 Still life images. Landscapes and Other currently show empty states until published manifest images are added.

AWS deployment and cloud Portfolio images are in progress for Milestone 7. Press, Resume, backend form wiring, and mailing-list behavior remain planned future work.
