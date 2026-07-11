import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FarmGateScreen } from "@/components/FarmGateScreen";

// Same pattern as app/home/page.tsx: check login server-side before
// rendering, then fetch this farmer's existing farms + their visit history
// (a farm can have multiple visits over time — reschedules aren't overwrites).
export default async function FarmGatePage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect("/login");
  }

  const { data: farmer } = await supabase
    .from("farmers")
    .select("full_name")
    .eq("id", userData.user.id)
    .single();

  const { data: farms } = await supabase
    .from("farms")
    .select("id, label, visit_address, farm_visits(id, scheduled_date, scheduled_time_slot, status)")
    .eq("farmer_id", userData.user.id)
    .order("created_at", { ascending: false });

  return (
    <FarmGateScreen
      fullName={farmer?.full_name ?? "Farmer"}
      farmerId={userData.user.id}
      farms={farms ?? []}
    />
  );
}
