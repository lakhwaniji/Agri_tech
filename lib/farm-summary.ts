import type { SupabaseClient } from "@supabase/supabase-js";

export type GeoPoint = { lat: number; lng: number };

export type FarmVisit = {
  id: string;
  scheduled_date: string;
  scheduled_time_slot: string;
  status: "requested" | "scheduled" | "completed" | "cancelled";
};

export type FarmGreen = {
  vegetation_type: string;
  maturity: string;
  tree_cover_percent: number | null;
  co2_tons: number | null;
  o2_tons: number | null;
};

export type FarmSummary = {
  id: string;
  label: string | null;
  visit_address: string;
  farm_visits: FarmVisit[];
  location: GeoPoint | null;
  boundary: GeoPoint[] | null;
  areaHa: number | null;
  green: FarmGreen | null;
};

// Area of a lat/lng polygon in hectares. Projects onto a flat plane around
// the polygon's own latitude (fine for farm-sized shapes, well under 1% error
// for a few hectares) and applies the shoelace formula.
export function polygonAreaHa(points: GeoPoint[]): number | null {
  if (points.length < 3) return null;
  const lat0 = (points.reduce((a, p) => a + p.lat, 0) / points.length) * (Math.PI / 180);
  const xy = points.map((p) => [p.lng * 111320 * Math.cos(lat0), p.lat * 110540]);
  let sum = 0;
  for (let i = 0; i < xy.length; i++) {
    const [x1, y1] = xy[i];
    const [x2, y2] = xy[(i + 1) % xy.length];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum) / 2 / 10000;
}

// Loads a farmer's farms with everything the farmer screens show: visits
// (latest first), geo (location + boundary via get_farm_geo) and the latest
// green-details row. Runs on the SERVER with the page's own Supabase client,
// so it works for real sessions (RLS) and DEMO_MODE alike.
export async function getFarmSummaries(
  supabase: SupabaseClient,
  farmerId: string,
): Promise<FarmSummary[]> {
  const { data: farms } = await supabase
    .from("farms")
    .select("id, label, visit_address, farm_visits(id, scheduled_date, scheduled_time_slot, status, created_at)")
    .eq("farmer_id", farmerId)
    .order("created_at", { ascending: false });

  const list = (farms ?? []) as unknown as (Omit<FarmSummary, "location" | "boundary" | "areaHa" | "green"> & {
    farm_visits: (FarmVisit & { created_at?: string })[];
  })[];

  return Promise.all(
    list.map(async (farm) => {
      const [{ data: geo }, { data: green }] = await Promise.all([
        supabase.rpc("get_farm_geo", { p_farm_id: farm.id }),
        supabase
          .from("farm_green_details")
          .select("vegetation_type, maturity, tree_cover_percent, co2_tons, o2_tons")
          .eq("farm_id", farm.id)
          .order("analyzed_at", { ascending: false, nullsFirst: false })
          .limit(1)
          .maybeSingle(),
      ]);
      const location = (geo?.location ?? null) as GeoPoint | null;
      const boundary = (geo?.boundary ?? null) as GeoPoint[] | null;
      const visits = [...farm.farm_visits].sort((a, b) =>
        (b.created_at ?? b.scheduled_date).localeCompare(a.created_at ?? a.scheduled_date),
      );
      return {
        id: farm.id,
        label: farm.label,
        visit_address: farm.visit_address,
        farm_visits: visits.map(({ id, scheduled_date, scheduled_time_slot, status }) => ({
          id, scheduled_date, scheduled_time_slot, status,
        })),
        location,
        boundary,
        areaHa: boundary ? polygonAreaHa(boundary) : null,
        green: (green as FarmGreen | null) ?? null,
      };
    }),
  );
}

// How far along FarmGate a farm is, 1–4:
// 1 requested, 2 agent visit done, 3 location + boundary mapped, 4 green score.
export function farmStage(f: FarmSummary): number {
  const visited = f.farm_visits.some((v) => v.status === "completed");
  const mapped = !!f.location && !!f.boundary && f.boundary.length >= 3;
  if (mapped && f.green) return 4;
  if (mapped) return 3;
  if (visited) return 2;
  return 1;
}
