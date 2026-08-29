CREATE TABLE IF NOT EXISTS automation_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  due_date date NOT NULL,
  status text NOT NULL DEFAULT 'pending_connection',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(business_id, customer_id, event_type, due_date)
);
