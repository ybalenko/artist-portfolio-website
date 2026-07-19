# Milestone 7 Plan — AWS Deployment and Cloud Portfolio Images

**Status:** In progress  
**Created:** June 28, 2026  
**Milestone goal:** Make the website publicly accessible from an AWS Amplify URL and move Portfolio images from local-only test assets to cloud-hosted image URLs.
**Implementation progress:** 31/43 tasks — 72%

## Confirmed decisions

- Yulia has an AWS account and approves using it for this project.
- No custom domain is needed for this milestone.
- Use the free AWS Amplify-provided URL first; custom domain setup is deferred.
- Use AWS Amplify Hosting for the static Astro website.
- Connect the GitHub repository to Amplify so repository pushes trigger build/deploy.
- Publish Astro's static `dist` output.
- Cloud-host Portfolio images so public visitors can see carousel images after deployment.
- Mailing-list backend, Leave a message backend, CAPTCHA, SES, and contact API are deferred to a later iteration.

## 1. Scope

Milestone 7 includes:

1. Prepare repository deployment configuration for AWS Amplify Hosting.
2. Document the Amplify GitHub connection process.
3. Configure Amplify build settings for Astro.
4. Deploy the current static website to an Amplify-provided public URL.
5. Verify public internet access to core pages.
6. Choose and document the Milestone 7 cloud image approach.
7. Create or configure cloud storage for Portfolio images.
8. Upload test or real Portfolio images to cloud storage.
9. Update Portfolio metadata to use cloud-hosted image URLs.
10. Verify the deployed Portfolio carousel loads cloud images.
11. Document operational steps for future image uploads.
12. Record deployment URL, AWS region, storage location, and known limitations.

## 2. Out of scope

- Custom domain
- Contact form delivery
- Mailing-list signup backend
- CAPTCHA / Turnstile integration
- SES email setup
- API Gateway, Lambda, and DynamoDB
- Browser-based image upload UI
- Automated image processing pipeline
- Final production artwork curation
- Mobile and tablet refinement

## 3. Architecture baseline

```text
GitHub repository
  └─ push to selected branch
      └─ AWS Amplify Hosting
          ├─ npm ci
          ├─ npm run build
          └─ publish dist/
              └─ public Amplify URL

Cloud image storage
  └─ Portfolio image files
      └─ public image URLs
          └─ src/data/portfolio.ts
              └─ deployed Portfolio carousel
```

The Astro deployment guide for AWS confirms this static Amplify path: create an Amplify Hosting project, connect the repository, build with `npm ci` and `npm run build`, publish `dist`, and let Amplify automatically update the website on repository pushes.

## 4. Proposed deployment configuration

