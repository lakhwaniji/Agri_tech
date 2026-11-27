import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isDemoMode } from "@/lib/demo";
import { ProfileScreen } from "@/components/ProfileScreen";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login");

  const [{ data: farmer }, { count }] = await Promise.all([
    supabase
      .from("farmers")
      .select("full_name, phone_number, place, district, state, pincode, created_at")
      .eq("id", userData.user.id)
      .single(),
    supabase.from("farms").select("id", { count: "exact", head: true }).eq("farmer_id", userData.user.id),
  ]);

  return (
    <ProfileScreen
      fullName={farmer?.full_name ?? ""}
      phone={farmer?.phone_number ?? ""}
      place={farmer?.place ?? ""}
      district={farmer?.district ?? ""}
      state={farmer?.state ?? ""}
      pincode={farmer?.pincode ?? ""}
      memberSince={farmer?.created_at ?? null}
      farmCount={count ?? 0}
      demo={isDemoMode()}
    />
  );
}
