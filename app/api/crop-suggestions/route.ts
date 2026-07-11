import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getSeasonFromMonth,
  getCropSuggestions,
} from "@/lib/mocked/crop-suggestions";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const farmId = request.nextUrl.searchParams.get("farmId");
  if (!farmId) {
    return NextResponse.json({ error: "farmId is required" }, { status: 400 });
  }

  // Fetch the farm to verify ownership; get farmer's location from the
  // farmers table (district/state captured at registration via pincode lookup).
  const { data: farm, error: farmError } = await supabase
    .from("farms")
    .select("id, farmer_id")
    .eq("id", farmId)
    .eq("farmer_id", userData.user.id)
    .single();

  if (farmError || !farm) {
    return NextResponse.json({ error: "Farm not found" }, { status: 404 });
  }

  const { data: farmer } = await supabase
    .from("farmers")
    .select("district, state")
    .eq("id", userData.user.id)
    .single();

  const season = getSeasonFromMonth(new Date().getMonth() + 1);
  const suggestions = getCropSuggestions(farmer?.state ?? "", season);

  return NextResponse.json({
    district: farmer?.district ?? null,
    state: farmer?.state ?? null,
    season,
    suggestions,
  });
}
