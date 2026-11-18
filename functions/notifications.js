const NOTIFICATION_DESTINATION = 'tccttrpg@gmail.com'

const SUBJECTS = {
  discovery: 'New Discovery survey response',
  playtest: 'New playtest application',
  updates: 'New release-update signup',
  reviewer: 'New private reviewer feedback',
}

/**
 * An owner-only alert, never the submitted form content. Forms are still stored
 * in D1 and must succeed independently of the email service.
 *
 * Sending is disabled until the owner approves the template and configures:
 * - a Cloudflare send_email binding called TCC_NOTIFY_EMAIL
 * - TCC_NOTIFICATION_FROM (a domain-approved sender address)
 * - TCC_NOTIFICATIONS_ACTIVE = "true"
 */
export function queueSubmissionNotification(context, type, submittedAt) {
  const env = context.env ?? {}
  if (
    env.TCC_NOTIFICATIONS_ACTIVE !== 'true'
    || !env.TCC_NOTIFY_EMAIL
    || typeof env.TCC_NOTIFY_EMAIL.send !== 'function'
    || typeof env.TCC_NOTIFICATION_FROM !== 'string'
    || !env.TCC_NOTIFICATION_FROM.trim()
  ) return

  const subject = SUBJECTS[type]
  if (!subject) return

  const send = Promise.resolve().then(() => env.TCC_NOTIFY_EMAIL.send({
    to: NOTIFICATION_DESTINATION,
    from: env.TCC_NOTIFICATION_FROM,
    subject: `[TCC website] ${subject}`,
    text: `A new ${subject.replace(/^New /, '')} submission was saved on tccrpg.com at ${submittedAt}.\n\nSign in to the TCC Cloudflare database to review the response. Visitor names, contact details, and written answers are intentionally excluded from this notification.\n\nThis is an automated TCC website notification.`,
  })).catch((error) => {
    console.error('TCC submission notification failed', error)
  })

  if (typeof context.waitUntil === 'function') context.waitUntil(send)
  else return send
}
