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

## Upload workflow

These steps must be performed by the owner in AWS because they create or update cloud resources.

1. Create or select the Portfolio image bucket/location.
2. Upload web-sized artwork image files.
3. Confirm the uploaded objects are publicly reachable.
4. Copy each final public image URL.
5. Update `src/data/portfolio.ts` with the cloud image URLs.
6. Run local checks.
7. Push the code update after approval so Amplify redeploys.

## Metadata example

```ts
{
  id: "yulia-balenko-oil-001",
  src: "https://example-public-image-url/portfolio/yulia-balenko-oil-001.jpg",
  alt: "Oil painting by Yulia Balenko",
  width: 1600,
  height: 1200,
}
```

## Milestone 7 limitations

- Browser-based image upload is not included.
- Automatic resizing is not included.
- Private S3 plus CloudFront is deferred.
- Final production artwork selection may still happen later.
- Local ignored test images under `public/artwork-local/` may remain for development fallback until cloud URLs are available.
