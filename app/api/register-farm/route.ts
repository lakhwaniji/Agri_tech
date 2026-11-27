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
    label?: string;
    scheduledDate?: string;
    timeSlot?: string;
  };

  if (!body.visitAddress) {
    return NextResponse.json({ error: "visitAddress is required" }, { status: 400 });
  }

  const { data: farm, error } = await supabase
    .from("farms")
    .insert({
      farmer_id: userData.user.id,
      label: body.label?.trim() || null,
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

  // Optional: also book the field-agent visit (FarmGate "add a farm" flow).
  if (body.scheduledDate && body.timeSlot) {
    const { error: visitError } = await supabase.from("farm_visits").insert({
      farm_id: farm.id,
      farmer_id: userData.user.id,
      scheduled_date: body.scheduledDate,
      scheduled_time_slot: body.timeSlot,
      status: "requested",
    });
    if (visitError) {
      return NextResponse.json({ error: visitError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ farm });
}
