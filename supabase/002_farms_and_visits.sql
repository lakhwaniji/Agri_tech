-- A farmer can own multiple lands, so farm-specific data (location, boundary,
-- soil) can't live on the farmers table — it moves to its own `farms` table,
-- one row per land parcel. `farm_visits` then tracks scheduling per farm,
-- with multiple visits allowed over time (reschedules, repeat visits) rather
-- than overwriting a single "visit" field.

-- 1. Remove the farm-specific columns from farmers — they were only ever
-- placeholders from the original single-farm assumption, and are NULL for
-- every existing row (FarmGate was never built), so nothing real is lost.
alter table public.farmers
  drop column if exists farm_location,
  drop column if exists farm_boundary,
  drop column if exists soil_details,
  drop column if exists farmgate_completed_at;

-- 2. One row per land parcel. "label" lets a farmer with multiple lands
-- tell them apart (e.g. "North field") — optional, not required at creation.
create table public.farms (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid not null references public.farmers(id) on delete cascade,
  label text,
  visit_address text not null,

  -- filled in later by the agent during the actual visit, not by the farmer
  farm_location geography(point),
  farm_boundary geography(polygon),
  soil_details jsonb,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.farms enable row level security;

create policy "Farmers can view own farms"
  on public.farms for select
  using (auth.uid() = farmer_id);

create policy "Farmers can create own farms"
  on public.farms for insert
  with check (auth.uid() = farmer_id);

-- 3. One row per scheduled visit. farmer_id is duplicated here (not just
-- reachable via farms.farmer_id) so RLS can check ownership directly,
-- without needing a join.
create table public.farm_visits (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  farmer_id uuid not null references public.farmers(id) on delete cascade,

  scheduled_date date not null,
  scheduled_time_slot text not null,
  status text not null default 'requested'
    check (status in ('requested', 'scheduled', 'completed', 'cancelled')),

  -- Plain text for now — there's no staff/agents table yet (that belongs to
  -- the ops interface we've parked for later). Becomes a real FK once that
  -- exists.
  assigned_agent_name text,
  completed_at timestamptz,
  notes text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.farm_visits enable row level security;

create policy "Farmers can view own visits"
  on public.farm_visits for select
  using (auth.uid() = farmer_id);

create policy "Farmers can request own visits"
  on public.farm_visits for insert
  with check (auth.uid() = farmer_id);

-- Deliberately no UPDATE policy for farmers: changing status or assigning an
-- agent is an ops-side action. Until the ops interface exists, only
-- service_role can update these rows — same pattern as the rest of the app.
