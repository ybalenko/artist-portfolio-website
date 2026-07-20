# Leave a Message Form Runbook

This runbook tracks the planned setup for the Contacts page Leave a message form. Mailing-list signup remains disabled and out of scope for this milestone.

## Current implementation state

- The Contacts page renders a real HTML form for name, email, and message.
- The form stays disabled until `PUBLIC_CONTACT_API_URL` is configured.
- Turnstile/CAPTCHA bot protection is deferred for now.
- Submitted JSON includes `name`, `email`, `message`, and hidden honeypot field `company`.
- The private recipient email address is not stored in the repository.

## Public environment variables

These values can be configured in Amplify environment variables because they are public browser values:

| Variable                 | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| `PUBLIC_CONTACT_API_URL` | API Gateway endpoint for contact message submits |

## Private backend settings

These values must be stored outside the repository, preferably in AWS Systems Manager Parameter Store or AWS Secrets Manager:

| Setting                    | Purpose                                                        |
| -------------------------- | -------------------------------------------------------------- |
| Private recipient email    | Artist inbox that receives contact messages                    |
| SES sender address         | Verified sender identity used by SES                           |
| Allowed site origin        | Final Amplify/custom-domain origin allowed by API Gateway CORS |
| Optional abuse-control key | Salt/secret for throttling or abuse fingerprints               |

If Turnstile/CAPTCHA is added later, its secret key must also be stored outside the repository.

## Required setup sequence

1. Confirm the final public site origin, preferably the custom domain.
2. Verify an SES sender identity.
3. Store the private recipient email outside the repository.
4. Create the contact API with API Gateway and Lambda.
5. Configure CORS to allow only the deployed site origin.
6. Configure Amplify with `PUBLIC_CONTACT_API_URL`.
7. Verify successful delivery and failure states from the deployed site.

## Contact API contract

The page submits JSON:

```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "message": "Message body",
  "company": ""
}
```

The API should:

- Reject requests with an unexpected origin.
- Enforce name and message length limits.
- Validate the email address and use it only as `Reply-To`.
- Drop or no-op honeypot submissions.
- Reject header injection, unsafe control characters, and obvious spam.
- Send via SES only after validation succeeds.
- Return a generic success/failure response without exposing internals.
- Avoid logging names, email addresses, and message bodies.

## Local testing

Without environment variables, the form should render disabled and show the setup-in-progress message.

When a test API value is available, add it to a local `.env` file. Do not commit `.env`.

## Deferred bot protection

Turnstile/CAPTCHA setup is intentionally skipped for now. If spam becomes a problem, add it back by creating a widget for the approved domain, adding the public site key to Amplify, storing the secret key outside GitHub, sending the browser token in the form payload, and validating that token in Lambda before SES delivery.
