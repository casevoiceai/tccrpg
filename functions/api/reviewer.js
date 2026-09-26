const MAX_BODY_BYTES = 96_000

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

function validCode(value) {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{6,64}$/.test(value)
}

function reviewerMaterial(invite) {
  const label = typeof invite.material_label === 'string' && invite.material_label.trim()
    ? invite.material_label.trim()
    : null
  const url = typeof invite.material_url === 'string' && invite.material_url.trim()
    ? invite.material_url.trim()
    : null

  return { label, url }
}

async function findInvite(db, code) {
  return db.prepare(
    `SELECT invite_code, reviewer_name, expertise, tcc_version, active, submitted_at,
            material_label, material_url
     FROM reviewer_invites
     WHERE invite_code = ?`,
  ).bind(code).first()
}

export async function onRequestGet(context) {
  if (!context.env.TCC_DB) {
    return json({ ok: false, error: 'storage_not_configured' }, 503)
  }

  const code = new URL(context.request.url).searchParams.get('code')
  if (!validCode(code)) return json({ ok: false, error: 'invalid_invite' }, 400)

  try {
    const invite = await findInvite(context.env.TCC_DB, code)
    if (!invite || invite.active !== 1) {
      return json({ ok: false, error: 'invite_not_found' }, 404)
    }

    const openedAt = new Date().toISOString()
    await context.env.TCC_DB.prepare(
      'UPDATE reviewer_invites SET last_opened_at = ? WHERE invite_code = ?',
    ).bind(openedAt, code).run()

    const material = reviewerMaterial(invite)

    return json({
      ok: true,
      reviewer_name: invite.reviewer_name ?? null,
      expertise: invite.expertise ?? null,
      tcc_version: invite.tcc_version,
      already_submitted: Boolean(invite.submitted_at),
      material_label: material.label,
      material_url: material.url,
      deep_review_ready: Boolean(material.url),
    })
  } catch (error) {
    console.error('reviewer invite lookup failed', error)
    return json({ ok: false, error: 'storage_error' }, 500)
  }
}

export async function onRequestPost(context) {
  if (!context.env.TCC_DB) {
    return json({ ok: false, error: 'storage_not_configured' }, 503)
  }

  const contentType = context.request.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return json({ ok: false, error: 'content_type' }, 400)
  }

  const text = await context.request.text()
  if (text.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'body_too_large' }, 413)
  }

  let body
  try {
    body = JSON.parse(text)
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400)
  }

  if (body.website) return json({ ok: true })

  const code = body.invite_code
  const pathSelected = body.path_selected
  const reviewerTypes = Array.isArray(body.reviewer_types) ? body.reviewer_types.slice(0, 12) : []
  const materialsReviewed = Array.isArray(body.materials_reviewed) ? body.materials_reviewed.slice(0, 20) : []
  const answers = body.answers

  if (
    !validCode(code)
    || !['quick', 'focused', 'deep'].includes(pathSelected)
    || reviewerTypes.length === 0
    || typeof answers !== 'object'
    || answers === null
  ) {
    return json({ ok: false, error: 'invalid_payload' }, 400)
  }

  const answersJson = JSON.stringify(answers)
  const reviewerTypesJson = JSON.stringify(reviewerTypes)
  const materialsJson = JSON.stringify(materialsReviewed)

  if (answersJson.length > 72_000) {
    return json({ ok: false, error: 'payload_too_large' }, 413)
  }

  try {
    const invite = await findInvite(context.env.TCC_DB, code)
    if (!invite || invite.active !== 1) {
      return json({ ok: false, error: 'invite_not_found' }, 404)
    }

    const material = reviewerMaterial(invite)
    if (pathSelected === 'deep' && !material.url) {
      return json({ ok: false, error: 'review_material_not_configured' }, 409)
    }

    const reviewId = crypto.randomUUID()
    const submittedAt = new Date().toISOString()

    await context.env.TCC_DB.batch([
      context.env.TCC_DB.prepare(
        `INSERT INTO review_submissions (
          review_id,
          invite_code,
          tcc_version,
          portal_version,
          reviewer_types_json,
          materials_reviewed_json,
          path_selected,
          answers_json,
          submitted_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).bind(
        reviewId,
        code,
        invite.tcc_version,
        '0.4',
        reviewerTypesJson,
        materialsJson,
        pathSelected,
        answersJson,
        submittedAt,
      ),
      context.env.TCC_DB.prepare(
        'UPDATE reviewer_invites SET submitted_at = ? WHERE invite_code = ?',
      ).bind(submittedAt, code),
    ])

    return json({ ok: true, review_id: reviewId })
  } catch (error) {
    console.error('review submission failed', error)
    return json({ ok: false, error: 'storage_error' }, 500)
  }
}
