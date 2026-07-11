import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = await request.json() as {
    visitAddress: string;
    lat?: number;
    lng?: number;
  };

  if (!body.visitAddress) {
    return NextResponse.json({ error: "visitAddress is required" }, { status: 400 });
  }

  const { data: farm, error } = await supabase
    .from("farms")
    .insert({
      farmer_id: userData.user.id,
      visit_address: body.visitAddress,
      farm_location:
        body.lat != null && body.lng != null
          ? `SRID=4326;POINT(${body.lng} ${body.lat})`
          : null,
    })
    .select("id, label, visit_address, crop_type")
    .single();

  if (error || !farm) {
    return NextResponse.json({ error: "Failed to create farm" }, { status: 500 });
  }

  return NextResponse.json({ farm });
}
