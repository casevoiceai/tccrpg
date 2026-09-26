const [baseUrlArg, reviewerCode] = process.argv.slice(2)

if (!baseUrlArg) {
  console.error('Usage: npm run smoke:cloudflare -- https://<preview-host> [reviewer-invite-code]')
  process.exit(2)
}

const baseUrl = baseUrlArg.replace(/\/$/, '')
const stamp = Date.now()
const sessionId = `smoke-${stamp}`
const email = `tcc-smoke-${stamp}@example.invalid`

async function requestJson(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options)
  const payload = await response.json().catch(() => ({}))

  if (!response.ok || payload.ok !== true) {
    throw new Error(`${path} failed: HTTP ${response.status} ${JSON.stringify(payload)}`)
  }

  console.log(`PASS ${path}`)
  return payload
}

function post(path, body) {
  return requestJson(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

await post('/api/session', {
  session_id: sessionId,
  portal_version: '0.4-smoke',
  demo_version: 'missing-name-0.2',
  discovery: {
    history_interests: ['history'],
    play_preference: 'investigation',
    supernatural_preference: 'some',
    research_preference: 'mixed',
    research_recovery_reaction: 'interested',
    risk_preference: 'level2',
    rpg_experience: 'experience_beginner',
    role_preference: 'agent',
  },
  choices: { firstMove: 'records' },
  debrief: {
    motivation: 'Solving the mystery',
    evidenceFeeling: 'Definitely',
    researchAfter: 'More interested than before',
    wouldPlay: 'Yes',
  },
  optional_source_opened: true,
  website: '',
})

await post('/api/playtest', {
  session_id: sessionId,
  name: 'Cloudflare Smoke Test',
  email,
  general_location: 'Preview environment',
  participation_mode: 'remote',
  rpg_experience: 'experience_beginner',
  interests: ['history', 'mystery'],
  inspector_interest: 'maybe',
  availability: 'Smoke test only',
  accessibility_needs: '',
  unfinished_game_ack: true,
  direct_criticism_ack: true,
  website: '',
})

await post('/api/updates', {
  session_id: sessionId,
  email,
  consent: true,
  source: 'cloudflare_preview_smoke_test',
  website: '',
})

if (reviewerCode) {
  const reviewer = await requestJson(`/api/reviewer?code=${encodeURIComponent(reviewerCode)}`)
  if (reviewer.deep_review_ready !== true) {
    throw new Error('/api/reviewer passed, but Deep review is not ready for the supplied preview invitation')
  }
  if (typeof reviewer.material_url !== 'string' || !reviewer.material_url.startsWith('https://')) {
    throw new Error('/api/reviewer passed, but the supplied reviewer material is not an HTTPS URL')
  }
  console.log(`PASS reviewer material: ${reviewer.material_label ?? reviewer.material_url}`)
} else {
  console.log('SKIP /api/reviewer material check (no reviewer invite code supplied)')
}

console.log(`Cloudflare preview smoke test complete for ${baseUrl}`)
console.log(`Test session: ${sessionId}`)
console.log(`Test email: ${email}`)
