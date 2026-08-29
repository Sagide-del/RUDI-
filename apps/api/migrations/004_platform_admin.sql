ALTER TABLE businesses ADD COLUMN IF NOT EXISTS access_status text NOT NULL DEFAULT 'active'
  CHECK (access_status IN ('active','suspended'));
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid NOT NULL REFERENCES users(id),
  action text NOT NULL,
  target_business_id uuid REFERENCES businesses(id) ON DELETE SET NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS admin_audit_log_created_idx ON admin_audit_log(created_at DESC);
