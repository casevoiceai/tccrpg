# Time-Crawl Chronicles

TCC Reviewer + Playtest Portal for **tccrpg.com**, a Vogtcom LLC project.

## Current development branch

**Portal 0.3 / Build 3**

Build 3 adds the research and recruitment layer on top of Builds 1 and 2:

- Level 1 Orientation
- Level 2 Discovery with eight interactive questions
- Deterministic TCC profile generation
- Level 3 guided Chronicle: **The Missing Name**
- Post-mission debrief
- Anonymous guided-demo snapshot submission
- Playtest application form
- Separate Inspector-interest path
- Separate release-update email opt-in
- Cloudflare Pages Functions API endpoints
- Cloudflare D1 schema and migration
- Browser persistence and retry for failed anonymous demo submissions
- Accessibility controls for larger text, higher contrast, and reduced motion

Build 3 remains gated from production until the Cloudflare D1 database and `TCC_DB` Pages binding are configured and the remaining privacy retention/contact language is approved.

## Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS 4 through the official Vite plugin
- React Router
- **Cloudflare Pages**
- **Cloudflare Pages Functions**
- **Cloudflare D1** for Build 3 persistence

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

Build 3 Pages Functions expect a D1 binding named:

`TCC_DB`

See:

- `docs/CLOUDFLARE_BUILD3_SETUP.md`
- `migrations/0001_portal.sql`

## Build sequence

1. **Build 1**: Orientation → Discovery → Profile
2. **Build 2**: guided 15–20 minute Chronicle → debrief
3. **Build 3**: feedback, playtest applications, release-update opt-in, and Cloudflare-native persistence
4. **Build 4**: private reviewer room and standardized critique rubric
5. **Build 5**: visual/audio polish after the core flow survives usability testing
