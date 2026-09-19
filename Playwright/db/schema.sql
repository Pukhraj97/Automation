-- PostgreSQL shape for replacing the deterministic fixture adapter.
CREATE TABLE releases (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  owner_team TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ready', 'attention')),
  updated_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE release_quality_signals (
  release_id TEXT PRIMARY KEY REFERENCES releases(id) ON DELETE CASCADE,
  ui_checks INTEGER NOT NULL CHECK (ui_checks >= 0),
  api_contracts INTEGER NOT NULL CHECK (api_contracts >= 0),
  data_assertions INTEGER NOT NULL CHECK (data_assertions >= 0),
  event_coverage NUMERIC(5, 2) NOT NULL CHECK (event_coverage BETWEEN 0 AND 100),
  error_rate NUMERIC(8, 2) NOT NULL CHECK (error_rate >= 0),
  measured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);