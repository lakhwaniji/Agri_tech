import { createAdminClient } from "@/lib/supabase/admin";
import { requireOpsUser } from "@/lib/ops-auth";
import { OpsDashboardScreen } from "@/components/OpsDashboardScreen";

export default async function OpsDashboardPage() {
  const opsUser = await requireOpsUser();
  const supabase = createAdminClient();

  // service_role bypasses RLS, which is exactly what we need here — ops
  // staff must see every farmer's requests, not just one farmer's own.
  // farm_visits -> farms -> farmers are each many-to-one (a visit belongs to
  // exactly one farm, a farm to exactly one farmer), so Supabase embeds them
  // as single nested objects here, not arrays.
  //
  // No status filter here — fetch everything and let OpsDashboardScreen
  // split into Open/Closed tabs client-side, so re-opening a "closed" visit
  // to edit its location/boundary/green details doesn't need a second query.
  const { data: requests } = await supabase
    .from("farm_visits")
    .select(
      "id, farm_id, scheduled_date, scheduled_time_slot, status, farms(label, visit_address, farmers(full_name))",
    )
    .order("scheduled_date", { ascending: true });

  type RawRequest = {
    id: string;
    farm_id: string;
    scheduled_date: string;
    scheduled_time_slot: string;
    status: string;
    farms: {
      label: string | null;
      visit_address: string;
      farmers: { full_name: string | null } | null;
    } | null;
  };
  const typedRequests = (requests ?? []) as unknown as RawRequest[];

  return (
    <OpsDashboardScreen fullName={opsUser.full_name} requests={typedRequests} />
  );
}
