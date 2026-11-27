import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { DEMO_COOKIE, isDemoMode } from "@/lib/demo";

// Farmer logout. Demo mode: forget the picked demo profile.
// Normal mode: end the Supabase session (clears its auth cookies).
export async function POST() {
  const res = NextResponse.json({ ok: true });
  if (isDemoMode()) {
    res.cookies.delete(DEMO_COOKIE);
    return res;
  }
  const supabase = await createClient();
  await supabase.auth.signOut();
  return res;
}
