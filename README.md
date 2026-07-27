# Time-Crawl Chronicles

Production splash page for **tccrpg.com**, a Vogtcom LLC project.

## Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS 4 through the official Vite plugin
- React Router
- Cloudflare Pages static deployment

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Recommended Node version: `22`

The `public/_redirects` file provides the SPA fallback needed by React Router.
