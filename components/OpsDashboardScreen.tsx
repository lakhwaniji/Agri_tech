"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
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

export function OpsDashboardScreen({
  fullName,
  requests,
}: {
  fullName: string;
  requests: Request[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"open" | "closed">("open");

  async function handleLogout() {
    await fetch("/api/ops-logout", { method: "POST" });
    router.push("/ops/login");
  }

  const openRequests = requests.filter((r) => r.status === "requested");
  const closedRequests = requests.filter((r) => r.status !== "requested");
  const visibleRequests = tab === "open" ? openRequests : closedRequests;

  return (
    <div className="min-h-screen bg-zinc-50 pb-12">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
        <div>
          <p className="text-sm text-zinc-500">Logged in as</p>
          <p className="font-semibold text-zinc-900">{fullName}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-zinc-500 hover:text-zinc-900"
        >
          Log out
        </button>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-6">
        <h1 className="text-xl font-bold text-zinc-900">Visits</h1>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setTab("open")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "open"
                ? "bg-emerald-600 text-white"
                : "bg-zinc-100 text-zinc-600"
            }`}
          >
            Open ({openRequests.length})
          </button>
          <button
            onClick={() => setTab("closed")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "closed"
                ? "bg-emerald-600 text-white"
                : "bg-zinc-100 text-zinc-600"
            }`}
          >
            Closed ({closedRequests.length})
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {visibleRequests.length === 0 && (
            <p className="rounded-2xl bg-white p-4 text-sm text-zinc-500 shadow-sm">
              {tab === "open" ? "No open requests right now." : "No closed visits yet."}
            </p>
          )}

          {visibleRequests.map((req) => {
            const address = req.farms?.visit_address ?? "";
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

            return (
              <div key={req.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-zinc-900">
                    {req.farms?.farmers?.full_name ?? "Unknown farmer"}
                  </p>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                    {STATUS_LABELS[req.status] ?? req.status}
                  </span>
                </div>

                {req.farms?.label && (
                  <p className="mt-0.5 text-sm text-zinc-500">{req.farms.label}</p>
                )}

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-start gap-1.5 text-sm text-emerald-700 underline-offset-2 hover:underline"
                >
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  {address}
                </a>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-600">
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="h-4 w-4 text-zinc-400" />
                    {req.scheduled_date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="h-4 w-4 text-zinc-400" />
                    {TIME_SLOT_LABELS[req.scheduled_time_slot] ??
                      req.scheduled_time_slot}
                  </span>
                </div>

                <Link
                  href={`/ops/visit/${req.id}`}
                  className="mt-3 inline-block rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  {req.status === "requested" ? "Start registration" : "View / Edit"}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
