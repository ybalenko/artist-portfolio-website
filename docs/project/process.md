# Project Delivery and Tracking Process

## 1. Purpose

Define the repeatable process for planning, implementing, verifying, and completing milestones. This is the detailed process referenced by [AGENTS.md](../../AGENTS.md).

## 2. Sources of truth

| Document                                                  | Purpose                                                                        |
| --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Business requirements](../requirements/business.md)      | Product scope and visitor outcomes                                             |
| [Technical requirements](../requirements/technical.md)    | Implementation and quality requirements                                        |
| [High-level design](../architecture/high-level-design.md) | Architecture and system boundaries                                             |
| [Project status](./status.md)                             | Current milestone, progress, blockers, and roadmap                             |
| `docs/milestones/milestone-N.md`                          | Approved scope, tasks, acceptance criteria, and verification for one milestone |
| [Decision log](./decisions.md)                            | Approved cross-project and milestone decisions                                 |
| [Agent instructions](../../AGENTS.md)                     | Mandatory instructions for agents working in the repository                    |

When documents conflict, use this priority:

1. Latest explicit user instruction
2. Approved milestone plan for the current milestone
3. Business requirements
4. Technical requirements
5. High-level design
6. README summaries

Record a material conflict or changed decision before implementation continues.

## 3. Milestone lifecycle

### Planned

- High-level scope is listed in `docs/project/status.md`.
- A detailed milestone plan may not exist.

### Ready

- `docs/milestones/milestone-N.md` exists.
- Scope and out-of-scope items are explicit.
- Required decisions are resolved or intentionally deferred.
- Tasks and acceptance criteria are testable.
- User has approved implementation.

### In progress

- At least one implementation task has started.
- `docs/project/status.md` is updated to `In progress`.
- Completed tasks are checked in the milestone plan as work is verified.

### Blocked

- Work cannot continue safely without a user decision, access, missing asset, or external change.
- The blocker and the exact next action are recorded in both the milestone plan and `docs/project/status.md`.
- A merely difficult or incomplete task is not considered blocked.

### Complete

- Every in-scope task is checked or explicitly marked not applicable with a reason.
- Every acceptance criterion is verified.
- Build/tests and manual checks are recorded.
- Known limitations and deferred work are recorded.
- `docs/project/status.md` is updated to `Complete`.
- A commit or Git tag is created only if the user requests or approves it.

## 4. Milestone plan format

Every milestone plan must include:

1. Goal
2. Confirmed decisions
3. Scope
4. Out of scope
5. Design or technical baseline
6. Implementation checklist using Markdown checkboxes
7. Deliverables
8. Acceptance criteria
9. Risks and mitigations
10. Deferred decisions
11. Verification record, added during implementation

Use the naming convention `MILESTONE_<number>_PLAN.md`.

## 5. Progress calculation

Progress is calculated from the milestone's implementation checklist:

```text
progress percentage = checked tasks / total applicable tasks × 100
```

Rules:

- Count only implementation checklist tasks, not narrative bullets.
- A task is checked only after its result is verified.
- If a task becomes unnecessary, mark it `N/A` with a reason and remove it from the denominator.
- Round to the nearest whole percent.
- Update `docs/project/status.md` whenever checked-task count changes materially or at the end of each work session.

## 6. Work-session procedure

### Before work

1. Read `AGENTS.md`.
2. Read `docs/project/status.md` and the active milestone plan.
3. Review relevant requirements, design, and decisions.
4. Inspect the working tree and preserve unrelated user changes.
5. Change the milestone to `In progress` when implementation begins.

### During work

1. Work only within approved milestone scope.
2. Update checklist items after verification, not merely after editing.
3. Record new material decisions in `docs/project/decisions.md`.
4. Record deferred work instead of quietly expanding scope.
5. Surface blockers promptly and record them.
6. Keep implementation, tests, and documentation synchronized.

### End of work session

1. Run checks proportional to the changes.
2. Update completed checkboxes.
3. Recalculate progress.
4. Update `docs/project/status.md`, recent progress, blockers, and next action.
5. Add or update the milestone verification record.
6. Report what changed, what passed, and what remains.

## 7. Verification record

Each milestone plan gains a `Verification record` section containing:

```md
## Verification record

**Date:** YYYY-MM-DD
**Result:** In progress | Passed | Failed

### Automated checks

- `command` — result

### Manual checks

- Browser/viewport/check — result

### Known limitations

- Limitation or `None`

### Deferred work

- Deferred item or `None`
```

Do not mark a milestone complete based only on files existing; verify its behavior and acceptance criteria.

## 8. Change control

- Small implementation choices within approved scope do not need a new decision entry.
- Changes to scope, architecture, user-visible behavior, cost, privacy, or milestone acceptance require a decision entry.
- If the user changes a requirement, update all affected requirement, design, milestone, status, and README documents together.
- Never silently delete decision history; supersede it.

## 9. Git and external actions

- Do not commit, tag, push, deploy, purchase, register domains, or change external services unless the user explicitly requests or approves it.
- Never use destructive Git commands to resolve unrelated changes.
- Suggested completion tag format is `milestone-<number>-<short-name>` after user approval.
- Store no credentials, tokens, private email addresses, or secrets in the repository.

## 10. Handoff standard

A future agent must be able to determine within a few minutes:

- Current milestone and status
- Checked and remaining tasks
- Latest verified result
- Active blockers
- Next recommended action
- Relevant decisions and deferred work

If any of those are unclear, update the tracking documents before beginning new implementation.
