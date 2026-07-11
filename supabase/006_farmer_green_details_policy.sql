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
