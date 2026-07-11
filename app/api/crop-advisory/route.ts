import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAdvisoryRule } from "@/lib/mocked/crop-advisory-rules";
import { getMarketplaceItems } from "@/lib/mocked/crop-marketplace-items";

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

  const { data: farm, error } = await supabase
    .from("farms")
    .select("id, crop_type")
    .eq("id", farmId)
    .eq("farmer_id", userData.user.id)
    .single();

  if (error || !farm) {
    return NextResponse.json({ error: "Farm not found" }, { status: 404 });
  }

  if (!farm.crop_type) {
    return NextResponse.json({ cropType: null, advisory: null, marketplaceItems: [] });
  }

  return NextResponse.json({
    cropType: farm.crop_type,
    advisory: getAdvisoryRule(farm.crop_type),
    marketplaceItems: getMarketplaceItems(farm.crop_type),
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = await request.json() as { farmId?: string; cropType?: string };
  if (!body.farmId || !body.cropType) {
    return NextResponse.json({ error: "farmId and cropType are required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("farms")
    .update({ crop_type: body.cropType, updated_at: new Date().toISOString() })
    .eq("id", body.farmId)
    .eq("farmer_id", userData.user.id);

  if (error) {
    return NextResponse.json({ error: "Failed to save crop type" }, { status: 500 });
  }

  return NextResponse.json({
    cropType: body.cropType,
    advisory: getAdvisoryRule(body.cropType),
    marketplaceItems: getMarketplaceItems(body.cropType),
  });
}
