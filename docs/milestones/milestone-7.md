# Milestone 7 Plan — AWS Deployment and Cloud Portfolio Images

**Status:** In progress  
**Created:** June 28, 2026  
**Milestone goal:** Make the website publicly accessible from an AWS Amplify URL and move Portfolio images from local-only test assets to cloud-hosted image URLs.
**Implementation progress:** 14/42 tasks — 33%

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

- [ ] Open AWS Amplify Hosting in AWS Console.
- [ ] Create a new Amplify app.
- [ ] Connect the GitHub repository.
- [ ] Select the deployment branch.
- [x] Review detected build settings or use `amplify.yml`.
- [ ] Start the first Amplify build.
- [ ] Record the Amplify app URL.

### Step 4 — Cloud image storage setup

- [ ] Create/configure cloud image storage.
- [x] Define image folder/prefix naming convention.
- [ ] Upload temporary or real Portfolio image files.
- [ ] Confirm image URLs are reachable publicly.
- [x] Record image upload steps for future use.

### Step 5 — Portfolio cloud image migration

- [ ] Update `src/data/portfolio.ts` from local `/artwork-local/` paths to cloud image URLs.
- [ ] Remove or keep local test-image fallback decision.
- [ ] Run `npm run format:check`.
- [ ] Run `npm run check`.
- [ ] Run `npm run build`.
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
- [ ] Update milestone verification record.
- [ ] Update project status.
- [ ] Update root README and docs README.

## 7. Deliverables

- `amplify.yml` deployment configuration
- AWS Amplify Hosting app connected to GitHub
- Public Amplify URL
- Cloud-hosted Portfolio image files
- Portfolio metadata updated to cloud image URLs
- Verified deployed Portfolio carousel
- Updated project status, decisions, change request log, and README summaries
- Deployment and image upload notes for future maintenance

## 8. Acceptance criteria

Milestone 7 is complete when:

- The website is publicly accessible from an Amplify-provided URL.
- Home, Contacts, Exhibitions, Portfolio, Press placeholder, and Resume placeholder routes load from the public URL.
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

**Date:** June 28, 2026  
**Result:** In progress

### Automated checks

- `npm run format:check` — passed
- `npm run check` — passed; 0 errors, 0 warnings, 0 hints
- `npm run build` — passed; 9 static pages built in `dist/`

### Manual checks

- Confirmed local Git branch is `main`.
- Confirmed GitHub remote is `https://github.com/ybalenko/artist-portfolio-website.git`.
- Confirmed `.nvmrc` requests Node 22.
- Confirmed `package-lock.json` exists.
- Confirmed local `npm ci` was not needed before verification because dependencies were already installed, `package-lock.json` exists, and `npm run check` / `npm run build` passed.
- Added Amplify configuration to `amplify.yml`.
- Added deployment runbook at `docs/deployment/aws-amplify.md`.
- Added Portfolio cloud image runbook at `docs/deployment/portfolio-images.md`.

### Known limitations

- Custom domain is deferred.
- Mailing list and Leave a message backend are deferred.
- Final artwork image set may still be temporary.
- AWS Console setup has not started yet.
- Portfolio still references ignored local test images until cloud URLs are available.

### Deferred work

- Contact form delivery
- Mailing-list signup
- Custom domain
- Final image optimization pipeline
