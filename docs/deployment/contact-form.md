# Leave a Message Form Runbook

This runbook tracks the planned setup for the Contacts page Leave a message form. Mailing-list signup remains disabled and out of scope for this milestone.

## Current implementation state

- The Contacts page renders a real HTML form for name, email, and message.
- The form stays disabled until `PUBLIC_CONTACT_API_URL` is configured.
- Turnstile/CAPTCHA bot protection is deferred for now.
- Submitted JSON includes `name`, `email`, `message`, and hidden honeypot field `company`.
- The contact API infrastructure is defined in `infra/contact-form/`.
- The canonical site origin is `https://yuliabalenko.com`.
- `https://www.yuliabalenko.com` is also allowed for launch because both domains are currently working.
- The private recipient email address is not stored in the repository.
- The private SSM parameters have been created and the SES sender identity has been verified by the owner.

## Public environment variables

These values can be configured in Amplify environment variables because they are public browser values:

| Variable                 | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| `PUBLIC_CONTACT_API_URL` | API Gateway endpoint for contact message submits |

## Private backend settings

These values must be stored outside the repository, preferably in AWS Systems Manager Parameter Store or AWS Secrets Manager:

| Setting                 | Purpose                                                         |
| ----------------------- | --------------------------------------------------------------- |
| Private recipient email | Artist inbox that receives contact messages                     |
| SES sender address      | Verified sender identity used by SES                            |
| Abuse-control salt      | Secret salt for short-lived throttling fingerprints             |
| Allowed site origins    | Final Amplify/custom-domain origins allowed by API Gateway CORS |

If Turnstile/CAPTCHA is added later, its secret key must also be stored outside the repository.

## Required setup sequence

1. Use `https://yuliabalenko.com` as the canonical public site origin.
2. Keep `https://www.yuliabalenko.com` as an allowed origin while both domains are active.
3. Verify an SES sender identity.
4. Store private backend values outside the repository.
5. Deploy the contact API stack.
6. Configure Amplify with `PUBLIC_CONTACT_API_URL`.
7. Verify successful delivery and failure states from the deployed site.

## AWS setup values

The stack defaults to these SSM Parameter Store names:

| Parameter name                            | Value stored outside GitHub                    |
| ----------------------------------------- | ---------------------------------------------- |
| `/yulia-balenko/contact/recipient-email`  | Private inbox that receives contact messages   |
| `/yulia-balenko/contact/ses-sender-email` | Verified SES sender address                    |
| `/yulia-balenko/contact/abuse-salt`       | Random secret used for throttling fingerprints |

Use `SecureString` for all three values. Example commands, with placeholder
values only:

```bash
aws ssm put-parameter \
  --name /yulia-balenko/contact/recipient-email \
  --type SecureString \
  --value "recipient@example.com" \
  --overwrite

aws ssm put-parameter \
  --name /yulia-balenko/contact/ses-sender-email \
  --type SecureString \
  --value "verified-sender@example.com" \
  --overwrite

aws ssm put-parameter \
  --name /yulia-balenko/contact/abuse-salt \
  --type SecureString \
  --value "replace-with-a-random-secret" \
  --overwrite
```

Do not paste private email addresses or secrets into repository files.

## SES sender setup

For the first production version, a verified single email sender is acceptable.

```bash
aws sesv2 create-email-identity \
  --email-identity "verified-sender@example.com"
```

AWS sends a verification email to that address. Click the verification link
before testing the contact API. If the AWS account remains in the SES sandbox,
the recipient address may also need to be verified or SES production access
must be requested.

## Infrastructure commands

Synthesize the contact API CloudFormation template locally:

```bash
npm run contact:synth
```

Deploy only after the owner approves the external AWS change:

```bash
npx cdk deploy --app "node infra/contact-form/cdk-app.mjs"
```

The stack outputs `ContactApiUrl`. Configure that exact value in Amplify as:

```text
PUBLIC_CONTACT_API_URL=<ContactApiUrl output>
```

The stack defaults to these allowed origins:

```text
https://yuliabalenko.com
https://www.yuliabalenko.com
```

To override them during synth/deploy:

```bash
npx cdk synth \
  --app "node infra/contact-form/cdk-app.mjs" \
  --context allowedOrigins="https://yuliabalenko.com,https://www.yuliabalenko.com"
```

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
- Throttle repeated submissions by short-lived, salted request fingerprints.
- Send via SES only after validation succeeds.
- Return a generic success/failure response without exposing internals.
- Avoid logging names, email addresses, and message bodies.

## Operational retention

- Contact messages are not stored by the application.
- CloudWatch logs retain only operational errors for one week.
- The DynamoDB throttling table stores salted fingerprints only and expires
  records after about 25 hours.
- The recipient mailbox copy follows the mailbox provider's retention settings.

## Local testing

Without environment variables, the form should render disabled and show the setup-in-progress message.

When a test API value is available, add it to a local `.env` file. Do not commit `.env`.

## Deferred bot protection

Turnstile/CAPTCHA setup is intentionally skipped for now. If spam becomes a problem, add it back by creating a widget for the approved domain, adding the public site key to Amplify, storing the secret key outside GitHub, sending the browser token in the form payload, and validating that token in Lambda before SES delivery.
