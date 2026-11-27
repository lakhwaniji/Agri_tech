import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWeather, getWeatherByCoords } from "@/lib/weather";
import { getFarmSummaries } from "@/lib/farm-summary";
import { getAllMarketplaceItems } from "@/lib/mocked/crop-marketplace-items";
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

  const [{ data: farmer }, farms] = await Promise.all([
    supabase
      .from("farmers")
      .select("full_name, district, state")
      .eq("id", userData.user.id)
      .single(),
    getFarmSummaries(supabase, userData.user.id),
  ]);

  // Weather follows the farm, not the registration pincode: use the first
  // farm that has a GPS pin, else fall back to the registered district.
  const pinned = farms.find((f) => f.location && f.boundary) ?? farms.find((f) => f.location);
  const weather = pinned?.location
    ? await getWeatherByCoords(
        pinned.location.lat,
        pinned.location.lng,
        pinned.label || pinned.visit_address.split(",")[0],
      )
    : farmer?.district && farmer?.state
      ? await getWeather(farmer.district, farmer.state)
      : null;

  const time = new Date().toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const totalHa = farms.reduce((a, f) => a + (f.areaHa ?? 0), 0);
  const totalCo2 = farms.reduce((a, f) => a + (f.green?.co2_tons ?? 0), 0);

  // Next agent visit still waiting to happen (today or later), earliest first.
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = farms
    .flatMap((f) =>
      f.farm_visits
        .filter((v) => (v.status === "requested" || v.status === "scheduled") && v.scheduled_date >= today)
        .map((v) => ({ farm: f.label || f.visit_address.split(",")[0], date: v.scheduled_date, slot: v.scheduled_time_slot })),
    )
    .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null;

  const pick = getAllMarketplaceItems().find((i) => i.recommended) ?? null;

  return (
    <HomeScreen
      fullName={farmer?.full_name ?? "Farmer"}
      weather={weather}
      time={time}
      farmCount={farms.length}
      totalHa={totalHa}
      totalCo2={totalCo2}
      upcoming={upcoming}
      pick={pick ? { name: pick.name, price: pick.priceRange } : null}
      userKey={userData.user.id}
    />
  );
}
