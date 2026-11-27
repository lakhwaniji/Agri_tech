import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getFarmSummaries } from "@/lib/farm-summary";
import { FarmGateScreen } from "@/components/FarmGateScreen";

// Same pattern as app/home/page.tsx: check login server-side before
// rendering, then fetch this farmer's farms with their visits, map geometry
// and latest green details. Geo + green are loaded HERE (server side) rather
// than from the browser so the map previews work for every farm card.
export default async function FarmGatePage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect("/login");
  }

  const [{ data: farmer }, farms] = await Promise.all([
    supabase.from("farmers").select("full_name").eq("id", userData.user.id).single(),
    getFarmSummaries(supabase, userData.user.id),
  ]);

  return (
    <FarmGateScreen
      fullName={farmer?.full_name ?? "Farmer"}
      farmerId={userData.user.id}
      farms={farms}
    />
  );
}
