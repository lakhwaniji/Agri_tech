"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";

// Leaflet touches `window` at import time, which breaks server rendering —
// loading it only on the client (ssr: false) sidesteps that entirely.
const FarmMap = dynamic(
  () => import("@/components/FarmMap").then((m) => m.FarmMap),
  { ssr: false },
);
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { Logo } from "@/components/Logo";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  CrosshairIcon,
  FarmGateIcon,
  MapPinIcon,
  PlusIcon,
} from "@/components/icons";

type VisitStatus = "requested" | "scheduled" | "completed" | "cancelled";

type FarmVisit = {
  id: string;
  scheduled_date: string;
  scheduled_time_slot: string;
  status: VisitStatus;
};

type Farm = {
  id: string;
  label: string | null;
  visit_address: string;
  farm_visits: FarmVisit[];
};

const STATUS_KEYS: Record<VisitStatus, TranslationKey> = {
  requested: "farmgate.statusRequested",
  scheduled: "farmgate.statusScheduled",
  completed: "farmgate.statusCompleted",
  cancelled: "farmgate.statusCancelled",
};

const TIME_SLOTS: { value: string; labelKey: TranslationKey }[] = [
  { value: "morning", labelKey: "farmgate.timeMorning" },
  { value: "afternoon", labelKey: "farmgate.timeAfternoon" },
  { value: "evening", labelKey: "farmgate.timeEvening" },
];

