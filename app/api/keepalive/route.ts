import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Keeps the free-tier Supabase project awake. Supabase pauses free projects
// after ~7 days with no database activity; a scheduled GitHub Action calls
// this once a day (.github/workflows/keepalive.yml). It runs one tiny count
// query and returns nothing sensitive.
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = createAdminClient();
  const { error } = await admin.from("farmers").select("id", { count: "exact", head: true });
  return NextResponse.json({ status: error ? "db_error" : "ok" }, { status: error ? 503 : 200 });
}
