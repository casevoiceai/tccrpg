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
  active,
  created_at
) VALUES (
  'r_7Kp2mQ9xT4nB',
  'Reviewer Name',
  'GM / actual-play perspective',
  'TCC 6.5',
  1,
  datetime('now')
);
```

Use the actual manuscript/build version the reviewer will see.

## Review paths

### Quick review

Core standardized critique after whatever part of the portal/material the reviewer actually used.

### Focused review

Core critique plus system status questions and selected focus modules.

### Deep review

Core critique plus Inspector burden and manuscript/information-design sections.

The current manuscript file must be attached to the reviewer portal before deep-review invitations are sent.

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
