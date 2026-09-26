const MAX_BODY_BYTES = 48_000

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
  if (!contentType.includes('application/json')) {
    throw new Error('content_type')
  }

  const text = await request.text()
  if (text.length > MAX_BODY_BYTES) throw new Error('body_too_large')
  return JSON.parse(text)
}

function isShortText(value, max) {
  return typeof value === 'string' && value.length > 0 && value.length <= max
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

  if (
    !isShortText(body.session_id, 128)
    || !isShortText(body.portal_version, 32)
    || !isShortText(body.demo_version, 64)
    || typeof body.discovery !== 'object'
    || body.discovery === null
    || typeof body.choices !== 'object'
    || body.choices === null
    || typeof body.debrief !== 'object'
    || body.debrief === null
  ) {
    return json({ ok: false, error: 'invalid_payload' }, 400)
  }

  const submittedAt = new Date().toISOString()
  const discoveryJson = JSON.stringify(body.discovery)
  const choicesJson = JSON.stringify(body.choices)
  const debriefJson = JSON.stringify(body.debrief)
  const optionalSourceOpened = body.optional_source_opened ? 1 : 0

  if (
    discoveryJson.length > 20_000
    || choicesJson.length > 12_000
    || debriefJson.length > 12_000
  ) {
    return json({ ok: false, error: 'payload_too_large' }, 413)
  }

  try {
    await context.env.TCC_DB.prepare(
      `INSERT INTO portal_submissions (
        session_id,
        portal_version,
        demo_version,
        discovery_json,
        choices_json,
        debrief_json,
        optional_source_opened,
        submitted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(session_id, demo_version) DO UPDATE SET
        portal_version = excluded.portal_version,
        discovery_json = excluded.discovery_json,
        choices_json = excluded.choices_json,
        debrief_json = excluded.debrief_json,
        optional_source_opened = excluded.optional_source_opened,
        submitted_at = excluded.submitted_at`,
    )
      .bind(
        body.session_id,
        body.portal_version,
        body.demo_version,
        discoveryJson,
        choicesJson,
        debriefJson,
        optionalSourceOpened,
        submittedAt,
      )
      .run()

    return json({ ok: true, submitted_at: submittedAt })
  } catch (error) {
    console.error('portal submission failed', error)
    return json({ ok: false, error: 'storage_error' }, 500)
  }
}

export function onRequestGet() {
  return json({ ok: false, error: 'method_not_allowed' }, 405)
}