Add an `amplify.yml` file:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```

Amplify project settings:

| Setting         | Planned value        |
| --------------- | -------------------- |
| Hosting         | AWS Amplify Hosting  |
| Source provider | GitHub               |
| Branch          | `main`               |
| Build command   | `npm run build`      |
| Install command | `npm ci`             |
| Publish folder  | `dist`               |
| Public URL      | Amplify-provided URL |
| Custom domain   | Deferred             |
| Forms/backend   | Deferred             |
| AWS region      | `us-east-1`          |

## 5. Cloud image approach

### Recommended Milestone 7 approach

Use an S3 bucket or equivalent AWS-hosted public object location for Portfolio images, then reference those URLs from `src/data/portfolio.ts`.

Example:

```ts
{
  id: "painting-001",
  src: "https://example-cloud-image-url/painting-001.jpg",
  alt: "Oil painting by Yulia Balenko",
  width: 1600,
  height: 1200,
}
```

### Upload workflow for this milestone

1. Owner prepares web-sized artwork image files locally.
2. Owner uploads images through AWS Console.
3. Owner copies final public image URLs.
4. Repository metadata is updated in `src/data/portfolio.ts`.
5. Push to GitHub triggers Amplify deployment.
6. Deployed Portfolio carousel loads images from cloud URLs.

### Deferred image workflow

A future milestone may add:

- Private bucket + CloudFront distribution
- Image resizing/optimization
- Upload scripts
- Admin upload UI
- Access-control automation

### Local manifest workflow

Portfolio images and metadata now load from a local manifest at `docs/deployment/manifest.json`.

The manifest format is documented in [Portfolio manifest design](../deployment/portfolio-manifest.md). It keeps the website static because Astro reads and validates the manifest at build time, then generates the same Portfolio page and carousel from JSON data.

S3-hosted manifest loading is not yet implemented. Until then, `src/data/portfolio.ts` reads the local manifest file.

## 6. Implementation plan

### Step 1 — Planning and tracking

- [x] Confirm AWS region.
- [x] Confirm GitHub repository and deployment branch.
- [x] Confirm cloud image storage approach.
- [x] Record Milestone 7 deployment/image decisions.
- [x] Update project status and README summaries.

### Step 2 — Repository deployment readiness

- [x] Add `amplify.yml`.
- [x] Verify `package-lock.json` is committed and suitable for `npm ci`.
- [x] Verify Node/npm versions are acceptable for Amplify build.
- [x] Run local `npm ci` if needed.
- [x] Run local `npm run build`.

### Step 3 — Amplify Hosting setup

- [x] Open AWS Amplify Hosting in AWS Console.
- [x] Create a new Amplify app.
- [x] Connect the GitHub repository.
- [x] Select the deployment branch.
- [x] Review detected build settings or use `amplify.yml`.
- [x] Start the first Amplify build.
- [ ] Record the Amplify app URL.

### Step 4 — Cloud image storage setup

- [x] Create/configure cloud image storage.
- [x] Define image folder/prefix naming convention.
- [x] Upload temporary or real Portfolio image files.
- [x] Confirm image URLs are reachable publicly.
- [x] Record image upload steps for future use.

### Step 5 — Portfolio cloud image migration

- [x] Update `src/data/portfolio.ts` from local `/artwork-local/` paths to cloud image URLs.
- [x] Remove or keep local test-image fallback decision.
- [x] Run `npm run format:check`.
- [x] Run `npm run check`.
- [x] Run `npm run build`.
- [x] Sort published Portfolio images newest first by artwork year across all sections.
- [ ] Push changes after user approval.

### Step 6 — Public verification

- [ ] Verify Amplify public URL loads Home.
- [ ] Verify public navigation works.
- [ ] Verify `/portfolio/` loads.
- [ ] Verify Portfolio images load from cloud URLs.
- [ ] Verify thumbnail selection and carousel controls on the deployed site.
- [ ] Verify Contacts page remains static and forms remain disabled.
- [ ] Verify no mailing-list/contact backend is required in this milestone.

### Step 7 — Documentation and handoff

- [ ] Record Amplify app URL.
- [ ] Record cloud image location.
- [x] Record deployment branch.
- [ ] Record build/deploy verification.
- [x] Update milestone verification record.
- [x] Update project status.
- [x] Update root README and docs README.

## 7. Deliverables

- `amplify.yml` deployment configuration
- AWS Amplify Hosting app connected to GitHub
- Public Amplify URL
- Cloud-hosted Portfolio image files
- Portfolio metadata updated to cloud image URLs
- Verified deployed Portfolio carousel
- Verified deployed Resume PDF navigation
- Updated project status, decisions, change request log, and README summaries
- Deployment and image upload notes for future maintenance

## 8. Acceptance criteria

Milestone 7 is complete when:

- The website is publicly accessible from an Amplify-provided URL.
- Home, Contacts, Portfolio, the disabled Exhibitions fallback, and the fallback Resume route load from the public URL.
- Exhibitions is hidden from primary navigation while `featureFlags.exhibitions` is `false`.
- The primary Resume navigation opens the configured S3-hosted résumé PDF in a new browser tab.
- Pushes to the connected GitHub branch trigger Amplify build/deploy.
- Amplify build succeeds using repository configuration.
- Portfolio images are hosted in AWS cloud storage or an approved AWS-hosted image location.
- Deployed Portfolio gallery and carousel load cloud-hosted images.
- Local-only `public/artwork-local/` images are no longer required for the deployed Portfolio.
- Mailing list and Leave a message backend remain deferred and unchanged.
- Deployment URL, branch, region, and cloud image upload steps are documented.

## 9. Risks and mitigations

| Risk                                     | Mitigation                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| AWS cost grows unexpectedly              | Keep scope static-first, avoid backend services, and add budget guidance |
| Image URLs are not publicly reachable    | Verify every image URL before updating Portfolio metadata                |
| Amplify build fails due to Node mismatch | Pin/confirm Node settings and use `npm ci` with committed lockfile       |
| GitHub repository is not ready           | Confirm remote, branch, and permissions before connecting Amplify        |
| S3 public access is misconfigured        | Decide public object strategy explicitly before upload                   |
| Forms appear functional without backend  | Keep buttons disabled and privacy text clear until backend milestone     |

## 10. Deferred decisions

- Custom domain
- Final production image hosting architecture
- Private S3 + CloudFront versus simpler public image URLs
- Automated image upload/optimization
- Contact form backend
- Mailing-list backend
- CAPTCHA and email provider configuration
- Final launch budget and alerts

## 11. Verification record

**Date:** July 19, 2026  
**Result:** In progress

### Documentation checks

- Added a separate compact Home carousel design beside the artist statement.
- Documented that Home carousel images are managed separately from Portfolio artwork.
- Added proposed Portfolio manifest design and example JSON.
- Added `availability` manifest metadata and simplified its current allowed value to `available`.
- Added Portfolio UI status display for artwork availability.
- Added Other Portfolio section/tab to implementation and documentation.
- Removed the Exhibitions header submenu and documented the single-page section-control pattern.
- Sorted published Portfolio images newest first by artwork year across all sections.

### Known limitations

- S3 manifest loading is not implemented yet.
- Updating only the future S3 manifest will not automatically trigger an Amplify rebuild unless a future webhook or build trigger is added.

### Automated checks

- `npm run format:check` — passed
- `npm run check` — passed; 0 errors, 0 warnings, 0 hints
- `npm run build` — passed; 8 static pages built in `dist/`
- Generated `dist/index.html` was inspected and contains the artist statement plus the separate compact Home carousel.
- Home carousel CSS was updated so the image displays as a smaller square with `aspect-ratio: 1` and `max-width: 240px`.
- Home carousel temporary source SVG and metadata were updated from `1600 x 960` to square `960 x 960` dimensions.
- Home layout was updated so the square carousel appears centered above the artist statement instead of in the right column.
- Home carousel CSS now uses an explicit equal `width` and `height` image size instead of a narrow flexible wrapper.
- Home carousel visible heading and caption were removed while preserving an accessible carousel label.
- Temporary Home artist statement text was replaced with the owner-provided final artist statement.
- Home statement centering was rolled back; only the statement body copy is justified.
- Superseded the local `public/home-carousel/` upload folder with an S3-backed Home carousel approach using the `home-carousel/` prefix.
- Updated `src/data/homeCarousel.ts` so published Home carousel images must use public `https` URLs, with an unpublished S3 example entry until final images are uploaded.
- Updated the Home carousel S3 prefix to the owner-created `portfolio/home-carousel/` location.
- Published seven owner-uploaded S3 Home carousel images from `portfolio/home-carousel/`.
- Moved Home carousel previous/next controls from below the image to left and right overlay buttons.
- Moved Home carousel previous/next controls outside the image into the carousel side margins.
- Removed Press from current website scope, primary navigation, public route generation, and public verification scope.
- Added a Home page intro with the shared eyebrow and page-title pattern used by the other top-level pages.
- Moved Home carousel controls outside the bordered image container and reused the Portfolio carousel control styling.
- Inverted Home carousel control colors to a white background with red accent text.
- Updated Home carousel controls so hover uses a red background with white text while inactive buttons remain white with red text.
- Set exact Home carousel button colors to `#f2f0ed` background / `#ae2a5e` text, with the colors reversed on hover.
- Fixed the Home carousel button color cascade so the shared Portfolio carousel control background no longer overrides the inactive Home button state.
- Replaced the Resume placeholder with a static Resume page that embeds and links to the expected S3 résumé PDF URL.
- Updated Resume navigation to open the configured S3 résumé PDF directly in a new browser tab and removed the embedded PDF viewer from the fallback Resume page.
- `curl -L -I` verified the configured résumé PDF URL returns `200 OK`, `Content-Type: application/pdf`, and `Content-Length: 82316`.
- Added `featureFlags.exhibitions` with public Exhibitions disabled by default while preserving existing Exhibitions implementation code.
- Generated Home, Portfolio, Contacts, and Resume HTML was inspected and contains no `/exhibitions/` primary navigation link while Exhibitions is disabled.
- Generated `dist/exhibitions/index.html` was inspected and shows the coming-soon fallback while Exhibitions is disabled.
- Generated legacy Exhibitions status pages redirect to `/exhibitions/` while Exhibitions is disabled.
- Changed Home carousel controls from visible Previous/Next text to borderless left/right arrow buttons while preserving accessible labels.
- Updated the Home carousel controls to use simple `<` and `>` direction characters.
- Removed the duplicate lower Home statement heading and tightened the statement into a centered single-column text box.
- Removed visible Home carousel previous/next buttons, added the S3-hosted artist portrait beside the carousel, and aligned the visual row with the statement box below.
- Made the footer Facebook icon blue, larger, and more visible while preserving the existing footer link target.
- `node` manifest availability validation — passed; all manifest items have non-empty availability text.
- `node` source inspection — passed; strict `availability: "available"` restriction is removed and availability is typed as free text.
- Generated `dist/portfolio/index.html` was inspected after newest-first sorting; Landscapes begins with 2026 items, Still life begins with 2025 items, and Other has no published items yet.
- Generated `dist/portfolio/index.html` contains Landscapes, Still life, and Other section controls and section containers.
- Generated `dist/portfolio/index.html` contains no `/artwork-local/` image references after wiring Portfolio to the local manifest.
- Downloaded Still life S3 image URLs to `/tmp` and verified dimensions with `sips`; the current manifest contains 17 published Still life images.

