# Frontend Continuous Integration

**Milestone:** [M9 — Playwright testing](../milestones/milestone-9.md)  
**Updated:** September 9, 2026

This guide covers the shared GitHub Actions workflow for all implemented browser suites. Page scenarios are documented in the [Home](./home-test-cases.md) and [Portfolio](./portfolio-test-cases.md) test catalogs.

## Workflow

[Frontend CI](../../.github/workflows/frontend-ci.yml) runs for every pull request targeting `main` and can also be started manually from GitHub's Actions tab. The `Playwright browser tests` job uses Chrome already installed on GitHub's Ubuntu runner and executes `npm ci`, formatting, Astro/TypeScript validation, Playwright TypeScript validation, and all implemented browser suites. It uses read-only repository permissions and no application secrets or AWS credentials.

## Reports and flaky tests

The job uploads `playwright-report/` and `test-results/` as `playwright-report-<attempt>` for seven days, including successful runs. Open the workflow run in GitHub and download the artifact from its **Artifacts** section. It runs `npm run test:e2e -- --fail-on-flaky-tests`: one retry is retained for diagnosis, but tests that pass only on retry still fail the job. Reproduce that policy locally with `CI=true npm run test:e2e -- --fail-on-flaky-tests`. Earlier remote runs succeeded; the updated policy is verified by local deterministic emulation in M9, with remote execution and artifact inspection still open.

## Required merge check

To prevent a merge when this job fails, configure a `main` branch ruleset after the first run and require the **Playwright browser tests** status check. The workflow creates the check; the repository rule enforces it. Branch-protection configuration is an external GitHub change and has not been made by this repository update.

See [M9’s verification record](../milestones/milestone-9.md#verification-record) for command results and remaining CI checks.
