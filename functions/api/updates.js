const MAX_BODY_BYTES = 8_000

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

async function readJson(request) {
  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) throw new Error('content_type')
  const text = await request.text()
  if (text.length > MAX_BODY_BYTES) throw new Error('body_too_large')
  return JSON.parse(text)
}

function cleanEmail(value) {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  if (!email || email.length > 254) return null
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  return email
}

function cleanOptionalText(value, max) {
  if (typeof value !== 'string') return null
  const cleaned = value.trim()
  if (!cleaned || cleaned.length > max) return null
  return cleaned
}

export async function onRequestPost(context) {
  if (!context.env.TCC_DB) {
    return json({ ok: false, error: 'storage_not_configured' }, 503)
  }

  let body
  try {
    body = await readJson(context.request)
  } catch (error) {
    const code = error instanceof Error ? error.message : 'invalid_request'
    return json({ ok: false, error: code }, code === 'body_too_large' ? 413 : 400)
  }

  if (body.website) return json({ ok: true })

  const email = cleanEmail(body.email)
  const sessionId = cleanOptionalText(body.session_id, 128)
  const source = cleanOptionalText(body.source, 80) ?? 'portal'

  if (!email || body.consent !== true) {
    return json({ ok: false, error: 'invalid_payload' }, 400)
  }

  const consentedAt = new Date().toISOString()

  try {
    await context.env.TCC_DB.prepare(
      `INSERT INTO release_updates (email, session_id, source, consented_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(email) DO UPDATE SET
         session_id = excluded.session_id,
         source = excluded.source,
         consented_at = excluded.consented_at`,
    )
      .bind(email, sessionId, source, consentedAt)
      .run()

    return json({ ok: true })
  } catch (error) {
    console.error('release update signup failed', error)
    return json({ ok: false, error: 'storage_error' }, 500)
  }
}

export function onRequestGet() {
  return json({ ok: false, error: 'method_not_allowed' }, 405)
}
