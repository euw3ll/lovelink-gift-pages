CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  theme TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pages_user_id ON pages(user_id);

ALTER TABLE events ADD COLUMN IF NOT EXISTS page_id uuid REFERENCES pages(id);
CREATE INDEX IF NOT EXISTS idx_events_page_id ON events(page_id);
