-- AgriFintech — ONE-SHOT SETUP for a brand-new Supabase project.
-- Paste this whole file into Supabase Dashboard → SQL Editor → Run.
-- It is migrations 001–007 in order + the crop-scans storage bucket.
-- Generated from supabase/00*.sql — if you edit a migration, regenerate this file.


-- ================= supabase/001_farmers_table.sql =================
-- 0. Make sure PostGIS is actually enabled in this database (idempotent —
-- safe to run even if it's already on).
create extension if not exists postgis;

-- 1. The farmers table itself.
-- "id" is the same UUID as auth.users.id — one-to-one link, not a separate identity.
create table public.farmers (
  id uuid primary key references auth.users(id) on delete cascade,
  phone_number text not null,

  -- filled in at registration (nullable because the trigger creates this row
  -- before the user has typed anything)
  full_name text,
  place text,
  pincode text,
  district text,
  state text,
  preferred_language text default 'en',

  -- filled in later, during FarmGate
  aadhaar_linked_confirmed boolean default false,
  farm_location geography(point),
  farm_boundary geography(polygon),
  soil_details jsonb,
  farmgate_completed_at timestamptz,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. The trigger function: runs as the database owner ("security definer"),
-- so it can insert into farmers even though the new user has no session yet.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.farmers (id, phone_number)
  values (new.id, new.phone);
  return new;
end;
$$;

-- 3. The trigger itself: fires once, right after a new row lands in auth.users.
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4. Row Level Security: a farmer can only ever see/edit their own row.
alter table public.farmers enable row level security;

create policy "Farmers can view own profile"
  on public.farmers for select
  using (auth.uid() = id);

create policy "Farmers can update own profile"
  on public.farmers for update
  using (auth.uid() = id);

-- ================= supabase/002_farms_and_visits.sql =================
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

-- ================= supabase/003_ops_users.sql =================
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

-- ================= supabase/004_get_farm_geo.sql =================
-- Converts farms.farm_location/farm_boundary (raw PostGIS binary) into
-- plain {lat, lng} JSON the frontend can hand straight to a map library,
-- without pulling in any GeoJSON-parsing library client-side.
--
-- security invoker (the default) means this runs with the CALLING user's
-- own permissions — a farmer calling this for their own farm still goes
-- through the existing "auth.uid() = farmer_id" RLS policy on farms, same
-- as any other read. No service_role needed here.
create or replace function public.get_farm_geo(p_farm_id uuid)
returns json
language sql
stable
as $$
  select json_build_object(
    'location',
    case when farm_location is not null then
      json_build_object(
        'lat', ST_Y(farm_location::geometry),
        'lng', ST_X(farm_location::geometry)
      )
    end,
    'boundary',
    case when farm_boundary is not null then (
      select json_agg(json_build_object('lat', ST_Y(pt), 'lng', ST_X(pt)) order by path[1])
      from (
        select (dp).path, (dp).geom as pt
        from (select ST_DumpPoints(farm_boundary::geometry) as dp) as points
      ) as ordered_points
    )
    end
  )
  from public.farms
  where id = p_farm_id;
$$;

-- ================= supabase/005_green_details.sql =================
-- Converts farms.farm_boundary into GeoJSON for handing to the Sentinel Hub
-- Statistical API (which expects a GeoJSON polygon, not raw PostGIS binary).
-- Same security-invoker reasoning as get_farm_geo (004) — not used here since
-- this is only ever called by ops (service_role), but kept consistent.
create or replace function public.get_farm_boundary_geojson(p_farm_id uuid)
returns json
language sql
stable
as $$
  select ST_AsGeoJSON(farm_boundary::geometry)::json
  from public.farms
  where id = p_farm_id;
$$;

-- Total farm area in hectares, from the same boundary polygon. ST_Area on a
-- geography type returns square meters; 1 hectare = 10,000 sq meters.
create or replace function public.get_farm_area_hectares(p_farm_id uuid)
returns numeric
language sql
stable
as $$
  select ST_Area(farm_boundary) / 10000
  from public.farms
  where id = p_farm_id;
$$;

-- One row per "Calculate O2 Generation" run. Deliberately not merged into
-- farms.soil_details (which is for pH/moisture/etc.) — this has a different
-- shape (manual inputs + computed satellite-derived outputs) and is meant to
-- be re-run periodically as vegetation changes season to season, not a
-- one-time capture like the soil parameters.
create table public.farm_green_details (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  vegetation_type text not null check (
    vegetation_type in ('fruit_trees', 'timber_hardwood', 'fast_growing_softwood', 'mixed_plantation', 'field_crops_only')
  ),
  maturity text not null check (maturity in ('young', 'mature', 'old')),
  sample_tree_count integer,
  notes text,
  tree_cover_percent numeric,
  ndvi_avg numeric,
  tree_cover_hectares numeric,
  biomass_tons numeric,
  co2_tons numeric,
  o2_tons numeric,
  analyzed_at timestamptz,
  created_at timestamptz default now()
);

-- RLS on, no policies — reachable only via service_role (ops), same pattern
-- as ops_users. Farmer-facing display of this data is a separate, not-yet-
-- requested feature; add a farmer select policy then, not now.
alter table public.farm_green_details enable row level security;

-- ================= supabase/006_farmer_green_details_policy.sql =================
-- Farmers can now see their own farm's Green Details (vegetation/O2 estimate)
-- on the FarmGate detail panel. farm_green_details has no farmer_id column of
-- its own, so this checks ownership via a join to farms — unlike farm_visits,
-- which has farmer_id denormalized onto it for a simpler policy. No need to
-- denormalize here since this is a read-only farmer policy, not something
-- written via farmer-facing inserts.
create policy "Farmers can view own green details"
  on public.farm_green_details for select
  using (
    exists (
      select 1 from public.farms
      where farms.id = farm_green_details.farm_id
      and farms.farmer_id = auth.uid()
    )
  );

-- ================= supabase/007_crop_advisory.sql =================
-- Add the crop type a farmer has selected for each farm.
-- Nullable — only set after the farmer picks a crop in the advisory flow.
alter table public.farms add column if not exists crop_type text;

-- Stores AI Crop Health scan history per farm.
-- image_path is the Supabase Storage object path (not a public URL) — served
-- via signed URLs so farmer data is never publicly exposed.
create table if not exists public.crop_health_scans (
  id             uuid primary key default gen_random_uuid(),
  farm_id        uuid not null references public.farms(id) on delete cascade,
  farmer_id      uuid not null references public.farmers(id) on delete cascade,
  image_path     text not null,
  diagnosis_label    text not null,
  confidence         numeric not null,
  recommended_action text not null,
  created_at     timestamptz default now()
);

alter table public.crop_health_scans enable row level security;

create policy "Farmers can view own scans"
  on public.crop_health_scans for select
  using (auth.uid() = farmer_id);

create policy "Farmers can create own scans"
  on public.crop_health_scans for insert
  with check (auth.uid() = farmer_id);

-- ================= storage bucket for crop health photos =================
-- Private bucket: the app uploads with the service-role key on the server;
-- nothing in it is publicly readable.
insert into storage.buckets (id, name, public)
values ('crop-scans', 'crop-scans', false)
on conflict (id) do nothing;

-- ================= first ops login =================
-- CHANGE the password before running, or update it right after.
-- insert into public.ops_users (username, password, full_name, role)
-- values ('admin', '<pick-a-strong-password>', 'Love Lakhwani', 'admin');

-- ================= API access grants =================
-- Newer Supabase projects no longer grant table access to the API roles
-- automatically. Row Level Security above still decides WHICH rows each
-- farmer can see; these grants only let the API roles reach the tables.
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant all on all sequences in schema public to service_role, authenticated;
grant execute on all functions in schema public to authenticated, service_role;
alter default privileges in schema public grant all on tables to service_role;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema public grant execute on functions to authenticated, service_role;
