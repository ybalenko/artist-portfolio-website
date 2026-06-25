# Milestone 2 Plan — Contacts Page

**Status:** Complete  
**Created:** June 25, 2026  
**Milestone goal:** Replace the Contacts placeholder with a polished static Contacts page for layout and content review.
**Implementation progress:** 16/16 tasks — 100%

## Confirmed decisions

- Milestone 2 is the Contacts page. The previously provisional Press milestone is deferred.
- Contacts replaces the current `/contacts/` Coming soon placeholder.
- The page is static for now.
- The Leave a message form UI is visible but does not submit.
- Message form fields are Name, Email, and Message.
- The message form submit button is disabled.
- Mailing-list signup UI is visible but does not submit.
- The mailing-list Sign up button is disabled.
- Copyright Notice and Privacy Notice content are drafts.
- Facebook appears on both the footer and Contacts page using a recognizable Facebook icon.
- Backend/API work, CAPTCHA, email delivery, mailing-list storage, double opt-in, and unsubscribe behavior are deferred.

## 1. Scope

Milestone 2 includes:

1. Create the Contacts page at `/contacts/`.
2. Add a draft Copyright Notice.
3. Add a draft Privacy Notice.
4. Add a static Leave a message form with Name, Email, and Message fields.
5. Keep the message submit button disabled.
6. Add a static mailing-list signup field.
7. Keep the mailing-list Sign up button disabled.
8. Add the Facebook social media link to the Contacts page.
9. Replace the footer text link with a recognizable Facebook icon.
10. Apply the existing Hockney-inspired desktop visual direction.
11. Verify static rendering, accessibility basics, disabled controls, and production build output.

## 2. Out of scope

- Working message submission
- CAPTCHA or bot protection
- Email delivery
- Mailing-list confirmation, unsubscribe, or subscriber storage
- AWS API Gateway, Lambda, DynamoDB, SES, or Turnstile configuration
- Final legal review of notice text
- Public email address configuration
- Mobile and tablet layout work beyond preserving existing desktop-only behavior

## 3. Design baseline

The Contacts page follows the existing site language:

- White page background
- Centered maximum-width content container
- Lato typography
- Magenta accent color
- Square-edged light-neutral content panels
- Minimal decorative elements
- Desktop-first layout consistent with Milestone 1

## 4. Proposed page structure

```text
Contacts (/contacts/)
├── Header and primary navigation
├── Page intro
├── Leave a message form
│   ├── Name
│   ├── Email
│   ├── Message
│   └── Disabled submit button
├── Social media
│   └── Facebook icon link
├── Mailing-list signup
│   ├── Email
│   └── Disabled Sign up button
├── Draft Copyright Notice
├── Draft Privacy Notice
└── Footer with copyright and Facebook icon link
```

## 5. Implementation plan

### Step 1 — Tracking and roadmap

- [x] Update the project roadmap so Milestone 2 is Contacts.
- [x] Record the Milestone 2 scope decision.
- [x] Create this Milestone 2 plan.

### Step 2 — Shared social icon

- [x] Add a reusable Facebook icon component.
- [x] Use the Facebook icon in the footer.
- [x] Preserve safe external-link behavior.

### Step 3 — Contacts page content

- [x] Replace the Contacts placeholder with the static Contacts page.
- [x] Add draft Copyright Notice content.
- [x] Add draft Privacy Notice content.
- [x] Add the Facebook link to the Contacts page.

### Step 4 — Static forms

- [x] Add Name, Email, and Message fields to the Leave a message form UI.
- [x] Keep the message submit button disabled.
- [x] Add the mailing-list email field.
- [x] Keep the mailing-list Sign up button disabled.
- [x] Make the static form state clear to visitors.

### Step 5 — Styling and accessibility

- [x] Apply desktop styling consistent with Milestone 1.
- [x] Verify labels, headings, landmarks, focus states, disabled states, and external-link attributes.

### Step 6 — Verification

- [x] Run formatting, Astro check, and production build.

## 6. Deliverables

- Contacts page at `/contacts/`
- Draft Copyright Notice
- Draft Privacy Notice
- Static Leave a message form
- Static mailing-list signup
- Facebook icon link on Contacts
- Facebook icon link in the footer
- Updated milestone/status/decision tracking
- Successful production build

## 7. Acceptance criteria

Milestone 2 is complete when:

- `/contacts/` no longer displays the Coming soon placeholder.
- Contacts page includes draft Copyright Notice and draft Privacy Notice sections.
- Leave a message form displays Name, Email, and Message fields.
- Leave a message submit button is disabled.
- Mailing-list signup displays an Email field.
- Mailing-list Sign up button is disabled.
- The page clearly communicates that forms are not connected yet.
- Facebook link appears on Contacts and in the footer as an icon.
- Facebook links open safely with `target="_blank"` and `rel="noopener noreferrer"`.
- The Contacts navigation item is visually and accessibly marked as current.
- `npm run build` completes successfully.

## 8. Risks and mitigations

| Risk                                         | Mitigation                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| Visitors assume forms are functional         | Visible draft/coming-soon copy and disabled buttons                             |
| Draft notice reads like final legal language | Label Copyright Notice and Privacy Notice as drafts                             |
| Social icon lacks accessible text            | Provide descriptive link text or accessible labels while hiding decorative SVGs |
| Future backend scope sneaks into Milestone 2 | Explicitly defer API, CAPTCHA, SES, storage, double opt-in, and unsubscribe     |

## 9. Deferred decisions

- Final legal/privacy wording
- Contact recipient address
- Message delivery provider configuration
- CAPTCHA provider configuration
- Mailing-list storage and double opt-in implementation
- Unsubscribe implementation
- Public email address display

## 10. Verification record

**Date:** June 25, 2026  
**Result:** Passed

### Automated checks

- `npm run format:check` — passed
- `npm run check` — passed with 0 errors, warnings, or hints across 16 files
- `npm run build` — passed; six static pages generated

### Manual checks

- Confirmed generated `/contacts/` no longer contains the Coming soon placeholder.
- Confirmed generated `/contacts/` contains Contacts intro, draft Copyright Notice, and draft Privacy Notice.
- Confirmed generated `/contacts/` contains Name, Email, and Message fields.
- Confirmed generated `/contacts/` contains disabled message and mailing-list buttons.
- Confirmed generated `/contacts/` contains Facebook icon link with safe external-link attributes.
- Confirmed generated Home and Contacts footers contain the Facebook icon link with safe external-link attributes.
- Confirmed Contacts navigation item is marked with `aria-current="page"`.

### Known limitations

- Forms are intentionally non-functional.
- Notices are drafts.
- Milestone remains desktop-first.

### Deferred work

- Message form backend
- Mailing-list backend
- CAPTCHA/spam protection
- Final notice review

### Maintenance verification

**Date:** June 25, 2026  
**Result:** Passed

- Reduced Contacts page and subsection heading sizes so they read as secondary to the site header.
- `npm run format:check` — passed
- `npm run check` — passed with 0 errors, warnings, or hints across 16 files
- `npm run build` — passed; six static pages generated
