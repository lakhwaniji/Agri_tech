import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

type Point = { lat: number; lng: number };

// Saves the farm's exact location and/or boundary, captured by a field
// agent during the FarmGate visit. Server-side + service_role for the same
// reason as the rest of /ops: there's no Supabase Auth session for ops
// staff, so there's no auth.uid() for RLS to check.
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const opsId = cookieStore.get("ops_session")?.value;
  if (!opsId && process.env.DEMO_MODE !== "true") {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data: opsUser } = await supabase
    .from("ops_users")
    .select("id")
    .eq("id", opsId)
    .single();
  if (!opsUser && process.env.DEMO_MODE !== "true") {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { farmId, visitId, location, boundary } = (await request.json()) as {
    farmId: string;
    visitId?: string;
    location?: Point;
    boundary?: Point[];
  };

  if (!farmId) {
    return NextResponse.json({ error: "farmId is required." }, { status: 400 });
  }

  const update: Record<string, string> = {};

  if (location) {
    // PostGIS expects "POINT(lng lat)" — longitude first.
    update.farm_location = `SRID=4326;POINT(${location.lng} ${location.lat})`;
  }

  if (boundary && boundary.length >= 3) {
    // A polygon ring must close (first point repeated as the last).
    const ring = [...boundary, boundary[0]]
      .map((p) => `${p.lng} ${p.lat}`)
      .join(", ");
    update.farm_boundary = `SRID=4326;POLYGON((${ring}))`;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { error: "Nothing to save — provide a location and/or boundary." },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("farms").update(update).eq("id", farmId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Capturing the exact location + boundary is what "registration" means in
  // FarmGate — once both are in hand, the visit that prompted this is done.
  // Only flips to completed if this save actually included both, so a
  // location-only save (no boundary yet) doesn't prematurely close it out.
  if (visitId && update.farm_location && update.farm_boundary) {
    await supabase
      .from("farm_visits")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", visitId);
  }

  return NextResponse.json({ success: true });
}
