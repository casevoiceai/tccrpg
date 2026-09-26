# Cloudflare setup for TCC Portal Build 3

The repository code is prepared for Cloudflare Pages Functions + D1. The remaining infrastructure step is to create/bind the D1 database in Cloudflare.

## Required resource

Create one D1 database for the production portal, suggested name:

`tcc-portal-production`

The Pages Function binding name must be exactly:

`TCC_DB`

The code accesses the database through `context.env.TCC_DB`.

## 1. Create the D1 database

In Cloudflare:

1. Open **Workers & Pages** / **D1**.
2. Create a D1 database named `tcc-portal-production` or another clear production name.
3. Keep note of the database you created.

## 2. Apply the schema

Run the SQL in:

`migrations/0001_portal.sql`

Build 4 also adds:

`migrations/0002_reviewers.sql`

Apply migrations in numeric order.

You can apply them in the Cloudflare D1 console or with Wrangler from an authenticated local environment.

Wrangler examples:

```bash
npx wrangler d1 execute tcc-portal-production --remote --file=./migrations/0001_portal.sql
npx wrangler d1 execute tcc-portal-production --remote --file=./migrations/0002_reviewers.sql
```

## 3. Bind D1 to the existing Pages project

For the TCC Pages project:

1. Open **Workers & Pages**.
2. Select the TCC Pages project.
3. Open **Settings**.
4. Open **Bindings**.
5. Add a **D1 database binding**.
6. Variable name: `TCC_DB`
7. Select the production TCC D1 database.
8. Save the binding.
9. Redeploy after adding the binding.

Cloudflare supports D1 bindings for Pages Functions through the dashboard or Wrangler configuration. The dashboard path avoids committing a database UUID to this repository.

## 4. Preview environment

Before production launch, Cloudflare preview deployments should use a separate D1 preview database rather than the production database.

Suggested preview database name:

`tcc-portal-preview`

Apply the same migrations and bind it to `TCC_DB` in the Pages preview environment.

## 5. Automated function tests

GitHub CI now runs browser-independent contract tests against the Cloudflare Pages Function handlers:

```bash
npm test
```

These tests verify the anonymous demo endpoint, playtest application separation, release-update consent, and reviewer invitation/submission contracts without requiring a live Cloudflare account.

## 6. Preview smoke tests

After Cloudflare deploys the preview branch and the preview D1 binding is active, run:

```bash
npm run smoke:cloudflare -- https://<cloudflare-preview-host>
```

If a Build 4 reviewer invite has already been inserted into the preview D1 database, include its code to test that endpoint too:

```bash
npm run smoke:cloudflare -- https://<cloudflare-preview-host> REVIEWER_CODE
```

The script submits clearly labeled preview-only records using an `example.invalid` email address. Run it only against the preview environment, not production.

The automated smoke test checks:

- anonymous demo snapshot submission
- playtest application submission
- release-update opt-in submission
- reviewer invitation lookup when a code is supplied

Then confirm the corresponding rows exist in D1.

### Manual separation check

Confirm that submitting a playtest application does not create a `release_updates` row unless the same person separately submits the release-update form.

## 7. Production gate

Do not merge Build 3 solely because the code compiles. Production is ready only after:

- D1 production database exists
- D1 preview database exists
- migrations are applied in order
- `TCC_DB` is bound in preview and production
- preview smoke tests pass
- expected rows are confirmed in preview D1
- retention period is approved
- privacy/deletion contact procedure is approved

Build 4 remains chained behind this same Cloudflare gate.

## Official Cloudflare references

- Pages Functions: https://developers.cloudflare.com/pages/functions/
- Pages Functions bindings: https://developers.cloudflare.com/pages/functions/bindings/
- D1: https://developers.cloudflare.com/d1/
- D1 getting started: https://developers.cloudflare.com/d1/get-started/
