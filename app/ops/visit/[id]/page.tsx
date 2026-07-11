import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireOpsUser } from "@/lib/ops-auth";
import { OpsVisitScreen } from "@/components/OpsVisitScreen";

export default async function OpsVisitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireOpsUser();
  const { id } = await params;

  const supabase = createAdminClient();
  const { data: visit } = await supabase
    .from("farm_visits")
    .select(
      "id, farm_id, scheduled_date, scheduled_time_slot, farms(label, visit_address, farmers(full_name))",
    )
    .eq("id", id)
    .single();

  if (!visit) {
    notFound();
  }

  type RawVisit = {
    id: string;
    farm_id: string;
    scheduled_date: string;
    scheduled_time_slot: string;
    farms: {
      label: string | null;
      visit_address: string;
      farmers: { full_name: string | null } | null;
    } | null;
  };
  const typedVisit = visit as unknown as RawVisit;

  // Pre-fill whatever's already captured — reopening a closed visit (e.g.
  // from the dashboard's Closed tab) should show existing data, not a blank
  // form, so it's actually editable rather than looking like nothing saved.
  const { data: geo } = await supabase.rpc("get_farm_geo", {
    p_farm_id: typedVisit.farm_id,
  });

  const { data: green } = await supabase
    .from("farm_green_details")
    .select("vegetation_type, maturity, sample_tree_count, notes, tree_cover_percent, tree_cover_hectares, biomass_tons, co2_tons, o2_tons")
    .eq("farm_id", typedVisit.farm_id)
    .order("analyzed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <OpsVisitScreen
      farmId={typedVisit.farm_id}
      visitId={typedVisit.id}
      farmerName={typedVisit.farms?.farmers?.full_name ?? "Unknown farmer"}
      address={typedVisit.farms?.visit_address ?? ""}
      initialLocation={geo?.location ?? null}
      initialBoundary={geo?.boundary ?? null}
      initialGreen={green ?? null}
    />
  );
}
