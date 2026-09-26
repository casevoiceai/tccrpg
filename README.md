# Time-Crawl Chronicles

TCC Reviewer + Playtest Portal for **tccrpg.com**, a Vogtcom LLC project.

## Current build

**Portal 0.2 / Build 2**

Build 2 contains:

- Level 1 Orientation
- Level 2 Discovery with eight interactive questions
- Deterministic TCC profile generation
- Level 3 guided Chronicle: **The Missing Name**
- Six meaningful visitor decisions inside the guided Chronicle
- Year Zero dice and Agent-cooperation examples
- Historical-source interaction and optional deeper source detail
- Echo Ware introduction
- Post-mission debrief
- Local browser persistence for Discovery and guided-Chronicle progress
- Accessibility controls for larger text, higher contrast, and reduced motion
- Separate future paths for playtesting, Inspector interest, and release updates

Build 2 deliberately uses **no AI service and no remote database**. Discovery answers, guided-Chronicle choices, and debrief answers remain in the visitor's browser. Build 3 will add optional feedback/contact flows and remote testing data only after the Cloudflare-native persistence layer is configured.

## Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS 4 through the official Vite plugin
- React Router
- **Cloudflare Pages** static deployment

This project is not configured for Vercel or Supabase. Server-side persistence must use Cloudflare-native infrastructure unless the project architecture is intentionally changed later.

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
2. **Build 2**: guided 15–20 minute Chronicle → debrief
3. **Build 3**: feedback, playtest applications, release-update opt-in, and Cloudflare-native persistence
4. **Build 4**: private reviewer room and standardized critique rubric
5. **Build 5**: visual/audio polish after the core flow survives usability testing
