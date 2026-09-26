# TCC Reviewer + Playtest Portal — Build 3 Specification

Status: implementation-ready pending Cloudflare D1 resource setup and final privacy retention decision

## Purpose

Build 3 turns the first two portal builds into a usable research and recruitment pipeline while keeping separate permissions for anonymous product testing, playtest applications, and release updates.

## Cloudflare-only architecture

Build 3 uses:

- Cloudflare Pages for the React/Vite site
- Cloudflare Pages Functions for form/API handling
- Cloudflare D1 for structured portal data

It does not use Vercel or Supabase.

Required D1 binding name: `TCC_DB`

## Data flows

### Anonymous guided-demo snapshot

When a visitor finishes the guided Chronicle, the site submits:

- random portal session ID
- portal version
- demo version
- Discovery selections
- six guided-demo choices
- whether optional source detail was opened
- post-demo debrief responses

The anonymous snapshot does not include name or email.

If submission fails, the completed demo remains saved in browser storage and the portal retries later.

### Playtest application

The playtest application stores:

- name
- email
- general location
- in-person / remote / either
- RPG experience
- selected interests
- Inspector interest
- general availability
- optional accessibility note
- acknowledgements that TCC is unfinished and direct criticism is expected
- portal session ID when available

A playtest application does not subscribe the applicant to release updates.

### Release-update opt-in

The release-update form stores:

- email
- portal session ID when available
- signup source
- consent timestamp

Release updates are a separate explicit opt-in.

## Endpoints

- `POST /api/session`
- `POST /api/playtest`
- `POST /api/updates`

All endpoints:

- accept JSON only
- cap request sizes
- use prepared D1 statements
- include a simple honeypot field
- return `503 storage_not_configured` when `TCC_DB` is unavailable
- send no-store JSON responses

## Database

Migration: `migrations/0001_portal.sql`

Tables:

- `portal_submissions`
- `playtest_applications`
- `release_updates`

## Privacy boundary

Build 3 explicitly tells guided-demo visitors that finishing the demo sends an anonymous testing snapshot.

The public privacy page separates:

- anonymous Discovery/demo data
- playtest application data
- release-update consent

Before public recruitment opens, two policy items must be locked:

1. data retention period
2. contact/deletion request procedure

Those are product/privacy decisions, not implementation defaults.

## Deployment gate

Do not merge Build 3 to production until:

1. a Cloudflare D1 database exists
2. `migrations/0001_portal.sql` has been applied
3. the Pages project has a D1 binding named `TCC_DB` for production
4. the preview environment has the intended D1 binding for testing
5. the final retention/contact language is approved
6. all CI checks pass
7. the three POST endpoints are smoke-tested against Cloudflare preview

## Build 3 definition of done

Build 3 is functionally complete when:

- completed guided-demo data reaches D1
- failed anonymous submissions retry without losing browser progress
- playtest applications can be submitted independently
- release-update signup is separate and explicit
- privacy copy accurately reflects the live data flow
- Pages/Functions routing works in Cloudflare preview
- no Vercel or Supabase dependency exists
