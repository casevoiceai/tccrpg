PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS portal_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  portal_version TEXT NOT NULL,
  demo_version TEXT NOT NULL,
  discovery_json TEXT NOT NULL,
  choices_json TEXT NOT NULL,
  debrief_json TEXT NOT NULL,
  optional_source_opened INTEGER NOT NULL DEFAULT 0,
  submitted_at TEXT NOT NULL,
  UNIQUE(session_id, demo_version)
);

CREATE INDEX IF NOT EXISTS idx_portal_submissions_submitted_at
  ON portal_submissions(submitted_at);

CREATE TABLE IF NOT EXISTS playtest_applications (
  application_id TEXT PRIMARY KEY,
  session_id TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  general_location TEXT NOT NULL,
  participation_mode TEXT NOT NULL,
  rpg_experience TEXT NOT NULL,
  interests_json TEXT NOT NULL,
  inspector_interest TEXT NOT NULL,
  availability TEXT NOT NULL,
  accessibility_needs TEXT,
  unfinished_game_ack INTEGER NOT NULL,
  direct_criticism_ack INTEGER NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_playtest_applications_email
  ON playtest_applications(email);

CREATE INDEX IF NOT EXISTS idx_playtest_applications_created_at
  ON playtest_applications(created_at);

CREATE TABLE IF NOT EXISTS release_updates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  session_id TEXT,
  source TEXT NOT NULL,
  consented_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_release_updates_consented_at
  ON release_updates(consented_at);
