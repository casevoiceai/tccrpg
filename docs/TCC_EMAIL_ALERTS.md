# TCC form-notification gate

The TCC website stores Discovery responses, playtest applications, release-update signups, and private reviewer feedback in Cloudflare D1. The owner designated `tccttrpg@gmail.com` as the notification destination on November 17, 2026. That address must not be confused with any unrelated Gmail account.

## Status

Notification code is prepared but **disabled by default**. Deploying this code alone does **not** send messages. Existing D1 submissions are unaffected and no old records are emailed automatically.

## Activation checklist

1. Sign in to the TCC Cloudflare account. Inspect the four D1 tables first to determine whether submissions already exist. Do not delete them.
2. In Cloudflare Email Service / Email Routing, verify `tccttrpg@gmail.com` as a destination address. Verification requires Daniel to approve the Cloudflare confirmation sent to that Gmail inbox.
3. Verify that the sending domain `tccrpg.com` is enabled to send through Cloudflare Email Service (or meets Cloudflare's verified-recipient sending prerequisites).
4. Configure the production Worker `send_email` binding named `TCC_NOTIFY_EMAIL`, restricting its `destination_address` to `tccttrpg@gmail.com`. Include the equivalent binding in `wrangler.jsonc` when production deployment is ready so the Git-connected configuration remains reproducible. Configure the isolated preview Worker independently.
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
