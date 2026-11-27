"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { OpsMapFarm } from "@/components/OpsFarmsMap";
import { polygonAreaHa } from "@/lib/farm-summary";

// Leaflet needs the browser, so the map is loaded client-side only.
const OpsFarmsMap = dynamic(() => import("@/components/OpsFarmsMap").then((m) => m.OpsFarmsMap), {
  ssr: false,
  loading: () => <div className="h-[520px] animate-pulse bg-zinc-100" />,
});

type Geo = { location: { lat: number; lng: number } | null; boundary: { lat: number; lng: number }[] | null };
import { CalendarIcon, ClockIcon, MapPinIcon } from "@/components/icons";

const TIME_SLOT_LABELS: Record<string, string> = {
  morning: "Morning (9 AM – 12 PM)",
  afternoon: "Afternoon (12 PM – 4 PM)",
  evening: "Evening (4 PM – 7 PM)",
};

// farm_visits -> farms -> farmers are each many-to-one, so Supabase embeds
// them as single nested objects, not arrays — matches the shape from
// app/ops/dashboard/page.tsx's query.
type Request = {
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

const STATUS_LABELS: Record<string, string> = {
  requested: "Requested",
  scheduled: "Scheduled",
  completed: "Completed",
  cancelled: "Cancelled",
};

const today = () => new Date().toISOString().slice(0, 10);

export function OpsDashboardScreen({
  fullName,
  requests,
  geo = {},
}: {
  fullName: string;
  requests: Request[];
  geo?: Record<string, Geo>;
}) {
  const [tab, setTab] = useState<"open" | "closed">("open");
  const [view, setView] = useState<"list" | "map">("list");
  const [query, setQuery] = useState("");

  async function handleLogout() {
    const res = await fetch("/api/ops-logout", { method: "POST" }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    // Full page load so the server-side login check runs fresh.
    window.location.href = data.redirect ?? "/ops/login";
  }

  const now = today();
  const openRequests = requests.filter((r) => r.status === "requested");
  const closedRequests = requests.filter((r) => r.status !== "requested");
  const overdue = openRequests.filter((r) => r.scheduled_date < now).length;
  const completed = requests.filter((r) => r.status === "completed").length;
  const q = query.trim().toLowerCase();
  const visibleRequests = (tab === "open" ? openRequests : closedRequests).filter((r) =>
    !q ||
    [r.farms?.farmers?.full_name, r.farms?.label, r.farms?.visit_address]
      .filter(Boolean)
      .some((v) => v!.toLowerCase().includes(q)),
  );

  // Map view: one entry per farm (its latest visit), across both tabs, honouring the search.
  const latestByFarm = new Map<string, Request>();
  for (const r of requests) {
    const prev = latestByFarm.get(r.farm_id);
    if (!prev || r.scheduled_date > prev.scheduled_date) latestByFarm.set(r.farm_id, r);
  }
  const mapFarms: OpsMapFarm[] = [...latestByFarm.values()]
    .filter((r) =>
      !q ||
      [r.farms?.farmers?.full_name, r.farms?.label, r.farms?.visit_address]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q)),
    )
    .map((r) => {
      const g = geo[r.farm_id] ?? { location: null, boundary: null };
      const overdueNow = r.status === "requested" && r.scheduled_date < now;
      return {
        visitId: r.id,
        farmerName: r.farms?.farmers?.full_name ?? "Unknown farmer",
        farmLabel: r.farms?.label ?? null,
        address: r.farms?.visit_address ?? "",
        status: r.status === "completed" ? "done" : overdueNow ? "overdue" : "open",
        statusLabel: overdueNow ? "Overdue" : STATUS_LABELS[r.status] ?? r.status,
        areaHa: g.boundary && g.boundary.length >= 3 ? polygonAreaHa(g.boundary) : null,
        location: g.location,
        boundary: g.boundary,
      };
    });
  const mappedFarms = mapFarms.filter((f) => f.boundary && f.boundary.length >= 3);
  const mappedHa = mappedFarms.reduce((a, f) => a + (f.areaHa ?? 0), 0);
  const notOnMap = mapFarms.filter((f) => !f.location && !(f.boundary && f.boundary.length >= 3)).length;

  const stats = [
    { label: "Open requests", value: openRequests.length, tone: "text-zinc-900" },
    { label: "Overdue", value: overdue, tone: overdue > 0 ? "text-red-700" : "text-zinc-900" },
    { label: "Completed visits", value: completed, tone: "text-emerald-700" },
    { label: "Area mapped", value: `${mappedHa.toFixed(1)} ha`, tone: "text-emerald-700" },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 pb-12">
      <header className="bg-zinc-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold">AyaOne Ops</span>
            <nav aria-label="Ops" className="flex gap-1">
              <span className="flex min-h-10 items-center rounded-lg bg-zinc-700 px-3 text-sm font-medium">Visits</span>
              <Link href="/ops/analytics" className="flex min-h-10 items-center rounded-lg px-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white">
                Analytics
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <span>{fullName}</span>
            <button
              onClick={handleLogout}
              className="min-h-10 rounded-lg border border-zinc-600 px-3 font-medium text-white hover:bg-zinc-800"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <h1 className="text-xl font-bold text-zinc-900">Field visits</h1>

        <div className="ao-stagger mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="ao-lift rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm text-zinc-600">{s.label}</p>
              <p className={`mt-1 text-2xl font-semibold ${s.tone}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="View" className="flex gap-1 rounded-xl bg-zinc-200 p-1">
            {(["list", "map"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={`flex min-h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold transition-colors ${
                  view === v ? "bg-emerald-700 text-white shadow-sm" : "text-zinc-600"
                }`}
              >
                {v === "map" && <MapPinIcon className="h-4 w-4" />}
                {v === "list" ? "List" : "Map"}
              </button>
            ))}
          </div>
          {view === "list" && (
          <div role="tablist" className="flex gap-1 rounded-xl bg-zinc-200 p-1">
            {(["open", "closed"] as const).map((id) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`min-h-10 rounded-lg px-4 text-sm font-semibold transition-colors ${
                  tab === id ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-600"
                }`}
              >
                {id === "open" ? `Open (${openRequests.length})` : `Closed (${closedRequests.length})`}
              </button>
            ))}
          </div>
          )}
          </div>
          <label className="flex min-h-11 w-full items-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 sm:w-80">
            <span className="sr-only">Search visits</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-zinc-500" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search farmer, farm or address"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </label>
        </div>

        {view === "map" && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-zinc-100 px-4 py-3 text-sm text-zinc-700">
              <span className="font-semibold text-zinc-900">
                {mappedFarms.length} farm{mappedFarms.length === 1 ? "" : "s"} mapped · {mappedHa.toFixed(1)} ha
              </span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-emerald-500" />Completed</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-amber-500" />Open</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-red-500" />Overdue</span>
              {notOnMap > 0 && (
                <span className="text-zinc-500">{notOnMap} not on map yet (no GPS captured)</span>
              )}
            </div>
            <OpsFarmsMap farms={mapFarms} />
          </div>
        )}

        {view === "list" && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {visibleRequests.length === 0 && (
            <p className="p-5 text-sm text-zinc-600">
              {q ? "No visits match your search." : tab === "open" ? "No open requests right now." : "No closed visits yet."}
            </p>
          )}

          {visibleRequests.map((req) => {
            const address = req.farms?.visit_address ?? "";
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            const isOverdue = req.status === "requested" && req.scheduled_date < now;
            const pill = isOverdue
              ? "bg-red-100 text-red-800"
              : req.status === "completed"
                ? "bg-emerald-100 text-emerald-800"
                : req.status === "cancelled"
                  ? "bg-zinc-100 text-zinc-700"
                  : "bg-amber-100 text-amber-900";

            return (
              <div
                key={req.id}
                className="ao-row flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-zinc-100 p-4 last:border-b-0 md:flex-nowrap"
              >
                <div className="min-w-0 basis-full md:basis-1/4">
                  <p className="font-semibold text-zinc-900">{req.farms?.farmers?.full_name ?? "Unknown farmer"}</p>
                  {req.farms?.label && <p className="text-sm text-zinc-600">{req.farms.label}</p>}
                </div>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 basis-full items-start gap-1.5 text-sm text-emerald-700 underline-offset-2 hover:underline md:basis-1/3"
                >
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="line-clamp-2">{address}</span>
                </a>
                <div className="flex flex-col gap-1 text-sm text-zinc-700 md:basis-1/5">
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="h-4 w-4 text-zinc-500" />
                    {req.scheduled_date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="h-4 w-4 text-zinc-500" />
                    {TIME_SLOT_LABELS[req.scheduled_time_slot] ?? req.scheduled_time_slot}
                  </span>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${pill}`}>
                  {isOverdue ? "Overdue" : STATUS_LABELS[req.status] ?? req.status}
                </span>
                <Link
                  href={`/ops/visit/${req.id}`}
                  className={`ml-auto flex min-h-10 shrink-0 items-center rounded-lg px-4 text-sm font-semibold ${
                    req.status === "requested"
                      ? "bg-emerald-700 text-white hover:bg-emerald-800"
                      : "border border-zinc-300 text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {req.status === "requested" ? "Start registration" : "View / Edit"}
                </Link>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}
