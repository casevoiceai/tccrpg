CREATE TABLE IF NOT EXISTS reviewer_invites (
  invite_code TEXT PRIMARY KEY,
  reviewer_name TEXT,
  expertise TEXT,
  tcc_version TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  last_opened_at TEXT,
  submitted_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_reviewer_invites_active
  ON reviewer_invites(active);

CREATE TABLE IF NOT EXISTS review_submissions (
  review_id TEXT PRIMARY KEY,
  invite_code TEXT,
  tcc_version TEXT NOT NULL,
  portal_version TEXT NOT NULL,
  reviewer_types_json TEXT NOT NULL,
  materials_reviewed_json TEXT NOT NULL,
  path_selected TEXT NOT NULL,
  answers_json TEXT NOT NULL,
  submitted_at TEXT NOT NULL,
  FOREIGN KEY(invite_code) REFERENCES reviewer_invites(invite_code)
);

CREATE INDEX IF NOT EXISTS idx_review_submissions_invite_code
  ON review_submissions(invite_code);

CREATE INDEX IF NOT EXISTS idx_review_submissions_submitted_at
  ON review_submissions(submitted_at);
