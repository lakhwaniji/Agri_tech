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
