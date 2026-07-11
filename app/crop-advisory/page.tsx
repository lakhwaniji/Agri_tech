import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CropAdvisoryScreen } from "@/components/CropAdvisoryScreen";

export default async function CropAdvisoryPage() {
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

  // Select without crop_type — that column is added by migration 007 which
  // may not be applied on all environments yet. crop_type is loaded on demand
  // via /api/crop-advisory when the farmer selects a farm.
  const { data: rawFarms } = await supabase
    .from("farms")
    .select("id, label, visit_address")
    .eq("farmer_id", userData.user.id)
    .order("created_at", { ascending: false });

  const farms = (rawFarms ?? []).map((f) => ({ ...f, crop_type: null as string | null }));

  return (
    <CropAdvisoryScreen
      fullName={farmer?.full_name ?? "Farmer"}
      farms={farms}
    />
  );
}
