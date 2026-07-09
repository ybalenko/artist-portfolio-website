# Portfolio Cloud Image Runbook

This runbook covers the Milestone 7 approach for hosting Portfolio images outside GitHub.

## Milestone 7 image strategy

Use an AWS-hosted image location, preferably an S3 bucket with public object URLs for this milestone.

This keeps artwork image files out of GitHub while allowing the deployed Portfolio carousel to load images from the internet.

## Recommended naming

Use a stable prefix and simple file names:

```text
portfolio/
  test-01.jpg
  test-02.jpg
  yulia-balenko-oil-001.jpg
  yulia-balenko-watercolor-001.jpg
```

Recommended file format:

- `.jpg` for paintings and watercolor images
- `.webp` later if an optimization pipeline is added
- Web-sized copies rather than private high-resolution originals

Current S3 prefixes used by the project:

```text
portfolio/stilllifes/
```

Planned Portfolio prefixes:

```text
portfolio/landscapes/
portfolio/stilllifes/
portfolio/other/
```

## Upload workflow

These steps must be performed by the owner in AWS because they create or update cloud resources.

1. Create or select the Portfolio image bucket/location.
2. Upload web-sized artwork image files.
3. Confirm the uploaded objects are publicly reachable.
4. Update the local Portfolio manifest at `docs/deployment/manifest.json` with the image file path and artwork metadata.
5. Run local checks so the build validates the manifest.
6. Upload the manifest to `portfolio/manifest.json` in S3 when ready.
7. Rebuild the website after switching the build-time manifest source to S3.

The site currently loads Portfolio data from the local manifest during build.

## Metadata example

```json
{
  "id": "yulia-balenko-oil-001",
  "file": "stilllifes/yulia-balenko-oil-001.jpg",
  "alt": "Oil painting by Yulia Balenko",
  "name": "Still life 2025-01",
  "medium": "Oil",
  "size": "16 × 20 in",
  "year": "2025",
  "availability": "available",
  "width": 1600,
  "height": 1200,
  "published": true
}
```

See the [Portfolio manifest design](./portfolio-manifest.md) for the full schema and validation rules.

## Milestone 7 limitations

- Browser-based image upload is not included.
- Automatic resizing is not included.
- Private S3 plus CloudFront is deferred.
- Final production artwork selection may still happen later.
- Local ignored test images under `public/artwork-local/` may remain for development fallback until cloud URLs are available.
