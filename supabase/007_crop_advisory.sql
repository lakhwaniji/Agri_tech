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
