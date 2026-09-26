# Cloudflare setup for TCC Portal Builds 3–4

The Cloudflare data layer is now provisioned. The remaining platform step is to create the **Git-integrated Cloudflare Pages project** from the GitHub repository and verify the first preview deployment.

Do **not** create a Direct Upload Pages project for this repository. The intended workflow is GitHub → Cloudflare Pages with automatic preview deployments.

## Current Cloudflare resources

Production D1:

`tcc-portal-production`

Preview D1:

`tcc-portal-preview`

The Pages Function binding name is exactly:

`TCC_DB`

The application accesses the database through `context.env.TCC_DB`.

## D1 schema status

The following migrations have already been applied to both preview and production D1 databases:

1. `migrations/0001_portal.sql`
2. `migrations/0002_reviewers.sql`
3. `migrations/0003_reviewer_materials.sql`

Remote verification confirmed the portal, playtest, release-update, reviewer-invite, and review-submission tables exist. Reviewer invitations also contain `material_label` and `material_url`.

## Wrangler configuration

`wrangler.jsonc` is checked into the portal branches and defines:

- project name: `tccrpg`
- build output: `./dist`
- production `TCC_DB` → `tcc-portal-production`
- preview `TCC_DB` → `tcc-portal-preview`

Once the Git-integrated Pages project exists, the Wrangler configuration is intended to be the source of truth for these bindings.

## Create the Pages project

In the Cloudflare dashboard:

1. Open **Workers & Pages**.
2. Select **Create application**.
3. Choose **Pages**.
4. Choose **Connect to Git** / **Import an existing Git repository**.
5. Select GitHub repository `casevoiceai/tccrpg`.
6. Project name: `tccrpg`.
7. Production branch: `main`.
8. Build command: `npm run build`.
9. Build output directory: `dist`.
10. Save and deploy.

Do not use the Wrangler `pages project create` command for this initial project creation because that creates a Direct Upload project rather than the Git-integrated workflow required here.

## Preview environment

After Git integration is connected, commits to `tcc-portal-build3` and `tcc-portal-build4` should produce preview deployments. Preview Pages Functions must use the preview D1 database through the `env.preview` override in `wrangler.jsonc`.

Before production launch, confirm the preview deployment is using `tcc-portal-preview`, not `tcc-portal-production`.

## Reviewer material hosting

For Deep review, each invitation can carry a `material_label` and `material_url`.

Recommended Cloudflare-native pattern:

- store the review PDF or packet in Cloudflare R2
- expose it through an HTTPS Cloudflare-hosted/custom-domain URL
- save that URL on the reviewer invitation
- do not add Vercel or Supabase for reviewer assets or data

Deep review is locked unless a valid HTTPS material URL is assigned. Quick and Focused review do not require an attached manuscript.

## Automated function tests

GitHub CI runs browser-independent contract tests against the Cloudflare Pages Function handlers:

```bash
npm test
```

The suite verifies the anonymous demo endpoint, playtest application separation, release-update consent, reviewer invitation/submission contracts, and the Deep-review material gate.

## Preview smoke tests

After Cloudflare produces a preview URL, run:

```bash
npm run smoke:cloudflare -- https://<cloudflare-preview-host>
```

After a preview reviewer invitation has a valid HTTPS `material_url`, run:

```bash
npm run smoke:cloudflare -- https://<cloudflare-preview-host> REVIEWER_CODE
```

The script uses clearly labeled preview-only records and an `example.invalid` email address. Run it against preview only, never production.

It verifies:

- anonymous demo snapshot submission
- playtest application submission
- release-update opt-in submission
- reviewer invitation lookup
- Deep-review material readiness when a reviewer code is supplied

Then confirm the expected rows exist in `tcc-portal-preview`.

## Production gate

Build 3 and Build 4 remain unmerged until:

- the Git-integrated Cloudflare Pages project exists
- a preview deployment is live
- preview smoke tests pass
- expected preview D1 rows are verified
- reviewer material delivery is verified for Deep review
- the retention period is approved
- the privacy/deletion contact procedure is approved

D1 creation, schema migration, and environment-specific binding configuration are complete.

## Official Cloudflare references

- Git integration: https://developers.cloudflare.com/pages/get-started/git-integration/
- Pages Wrangler configuration: https://developers.cloudflare.com/pages/functions/wrangler-configuration/
- Pages Functions: https://developers.cloudflare.com/pages/functions/
- Pages Functions bindings: https://developers.cloudflare.com/pages/functions/bindings/
- D1: https://developers.cloudflare.com/d1/
- R2: https://developers.cloudflare.com/r2/
