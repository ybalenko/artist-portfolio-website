# Agent Instructions

These instructions apply to every agent working in this repository.

## Required reading order

Before changing files, read:

1. [PROJECT_STATUS.md](./PROJECT_STATUS.md)
2. The active `MILESTONE_N_PLAN.md`
3. [BUSINESS_REQUIREMENTS.md](./BUSINESS_REQUIREMENTS.md)
4. [TECHNICAL_REQUIREMENTS.md](./TECHNICAL_REQUIREMENTS.md)
5. [HIGH_LEVEL_DESIGN.md](./HIGH_LEVEL_DESIGN.md)
6. [DECISIONS.md](./DECISIONS.md)
7. [PROJECT_PROCESS.md](./PROJECT_PROCESS.md)

## Mandatory workflow

- Work only within the active approved milestone.
- When implementation begins, set the milestone status to `In progress` in `PROJECT_STATUS.md`.
- Use the milestone plan's checkboxes as the progress source.
- Check a task only after verifying its result.
- Update progress, recent activity, blockers, and next action at the end of each work session.
- Record material product, architecture, privacy, cost, or scope decisions in `DECISIONS.md`.
- Add command results and manual checks to the milestone verification record.
- Do not mark a milestone complete until every acceptance criterion is verified.
- Keep requirements, design, status, and README summaries consistent when scope changes.

## Guardrails

- Preserve unrelated user changes.
- Do not expand scope merely because a future feature is visible in navigation or documentation.
- Do not commit, tag, push, deploy, or modify external services without explicit user approval.
- Do not store secrets or private personal information in the repository.
- Do not hide blockers or silently reinterpret an approved decision.

The full lifecycle, progress calculation, verification format, change-control rules, and handoff standard are defined in [PROJECT_PROCESS.md](./PROJECT_PROCESS.md).

