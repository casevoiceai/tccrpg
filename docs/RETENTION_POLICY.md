# TCC Portal Data Retention Policy

Approved: 2026-09-26
Privacy contact: privacy@tccrpg.com

## Retention periods

- Anonymous Discovery and guided-demo snapshots: 180 days.
- Playtest applications with status `pending`, `declined`, `inactive`, or `unsuccessful`: 12 months.
- Selected or active tester records: retained while the person is participating. When participation ends and the status is changed to `inactive`, the 12-month retention clock starts from that status change.
- Reviewer feedback: retained as a TCC development record. If a reviewer requests deletion, remove or anonymize their identifying information while preserving non-identifying design feedback when appropriate.
- Release-update email addresses: retained until unsubscribe or deletion request.

## Separation of consent

A playtest application does not subscribe a person to release updates. Release-update consent remains separate.

## Automated cleanup

The Cloudflare Worker runs a daily scheduled cleanup. It deletes anonymous portal submissions older than 180 days and eligible playtest applications 12 months after their latest qualifying status date. It does not automatically delete reviewer feedback or release-update subscribers.

## Requests

Privacy, deletion, and unsubscribe requests are handled through privacy@tccrpg.com. The address is intended to forward to the TCC operations inbox once domain email routing is active.