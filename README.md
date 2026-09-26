# Time-Crawl Chronicles

TCC Reviewer + Playtest Portal for **tccrpg.com**, a Vogtcom LLC project.

## Current production build

**Portal 0.4 / Build 4** is live.

The production portal includes:

- Level 1 Orientation
- Level 2 Discovery with eight interactive questions
- deterministic TCC profile generation
- Level 3 guided Chronicle: **The Missing Name**
- post-mission debrief
- anonymous guided-demo snapshot submission
- playtest application form
- separate Inspector-interest path
- separate release-update email opt-in
- private reviewer invitation codes
- Quick, Focused, and Deep reviewer paths
- standardized critique rubric
- reviewer-version and material-reviewed metadata
- browser persistence and retry for failed anonymous demo submissions
- accessibility controls for larger text, higher contrast, and reduced motion

Deep Review is intentionally locked unless an invitation has a valid HTTPS review-material URL. Quick and Focused reviews do not require an attached manuscript.

## Production URLs

- `https://tccrpg.com`
- `https://www.tccrpg.com`
- private reviewer entry: `https://tccrpg.com/review?code=INVITE_CODE`

## Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS 4 through the official Vite plugin
- React Router
- Cloudflare Workers
- Cloudflare Workers static assets
- Cloudflare D1

The portal does not use Vercel or Supabase.

## Cloudflare architecture

Production Worker: `tccrpg`

Preview Worker: `tccrpg-preview`

D1 binding: `TCC_DB`

Production database: `tcc-portal-production`

Preview database: `tcc-portal-preview`

The Worker routes `/api/*` requests to the portal API handlers and serves the React application through the `ASSETS` binding. SPA fallback is provided by Wrangler's `not_found_handling: "single-page-application"` setting.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Tests

```bash
npm test
npm run lint
```

The Build 4 contract suite covers portal submissions, playtest applications, release-update consent, reviewer invitations/submissions, the Deep Review material gate, and retention cleanup.

## D1 migrations

Apply migrations in order:

1. `migrations/0001_portal.sql`
2. `migrations/0002_reviewers.sql`
3. `migrations/0003_reviewer_materials.sql`
4. `migrations/0004_retention_status.sql`

All four migrations are already applied to both production and preview D1 databases.

## Preview testing

The isolated preview environment uses the preview D1 database:

```bash
npm run build
npx wrangler deploy --env preview
```

Live preview API smoke tests have passed for portal submissions, playtest applications, release-update consent, reviewer invitation lookup, and Deep Review submission with test material. Test-only rows were removed afterward.

Cloudflare's automatic feature-branch Worker Preview check is not the deployment gate for this repo. The isolated `tccrpg-preview` Worker is used for preview validation; production builds from `main` are Git-connected and have deployed successfully.

## Privacy and retention

Privacy/deletion contact: `privacy@tccrpg.com`

Cloudflare Email Routing forwards that address to the TCC operations inbox.

Approved retention policy:

- anonymous Discovery/guided-demo snapshots: 180 days
- pending, declined, inactive, or unsuccessful playtest applications: 12 months from the latest qualifying status date
- selected/active tester records: retained while participating
- reviewer feedback: retained as a TCC development record, with identifying information removable/anonymizable on request
- release-update addresses: retained until unsubscribe or deletion request

Playtest applications and release-update subscriptions remain separate consents.

## Reviewer material gate

Reviewer invitations can optionally include `material_label` and `material_url`.

Deep Review opens only when the assigned material URL is valid HTTPS. Before sending any Deep Review invitation, assign and verify the actual current review manuscript or packet. Do not substitute an EOD report or an older working draft.

See:

- `docs/CLOUDFLARE_BUILD3_SETUP.md`
- `docs/REVIEWER_INVITES.md`
- `docs/RETENTION_POLICY.md`

## Build sequence

1. **Build 1**: Orientation → Discovery → Profile
2. **Build 2**: guided 15–20 minute Chronicle → debrief
3. **Build 3**: feedback, playtest applications, release-update opt-in, Cloudflare-native persistence, and retention controls
4. **Build 4**: private reviewer room and standardized critique rubric
5. **Build 5**: visual/audio polish after the core flow survives usability testing
