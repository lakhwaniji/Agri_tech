import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Landing } from "@/components/Landing";

export default async function Home() {
  // The Android app (Capacitor) adds "AyaOneApp" to its user agent:
  // app users go straight to login instead of the marketing page.
  const ua = (await headers()).get("user-agent") ?? "";
  if (ua.includes("AyaOneApp")) redirect("/login");
  return <Landing />;
}
