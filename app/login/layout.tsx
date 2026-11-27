import { createAdminClient } from "@/lib/supabase/admin";
import { isDemoMode } from "@/lib/demo";
import { DemoLogin, type DemoFarmer } from "@/components/DemoLogin";

// Demo mode: instead of the OTP login, show a picker of existing farmers
// plus a "create your own" option. Normal mode: the real OTP login page.
export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  if (!isDemoMode()) return children;

  const admin = createAdminClient();
  const [{ data: farmers }, { data: farms }] = await Promise.all([
    admin
      .from("farmers")
      .select("id, full_name, place, district, state")
      .not("full_name", "is", null)
      .order("full_name"),
    admin.from("farms").select("farmer_id"),
  ]);

  const counts = new Map<string, number>();
  for (const f of farms ?? []) counts.set(f.farmer_id, (counts.get(f.farmer_id) ?? 0) + 1);

  const list: DemoFarmer[] = (farmers ?? []).map((f) => ({
    id: f.id,
    name: f.full_name as string,
    place: [f.district || f.place, f.state].filter(Boolean).join(", "),
    farms: counts.get(f.id) ?? 0,
  }));

  return <DemoLogin farmers={list} />;
}
