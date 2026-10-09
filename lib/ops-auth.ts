import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

// Shared by every /ops/* page. Re-verifies the cookie's id still exists in
// ops_users on every load (not just "is there a cookie") so a stale or
// tampered cookie can't get through. Kept in one place because this is a
// security check — duplicating it per-page risks one copy drifting/missing
// a step later.
export async function requireOpsUser() {
  if (process.env.DEMO_MODE === "true") return { id: "demo-ops", full_name: "Demo Ops" };
  const cookieStore = await cookies();
  const opsId = cookieStore.get("ops_session")?.value;

  if (!opsId) {
    redirect("/ops/login");
  }

  const supabase = createAdminClient();
  const { data: opsUser } = await supabase
    .from("ops_users")
    .select("id, full_name")
    .eq("id", opsId)
    .single();

  if (!opsUser) {
    redirect("/ops/login");
  }

  return opsUser;
}
