# AWS Amplify Deployment Runbook

This runbook covers the Milestone 7 deployment path for the static Astro website.

## Deployment baseline

| Item            | Value                                                  |
| --------------- | ------------------------------------------------------ |
| Hosting         | AWS Amplify Hosting                                    |
| AWS region      | `us-east-1` unless changed by the owner                |
| Source          | GitHub                                                 |
| Repository      | `https://github.com/ybalenko/artist-portfolio-website` |
| Branch          | `main`                                                 |
| Build file      | `amplify.yml`                                          |
| Install command | `npm ci`                                               |
| Build command   | `npm run build`                                        |
| Publish folder  | `dist`                                                 |
| Custom domain   | Deferred                                               |

## First deployment steps

These steps must be performed by the owner in the AWS Console because they connect external services.

1. Sign in to the AWS account.
2. Switch to the selected AWS region, currently `us-east-1`.
3. Open AWS Amplify.
4. Choose to create a new Amplify app.
5. Select GitHub as the source provider.
6. Authorize AWS Amplify to access the GitHub repository if prompted.
7. Select repository `artist-portfolio-website`.
8. Select branch `main`.
9. Review build settings.
10. Confirm Amplify is using the repository `amplify.yml`.
11. Start the first build/deploy.
12. After the build succeeds, copy the Amplify-provided public URL.
13. Record the URL in [Milestone 7](../milestones/milestone-7.md).

## Expected build behavior

Amplify should:

1. Install dependencies with `npm ci`.
2. Build the static Astro site with `npm run build`.
3. Publish the generated `dist/` directory.
4. Keep the previous deployment online if a future build fails.

## Post-deployment checks

Verify these routes from the Amplify URL:

- `/`
- `/contacts/`
- `/exhibitions/`
- `/portfolio/`
- `/press/`
- `/resume/`

Also verify:

- Header navigation works.
- The Exhibitions section controls work.
- Legacy `/exhibitions/current/`, `/exhibitions/past/`, and `/exhibitions/upcoming/` URLs redirect to the matching `/exhibitions/` hash section.
- Contacts forms remain disabled.
- Portfolio carousel controls work.
- Portfolio images load from cloud URLs after the image migration step is complete.

## Notes

- Do not add a custom domain in Milestone 7.
- Do not configure contact form, mailing list, CAPTCHA, SES, Lambda, API Gateway, or DynamoDB in Milestone 7.
- Do not store AWS credentials or secrets in the repository.
