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

function safeFilename(value) {
  const raw = typeof value === 'string' && value.trim()
    ? value.trim()
    : 'tcc-review-material.pdf'
  const cleaned = raw.replace(/[^A-Za-z0-9._ -]/g, '_').slice(0, 120)
  return cleaned.toLowerCase().endsWith('.pdf') ? cleaned : `${cleaned}.pdf`
}

async function findInvite(db, code) {
  return db.prepare(
    `SELECT invite_code, active, material_key, material_label
     FROM reviewer_invites
     WHERE invite_code = ?`,
  ).bind(code).first()
}

export async function onRequestGet(context) {
  if (!context.env.TCC_DB || !context.env.TCC_REVIEW_MATERIALS) {
    return json({ ok: false, error: 'storage_not_configured' }, 503)
  }

  const code = new URL(context.request.url).searchParams.get('code')
  if (!validCode(code)) return json({ ok: false, error: 'invalid_invite' }, 400)

  try {
    const invite = await findInvite(context.env.TCC_DB, code)
    if (!invite || invite.active !== 1) {
      return json({ ok: false, error: 'invite_not_found' }, 404)
    }
    if (typeof invite.material_key !== 'string' || !invite.material_key.trim()) {
      return json({ ok: false, error: 'material_not_configured' }, 404)
    }

    const result = await context.env.TCC_REVIEW_MATERIALS.getWithMetadata(
      invite.material_key.trim(),
      'arrayBuffer',
    )
    if (!result?.value) return json({ ok: false, error: 'material_not_found' }, 404)

    const metadata = result.metadata && typeof result.metadata === 'object'
      ? result.metadata
      : {}
    const contentType = typeof metadata.content_type === 'string'
      ? metadata.content_type
      : 'application/pdf'
    const filename = safeFilename(metadata.filename || invite.material_label)

    return new Response(result.value, {
      status: 200,
      headers: {
        'content-type': contentType,
        'content-disposition': `inline; filename="${filename}"`,
        'cache-control': 'private, no-store',
        'x-content-type-options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('reviewer material lookup failed', error)
    return json({ ok: false, error: 'storage_error' }, 500)
  }
}