### Manual checks

- Confirmed local Git branch is `main`.
- Confirmed GitHub remote is `https://github.com/ybalenko/artist-portfolio-website.git`.
- Confirmed `.nvmrc` requests Node 22.
- Confirmed `package-lock.json` exists.
- Confirmed local `npm ci` was not needed before verification because dependencies were already installed, `package-lock.json` exists, and `npm run check` / `npm run build` passed.
- Added Amplify configuration to `amplify.yml`.
- Added deployment runbook at `docs/deployment/aws-amplify.md`.
- Added Portfolio cloud image runbook at `docs/deployment/portfolio-images.md`.
- Owner reported that the Amplify project was deployed.
- Added Portfolio section structure for Landscapes and Still life using current local test images pending final cloud image URLs.
- Aligned Exhibitions and Portfolio page-level submenu typography and sizing.
- Replaced temporary Still life images with 18 public S3 image URLs under `portfolio/stilllifes/`.
- Sorted Still life images by S3 URL year, newest first.
- Added selected artwork metadata display for name, medium, size, and year.
- Removed `yulia-art-2025-05` from Still life metadata because the S3 object was removed.
- Added manifest design support for availability metadata.
- Added visible Portfolio and carousel `Status` metadata mapped from `availability`.
- Removed the strict `available`-only manifest rule so `availability` can now contain any non-empty public status text.
- Wired Portfolio data to the local manifest at `docs/deployment/manifest.json`.
- Confirmed the local manifest has 9 published Landscapes items, 17 published Still life items, and 0 published Other items.
- Updated Exhibitions so `/exhibitions/` hosts Current, Past, and Upcoming sections; legacy status URLs redirect to hash sections.
- Confirmed generated Portfolio data sorts Landscapes, Still life, and Other newest first by artwork year, preserving manifest order within the same year.
- Replaced two invalid Landscape manifest availability values, `In Private Collection`, with the currently allowed `available` value after an Amplify build failure.

### Known limitations

- Custom domain is deferred.
- Mailing list and Leave a message backend are deferred.
- Final artwork image set may still be temporary.
- Amplify URL has not been recorded in the project documentation yet.
- Public-page verification has not been performed yet.
- Exhibitions public navigation is disabled pending a content update workflow and real exhibition content.
- Other has no published manifest images yet, so it shows an empty state.
- Several artwork metadata values are placeholders until final name, medium, and size details are provided.

### Deferred work

- Contact form delivery
- Mailing-list signup
- Custom domain
- Final image optimization pipeline
