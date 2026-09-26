# Time-Crawl Chronicles

TCC Reviewer + Playtest Portal for **tccrpg.com**, a Vogtcom LLC project.

## Current build

**Portal 0.1 / Build 1**

Build 1 contains:

- Level 1 Orientation
- Level 2 Discovery with eight interactive questions
- Local browser persistence so a visitor can leave and resume
- Deterministic TCC profile generation
- Accessibility controls for larger text, higher contrast, and reduced motion
- Level 3 guided-Chronicle placeholder
- Reviewer, playtest, and privacy placeholders for later builds

Build 1 deliberately uses **no AI service and no remote database**. Discovery state remains in the visitor's browser until a later testing build explicitly adds server-side collection.

## Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS 4 through the official Vite plugin
- React Router
- **Cloudflare Pages** static deployment

This project is not configured for Vercel or Supabase. Future server-side persistence should use Cloudflare-native infrastructure unless the project architecture is intentionally changed later.

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

## Build sequence

1. **Build 1**: Orientation → Discovery → Profile
2. **Build 2**: 15–20 minute guided Chronicle
3. **Build 3**: feedback, playtest applications, and Cloudflare-native persistence
4. **Build 4**: private reviewer room and standardized critique rubric
5. **Build 5**: visual/audio polish after the core flow survives usability testing
