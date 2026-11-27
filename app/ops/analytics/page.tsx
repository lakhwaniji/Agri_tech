import { requireOpsUser } from "@/lib/ops-auth";
import { OpsAnalyticsScreen } from "@/components/OpsAnalyticsScreen";

// Investor / admin analytics. Ops-only, same gate as the visits dashboard.
// Shows DEMO data for now (lib/mocked/investor-analytics.ts).
export default async function OpsAnalyticsPage() {
  const opsUser = await requireOpsUser();
  return <OpsAnalyticsScreen fullName={opsUser.full_name} />;
}
