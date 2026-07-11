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
