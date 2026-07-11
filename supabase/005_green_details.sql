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
