# TCC form-notification gate

The TCC website stores Discovery responses, playtest applications, release-update signups, and private reviewer feedback in Cloudflare D1. The owner designated `tccttrpg@gmail.com` as the notification destination on November 17, 2026. That address must not be confused with any unrelated Gmail account.

## Status

Notification code and a destination-restricted `TCC_NOTIFY_EMAIL` binding are prepared in draft PR #8, but **disabled by default**. The draft is not merged or deployed. The production activation flag and sender variable are not set. No messages are sent by this code alone. Existing D1 submissions are unaffected and no old records are emailed automatically.

Verified November 17, 2026 with Cloudflare Wrangler: production D1 contains one anonymous Discovery submission dated September 26, 2026 and zero playtest applications, release-update signups, or reviewer submissions. `tccttrpg@gmail.com` was already verified as an Email Routing destination September 26, 2026. The active `privacy@tccrpg.com` routing alias forwards to that Gmail. Form submissions themselves do not use this forwarding alias. Cloudflare Email Sending settings returned `Unauthorized (2036)` during a read-only check; sending readiness remains unverified.

## Activation checklist

1. **Done:** Read the TCC production D1 tables and preserve existing submissions.
2. **Done:** Verify `tccttrpg@gmail.com` as a Cloudflare Email Routing destination. It was already verified.
3. **Pending:** Verify that `tccrpg.com` can send to its existing verified destination through the Cloudflare Workers email binding. An Email Sending settings check returned `Unauthorized (2036)`; do not assume sending works yet.
4. **Prepared, not deployed:** Both production and isolated preview include a `send_email` binding named `TCC_NOTIFY_EMAIL` restricted to `tccttrpg@gmail.com` in the draft `wrangler.jsonc`.
5. Configure `TCC_NOTIFICATION_FROM` to the approved sender address on `tccrpg.com`. It is a sender identity and need not be an incoming mailbox; verify it is allowed by Cloudflare.
6. Show Daniel the exact **recipient, sender, subject patterns, body, and attachments** (none). Obtain explicit final approval immediately before sending any test email or activating live mail alerts.
7. Test a fictional submission in preview, confirm one email arrives and its corresponding D1 record exists, then enable production with `TCC_NOTIFICATIONS_ACTIVE = "true"`. Recheck a real production submission and Cloudflare logs after launch.

The notification includes only a submission type and timestamp. It intentionally excludes people's answers, names, email addresses, availability, and accessibility needs. Those remain in D1 for authorized review.

## Message templates

- To: `tccttrpg@gmail.com`
- From: `TCC_NOTIFICATION_FROM` (sender to be confirmed)
- Subject: `[TCC website] New Discovery survey response` (or `New playtest application`, `New release-update signup`, `New private reviewer feedback`)
- Body: `<type> was saved on tccrpg.com at <timestamp>. Sign in to the TCC Cloudflare database to review the response. This alert intentionally excludes visitor names, contact details, and written answers. This is an automated TCC website notification.`
- Attachments: none

Cloudflare references: [Email Service Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) and [Email Routing destination addresses](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/).
