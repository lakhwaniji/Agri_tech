import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWeather } from "@/lib/weather";
import { HomeScreen } from "@/components/HomeScreen";

// This is the first page that needs server.ts for real: we check login
// status BEFORE rendering anything, instead of sending the page and letting
// client-side code figure it out afterward (the "flash" problem we talked
// through back when server.ts was first written but had nothing using it).
export default async function HomePage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect("/login");
  }

  const { data: farmer } = await supabase
    .from("farmers")
    .select("full_name, district, state")
    .eq("id", userData.user.id)
    .single();

  const weather =
    farmer?.district && farmer?.state
      ? await getWeather(farmer.district, farmer.state)
      : null;

  const time = new Date().toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <HomeScreen
      fullName={farmer?.full_name ?? "Farmer"}
      weather={weather}
      time={time}
    />
  );
}
