import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WalletScreen } from "@/components/WalletScreen";

export default async function WalletPage({ searchParams }: { searchParams: Promise<{ paid?: string }> }) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login");
  const { data: farmer } = await supabase.from("farmers").select("full_name").eq("id", userData.user.id).single();
  const { paid } = await searchParams;
  return <WalletScreen userKey={userData.user.id} fullName={farmer?.full_name ?? "Farmer"} justPaid={paid === "1"} />;
}
