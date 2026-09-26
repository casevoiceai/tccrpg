# Time-Crawl Chronicles

TCC Reviewer + Playtest Portal for **tccrpg.com**, a Vogtcom LLC project.

## Current development branch

**Portal 0.4 / Build 4**

The current development branch now includes:

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
- quick, focused, and deep reviewer paths
- standardized critique rubric
- reviewer-version and material-reviewed metadata
- Cloudflare Pages Functions API endpoints
- Cloudflare D1 migrations
- browser persistence and retry for failed anonymous demo submissions
- accessibility controls for larger text, higher contrast, and reduced motion

Builds 3 and 4 remain gated from production until the Cloudflare D1 resources and `TCC_DB` Pages binding are configured, both migrations are applied, preview smoke tests pass, the current manuscript asset is attached for deep reviews, and the remaining privacy retention/contact language is approved.

## Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS 4 through the official Vite plugin
- React Router
- **Cloudflare Pages**
- **Cloudflare Pages Functions**
- **Cloudflare D1**

This project is not configured for Vercel or Supabase.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Cloudflare Pages

Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Recommended Node version: `22`

The `public/_redirects` file provides the SPA fallback needed by React Router.

Pages Functions expect a D1 binding named:

`TCC_DB`

Apply migrations in order:

1. `migrations/0001_portal.sql`
2. `migrations/0002_reviewers.sql`

See:

- `docs/CLOUDFLARE_BUILD3_SETUP.md`
- `docs/REVIEWER_INVITES.md`

## Build sequence

1. **Build 1**: Orientation → Discovery → Profile
2. **Build 2**: guided 15–20 minute Chronicle → debrief
3. **Build 3**: feedback, playtest applications, release-update opt-in, and Cloudflare-native persistence
4. **Build 4**: private reviewer room and standardized critique rubric
5. **Build 5**: visual/audio polish after the core flow survives usability testing
