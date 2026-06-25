# Agent Instructions

These instructions apply to every agent working in this repository.

## Required reading order

Before changing files, read:

1. [Project status](./docs/project/status.md)
2. The active `docs/milestones/milestone-N.md`
3. [Business requirements](./docs/requirements/business.md)
4. [Technical requirements](./docs/requirements/technical.md)
5. [High-level design](./docs/architecture/high-level-design.md)
6. [Decision log](./docs/project/decisions.md)
7. [Project process](./docs/project/process.md)

## Mandatory workflow

- Work only within the active approved milestone.
- When implementation begins, set the milestone status to `In progress` in `docs/project/status.md`.
- Use the milestone plan's checkboxes as the progress source.
- Check a task only after verifying its result.
- Update progress, recent activity, blockers, and next action at the end of each work session.
- Record material product, architecture, privacy, cost, or scope decisions in `docs/project/decisions.md`.
- Add command results and manual checks to the milestone verification record.
- Do not mark a milestone complete until every acceptance criterion is verified.
- Keep requirements, design, status, and README summaries consistent when scope changes.
- When scope, milestone status, roadmap, implemented pages, setup steps, or project structure change, review and update both README files as needed:
  - Root [README.md](./README.md) for the GitHub/project overview.
  - Docs [README.md](./docs/README.md) for the documentation index.

## Guardrails

- Preserve unrelated user changes.
- Do not expand scope merely because a future feature is visible in navigation or documentation.
- Do not commit, tag, push, deploy, or modify external services without explicit user approval.
- Do not store secrets or private personal information in the repository.
- Do not hide blockers or silently reinterpret an approved decision.

The full lifecycle, progress calculation, verification format, change-control rules, and handoff standard are defined in the [Project process](./docs/project/process.md).
