---
name: regression-testing
description: Run an existing Playwright regression suite, summarize its report, and file or update confirmed bugs in the project's defect tracker. Use for regression test runs and pass/failure reporting, not for creating a new test suite.
---

# Regression testing

Run the requested Playwright suite, report its actual outcome, and track confirmed defects. Default to the complete configured suite and all configured browser projects unless the user selects a narrower scope. Running this skill authorizes local defect-log updates for confirmed bugs; it does not implicitly authorize fixes, commits, deployment, or external tracker mutations.

## Prepare and run

1. Locate the repository and read its `AGENTS.md` and required project documents before changing tracking files. Inspect the working tree so unrelated edits are preserved.
2. Read package scripts, Playwright configuration, testing instructions, and the defect tracker. Use the project's existing package manager, browsers, fixtures, server orchestration, and report locations. Do not hardcode historical test counts or assume a successful previous run is current evidence.
3. Run the requested suite with the project's regression/CI failure policy. Preserve diagnostic retries and ensure flaky outcomes remain visible. Do not weaken assertions, skip failing cases, or change configuration to obtain a pass. Use existing safe test endpoints and mocks; do not send live contact messages or switch to production services.
4. Wait for completion and record the exact command, exit code, run time, scope, and report paths. Inspect the report from this run, including failures, flaky results, skipped/interrupted tests, and runner errors. An old report left behind after a startup failure is not current evidence. Preserve initial failure artifacts before any diagnostic rerun that could overwrite them.

## Triage and defect tracking

- Classify each failure using its assertion, trace/screenshot, test code, and relevant application code: product bug, test bug/flakiness, environment/setup blocker, or unresolved failure. An assertion failure alone does not prove a product bug.
- If needed, rerun only the affected case/project once for diagnosis. Stop when evidence is sufficient or that rerun is inconclusive; report uncertainty rather than repeatedly rerunning until green. A passing rerun does not erase the original failure or flaky outcome.
- Search existing defect entries by symptom, affected component, and test ID before creating a record. Update an existing matching record; reopen a closed defect only when recurrence is supported. Group failures from the same confirmed cause into one defect with all affected cases/projects.
- For a confirmed product or test bug, use the tracker's ID and status conventions. Record discovery date, severity with impact rationale, affected milestone/component, environment, reproducible steps, expected/actual behavior, failing test IDs, command/result, evidence links, and next action. Keep sensitive values out of committed records and avoid copying private payloads from reports.
- Use the repository-local tracker when configured. External issue creation requires applicable user authorization. If no tracker is configured, ask where to file and include the ready-to-file defect details in the report; do not silently create a separate tracking system.
- Keep uncertain failures and environmental blockers visible in the test summary and required milestone/status records without presenting them as confirmed product defects. Do not fix implementation or tests unless separately requested.
- Close an existing defect only when this run satisfies its documented verification requirements. Browser success does not close backend, deployed, security, or real-device checks it did not exercise.
- Follow repository requirements for milestone verification and session status updates. Distinguish test-run success from completion of a milestone or unimplemented coverage.

## Artist Portfolio repository conventions

Apply these conventions only in the Artist Portfolio repository containing `docs/project/defects.md` and the documented `test:e2e` scripts. Recheck current files on each run:

- Default full regression command: `CI=true npm run test:e2e -- --fail-on-flaky-tests`. This retains the configured CI retry while treating a flaky result as failure. Honor an explicitly requested narrower scope and label the result accordingly.
- The current suite builds and serves local production output automatically. Installed Chrome desktop, mobile emulation, and tablet projects use external-asset fixtures; contact requests must remain mocked/blocked according to the repository's test setup.
- HTML report: `playwright-report/index.html`; failure artifacts: `test-results/`. Keep generated artifacts ignored. Preserve diagnostics under an ignored run-specific location if rerunning a failure.
- Tracker: `docs/project/defects.md`. Follow its template and next sequential `DEF-###` ID; preserve `CF-SEC-###` IDs and link security review evidence instead of renumbering findings.
- Read `docs/project/status.md` to identify the active milestone. Record command/results and relevant defects in that milestone's verification record and update status as required. Backend security and deployed verification remain in their assigned milestone.
- Consult `docs/testing/frontend-ci.md` and the page/shared case catalogs for coverage and diagnostics. Do not assume browser emulation proves Safari or real-device behavior.

## User-facing output

Keep the final report concise and lead with the outcome:

- **Passed:** Say “Playwright regression suite passed” only if the intended selection completed successfully with no failed, flaky, skipped, interrupted, or unexpectedly missing tests and no runner errors. Include passed count, browser/project scope, duration, and a clickable report link. For an intentionally narrow run, say “Selected Playwright tests passed” and name the scope.
- **Failures:** Give passed/failed/flaky/skipped or interrupted counts as available, concise failure causes, and links to filed or updated defect IDs plus the report. Distinguish confirmed bugs from unresolved failures.
- **Incomplete or blocked:** State that the suite was not fully verified, what prevented completion or was skipped, any available results, and the concrete next action. Never report “all passed” for zero tests or incomplete execution.

Notification means the response to the user here; do not send email, chat messages, or other external notifications unless requested.
