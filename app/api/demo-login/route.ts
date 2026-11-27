import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { DEMO_COOKIE, isDemoMode } from "@/lib/demo";

// Demo mode only: "log in" as an existing farmer, or create a new demo farmer,
// without OTP. Returns 404 when DEMO_MODE is off so it can't be used in production.
export async function POST(request: NextRequest) {
  if (!isDemoMode()) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = (await request.json()) as {
    farmerId?: string;
    create?: { fullName: string; place?: string; phone?: string };
  };
  const admin = createAdminClient();
  let farmerId = body.farmerId;

  if (body.create) {
    const fullName = body.create.fullName?.trim();
    if (!fullName) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const digits = (body.create.phone ?? "").replace(/\D/g, "");
    if (digits && digits.length !== 10) {
      return NextResponse.json({ error: "Phone must be 10 digits" }, { status: 400 });
    }
    // No phone given -> a placeholder number that can never receive an SMS.
    const phone = digits
      ? `+91${digits}`
      : `+910000${Math.floor(100000 + Math.random() * 900000)}`;

    const { data, error } = await admin.auth.admin.createUser({ phone, phone_confirm: true });
    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message ?? "Could not create the demo farmer" },
        { status: 400 },
      );
    }
    farmerId = data.user.id;
    // The signup trigger has already created the farmers row; fill in the profile.
    await admin
      .from("farmers")
      .update({ full_name: fullName, place: body.create.place?.trim() || null })
      .eq("id", farmerId);
  }

  if (!farmerId) return NextResponse.json({ error: "Pick a farmer" }, { status: 400 });

  const { data: farmer } = await admin.from("farmers").select("id").eq("id", farmerId).maybeSingle();
  if (!farmer) return NextResponse.json({ error: "Farmer not found" }, { status: 404 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(DEMO_COOKIE, farmerId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
