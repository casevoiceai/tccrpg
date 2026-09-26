# TCC reviewer invitation workflow

The private reviewer room uses Cloudflare D1 invitation codes rather than public reviewer accounts.

## Reviewer URL

An invited reviewer receives one URL:

`https://tccrpg.com/review?code=INVITE_CODE`

The portal verifies that code through `GET /api/reviewer?code=...` before opening the private critique paths.

## Creating an invitation

Generate a long random code outside the website. Do not use obvious sequential codes such as `REVIEW1`.

Suggested shape:

`r_7Kp2mQ9xT4nB`

Add the invitation to D1:

```sql
INSERT INTO reviewer_invites (
  invite_code,
  reviewer_name,
  expertise,
  tcc_version,
  material_label,
  material_url,
  material_key,
  active,
  created_at
) VALUES (
  'r_7Kp2mQ9xT4nB',
  'Reviewer Name',
  'GM / actual-play perspective',
  'TCC 6.5',
  'TCC V6.5 Core Deep Review Copy',
  NULL,
  'tcc-v65-core-deep-review-2026-09-26.pdf',
  1,
  datetime('now')
);
```

Use the actual manuscript/build version the reviewer will see.

Quick and Focused reviews do not require assigned manuscript material. Deep Review requires either an external HTTPS `material_url` or an internal `material_key`.

## Reviewer material hosting

Current production delivery uses a private Cloudflare Workers KV namespace bound as `TCC_REVIEW_MATERIALS`.

1. Upload the review PDF to the production KV namespace under a stable key.
2. Save that key in `reviewer_invites.material_key` and a readable description in `material_label`.
3. Leave `material_url` null for private KV delivery, or set it to a valid HTTPS URL only when intentionally using external Cloudflare-hosted material.
4. The reviewer API returns `/api/reviewer-material?code=INVITE_CODE` for KV-backed material.
5. That endpoint validates the active invitation before streaming the PDF with private, no-store response headers.

Do not expose private review manuscripts as public static assets. Do not add Vercel or Supabase for reviewer assets or data.

## Review paths

### Quick review

Core standardized critique after whatever part of the portal/material the reviewer actually used.

### Focused review

Core critique plus system status questions and selected focus modules.

### Deep review

Core critique plus Inspector burden and manuscript/information-design sections. Deep review is enabled only when the invitation has a configured external `material_url` or private `material_key`.

## What the database records

Every review submission records:

- invite code
- TCC version from the invitation
- portal version
- reviewer perspective(s)
- material actually reviewed
- review path
- rubric answers
- submission time

This prevents later feedback from becoming detached from the version and material the reviewer actually saw.

## Outreach rule

One follow-up only. If the invited reviewer does not respond after that, stop.

The outreach ask must state that:

- criticism is requested, not promotion
- no endorsement or testimonial is requested
- the reviewer can use the short path if they do not have time for the manuscript
- any public use of a reviewer quote requires separate permission
