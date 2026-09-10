# Defect Log

**Last updated:** September 9, 2026

Central index for known product, test, and security defects. Milestone plans remain the source of implementation progress and verification evidence. Security details and release gates remain in the [contact form security review](../security/contact-form-review.md); update both records when a security finding changes.

## Workflow

- Assign new defects the next `DEF-###` ID. Preserve existing `CF-SEC-###` IDs for imported security findings.
- Record discovery date, affected milestone, severity, reproduction steps or review evidence, expected/actual behavior, next action, and verification evidence. Use `Not recorded` where historical evidence is missing.
- Statuses: `Open`, `In progress`, `Fixed — verification pending`, `Closed`, and `Deferred`. Close only after the required regression checks pass; record the date and evidence. Reopen if the problem recurs. Deferral requires a reason and any required owner approval; it does not waive a release gate.
- Severity describes impact: Critical = severe compromise or broad outage; High = major function/accessibility failure or high security impact; Medium = impaired behavior with limited impact or a workaround; Low = minor impact. Imported security severities are retained; other severities below are initial triage assessments.
- Link related change requests and milestones. A log entry does not authorize work outside an approved milestone. Feature requests belong in the [change request log](./change-requests.md) or [backlog](./backlog.md).

## Register

Initial import on September 9, 2026 covers recorded M9 regressions and all six contact security findings. It is not an exhaustive historical inventory or a new audit. Dates and results below come from the linked records.

| ID         | Defect                                                                | Severity | Milestone | Status                       | Evidence / next action                                                                          |
| ---------- | --------------------------------------------------------------------- | -------- | --------- | ---------------------------- | ----------------------------------------------------------------------------------------------- |
| DEF-001    | Portfolio carousel allows keyboard focus to escape                    | High     | M9        | Fixed — verification pending | PORTFOLIO-31 failed in the initial desktop run; full matrix remains pending. See details below. |
| DEF-002    | Mobile Portfolio carousel controls fall outside viewport              | Medium   | M9        | Closed                       | Targeted regressions and all 87 Portfolio executions passed September 8; CR-074.                |
| DEF-003    | Home carousel mishandles changed reduced-motion preference            | Medium   | M9        | Closed                       | Timer fix verified by all 66 Home executions September 7; CR-070.                               |
| DEF-004    | HOME-17 uses a timing assumption that causes flakiness                | Medium   | M9        | Closed                       | Event synchronization passed 10 desktop repetitions and 66 Home executions September 8; CR-075. |
| CF-SEC-001 | Caller-controlled throttle identity and missing infrastructure limits | High     | M8        | Fixed — verification pending | Local tests/synthesis passed; deployed direct-client and concurrency checks remain.             |
| CF-SEC-002 | Dependency audit reports high/moderate vulnerabilities                | High     | M8        | Open                         | August 22 audit evidence; remediate and rerun audit to establish current status.                |
| CF-SEC-003 | Request body parsed before size rejection                             | Medium   | M8        | Open                         | Reject oversized bodies before decoding/parsing; verify negative paths.                         |
| CF-SEC-004 | SES send permission uses wildcard resource                            | Medium   | M8        | Open                         | Restrict sender identity/condition and verify synthesized permissions.                          |
| CF-SEC-005 | Security boundary regression coverage is incomplete                   | Low      | M8        | Open                         | Six throttle tests exist; remaining handler, infrastructure, and deployed checks are required.  |
| CF-SEC-006 | Privacy Notice inaccurately describes third-party processing          | Low      | M8        | Open                         | Correct provider wording before accepting messages; verify rendered notice.                     |

## Browser and test defect details

### DEF-001 — Portfolio carousel focus escapes

- **Discovered:** September 9, 2026.
- **Reproduce:** Open a Portfolio carousel and use Tab/Shift+Tab through its controls (PORTFOLIO-31).
- **Expected / actual:** Focus remains inside the modal and all background branches are inert; the initial test observed focus escaping.
- **Fix / next action:** Background isolation and Tab wrapping were implemented. Run the full three-project matrix and verify focus entry, containment, and restoration before closing.
- **Evidence:** [M9 verification record](../milestones/milestone-9.md#verification-record), [Portfolio cases](../testing/portfolio-test-cases.md), CR-078 in the [change request log](./change-requests.md).

### DEF-002 — Mobile carousel controls outside viewport

- **Discovered / closed:** September 8, 2026.
- **Reproduce:** Open Portfolio carousel content at narrow mobile width; exercise PORTFOLIO-16, PORTFOLIO-17, PORTFOLIO-27, and PORTFOLIO-29.
- **Expected / actual:** Artwork, metadata, and Previous/Next stay usable within the viewport; intrinsic modal content pushed controls below it.
- **Fix / verification:** Constrained the carousel grid to viewport height. Targeted mobile cases and the full 87-execution Portfolio matrix passed.
- **Evidence:** [M9 verification record](../milestones/milestone-9.md#verification-record), CR-074 in the [change request log](./change-requests.md).

### DEF-003 — Home reduced-motion timer behavior

- **Discovered / closed:** September 7, 2026.
- **Reproduce:** Change the reduced-motion preference while Home is open and observe carousel advancement.
- **Expected / actual:** The timer follows the changed preference; the original timer behavior failed the Home regression. Exact original failure sequence is not recorded in the milestone summary.
- **Fix / verification:** Updated timer behavior; all 66 Home executions passed.
- **Evidence:** [M9 verification record](../milestones/milestone-9.md#verification-record), CR-070 in the [change request log](./change-requests.md).

### DEF-004 — HOME-17 timing flake

- **Discovered / closed:** September 8, 2026.
- **Reproduce:** Run HOME-17 while changing the reduced-motion preference; the previous fixed 100 ms assumption could race the media-query event.
- **Expected / actual:** The test waits for the preference event before advancing carousel time; timing assumptions caused intermittent failure.
- **Fix / verification:** Synchronize on the observed event. Ten consecutive desktop repetitions and the 66-execution Home matrix passed; production behavior was unchanged.
- **Evidence:** [M9 verification record](../milestones/milestone-9.md#verification-record), CR-075 in the [change request log](./change-requests.md).

## Security evidence and closure

All six CF-SEC findings were recorded August 22, 2026. Their reproduction/review evidence, expected controls, remediation, and release impact are maintained in the [security review](../security/contact-form-review.md#findings), with implementation verification in [Milestone 8](../milestones/milestone-8.md). The historical audit counts are not a current audit result. CF-SEC-001 remains pending deployed verification; local fixes alone do not close it. Preserve every existing release gate.

## New defect template

```md
### DEF-### — Short title

- **Discovered:** YYYY-MM-DD
- **Milestone / severity / status:** M# / Medium / Open
- **Environment:** Route, browser/viewport, build or configuration
- **Reproduce / evidence:** Minimal steps or review evidence
- **Expected / actual:** Required behavior and observed failure
- **Fix / next action:** Remediation and responsible milestone
- **Verification:** Pending, or date, command/manual check, result, and evidence link
- **Related records:** Change request, requirement, test case, security review
```
