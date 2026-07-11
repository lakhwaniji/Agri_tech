import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTreeCoverStats } from "@/lib/satellite";
import { calculateO2Generation, type Maturity, type VegetationType } from "@/lib/o2-estimate";

// Same ops-session cookie check as the rest of /ops — no Supabase Auth
// session for ops staff, so service_role does the actual data access.
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const opsId = cookieStore.get("ops_session")?.value;
  if (!opsId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data: opsUser } = await supabase
    .from("ops_users")
    .select("id")
    .eq("id", opsId)
    .single();
  if (!opsUser) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { farmId, vegetationType, maturity, sampleTreeCount, notes } =
    (await request.json()) as {
      farmId: string;
      vegetationType: VegetationType;
      maturity: Maturity;
      sampleTreeCount?: number;
      notes?: string;
    };

  if (!farmId || !vegetationType || !maturity) {
    return NextResponse.json(
      { error: "farmId, vegetationType, and maturity are required." },
      { status: 400 },
    );
  }

  const { data: boundaryGeoJson } = await supabase.rpc(
    "get_farm_boundary_geojson",
    { p_farm_id: farmId },
  );

  if (!boundaryGeoJson) {
    return NextResponse.json(
      { error: "This farm has no boundary captured yet — capture the boundary first." },
      { status: 400 },
    );
  }

  const treeCoverStats = await getTreeCoverStats(boundaryGeoJson);

  if (!treeCoverStats) {
    return NextResponse.json(
      {
        error:
          "Satellite analysis isn't configured yet (missing Sentinel Hub credentials), or the request failed. No result has been saved.",
      },
      { status: 503 },
    );
  }

  const { data: farm } = await supabase
    .from("farms")
    .select("farm_boundary")
    .eq("id", farmId)
    .single();

  if (!farm) {
    return NextResponse.json({ error: "Farm not found." }, { status: 404 });
  }

  // Total farm area, reusing the same PostGIS function pattern as get_farm_geo.
  const { data: areaResult } = await supabase.rpc("get_farm_area_hectares", {
    p_farm_id: farmId,
  });
  const totalHectares = areaResult ?? 0;
  const treeCoverHectares = totalHectares * (treeCoverStats.treeCoverPercent / 100);

  const { biomassTons, co2Tons, o2Tons } = calculateO2Generation({
    vegetationType,
    maturity,
    treeCoverHectares,
  });

  const { error: insertError } = await supabase.from("farm_green_details").insert({
    farm_id: farmId,
    vegetation_type: vegetationType,
    maturity,
    sample_tree_count: sampleTreeCount ?? null,
    notes: notes ?? null,
    tree_cover_percent: treeCoverStats.treeCoverPercent,
    ndvi_avg: treeCoverStats.ndviAvg,
    tree_cover_hectares: treeCoverHectares,
    biomass_tons: biomassTons,
    co2_tons: co2Tons,
    o2_tons: o2Tons,
    analyzed_at: new Date().toISOString(),
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    treeCoverPercent: treeCoverStats.treeCoverPercent,
    treeCoverHectares,
    biomassTons,
    co2Tons,
    o2Tons,
  });
}
