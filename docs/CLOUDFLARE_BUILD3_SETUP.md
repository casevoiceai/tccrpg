# Cloudflare deployment for TCC Portal Builds 3–4

Builds 3 and 4 are live on Cloudflare Workers with static assets and D1. The earlier Pages-specific plan was replaced after the Git-connected Cloudflare project was created as a Worker.

## Architecture

- Production domain: `https://tccrpg.com`
- `www`: `https://www.tccrpg.com`
- Cloudflare Worker: `tccrpg`
- Preview Worker: `tccrpg-preview`
- Production D1: `tcc-portal-production`
- Preview D1: `tcc-portal-preview`
- D1 binding name: `TCC_DB`
- Static asset binding: `ASSETS`
- Private reviewer material binding: `TCC_REVIEW_MATERIALS` (Workers KV)
- No Vercel
- No Supabase

`worker/index.js` routes `/api/*` requests to the portal API handlers and sends other requests to Cloudflare static assets. SPA fallback uses Wrangler's `not_found_handling: "single-page-application"`; the old `public/_redirects` file is intentionally absent.

## Production status

Build 3 and Build 4 are merged into `main` and have both completed successful Git-connected Cloudflare production builds.

Verified production behavior includes:

- root domain responds over HTTPS
- `www` responds over HTTPS
- React deep links resolve through SPA fallback
- Build 3 API routes are live
- Build 4 reviewer route and reviewer API are live
- production Worker is bound to `tcc-portal-production`

## Database status

These migrations are applied to both D1 databases:

1. `migrations/0001_portal.sql`
2. `migrations/0002_reviewers.sql`
3. `migrations/0003_reviewer_materials.sql`
4. `migrations/0004_retention_status.sql`
5. `migrations/0005_reviewer_material_key.sql`

Remote verification confirmed the portal, playtest, release-update, reviewer-invite, and review-submission tables exist. The retention migration also adds playtester status fields and the automatic status timestamp trigger.

## Retention cleanup

The production Worker has a daily scheduled cleanup.

It automatically deletes:

- anonymous portal submissions older than 180 days
- eligible `pending`, `declined`, `inactive`, or `unsuccessful` playtest applications 12 months after their latest qualifying status date

It does not automatically delete reviewer feedback or release-update subscribers.

## Privacy contact and email routing

`privacy@tccrpg.com` is the public privacy/deletion contact.

Cloudflare Email Routing forwards it to the TCC operations inbox. The destination has been verified and the forwarding rule is enabled.

## Preview configuration

The `preview` environment targets `tccrpg-preview`, binds `TCC_DB` to `tcc-portal-preview`, and binds `TCC_REVIEW_MATERIALS` to the isolated preview KV namespace.

For isolated preview testing:

```bash
npm run build
npx wrangler deploy --env preview
```

Preview URL:

`https://tccrpg-preview.casevoice-ai.workers.dev`

## Verified preview tests

The isolated preview Worker has successfully accepted and stored:

- anonymous guided-demo snapshot data through `/api/session`
- playtest applications through `/api/playtest`
- separate release-update consent through `/api/updates`
- reviewer invitation lookup through `/api/reviewer`
- invite-protected private PDF delivery through `/api/reviewer-material` using preview Workers KV
- a Deep Review submission when review material was assigned

Expected rows were verified directly in preview D1. Test-only rows were removed afterward.

## Cloudflare PR Preview checks

Cloudflare's automatic feature-branch Worker Preview check currently fails in the PR preview path. This is a preview-configuration issue, not the production deployment path.

The repo therefore uses the isolated `tccrpg-preview` Worker as the preview deployment gate. GitHub CI, contract tests, security checks, and the isolated preview smoke tests must pass before production merge. Production builds from `main` have deployed successfully through the Git-connected Worker project.

## Reviewer material

Deep Review stays locked unless the reviewer invitation contains either a valid HTTPS `material_url` or a private Workers KV `material_key`.

Current production delivery uses private Workers KV:

1. Store the review PDF in the production `TCC_REVIEW_MATERIALS` namespace.
2. Save its stable KV key in `reviewer_invites.material_key`.
3. Save a human-readable description in `material_label`.
4. The Worker exposes the file only through `/api/reviewer-material?code=...` after validating the active reviewer invitation.
5. Verify the exact PDF bytes and reviewer-room link before sending a Deep Review invitation.

An external HTTPS `material_url` remains supported when intentionally needed. Quick and Focused review do not require an attached manuscript.

## Remaining operational gate

There is no remaining Build 3 or Build 4 deployment gate.

The current V6.5 Core Deep Review PDF is prepared and private KV delivery has been validated in preview. The remaining Deep Review operational step is reviewer-specific: create the actual reviewer invitation, assign the approved material key, and verify that invitation before outreach. Exact universal weapon-profile values and blind-playtest findings remain separate manuscript/product gates rather than portal deployment blockers.
