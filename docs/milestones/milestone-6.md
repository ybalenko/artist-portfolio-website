# Milestone 6 Plan — Resume PDF Navigation

**Status:** Complete  
**Created:** July 19, 2026  
**Milestone goal:** Provide a simple résumé experience that opens the current artist résumé PDF without storing the PDF in GitHub.
**Implementation progress:** 6/6 tasks — 100%

## Confirmed decisions

- Resume should not render an embedded PDF viewer inside the website UI.
- The primary Resume navigation item opens the S3-hosted résumé PDF in a new browser tab.
- The résumé PDF is stored outside GitHub in the existing AWS-hosted public object location.
- `/resume/` remains available as a fallback static page with a link to the same PDF.

## 1. Scope

Milestone 6 includes:

1. Configure the public résumé PDF URL in source-managed metadata.
2. Update primary navigation so Resume opens the PDF in a new browser tab.
3. Keep a fallback `/resume/` page without an embedded PDF viewer.
4. Verify the S3 PDF URL is publicly reachable and served as `application/pdf`.
5. Verify local formatting, Astro diagnostics, and production build.
6. Update project documentation and milestone/status summaries.

## 2. Out of scope

- Browser-based PDF upload UI
- Automated PDF versioning or replacement workflow
- HTML résumé rendering
- Custom PDF viewer
- Contact form or mailing-list backend work

## 3. Implementation checklist

- [x] Add résumé PDF metadata in `src/data/resume.ts`.
- [x] Configure primary navigation to open the S3 PDF URL in a new browser tab.
- [x] Replace the embedded PDF preview with a fallback link-only `/resume/` page.
- [x] Verify the S3 PDF URL returns `200 OK` and `Content-Type: application/pdf`.
- [x] Run local formatting, Astro diagnostics, and production build.
- [x] Update status, README summaries, decisions, and change-request tracking.

## 4. Deliverables

- Resume navigation opens the configured S3-hosted résumé PDF.
- Fallback `/resume/` page links to the configured S3-hosted résumé PDF.
- Project documents identify Resume as implemented through PDF navigation.

## 5. Acceptance criteria

Milestone 6 is complete when:

- The primary Resume navigation item opens the configured PDF in a new browser tab.
- The fallback `/resume/` page contains a link to the same PDF and does not embed a PDF viewer.
- The configured S3 PDF URL is public and served as `application/pdf`.
- Local format, Astro diagnostics, and production build pass.
- README, docs index, project status, and milestone summaries reflect the implemented Resume behavior.

## 6. Verification record

**Date:** July 19, 2026  
**Result:** Passed

### Automated checks

- `npm run format:check` — passed.
- `npm run check` — passed; 0 errors, 0 warnings, 0 hints.
- `npm run build` — passed; 8 static pages built in `dist/`.
- Generated `dist/index.html` contains the Resume navigation link to the configured S3 PDF with `target="_blank"` and `rel="noopener noreferrer"`.
- Generated `dist/resume/index.html` contains no embedded PDF iframe and links to the configured S3 PDF.

### External checks

- `curl -L -I https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/resume/yulia-balenko-resume.pdf` — returned `200 OK`, `Content-Type: application/pdf`, and `Content-Length: 82316`.

### Known limitations

- Ongoing PDF replacement/versioning workflow remains a future maintenance decision.
