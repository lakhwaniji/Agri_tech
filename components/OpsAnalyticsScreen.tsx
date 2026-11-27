"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FLAGGED_FARMS,
  FUNNEL,
  MONTHLY_ENROLLMENTS,
  ORDER_CATEGORIES,
  RATIOS,
  STATE_STATS,
  TILE_LAYOUT,
} from "@/lib/mocked/investor-analytics";

const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");
const card = "rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6";

export function OpsAnalyticsScreen({ fullName }: { fullName: string }) {
  const [region, setRegion] = useState<string>("all");

  async function handleLogout() {
    const res = await fetch("/api/ops-logout", { method: "POST" }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    // Full page load so the server-side login check runs fresh.
    window.location.href = data.redirect ?? "/ops/login";
  }

  const selected = region === "all" ? STATE_STATS : STATE_STATS.filter((s) => s.id === region);
  const regionName = region === "all" ? "All India" : selected[0]?.name ?? "All India";
  const totalFarmsAll = STATE_STATS.reduce((a, s) => a + s.farms, 0);
  const farms = selected.reduce((a, s) => a + s.farms, 0);
  const area = selected.reduce((a, s) => a + s.areaHa, 0);
  const co2 = selected.reduce((a, s) => a + s.co2Tons, 0);
  const share = farms / totalFarmsAll;

  const co2Done = co2 * RATIOS.co2CapturedToDateShare;
  const orders = farms * RATIOS.ordersPerFarm;
  const gmv = orders * RATIOS.avgOrderValue;

  const months = MONTHLY_ENROLLMENTS.map((m) => ({ ...m, value: Math.round(m.farms * share) }));
  const maxMonth = Math.max(...months.map((m) => m.value), 1);
  const maxCo2 = Math.max(...STATE_STATS.map((s) => s.co2Tons));
  const flags = FLAGGED_FARMS.filter((f) => region === "all" || f.state === region);

  const kpis = [
    { label: "Farms enrolled", value: fmt(farms), sub: region === "all" ? "+47% vs last month" : `${Math.round(share * 100)}% of network` },
    { label: "Farmers", value: fmt(farms * RATIOS.farmersPerFarm), sub: "1.2 farms per farmer" },
    { label: "Area mapped", value: `${fmt(area)} ha`, sub: `${fmt(area * 2.471)} acres` },
    { label: "Expected CO₂ captured", value: `${fmt(co2)} t`, sub: "per year, estimated" },
    {
      label: "States · districts",
      value: region === "all" ? `${STATE_STATS.length} · ${RATIOS.districtsTotal}` : `1 · ${Math.max(2, Math.round(RATIOS.districtsTotal * share))}`,
      sub: "live coverage",
    },
  ];

  const orderKpis = [
    { label: "Orders placed", value: fmt(orders), sub: region === "all" ? "+32% vs last month" : "this region" },
    { label: "Order value (GMV)", value: `₹${(gmv / 100000).toFixed(1)} L`, sub: `avg ₹${fmt(RATIOS.avgOrderValue)} per order` },
    { label: "Farmers who ordered", value: `${Math.round(RATIOS.buyerShare * 100)}%`, sub: "of enrolled farmers" },
    { label: "Repeat buyers", value: `${Math.round(RATIOS.repeatBuyerShare * 100)}%`, sub: "ordered 2+ times" },
  ];

  const chip = (id: string, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => setRegion(id)}
      aria-pressed={region === id}
      className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
        region === id ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-zinc-100 pb-12 text-zinc-900">
      <header className="bg-zinc-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold">AyaOne Ops</span>
            <nav aria-label="Ops" className="flex gap-1">
              <Link href="/ops/dashboard" className="flex min-h-10 items-center rounded-lg px-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white">
                Visits
              </Link>
              <span className="flex min-h-10 items-center rounded-lg bg-zinc-700 px-3 text-sm font-medium">Analytics</span>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <span>{fullName}</span>
            <button onClick={handleLogout} className="min-h-10 rounded-lg border border-zinc-600 px-3 font-medium text-white hover:bg-zinc-800">
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Network overview</h1>
            <p className="text-sm text-zinc-600">Farms, area, climate impact and marketplace across India</p>
          </div>
          <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-900">
            Demo data
          </span>
        </div>

        <section aria-label="Region filter" className="flex flex-wrap gap-2">
          {chip("all", "All India")}
          {STATE_STATS.map((s) => chip(s.id, s.name))}
        </section>

        <section aria-label="Headline metrics" className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-sm font-medium text-zinc-600">{k.label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">{k.value}</p>
              <p className="mt-1 text-sm font-medium text-emerald-700">{k.sub}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          {/* Tile map */}
          <section aria-label="Where our farmers are" className={card}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold">Where our farmers are</h2>
              <span className="text-sm text-zinc-600">Tap a green state to filter</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-6">
              <div className="grid w-full max-w-md grid-cols-8 gap-1.5" style={{ gridTemplateRows: "repeat(7, 44px)" }}>
                {TILE_LAYOUT.map(([code, row, col, name]) => {
                  const s = STATE_STATS.find((x) => x.id === code);
                  const active = !!s && (region === "all" || region === s.id);
                  const fill = !s ? "bg-zinc-100 text-zinc-500 border-zinc-200" : s.farms >= 300 ? "bg-emerald-800 text-white border-emerald-800" : s.farms >= 150 ? "bg-emerald-500 text-white border-emerald-500" : "bg-emerald-200 text-emerald-900 border-emerald-200";
                  return (
                    <button
                      key={code}
                      type="button"
                      disabled={!s}
                      onClick={() => s && setRegion(region === s.id ? "all" : s.id)}
                      aria-label={`${name}${s ? `, ${s.farms} farms` : ", not yet live"}`}
                      title={name}
                      style={{ gridRow: row + 1, gridColumn: col + 1 }}
                      className={`rounded-lg border text-xs font-semibold transition-opacity ${fill} ${
                        s && !active ? "opacity-40" : ""
                      } ${region === code ? "ring-2 ring-zinc-900 ring-offset-1" : ""} ${s ? "cursor-pointer" : "cursor-default"}`}
                    >
                      {code}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2 text-sm text-zinc-700">
                <span className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-emerald-800" />300+ farms</span>
                <span className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-emerald-500" />150–300 farms</span>
                <span className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-emerald-200" />Under 150 farms</span>
                <span className="flex items-center gap-2"><span className="h-4 w-4 rounded border border-zinc-200 bg-zinc-100" />Not yet live</span>
                <span className="mt-1 text-xs text-zinc-600">One square per state, roughly in place. Not to scale.</span>
              </div>
            </div>
          </section>

          {/* Climate impact */}
          <section aria-label="Climate impact" className="flex flex-col gap-4 rounded-2xl bg-emerald-950 p-6 text-emerald-50">
            <h2 className="text-lg font-semibold text-white">Climate impact so far</h2>
            <div>
              <p className="text-4xl font-bold tracking-tight text-white tabular-nums">{fmt(co2Done)} t</p>
              <p className="text-sm text-emerald-200">CO₂ captured to date by enrolled farms</p>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-emerald-800">
              <div className="h-full rounded-full bg-emerald-400" style={{ width: `${Math.round(RATIOS.co2CapturedToDateShare * 100)}%` }} />
            </div>
            <p className="text-sm text-emerald-100">
              {Math.round(RATIOS.co2CapturedToDateShare * 100)}% of this year’s {fmt(co2)} t target
            </p>
            <div className="grid grid-cols-2 gap-3 border-t border-emerald-800 pt-4">
              {[
                [`${fmt(co2Done * RATIOS.o2PerCo2)} t`, "O₂ released"],
                [fmt(co2Done / RATIOS.co2PerCarPerYear), "cars off the road for a year"],
                [fmt(farms * RATIOS.treesPerFarm), "trees counted"],
                [`${fmt(orders * RATIOS.co2AvoidedPerOrder)} t`, "CO₂ avoided via orders"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="text-xl font-semibold text-white">{v}</p>
                  <p className="text-sm text-emerald-200">{l}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Marketplace */}
        <section aria-label="Marketplace orders" className={card}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold">Marketplace orders</h2>
            <span className="text-sm text-zinc-600">{regionName} · since launch</span>
          </div>
          <div className="mt-4 grid gap-6 lg:grid-cols-[2fr_3fr]">
            <div className="grid grid-cols-2 gap-3">
              {orderKpis.map((o) => (
                <div key={o.label} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm text-zinc-600">{o.label}</p>
                  <p className="mt-1 text-xl font-semibold tabular-nums">{o.value}</p>
                  <p className="text-xs font-medium text-emerald-700">{o.sub}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium">Orders by category</p>
              {ORDER_CATEGORIES.map((c) => (
                <div key={c.name} className="flex items-center gap-3 text-sm">
                  <span className="w-28 shrink-0">{c.name}</span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-100">
                    <div className="h-full rounded-full bg-emerald-600" style={{ width: `${(c.share / ORDER_CATEGORIES[0].share) * 100}%` }} />
                  </div>
                  <span className="w-14 text-right tabular-nums">{fmt(orders * c.share)}</span>
                </div>
              ))}
              <p className="text-xs text-zinc-600">Green-tagged items (organic inputs, solar pumps, drip kits) count toward CO₂ avoided.</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          {/* Monthly trend */}
          <section aria-label="Farms enrolled per month" className={card}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold">Farms enrolled per month</h2>
              <span className="text-sm text-zinc-600">{regionName} · last 6 months</span>
            </div>
            <div className="mt-6 flex h-56 items-end gap-3 border-b border-zinc-200 sm:gap-4">
              {months.map((m, i) => (
                <div key={m.month} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                  <span className="text-sm font-semibold tabular-nums">{fmt(m.value)}</span>
                  <div
                    className={`w-full max-w-16 rounded-t-lg ${i === months.length - 1 ? "bg-emerald-700" : "bg-emerald-300"}`}
                    style={{ height: `${Math.max(4, (m.value / maxMonth) * 170)}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-3 sm:gap-4">
              {months.map((m) => (
                <span key={m.month} className="flex-1 text-center text-sm text-zinc-600">{m.month}</span>
              ))}
            </div>
          </section>

          {/* Funnel */}
          <section aria-label="Onboarding progress" className={`${card} flex flex-col gap-4`}>
            <h2 className="text-lg font-semibold">Onboarding progress</h2>
            {FUNNEL.map((f) => (
              <div key={f.label}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{f.label}</span>
                  <span className="tabular-nums text-zinc-700">{fmt(farms * f.share)} · {Math.round(f.share * 100)}%</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full rounded-full bg-emerald-600" style={{ width: `${f.share * 100}%` }} />
                </div>
              </div>
            ))}
            <p className="text-sm text-zinc-600">Registered → agent visit → green details (satellite + field sample) → carbon-ready.</p>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          {/* By state */}
          <section aria-label="By state" className={card}>
            <h2 className="text-lg font-semibold">By state</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-sm tabular-nums">
                <thead>
                  <tr className="text-left text-zinc-600">
                    <th className="border-b border-zinc-200 px-2 py-2.5 font-medium">State</th>
                    <th className="border-b border-zinc-200 px-2 py-2.5 text-right font-medium">Farms</th>
                    <th className="border-b border-zinc-200 px-2 py-2.5 text-right font-medium">Area (ha)</th>
                    <th className="border-b border-zinc-200 px-2 py-2.5 font-medium">Expected CO₂ (t / yr)</th>
                  </tr>
                </thead>
                <tbody>
                  {STATE_STATS.map((s) => (
                    <tr key={s.id} className={region !== "all" && region !== s.id ? "opacity-40" : ""}>
                      <td className="border-b border-zinc-100 px-2 py-3 font-medium">{s.name}</td>
                      <td className="border-b border-zinc-100 px-2 py-3 text-right">{fmt(s.farms)}</td>
                      <td className="border-b border-zinc-100 px-2 py-3 text-right">{fmt(s.areaHa)}</td>
                      <td className="border-b border-zinc-100 px-2 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100">
                            <div className="h-full rounded-full bg-emerald-600" style={{ width: `${(s.co2Tons / maxCo2) * 100}%` }} />
                          </div>
                          <span className="w-14 text-right">{fmt(s.co2Tons)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Flags */}
          <section aria-label="Needs a check" className={`${card} flex flex-col gap-3`}>
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">Needs a check</h2>
              <span className="text-sm text-zinc-600">{flags.length} farms</span>
            </div>
            {flags.length === 0 && <p className="text-sm text-zinc-600">Nothing flagged in this region.</p>}
            {flags.map((f) => (
              <div key={f.farm} className="flex gap-3 rounded-xl border border-zinc-200 p-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0">
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                  <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                </svg>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{f.farm}</p>
                  <p className="text-sm text-zinc-600">{f.place}</p>
                  <p className="text-sm text-amber-800">{f.issue}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        <p className="text-xs leading-relaxed text-zinc-600">
          CO₂ figures are estimates from satellite NDVI (Sentinel-2) and field-agent tree samples, using IPCC biomass→carbon factors.
          Not verified carbon credits. All numbers on this screen are demo data.
        </p>
      </main>
    </div>
  );
}
