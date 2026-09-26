ALTER TABLE playtest_applications ADD COLUMN status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE playtest_applications ADD COLUMN status_updated_at TEXT;

UPDATE playtest_applications
SET status_updated_at = created_at
WHERE status_updated_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_playtest_applications_status_updated_at
  ON playtest_applications(status, status_updated_at);

CREATE TRIGGER IF NOT EXISTS trg_playtest_status_updated_at
AFTER UPDATE OF status ON playtest_applications
FOR EACH ROW
WHEN NEW.status <> OLD.status
BEGIN
  UPDATE playtest_applications
  SET status_updated_at = datetime('now')
  WHERE application_id = NEW.application_id;
END;