export function FarmGateScreen({
  fullName,
  farmerId,
  farms,
}: {
  fullName: string;
  farmerId: string;
  farms: Farm[];
}) {
  const supabase = createClient();
  const { t } = useLanguage();

  const [view, setView] = useState<"list" | "form" | "confirm">(
    farms.length === 0 ? "form" : "list",
  );
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("morning");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [locating, setLocating] = useState(false);
  const [confirmed, setConfirmed] = useState<{
    address: string;
    date: string;
    timeSlot: string;
  } | null>(null);

  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [geo, setGeo] = useState<{
    location: { lat: number; lng: number } | null;
    boundary: { lat: number; lng: number }[] | null;
  } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);

  const [greenDetails, setGreenDetails] = useState<{
    vegetation_type: string;
    maturity: string;
    tree_cover_percent: number | null;
    o2_tons: number | null;
  } | null>(null);

  async function handleOpenFarm(farm: Farm) {
    setSelectedFarm(farm);
    setGeo(null);
    setGreenDetails(null);
    setGeoLoading(true);
    const { data } = await supabase.rpc("get_farm_geo", { p_farm_id: farm.id });
    setGeo(data ?? { location: null, boundary: null });
    setGeoLoading(false);

    const { data: green } = await supabase
      .from("farm_green_details")
      .select("vegetation_type, maturity, tree_cover_percent, o2_tons")
      .eq("farm_id", farm.id)
      .order("analyzed_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setGreenDetails(green);
  }

  const isFirstFarm = farms.length === 0;
  const today = new Date().toISOString().split("T")[0];

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setError(t("farmgate.locationError"));
      return;
    }

    setLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();
          if (data?.display_name) {
            setAddress(data.display_name);
          }
        } catch {
          // Reverse geocoding failed — coordinates are still saved, the
          // farmer can type the address by hand.
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setError(t("farmgate.locationError"));
      },
    );
  }

  async function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!address.trim() || !date || !timeSlot) {
      setError(t("farmgate.formError"));
      return;
    }

    setLoading(true);

    const { data: farm, error: farmError } = await supabase
      .from("farms")
      .insert({
        farmer_id: farmerId,
        label: label.trim() || null,
        visit_address: address.trim(),
        // PostGIS expects "POINT(lng lat)" — longitude first, then latitude.
        farm_location: coords
          ? `SRID=4326;POINT(${coords.lng} ${coords.lat})`
          : null,
      })
      .select("id")
      .single();

    if (farmError || !farm) {
      setLoading(false);
      setError(farmError?.message ?? "Something went wrong.");
      return;
    }

    const { error: visitError } = await supabase.from("farm_visits").insert({
      farm_id: farm.id,
      farmer_id: farmerId,
      scheduled_date: date,
      scheduled_time_slot: timeSlot,
      status: "requested",
    });
    setLoading(false);

    if (visitError) {
      setError(visitError.message);
      return;
    }

    setConfirmed({ address: address.trim(), date, timeSlot });
    setView("confirm");
  }

  const inputClass =
    "min-h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-11 pr-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 pb-12">
      <header className="flex items-center justify-between px-6 py-4">
        <Logo className="h-7 w-auto" />
        <Link href="/home" className="text-sm font-medium text-emerald-700">
          {t("farmgate.backHome")}
        </Link>
      </header>

      <div className="mx-auto w-full max-w-md px-6">
        {view === "list" && (
          <>
            <h1 className="text-xl font-bold text-zinc-900">
              {t("farmgate.yourFarms")}
            </h1>
            <div className="mt-4 space-y-3">
              {farms.map((farm) => {
                const latestVisit = farm.farm_visits[0];
                return (
                  <button
                    key={farm.id}
                    onClick={() => handleOpenFarm(farm)}
                    className="w-full rounded-2xl bg-white p-4 text-left shadow-sm transition-transform active:scale-[0.99]"
                  >
                    <p className="font-semibold text-zinc-900">
                      {farm.label || farm.visit_address}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-sm text-zinc-500">
                      <MapPinIcon className="h-3.5 w-3.5" />
                      {farm.visit_address}
                    </p>
                    {latestVisit && (
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-medium text-emerald-700">
                          {t(STATUS_KEYS[latestVisit.status])}
                        </span>
                        <span className="text-zinc-500">
                          {latestVisit.scheduled_date} ·{" "}
                          {t(
                            TIME_SLOTS.find(
                              (s) => s.value === latestVisit.scheduled_time_slot,
                            )?.labelKey ?? "farmgate.timeMorning",
                          )}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setView("form")}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-emerald-600 font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              <PlusIcon className="h-5 w-5" />
              {t("farmgate.addAnother")}
            </button>
          </>
        )}

        {view === "form" && (
          <form onSubmit={handleSchedule} className="space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <FarmGateIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900">
                {isFirstFarm
                  ? `Hi, ${fullName}. ${t("farmgate.greeting")}`
                  : t("farmgate.addAnother")}
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                {t("farmgate.intro")}
              </p>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                {t("farmgate.labelField")}
              </span>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="mt-1 min-h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                placeholder={t("farmgate.labelPlaceholder")}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                {t("farmgate.addressField")}
              </span>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400">
                  <MapPinIcon className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClass}
                  placeholder={t("farmgate.addressPlaceholder")}
                />
              </div>
              <button
                type="button"
                onClick={handleUseLocation}
                disabled={locating}
                className="mt-2 flex items-center gap-1.5 text-sm font-medium text-emerald-700 disabled:opacity-50"
              >
                <CrosshairIcon className="h-4 w-4" />
                {locating ? t("farmgate.locating") : t("farmgate.useLocation")}
              </button>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                {t("farmgate.dateField")}
              </span>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400">
                  <CalendarIcon className="h-4 w-4" />
                </span>
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                {t("farmgate.timeField")}
              </span>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400">
                  <ClockIcon className="h-4 w-4" />
                </span>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className={inputClass}
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {t(slot.labelKey)}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">
                {t("farmgate.reminderTitle")}
              </p>
              <ul className="mt-1.5 list-disc pl-4 text-sm text-amber-800">
                <li>{t("farmgate.reminderPatta")}</li>
                <li>{t("farmgate.reminderAadhaar")}</li>
              </ul>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="min-h-12 w-full rounded-full bg-emerald-600 font-semibold text-white shadow-sm shadow-emerald-600/30 transition-colors hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? t("farmgate.submitting") : t("farmgate.submit")}
            </button>
          </form>
        )}

        {view === "confirm" && confirmed && (
          <div className="flex flex-col items-center pt-6 text-center">
            <CheckCircleIcon className="h-14 w-14 text-emerald-600" />
            <h1 className="mt-4 text-xl font-bold text-zinc-900">
              {t("farmgate.confirmHeading")}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {t("farmgate.confirmBody")}
            </p>
            <div className="mt-4 w-full rounded-2xl bg-white p-4 text-left shadow-sm">
              <p className="flex items-center gap-2 text-sm text-zinc-700">
                <MapPinIcon className="h-4 w-4 text-zinc-400" />
                {confirmed.address}
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-sm text-zinc-700">
                <CalendarIcon className="h-4 w-4 text-zinc-400" />
                {confirmed.date}
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-sm text-zinc-700">
                <ClockIcon className="h-4 w-4 text-zinc-400" />
                {t(
                  TIME_SLOTS.find((s) => s.value === confirmed.timeSlot)
                    ?.labelKey ?? "farmgate.timeMorning",
                )}
              </p>
            </div>
            <Link
              href="/home"
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-600 font-semibold text-white shadow-sm shadow-emerald-600/30 transition-colors hover:bg-emerald-700"
            >
              {t("farmgate.backHome")}
            </Link>
          </div>
        )}
      </div>

      {selectedFarm && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 sm:items-center sm:justify-center">
          <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 sm:max-w-md sm:rounded-3xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-zinc-900">
                  {selectedFarm.label || selectedFarm.visit_address}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-zinc-500">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  {selectedFarm.visit_address}
                </p>
              </div>
              <button
                onClick={() => setSelectedFarm(null)}
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900"
              >
                {t("farmgate.close")}
              </button>
            </div>

            {selectedFarm.farm_visits[0] && (
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-medium text-emerald-700">
                  {t(STATUS_KEYS[selectedFarm.farm_visits[0].status])}
                </span>
                <span className="text-zinc-500">
                  {selectedFarm.farm_visits[0].scheduled_date} ·{" "}
                  {t(
                    TIME_SLOTS.find(
                      (s) => s.value === selectedFarm.farm_visits[0].scheduled_time_slot,
                    )?.labelKey ?? "farmgate.timeMorning",
                  )}
                </span>
              </div>
            )}

            <div className="mt-4">
              {geoLoading && (
                <p className="text-sm text-zinc-500">{t("farmgate.locating")}</p>
              )}
              {!geoLoading && geo?.location && (
                <FarmMap location={geo.location} boundary={geo.boundary} />
              )}
              {!geoLoading && !geo?.location && (
                <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                  {t("farmgate.mapPending")}
                </p>
              )}
            </div>

            <div className="mt-4 rounded-xl bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-900">
                {t("farmgate.greenDetailsTitle")}
              </p>
              {greenDetails ? (
                <div className="mt-1.5 space-y-1 text-sm text-emerald-800">
                  {greenDetails.tree_cover_percent != null && (
                    <p>
                      {t("farmgate.treeCover")}: {greenDetails.tree_cover_percent.toFixed(1)}%
                    </p>
                  )}
                  {greenDetails.o2_tons != null && (
                    <p className="font-semibold">
                      {t("farmgate.estimatedO2")}: {greenDetails.o2_tons.toFixed(1)} tons/year
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-1 text-sm text-emerald-800">
                  {t("farmgate.greenDetailsPending")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
