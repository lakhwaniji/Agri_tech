import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MarketplaceScreen } from "@/components/MarketplaceScreen";

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ crop?: string }>;
}) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect("/login");
  }

  const { crop } = await searchParams;

  return <MarketplaceScreen recommendedCrop={crop ?? null} />;
}
