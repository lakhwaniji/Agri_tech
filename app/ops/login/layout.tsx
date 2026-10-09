import { redirect } from "next/navigation";

// Demo mode: skip the ops username/password login and go straight to the dashboard.
export default function OpsLoginLayout({ children }: { children: React.ReactNode }) {
  if (process.env.DEMO_MODE === "true") redirect("/ops/dashboard");
  return children;
}
