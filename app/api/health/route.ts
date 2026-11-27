import { NextResponse } from "next/server";

// Load balancer health check (AWS ALB → ECS). Deliberately touches no
// external service, so a Supabase/Sentinel outage doesn't get healthy
// containers killed and restarted.
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ status: "ok" });
}
