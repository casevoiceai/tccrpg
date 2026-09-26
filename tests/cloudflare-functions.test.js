import test from 'node:test'
import assert from 'node:assert/strict'

import { onRequestPost as submitSession } from '../functions/api/session.js'
import { onRequestPost as submitPlaytest } from '../functions/api/playtest.js'
import { onRequestPost as submitUpdate } from '../functions/api/updates.js'
import { runRetentionCleanup } from '../functions/retention.js'
import {
  onRequestGet as openReviewerInvite,
  onRequestPost as submitReviewer,
} from '../functions/api/reviewer.js'

function jsonRequest(path, body) {
  return new Request(`https://tccrpg.test${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

async function read(response) {
  return {
    status: response.status,
    body: await response.json(),
  }
}

function createDb({ invite = null } = {}) {
  const calls = []

  return {
    calls,
    prepare(sql) {
      const statement = {
        sql,
        values: [],
        bind(...values) {
          this.values = values
          return this
        },
        async run() {
          calls.push({ type: 'run', sql: this.sql, values: this.values })
          return { success: true }
        },
        async first() {
          calls.push({ type: 'first', sql: this.sql, values: this.values })
          return invite
        },
      }
      return statement
    },
    async batch(statements) {
      calls.push({
        type: 'batch',
        statements: statements.map((statement) => ({
          sql: statement.sql,
          values: statement.values,
        })),
      })
      return statements.map(() => ({ success: true }))
    },
  }
}

test('session endpoint fails closed when Cloudflare D1 is not bound', async () => {
  const result = await read(await submitSession({
    env: {},
    request: jsonRequest('/api/session', {}),
  }))

  assert.equal(result.status, 503)
  assert.equal(result.body.error, 'storage_not_configured')
})

test('session endpoint accepts a valid anonymous demo snapshot', async () => {
  const db = createDb()
  const result = await read(await submitSession({
    env: { TCC_DB: db },
    request: jsonRequest('/api/session', {
      session_id: 'session-123',
      portal_version: '0.3',
      demo_version: 'missing-name-0.2',
      discovery: { history_interests: ['labor'] },
      choices: { firstMove: 'records' },
      debrief: { wouldPlay: 'Yes' },
      optional_source_opened: true,
      website: '',
    }),
  }))

  assert.equal(result.status, 200)
  assert.equal(result.body.ok, true)
  assert.equal(db.calls.filter((call) => call.type === 'run').length, 1)
})

test('playtest endpoint rejects incomplete applications', async () => {
  const db = createDb()
  const result = await read(await submitPlaytest({
    env: { TCC_DB: db },
    request: jsonRequest('/api/playtest', {
      name: 'Tester',
      email: 'tester@example.com',
    }),
  }))

  assert.equal(result.status, 400)
  assert.equal(result.body.error, 'invalid_payload')
  assert.equal(db.calls.length, 0)
})

test('playtest endpoint stores a valid application without subscribing to updates', async () => {
  const db = createDb()
  const result = await read(await submitPlaytest({
    env: { TCC_DB: db },
    request: jsonRequest('/api/playtest', {
      session_id: 'session-123',
      name: 'Tester',
      email: 'TESTER@Example.com',
      general_location: 'Northeastern Pennsylvania',
      participation_mode: 'either',
      rpg_experience: 'experience_beginner',
      interests: ['history', 'mystery'],
      inspector_interest: 'maybe',
      availability: 'Weekday evenings',
      accessibility_needs: '',
      unfinished_game_ack: true,
      direct_criticism_ack: true,
      website: '',
    }),
  }))

  assert.equal(result.status, 200)
  assert.equal(result.body.ok, true)
  assert.equal(db.calls.length, 1)
  assert.match(db.calls[0].sql, /INSERT INTO playtest_applications/)
  assert.ok(!db.calls[0].sql.includes('release_updates'))
  assert.ok(db.calls[0].values.includes('tester@example.com'))
})

test('release-update endpoint requires explicit consent', async () => {
  const db = createDb()
  const result = await read(await submitUpdate({
    env: { TCC_DB: db },
    request: jsonRequest('/api/updates', {
      email: 'tester@example.com',
      consent: false,
    }),
  }))

  assert.equal(result.status, 400)
  assert.equal(result.body.error, 'invalid_payload')
  assert.equal(db.calls.length, 0)
})

test('release-update endpoint stores a consented address separately', async () => {
  const db = createDb()
  const result = await read(await submitUpdate({
    env: { TCC_DB: db },
    request: jsonRequest('/api/updates', {
      session_id: 'session-123',
      email: 'TESTER@Example.com',
      consent: true,
      source: 'post_demo',
      website: '',
    }),
  }))

  assert.equal(result.status, 200)
  assert.equal(result.body.ok, true)
  assert.equal(db.calls.length, 1)
  assert.match(db.calls[0].sql, /INSERT INTO release_updates/)
  assert.ok(db.calls[0].values.includes('tester@example.com'))
})

test('reviewer endpoint rejects malformed invite codes before database lookup', async () => {
  const db = createDb()
  const response = await openReviewerInvite({
    env: { TCC_DB: db },
    request: new Request('https://tccrpg.test/api/reviewer?code=bad code'),
  })
  const result = await read(response)

  assert.equal(result.status, 400)
  assert.equal(result.body.error, 'invalid_invite')
  assert.equal(db.calls.length, 0)
})

test('reviewer endpoint opens an active Cloudflare-backed invitation with assigned material', async () => {
  const db = createDb({
    invite: {
      invite_code: 'REVIEW_123',
      reviewer_name: 'Sample Reviewer',
      expertise: 'TTRPG design',
      tcc_version: '6.5',
      active: 1,
      submitted_at: null,
      material_label: 'TCC Version 6.5 Review PDF',
      material_url: 'https://review-assets.tccrpg.com/tcc-v6-5-review.pdf',
    },
  })

  const response = await openReviewerInvite({
    env: { TCC_DB: db },
    request: new Request('https://tccrpg.test/api/reviewer?code=REVIEW_123'),
  })
  const result = await read(response)

  assert.equal(result.status, 200)
  assert.equal(result.body.ok, true)
  assert.equal(result.body.tcc_version, '6.5')
  assert.equal(result.body.already_submitted, false)
  assert.equal(result.body.material_label, 'TCC Version 6.5 Review PDF')
  assert.equal(result.body.material_url, 'https://review-assets.tccrpg.com/tcc-v6-5-review.pdf')
  assert.equal(result.body.deep_review_ready, true)
  assert.equal(db.calls.filter((call) => call.type === 'first').length, 1)
  assert.equal(db.calls.filter((call) => call.type === 'run').length, 1)
})

test('reviewer endpoint keeps deep review locked when no material is assigned', async () => {
  const db = createDb({
    invite: {
      invite_code: 'REVIEW_123',
      reviewer_name: 'Sample Reviewer',
      expertise: 'TTRPG design',
      tcc_version: '6.5',
      active: 1,
      submitted_at: null,
      material_label: null,
      material_url: null,
    },
  })

  const result = await read(await submitReviewer({
    env: { TCC_DB: db },
    request: jsonRequest('/api/reviewer', {
      invite_code: 'REVIEW_123',
      path_selected: 'deep',
      reviewer_types: ['designer'],
      materials_reviewed: ['full_manuscript'],
      answers: { top_priority: 'Teach the core loop sooner.' },
      website: '',
    }),
  }))

  assert.equal(result.status, 409)
  assert.equal(result.body.error, 'review_material_not_configured')
  assert.equal(db.calls.filter((call) => call.type === 'batch').length, 0)
})

test('reviewer endpoint stores a valid deep critique when material is assigned', async () => {
  const db = createDb({
    invite: {
      invite_code: 'REVIEW_123',
      reviewer_name: 'Sample Reviewer',
      expertise: 'TTRPG design',
      tcc_version: '6.5',
      active: 1,
      submitted_at: null,
      material_label: 'TCC Version 6.5 Review PDF',
      material_url: 'https://review-assets.tccrpg.com/tcc-v6-5-review.pdf',
    },
  })

  const result = await read(await submitReviewer({
    env: { TCC_DB: db },
    request: jsonRequest('/api/reviewer', {
      invite_code: 'REVIEW_123',
      path_selected: 'deep',
      reviewer_types: ['designer'],
      materials_reviewed: ['full_manuscript'],
      answers: {
        overall_readiness: 3,
        top_priority: 'Teach the core loop sooner.',
      },
      website: '',
    }),
  }))

  assert.equal(result.status, 200)
  assert.equal(result.body.ok, true)
  assert.equal(db.calls.filter((call) => call.type === 'first').length, 1)
  assert.equal(db.calls.filter((call) => call.type === 'batch').length, 1)
})

test('retention cleanup deletes only expired anonymous data and eligible playtest applications', async () => {
  const db = createDb()
  await runRetentionCleanup(db)

  const batch = db.calls.find((call) => call.type === 'batch')
  assert.ok(batch)
  assert.equal(batch.statements.length, 2)

  const sql = batch.statements.map((statement) => statement.sql).join('\n')
  assert.match(sql, /portal_submissions/)
  assert.match(sql, /-180 days/)
  assert.match(sql, /playtest_applications/)
  assert.match(sql, /-12 months/)
  assert.match(sql, /status_updated_at/)
  assert.match(sql, /pending.*declined.*inactive.*unsuccessful/s)
  assert.doesNotMatch(sql, /review_submissions/)
  assert.doesNotMatch(sql, /release_updates/)
})