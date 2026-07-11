import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// SERVER-ONLY client using the service_role key, which bypasses Row Level
// Security entirely. Never import this file from a Client Component, and
// never send SUPABASE_SERVICE_ROLE_KEY to the browser.
//
// Why this exists: ops staff don't log in through Supabase Auth (they have
// their own username/password table, checked manually in app/ops/login),
// so there is no auth.uid() for RLS to check when the ops dashboard reads
// farms/farm_visits. service_role is the standard way to read data when
// there's no real "owner row" session behind the request.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
