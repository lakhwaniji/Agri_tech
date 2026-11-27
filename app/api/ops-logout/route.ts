import { NextResponse } from "next/server";
import { DEMO_COOKIE, isDemoMode } from "@/lib/demo";

// Ops logout. In demo mode /ops/login skips straight back to the dashboard,
// so send demo users to the main login (profile picker) instead.
export async function POST() {
  const demo = isDemoMode();
  const res = NextResponse.json({ success: true, redirect: demo ? "/login" : "/ops/login" });
  res.cookies.delete("ops_session");
  if (demo) res.cookies.delete(DEMO_COOKIE);
  return res;
}
