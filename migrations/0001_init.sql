PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS solved_sessions (
  session_hash TEXT PRIMARY KEY,
  solved_at INTEGER NOT NULL,
  joined INTEGER NOT NULL DEFAULT 0 CHECK (joined IN (0, 1)),
  expires_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS solved_sessions_expires_idx
  ON solved_sessions (expires_at);

CREATE TABLE IF NOT EXISTS hall_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_hash TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL CHECK (length(name) BETWEEN 1 AND 30),
  comment TEXT NOT NULL CHECK (length(comment) BETWEEN 1 AND 100),
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS hall_entries_newest_idx
  ON hall_entries (created_at DESC, id DESC);

CREATE TABLE IF NOT EXISTS rate_limits (
  rate_key TEXT PRIMARY KEY,
  window_started INTEGER NOT NULL,
  attempts INTEGER NOT NULL CHECK (attempts >= 0)
);

