export async function runRetentionCleanup(db) {
  if (!db) throw new Error('storage_not_configured')

  return db.batch([
    db.prepare(
      "DELETE FROM portal_submissions WHERE submitted_at < datetime('now', '-180 days')",
    ),
    db.prepare(
      `DELETE FROM playtest_applications
       WHERE COALESCE(status_updated_at, created_at) < datetime('now', '-12 months')
         AND status IN ('pending', 'declined', 'inactive', 'unsuccessful')`,
    ),
  ])
}