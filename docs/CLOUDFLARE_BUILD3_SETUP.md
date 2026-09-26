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

You can apply it in the Cloudflare D1 console or with Wrangler from an authenticated local environment.

Wrangler example:

```bash
npx wrangler d1 execute tcc-portal-production --remote --file=./migrations/0001_portal.sql
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

Before production launch, decide whether Cloudflare preview deployments should:

- use a separate D1 preview database, recommended, or
- use the production database, not recommended for development/testing.

Suggested preview database name:

`tcc-portal-preview`

Apply the same migration and bind it to `TCC_DB` in the Pages preview environment.

## 5. Smoke tests

After Cloudflare deploys the preview branch, test:

### Anonymous demo snapshot

Complete Discovery and The Missing Name through the post-mission debrief. Confirm a row appears in `portal_submissions`.

### Playtest application

Submit the playtest form. Confirm a row appears in `playtest_applications`.

### Release updates

Submit the release-update form. Confirm a row appears in `release_updates`.

### Separation check

Confirm that submitting a playtest application does not create a `release_updates` row unless the same person separately submits the release-update form.

## 6. Production gate

Do not merge Build 3 solely because the code compiles. Production is ready only after:

- D1 production database exists
- migration is applied
- `TCC_DB` is bound
- preview smoke tests pass
- retention period is approved
- privacy/deletion contact procedure is approved

## Official Cloudflare references

- Pages Functions: https://developers.cloudflare.com/pages/functions/
- Pages Functions bindings: https://developers.cloudflare.com/pages/functions/bindings/
- D1: https://developers.cloudflare.com/d1/
- D1 getting started: https://developers.cloudflare.com/d1/get-started/
