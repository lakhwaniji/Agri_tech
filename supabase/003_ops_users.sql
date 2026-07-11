-- Ops staff table. Standalone login (own username/password columns) —
-- deliberately NOT linked to Supabase Auth (auth.users). This means
-- auth.uid() is never set for ops sessions, so there is no RLS policy
-- based on it here; the /ops dashboard reads farms/farm_visits using the
-- service_role key on the server only (never exposed to the browser),
-- which bypasses RLS entirely. That's the standard use of service_role:
-- an operation with no "owner row" / no real Supabase Auth session to
-- check against.
create table public.ops_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password text not null,
  full_name text not null,
  role text not null default 'agent' check (role in ('agent', 'admin')),
  created_at timestamptz default now()
);

-- RLS on, no policies defined — this table is reachable only via the
-- service_role key (server-side login check), never directly from the
-- browser with the anon key.
alter table public.ops_users enable row level security;
