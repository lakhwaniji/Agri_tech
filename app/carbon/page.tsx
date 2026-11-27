import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getFarmSummaries } from "@/lib/farm-summary";
import { CarbonScreen } from "@/components/CarbonScreen";

export default async function CarbonPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login");

  const [{ data: farmer }, farms] = await Promise.all([
    supabase.from("farmers").select("full_name, phone_number").eq("id", userData.user.id).single(),
    getFarmSummaries(supabase, userData.user.id),
  ]);

  return (
    <CarbonScreen
      userKey={userData.user.id}
      fullName={farmer?.full_name ?? "Farmer"}
      phone={farmer?.phone_number ?? ""}
      farms={farms.map((f) => ({ id: f.id, name: f.label || f.visit_address.split(",")[0], areaHa: f.areaHa ?? 0 }))}
    />
  );
}
