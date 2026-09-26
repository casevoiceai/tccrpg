import { onRequestPost as submitSession } from '../functions/api/session.js'
import { onRequestPost as submitPlaytest } from '../functions/api/playtest.js'
import { onRequestPost as submitUpdates } from '../functions/api/updates.js'
import {
  onRequestGet as openReviewer,
  onRequestPost as submitReviewer,
} from '../functions/api/reviewer.js'
import { runRetentionCleanup } from '../functions/retention.js'

function pagesContext(request, env, ctx) {
  return {
    request,
    env,
    waitUntil: ctx.waitUntil.bind(ctx),
    passThroughOnException: ctx.passThroughOnException?.bind(ctx),
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const context = pagesContext(request, env, ctx)

    if (url.pathname === '/api/session' && request.method === 'POST') return submitSession(context)
    if (url.pathname === '/api/playtest' && request.method === 'POST') return submitPlaytest(context)
    if (url.pathname === '/api/updates' && request.method === 'POST') return submitUpdates(context)
    if (url.pathname === '/api/reviewer' && request.method === 'GET') return openReviewer(context)
    if (url.pathname === '/api/reviewer' && request.method === 'POST') return submitReviewer(context)

    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ ok: false, error: 'not_found' }), {
        status: 404,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      })
    }

    return env.ASSETS.fetch(request)
  },

  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(runRetentionCleanup(env.TCC_DB))
  },
}