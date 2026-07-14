# Portfolio Manifest Design

This document defines the Portfolio manifest for moving artwork metadata out of hardcoded TypeScript lists while keeping the website static and inexpensive.

## Goal

Use a JSON manifest as the catalog for Portfolio images and artwork metadata.

The site currently reads the local manifest at [`docs/deployment/manifest.json`](./manifest.json) during build. A later step can upload the same file to S3 and switch the build-time source to the public S3 URL.

## Recommended location

```text
s3://yulia-balenko-portfolio-images/portfolio/manifest.json
```

Public URL:

```text
https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/manifest.json
```

The manifest is public because the Portfolio image URLs and artwork metadata are public website content.

## Design principles

- Keep the website static; do not add a database, API, or admin UI.
- Keep images outside GitHub.
- Keep metadata editable in one small JSON file.
- Make ordering explicit and easy to review.
- Keep image URLs stable so shared carousel links remain reliable.
- Fail the build if the manifest is invalid, instead of deploying a broken Portfolio.

## Manifest structure

```json
{
  "schemaVersion": 1,
  "updatedAt": "2026-07-09",
  "baseUrl": "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio",
  "sections": [
    {
      "id": "landscapes",
      "label": "Landscapes",
      "items": []
    },
    {
      "id": "stilllife",
      "label": "Still life",
      "items": []
    },
    {
      "id": "other",
      "label": "Other",
      "items": []
    }
  ]
}
```

## Section fields

| Field   | Required | Example      | Notes                                                  |
| ------- | -------- | ------------ | ------------------------------------------------------ |
| `id`    | Yes      | `stilllife`  | Stable section ID used by page state and URL hash      |
| `label` | Yes      | `Still life` | Public label displayed in the Portfolio section switch |
| `items` | Yes      | `[]`         | Ordered artwork records for this section               |

Allowed P0 section IDs:

- `landscapes`
- `stilllife`
- `other`

## Artwork fields

| Field          | Required | Example                            | Notes                                              |
| -------------- | -------- | ---------------------------------- | -------------------------------------------------- |
| `id`           | Yes      | `yulia-art-2025-01`                | Stable unique ID used by carousel URL state        |
| `file`         | Yes      | `stilllifes/yulia-art-2025-01.jpg` | Relative path under `baseUrl`; no leading slash    |
| `alt`          | Yes      | `Still life artwork by Yulia...`   | Meaningful accessibility text                      |
| `name`         | Yes      | `Still life 2025-01`               | Public artwork name or temporary label             |
| `medium`       | Yes      | `Oil`                              | Use `TBD` if not known yet                         |
| `size`         | Yes      | `16 × 20 in`                       | Use `TBD` if not known yet                         |
| `year`         | Yes      | `2025`                             | Four-digit year, or `TBD` if unknown               |
| `availability` | Yes      | `Available`                        | Free-text status displayed in the Portfolio UI     |
| `width`        | Yes      | `1600`                             | Web image width in pixels                          |
| `height`       | Yes      | `1200`                             | Web image height in pixels                         |
| `published`    | Yes      | `true`                             | `false` hides the item without deleting its record |

`availability` is free text. Use the exact wording that should appear publicly, such as `Available`, `Private collection`, `Sold`, or another manually chosen status.

The site will derive the final image URL as:

```text
{baseUrl}/{file}
```

Example:

```text
https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2025-01.jpg
```

## Ordering rule

The display order is the order of records in the manifest.

The website sorts published artwork newest first within each section by `year` during the Astro build. Manifest order is still meaningful as the tie-breaker for works from the same year.

This avoids hidden sorting behavior and makes the public gallery order reviewable directly in the manifest.

## Validation rules for future implementation

The Astro build should validate the manifest before generating the Portfolio page:

- `schemaVersion` must be `1`.
- `baseUrl` must be an HTTPS URL.
- Section IDs must be unique.
- Artwork IDs must be unique across all sections.
- `file` must be relative and must not start with `/`.
- `alt`, `name`, `medium`, `size`, `year`, and `availability` must not be empty.
- `year` must be `TBD` or a four-digit year.
- `availability` must be `available`.
- `width` and `height` must be positive numbers.
- `published` must be a boolean.
- At least one published image must exist before the Portfolio is considered production-ready.

## Example artwork record

```json
{
  "id": "yulia-art-2025-01",
  "file": "stilllifes/yulia-art-2025-01.jpg",
  "alt": "Still life artwork by Yulia Balenko from 2025",
  "name": "Still life 2025-01",
  "medium": "TBD",
  "size": "TBD",
  "year": "2025",
  "availability": "available",
  "width": 1600,
  "height": 1200,
  "published": true
}
```

## Future implementation approach

1. Maintain the local manifest at `docs/deployment/manifest.json`.
2. Validate the manifest during build.
3. Convert each published manifest record into the existing `PortfolioImage` structure.
4. Keep unpublished records in the manifest as drafts.
5. Upload `manifest.json` to `portfolio/manifest.json` in S3 when ready.
6. Switch the build-time manifest source from the local file to the S3 URL in a later step.
7. Rebuild and redeploy through Amplify.

Important limitation: changing only the S3 manifest does not automatically trigger an Amplify build. After updating the manifest, trigger a redeploy in Amplify or push a small Git change unless a later milestone adds a webhook or scheduled build trigger.

## Related files

- [Portfolio cloud image runbook](./portfolio-images.md)
- [Local manifest JSON](./manifest.json)
- [`src/data/portfolio.ts`](../../src/data/portfolio.ts)
