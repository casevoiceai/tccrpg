const MAX_BODY_BYTES = 32_000

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

function cleanText(value, max, required = true) {
  if (typeof value !== 'string') return null
  const cleaned = value.trim()
  if (required && !cleaned) return null
  if (cleaned.length > max) return null
  return cleaned
}

function cleanEmail(value) {
  const email = cleanText(value, 254)
  if (!email) return null
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  return email.toLowerCase()
}

function allowed(value, options) {
  return typeof value === 'string' && options.includes(value) ? value : null
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

  const name = cleanText(body.name, 120)
  const email = cleanEmail(body.email)
  const generalLocation = cleanText(body.general_location, 160)
  const participationMode = allowed(body.participation_mode, ['in_person', 'remote', 'either'])
  const rpgExperience = allowed(body.rpg_experience, [
    'experience_none',
    'experience_beginner',
    'experience_regular',
    'experience_veteran',
    'experience_gm',
    'experience_professional',
  ])
  const inspectorInterest = allowed(body.inspector_interest, ['yes', 'no', 'maybe'])
  const availability = cleanText(body.availability, 1200)
  const accessibilityNeeds = cleanText(body.accessibility_needs ?? '', 1200, false)
  const sessionId = cleanText(body.session_id ?? '', 128, false)

  const allowedInterests = new Set([
    'history',
    'mystery',
    'roleplay',
    'investigation',
    'combat',
    'supernatural',
    'research_puzzles',
  ])
  const interests = Array.isArray(body.interests)
    ? [...new Set(body.interests.filter((item) => typeof item === 'string' && allowedInterests.has(item)))].slice(0, 7)
    : []

  if (
    !name
    || !email
    || !generalLocation
    || !participationMode
    || !rpgExperience
    || !inspectorInterest
    || !availability
    || body.unfinished_game_ack !== true
    || body.direct_criticism_ack !== true
  ) {
    return json({ ok: false, error: 'invalid_payload' }, 400)
  }

  const applicationId = crypto.randomUUID()
  const createdAt = new Date().toISOString()

  try {
    await context.env.TCC_DB.prepare(
      `INSERT INTO playtest_applications (
        application_id,
        session_id,
        name,
        email,
        general_location,
        participation_mode,
        rpg_experience,
        interests_json,
        inspector_interest,
        availability,
        accessibility_needs,
        unfinished_game_ack,
        direct_criticism_ack,
        status,
        status_updated_at,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, 'pending', ?, ?)`,
    )
      .bind(
        applicationId,
        sessionId || null,
        name,
        email,
        generalLocation,
        participationMode,
        rpgExperience,
        JSON.stringify(interests),
        inspectorInterest,
        availability,
        accessibilityNeeds || null,
        createdAt,
        createdAt,
      )
      .run()

    return json({ ok: true, application_id: applicationId })
  } catch (error) {
    console.error('playtest application failed', error)
    return json({ ok: false, error: 'storage_error' }, 500)
  }
}

export function onRequestGet() {
  return json({ ok: false, error: 'method_not_allowed' }, 405)
}
