# Cloudflare deployment for TCC Portal Builds 3–4

TCC now uses Cloudflare Workers with static assets and D1. The original Pages-specific plan was replaced after the Git-connected Cloudflare project was created as a Worker.

## Architecture

- Cloudflare Worker: `tccrpg`
- Production URL: `https://tccrpg.casevoice-ai.workers.dev`
- Preview Worker: `tccrpg-preview`
- Production D1: `tcc-portal-production`
- Preview D1: `tcc-portal-preview`
- D1 binding name: `TCC_DB`
- Static asset binding: `ASSETS`
- No Vercel
- No Supabase

`worker/index.js` routes `/api/*` requests to the portal API handlers and sends all other requests to Cloudflare static assets. SPA fallback is handled through Wrangler's `not_found_handling = single-page-application`, so the old `public/_redirects` file is intentionally removed.

## Database status

These migrations have been applied to both D1 databases:

1. `migrations/0001_portal.sql`
2. `migrations/0002_reviewers.sql`
3. `migrations/0003_reviewer_materials.sql`

Remote verification confirmed the portal, playtest, release-update, reviewer-invite, and review-submission tables exist.

## Production configuration

`wrangler.jsonc` defines the production Worker and D1 binding. Production deploys use the default configuration.

## Preview configuration

The `preview` environment targets `tccrpg-preview` and binds `TCC_DB` to `tcc-portal-preview`.

For isolated preview testing:

```bash
npm run build
npx wrangler deploy --env preview
```

The manually deployed preview Worker is available at:

`https://tccrpg-preview.casevoice-ai.workers.dev`

## Verified smoke tests

The preview Worker has successfully accepted and stored:

- anonymous guided-demo snapshot data through `/api/session`
- playtest applications through `/api/playtest`
- separate release-update consent through `/api/updates`
- reviewer invitation lookup through `/api/reviewer`
- a Deep-review submission when a valid HTTPS review material URL was assigned

Expected rows were verified directly in preview D1 after the test. Test-only rows were then removed.

## Reviewer material

Deep review stays locked unless a reviewer invitation contains a valid HTTPS `material_url`.

Recommended production delivery:

- store the current review PDF or packet in Cloudflare R2
- expose it through a Cloudflare-hosted HTTPS URL or custom domain
- save that URL and a readable label on the reviewer invitation

Quick and Focused review do not require an attached manuscript.

## Current production gate

Build 3 should not merge until the following product-policy choices are approved:

- data-retention period
- privacy/deletion contact procedure

Build 4 additionally requires the real current manuscript or reviewer packet URL before Deep-review invitations are sent.

## Notes on Cloudflare PR checks

GitHub's normal CI and security checks pass. The Cloudflare GitHub App currently reports failed PR preview checks, while the isolated `tccrpg-preview` Worker deploys and passes live API smoke tests. Until the Cloudflare preview-build configuration is normalized, use the isolated preview Worker as the deployment gate.
