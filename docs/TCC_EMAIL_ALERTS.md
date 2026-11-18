# TCC form email notifications

## Current status: Active

On November 17, 2026 (Eastern time), Daniel approved one preview test email and, if successful, automatic future submission alerts. The preview test succeeded, and production alerts were enabled.

- Website: https://www.tccrpg.com
- Source of truth: GitHub `casevoiceai/tccrpg`, PR #8 merged to `main` at `dc90a2f2241f5a62a7f128bcf6687c67aaac97d3`.
- Production Cloudflare Worker: `tccrpg`, deployed version `90ff81ad-8132-44e6-b25b-4fc7bf8abd81`.
- Email destination: `tccttrpg@gmail.com` (verified Cloudflare Email Routing destination).
- Approved sender: `privacy@tccrpg.com` (also an incoming forwarding alias for the same Gmail).
- Cloudflare binding: `TCC_NOTIFY_EMAIL`, restricted to `tccttrpg@gmail.com`.
- Production settings: `TCC_NOTIFICATION_FROM` set to the approved sender; `TCC_NOTIFICATIONS_ACTIVE` set to `true`.
- Triggering forms: Discovery survey, playtest application, release-update signup, private reviewer feedback.

The alerts report only the submission category and timestamp. They never include visitor names, email addresses, accessibility needs, availability, or answers. Those remain in Cloudflare D1 for authorized review. Failed email delivery does not make a successfully stored form fail. Previous submissions are **not** automatically re-emailed.

## Verification

- Preview Worker: `tccrpg-preview`, with separate `tcc-portal-preview` D1 database and the same destination-restricted binding.
- November 17, 2026 at 9:35 p.m. Eastern: exactly one fictional Discovery submission was made to the preview endpoint. API returned `ok: true` with UTC timestamp `2026-11-18T02:35:05.901Z`.
- The preview D1 record `tcc-owner-alert-preview-test-20261118` was confirmed present exactly once.
- An email from `privacy@tccrpg.com` arrived in `tccttrpg@gmail.com`, subject `[TCC website] New Discovery survey response`; no visitor data or attachments.
- GitHub Actions CI passed for tested source commit `7e5f5b285c5f18650346d75777e2505525ef0ea5`. Local production build and lint passed, as did all 17 form/Cloudflare tests.
- Production Worker deploy confirmed the intended `tcc-portal-production` database, `TCC_NOTIFY_EMAIL` binding, and both configuration-secret names.
- Read-only production database counts after activation: **1** Discovery response, **0** playtest applications, **0** release-update signups, **0** reviewer submissions, unchanged from before deployment.
- The public `https://www.tccrpg.com` returned HTTP 200 and served the same main JavaScript asset as the newly deployed Worker. The public site includes Cloudflare's extra analytics script, accounting for its slightly longer HTML.
- No live-site test form was submitted. End-to-end mail delivery was verified in the isolated preview; the live Worker has the same code and active notification settings. Confirm live delivery against the next genuine visitor submission.

## Approved message templates

- **To:** `tccttrpg@gmail.com`
- **From:** `privacy@tccrpg.com`
- **Subject:** `[TCC website] New Discovery survey response`, or `New playtest application`, `New release-update signup`, `New private reviewer feedback` with the same prefix.
- **Body:** `A new [form type] submission was saved on tccrpg.com at [date and time]. Sign in to the TCC Cloudflare database to review the response. Visitor names, contact details, and written answers are intentionally excluded from this notification. This is an automated TCC website notification.`
- **Attachments:** none.

Cloudflare documentation: [Workers Email Sending API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) and [verified Email Routing destinations](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/).
