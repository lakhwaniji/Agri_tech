"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { VerifyDone, VerifyLoader, VerifyMark, VerifyWordmark } from "@/components/verify/VerifyMarks";
import {
  CLAIM_STEPS, CLAIMS, COMPANY, CREDIT_PRICE, FARMER_SHARE, INITIATIVES, ISSUED_CREDITS, ISSUES, PAYMENTS,
  PHOTOS, PROFILES, PROGRAMME, PURPOSES, REPORTS, SEED_FEED, inr, type Claim, type FeedItem, type Issue,
} from "@/components/verify/data";

type Screen = "overview" | "funds" | "detail" | "monitor" | "analytics" | "issues" | "carbon" | "reports";
const NAV: [Screen, string][] = [
  ["overview", "Overview"], ["funds", "Funds and initiatives"], ["monitor", "Live monitoring"], ["analytics", "Analytics"],
  ["issues", "Issues"], ["carbon", "Carbon credits"], ["reports", "Reports"],
];

const card = "rounded-2xl border border-zinc-200 bg-white p-5";
const btn = "ao-press min-h-11 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800";
const obtn = "min-h-11 rounded-xl border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 hover:bg-zinc-50";
const chip = (on: boolean) =>
  `min-h-10 rounded-full border px-4 text-sm font-medium ${on ? "border-[#14261A] bg-[#14261A] text-white" : "border-zinc-300 bg-white text-zinc-800"}`;
const pill: Record<string, string> = {
  ok: "bg-emerald-100 text-emerald-800", warn: "bg-amber-100 text-amber-800", bad: "bg-red-100 text-red-800", info: "bg-sky-100 text-sky-800",
};

// Carbon sales made in the farmer demo (same browser) show up in the feed,
// so investors see the farmer and company sides connect.
const CARBON_EVT = "ayaone-carbon-demo-change";
function farmerSalesSnapshot() {
  try {
    const out: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) ?? "";
      if (k.startsWith("ayaone-carbon-demo:")) out.push(localStorage.getItem(k) ?? "");
    }
    return out.join("\u0001");
  } catch {
    return "";
  }
}
function subscribeSales(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(CARBON_EVT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(CARBON_EVT, cb);
  };
}

function Kpi({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="ao-lift rounded-2xl border border-zinc-200 bg-white px-4 py-3.5">
      <p className="text-[13px] text-zinc-600">{label}</p>
      <p className="whitespace-nowrap text-2xl font-bold text-zinc-900">{value}</p>
      {note && <p className="text-xs text-emerald-700">{note}</p>}
    </div>
  );
}

function Row({ a, b }: { a: string; b: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-3 border-b border-zinc-100 py-2.5 text-sm last:border-0">
      <span className="text-zinc-600">{a}</span>
      <span className="text-right font-semibold text-zinc-900">{b}</span>
    </div>
  );
}

export function VerifyApp() {
  const [who, setWho] = useState<string | null>(null);
  const [screen, setScreen] = useState<Screen>("overview");
  const [initIdx, setInitIdx] = useState(0);
  const [tab, setTab] = useState<"pay" | "proof" | "out">("pay");
  const [layer, setLayer] = useState(0);
  const [horizon, setHorizon] = useState<12 | 24>(12);
  const [tick, setTick] = useState(0);
  const [tranches, setTranches] = useState(3);
  const [issues, setIssues] = useState<Issue[]>(ISSUES);
  const [claims, setClaims] = useState<Claim[]>(CLAIMS);
  const [sel, setSel] = useState(1);
  const [cq, setCq] = useState(1000);
  const [purpose, setPurpose] = useState(0);
  const [feed, setFeed] = useState<FeedItem[]>(SEED_FEED);
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [loader, setLoader] = useState<{ msgs: string[]; then: () => void } | null>(null);
  const [done, setDone] = useState<{ title: string; text: string } | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const salesRaw = useSyncExternalStore(subscribeSales, farmerSalesSnapshot, () => "");
  const farmerSales: FeedItem[] = useMemo(() => {
    const items: FeedItem[] = [];
    for (const raw of salesRaw.split("\u0001")) {
      try {
        const st = JSON.parse(raw) as { farmName?: string; tx?: { title: string; amount: number; at: string }[] };
        for (const t of st.tx ?? []) {
          if (t.title.startsWith("Carbon sale")) {
            items.push({ title: `Farmer ${t.title.replace("Carbon sale · ", "sold ")}`, sub: `${st.farmName ?? "Farm"} · ₹${inr(t.amount)} paid to farmer by DBT · ${t.at}`, tag: "Carbon", tone: "ok" });
          }
        }
      } catch {
        /* ignore */
      }
    }
    return items;
  }, [salesRaw]);

  useEffect(() => {
    const iv = setInterval(() => setTick((t) => t + 1), 3000);
    const list = timers.current;
    return () => {
      clearInterval(iv);
      list.forEach(clearTimeout);
    };
  }, []);

  const run = (msgs: string[], title: string, text: string, after?: () => void) =>
    setLoader({ msgs, then: () => { after?.(); setDone({ title, text }); } });

  const openIssues = issues.filter((i) => !i.done);
  const spent = INITIATIVES.reduce((a, i) => a + i.spent, 0);
  const received = claims.filter((c) => c.step >= 5).reduce((a, c) => a + c.qty, 0);
  const inProcess = claims.filter((c) => c.step < 5).reduce((a, c) => a + c.qty, 0);
  const available = ISSUED_CREDITS - received - inProcess;
  const qty = Math.min(cq, available);
  const allFeed = [...farmerSales, ...feed];
  const go = (s: Screen) => { setScreen(s); window.scrollTo({ top: 0 }); };

  const overlays = (
    <>
      {loader && <VerifyLoader messages={loader.msgs} onDone={() => { const t = loader.then; setLoader(null); t(); }} />}
      {done && <VerifyDone title={done.title} text={done.text} onClose={() => setDone(null)} />}
    </>
  );

  // ---------- login ----------
  if (!who) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14261A] px-4 py-10">
        <div className="ao-page w-full max-w-md rounded-3xl bg-white p-7">
          <div className="flex items-center gap-3"><VerifyMark size={46} /><VerifyWordmark size={24} /></div>
          <h1 className="mt-6 text-2xl font-semibold text-zinc-900">Choose a demo profile</h1>
          <p className="mb-4 mt-1 text-sm text-zinc-600">See how a company tracks its CSR money, from farm to report.</p>
          <div className="ao-stagger flex flex-col gap-2.5">
            {PROFILES.map((p) => (
              <button key={p.ini} type="button"
                onClick={() => run(["Signing you in…", "Loading your programme…", "Fetching live field data…"], `Welcome, ${p.name}`, `You're viewing ${COMPANY}'s CSR programme.`, () => setWho(`${p.name} · ${p.role}`))}
                className="ao-lift flex min-h-[70px] items-center gap-3.5 rounded-2xl border border-zinc-200 bg-white px-4 text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-200 font-bold text-[#14261A]">{p.ini}</span>
                <span className="flex-1"><span className="block text-[15px] font-semibold text-zinc-900">{p.org}</span><span className="block text-[13px] text-zinc-600">{p.name} · {p.role}</span></span>
                <span aria-hidden="true" className="text-zinc-400">›</span>
              </button>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-zinc-500">Demo portal · sample data for {COMPANY}</p>
          <Link href="/" className="mt-2 block text-center text-sm font-medium text-emerald-700">Back to AyaOne</Link>
        </div>
        {overlays}
      </div>
    );
  }

  // ---------- screens ----------
  let body: React.ReactNode = null;
  const head = (title: string, sub: string, actions?: React.ReactNode) => (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div><h1 className="text-2xl font-semibold text-zinc-900 lg:text-[26px]">{title}</h1><p className="mt-1 text-sm text-zinc-600">{sub}</p></div>
      {actions && <div className="flex flex-wrap gap-2.5">{actions}</div>}
    </div>
  );

  if (screen === "overview") {
    body = (
      <>
        {head(PROGRAMME, "FY 2026–27 · 3 FPOs · Thanjavur, Tiruvarur, Nagapattinam",
          <><button type="button" className={obtn} onClick={() => go("reports")}>Download CSR report</button><button type="button" className={btn} onClick={() => go("carbon")}>Claim credits</button></>)}
        {openIssues.length > 0 && (
          <button type="button" onClick={() => go("issues")} className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-900">
            <span className="flex-1"><b>{openIssues.length} open issues</b> · {openIssues.map((i) => i.title.toLowerCase()).join(", ")}</span><b>View issues ›</b>
          </button>
        )}
        <div className="ao-stagger grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3">
          <Kpi label="CSR budget" value="₹2.00 Cr" note="Covers your 2% obligation" />
          <Kpi label="Spent so far" value={`₹${(spent / 100).toFixed(2)} Cr`} note={`${Math.round((spent / 200) * 100)}% of budget`} />
          <Kpi label="Farmers reached" value="5,012" note="38% women farmers" />
          <Kpi label="Acres monitored" value="10,240" note="1,180 plots mapped" />
          <Kpi label="Credits received" value={inr(received)} note={`${inr(inProcess)} more in process`} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <section className={card}>
            <h2 className="text-base font-semibold">Where your money went</h2><p className="mb-2 text-[13px] text-zinc-500">₹ lakh spent / budget · click an initiative</p>
            {INITIATIVES.map((it, i) => (
              <button key={it.name} type="button" onClick={() => { setInitIdx(i); setTab("pay"); go("detail"); }}
                className="grid w-full grid-cols-[minmax(0,150px)_minmax(0,1fr)_72px] items-center gap-3 rounded-lg py-2 text-left text-sm hover:bg-emerald-50">
                <span>{it.name}</span>
                <span className="h-2.5 overflow-hidden rounded-full bg-emerald-100"><span className="ao-grow block h-full rounded-full bg-emerald-700" style={{ width: `${Math.round((it.spent / it.budget) * 100)}%` }} /></span>
                <b className="whitespace-nowrap text-right">{it.spent} / {it.budget}</b>
              </button>
            ))}
          </section>
          <section className={card}>
            <h2 className="flex items-center gap-2 text-base font-semibold"><span className="ao-blink h-2 w-2 rounded-full bg-emerald-600" />Live from the field</h2>
            <p className="mb-2 text-[13px] text-zinc-500">Farmers, satellites and sensors, as it happens</p>
            <ul className="ao-stagger">
              {allFeed.slice(0, 7).map((f, i) => (
                <li key={`${f.title}-${i}`} className="flex items-start justify-between gap-3 border-b border-zinc-100 py-2.5 last:border-0">
                  <div><p className="text-sm font-semibold text-zinc-900">{f.title}</p><p className="text-xs text-zinc-500">{f.sub}</p></div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${pill[f.tone]}`}>{f.tag}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </>
    );
  }

  if (screen === "funds") {
    const released = tranches >= 4 ? 2.0 : 1.44;
    body = (
      <>
        {head("Funds and initiatives", "Every initiative your CSR money pays for. Click one to see each payment and its proof.",
          <button type="button" className={btn} disabled={tranches >= 4}
            onClick={() => run(["Checking spend against plan…", "Getting finance approval…", "Releasing ₹0.56 Cr to FPOs…"], "Tranche released",
              "₹0.56 Cr sent to 3 FPOs. Farmers will see it as CSR support in their AyaOne wallet.",
              () => { setTranches(4); setFeed((f) => [{ title: "Tranche 4 released · ₹0.56 Cr", sub: "To 3 FPOs · farmers notified in app", tag: "Funds", tone: "ok" }, ...f]); })}>
            {tranches >= 4 ? "All tranches released" : "Release next tranche"}
          </button>)}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3">
          <Kpi label="Committed" value="₹2.00 Cr" note="6 initiatives" />
          <Kpi label="Released" value={`₹${released.toFixed(2)} Cr`} note={`${tranches} of 4 tranches`} />
          <Kpi label="Spent" value={`₹${(spent / 100).toFixed(2)} Cr`} note="Backed by 4,870 photos" />
        </div>
        <section className={`${card} overflow-x-auto`}>
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead><tr className="text-left text-xs text-zinc-500">{["Initiative", "Partner", "Farmers", "Budget", "Spent", "Status"].map((h) => <th key={h} className="border-b border-zinc-200 px-2.5 py-2 font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {INITIATIVES.map((it, i) => {
                const behind = it.spent / it.budget < 0.5;
                return (
                  <tr key={it.name} onClick={() => { setInitIdx(i); setTab("pay"); go("detail"); }} className="ao-row cursor-pointer">
                    <td className="border-b border-zinc-100 px-2.5 py-3 font-semibold">{it.name}</td><td className="border-b border-zinc-100 px-2.5">{it.partner}</td>
                    <td className="border-b border-zinc-100 px-2.5">{it.farmers}</td><td className="border-b border-zinc-100 px-2.5">₹{it.budget} L</td><td className="border-b border-zinc-100 px-2.5">₹{it.spent} L</td>
                    <td className="border-b border-zinc-100 px-2.5"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${behind ? pill.warn : pill.ok}`}>{behind ? "Behind" : "On track"}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </>
    );
  }

  if (screen === "detail") {
    const it = INITIATIVES[initIdx];
    body = (
      <>
        <button type="button" onClick={() => go("funds")} className="-mb-2 self-start text-sm font-semibold text-emerald-700">‹ All initiatives</button>
        {head(it.name, `${it.partner} · ${it.farmers} farmers`, <button type="button" className={obtn} onClick={() => go("reports")}>Download initiative report</button>)}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3">
          <Kpi label="Budget" value={`₹${it.budget} L`} />
          <Kpi label="Spent" value={`₹${it.spent} L`} note={`${Math.round((it.spent / it.budget) * 100)}%`} />
          <Kpi label="Proof items" value={inr(it.proof)} note="geotagged + timestamped" />
        </div>
        <div className="flex flex-wrap gap-2">
          {([["pay", "Payments"], ["proof", "Proof photos"], ["out", "Outcomes"]] as const).map(([k, l]) => (
            <button key={k} type="button" className={chip(tab === k)} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>
        {tab === "pay" && (
          <section className={`${card} overflow-x-auto`}>
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead><tr className="text-left text-xs text-zinc-500">{["Date", "Paid to", "For", "Amount", "Proof"].map((h) => <th key={h} className="border-b border-zinc-200 px-2.5 py-2 font-medium">{h}</th>)}</tr></thead>
              <tbody>{PAYMENTS.map((p) => (
                <tr key={p.date + p.forWhat}><td className="border-b border-zinc-100 px-2.5 py-3">{p.date}</td><td className="border-b border-zinc-100 px-2.5">{p.to}</td><td className="border-b border-zinc-100 px-2.5">{p.forWhat}</td><td className="border-b border-zinc-100 px-2.5">{p.amount}</td><td className="border-b border-zinc-100 px-2.5"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${pill.ok}`}>{p.proof}</span></td></tr>
              ))}</tbody>
            </table>
          </section>
        )}
        {tab === "proof" && (
          <div className="ao-stagger grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
            {PHOTOS.map((p) => (
              <div key={p.title} className={`${card} p-2.5`}>
                <div className="relative h-32 rounded-xl" style={{ background: p.color }}><span className="absolute bottom-2 left-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[11px] text-white">{p.gps}</span></div>
                <p className="mt-2 text-sm font-semibold">{p.title}</p><p className="text-xs text-zinc-500">{p.village} · fingerprint ✓</p>
              </div>
            ))}
          </div>
        )}
        {tab === "out" && (
          <section className={card}>
            <Row a="Crop residue burning avoided" b="3,900 acres" /><Row a="Fires on enrolled plots (NASA FIRMS)" b="0 since enrolment" />
            <Row a="Average crop health change (NDVI)" b="0.27 → 0.71" /><Row a="Estimated CO₂ reduced" b="3,420 t (estimate)" />
          </section>
        )}
      </>
    );
  }

  if (screen === "monitor") {
    const L = [["Crop health", "Bare / stressed", "Healthy", ["#b83a1e", "#f2b705", "#8bc34a", "#0b6b35"]], ["Change since June", "No change", "Much greener", ["#e4e4e7", "#a7f3d0", "#34d399", "#047857"]], ["Fire alerts", "No fire", "Fire", ["#e4f0e6", "#e4f0e6", "#e4f0e6", "#dc2626"]], ["Soil moisture", "Dry", "Wet", ["#fde68a", "#93c5fd", "#3b82f6", "#1e3a8a"]]] as const;
    const pal = L[layer][3];
    const cells = Array.from({ length: 72 }, (_, i) => {
      const r = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1);
      return pal[layer === 2 ? (i === 31 && tick % 2 ? 3 : 0) : Math.min(3, Math.floor(r * 3 + 0.8))];
    });
    const wave = (b: number, a: number, k: number) => b + Math.sin(tick * 0.9 + k) * a;
    const moist = wave(27, 7, 1);
    body = (
      <>
        {head("Live monitoring", "Satellite every 5 days · sensors every 15 minutes · field photos as they arrive",
          <span className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${pill.ok}`}><span className="ao-blink h-2 w-2 rounded-full bg-emerald-600" />Live</span>)}
        <div className="flex flex-wrap gap-2">{L.map((l, i) => <button key={l[0]} type="button" className={chip(layer === i)} onClick={() => setLayer(i)}>{l[0]}</button>)}</div>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <section className={card}>
            <div className="grid grid-cols-12 gap-1">{cells.map((c, i) => <div key={i} className="aspect-square rounded transition-colors duration-500" style={{ background: c }} />)}</div>
            <div className="mt-2 flex justify-between text-xs text-zinc-600"><span>{L[layer][1]}</span><span>{L[layer][2]}</span></div>
            <p className="mt-1 text-xs text-zinc-500">Sample plot grid for the demo. Real view uses each farm&apos;s mapped boundary.</p>
          </section>
          <section className={card}>
            <h2 className="text-base font-semibold">Sensors · plot TN-014</h2><p className="mb-1 text-[13px] text-zinc-500">Updates every 3 seconds in this demo</p>
            <Row a="Soil moisture" b={<span className={moist < 22 ? "text-red-700" : ""}>{moist.toFixed(1)}%</span>} />
            <Row a="Soil temperature" b={`${wave(27.4, 1.2, 2).toFixed(1)} °C`} />
            <Row a="Nitrogen" b={`${Math.round(wave(142, 9, 3))} mg/kg`} />
            <Row a="Soil pH" b={wave(6.8, 0.1, 4).toFixed(2)} />
          </section>
        </div>
      </>
    );
  }

  if (screen === "analytics") {
    const n = 12 + horizon, W = 580;
    const pts = (arr: number[], from: number) => arr.map((v, i) => `${(10 + ((from + i) * W) / (n - 1)).toFixed(0)},${(190 - (v / 260) * 170).toFixed(0)}`).join(" ");
    const past = Array.from({ length: 13 }, (_, i) => i * 6.85);
    const fut = Array.from({ length: horizon }, (_, i) => 82 + (i + 1) * (horizon === 12 ? 6.2 : 6.6));
    const bandX = 10 + (12 * W) / (n - 1);
    body = (
      <>
        {head("How your money is turning into impact", "Spending, outcomes and forecast",
          <>{([12, 24] as const).map((h) => <button key={h} type="button" className={chip(horizon === h)} onClick={() => setHorizon(h)}>{h} months</button>)}</>)}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3">
          <Kpi label="Cost per farmer" value="₹2,474" />
          <Kpi label="Cost per tonne CO₂" value="₹1,510" note="falls as farms join" />
          <Kpi label="Forecast credits" value={horizon === 12 ? "7,800 t" : "16,900 t"} note={`range ${horizon === 12 ? "6,900–8,600" : "14,600–18,800"}`} />
          <Kpi label="Farmer income" value="+18%" note="vs 2025 baseline" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <section className={card}>
            <h2 className="text-base font-semibold">Credits: estimated and forecast</h2><p className="mb-2 text-[13px] text-zinc-500">Tonnes CO₂, cumulative · grey band = forecast with range</p>
            <svg viewBox="0 0 600 220" role="img" aria-label={`Credits forecast for ${horizon} months`} className="block h-auto w-full">
              <rect x={bandX} y={10} width={W + 10 - bandX} height={180} fill="#f4f4f5" />
              <polyline points={pts(past, 0)} fill="none" stroke="#047857" strokeWidth={3} />
              <polyline points={pts([past[12], ...fut], 12)} fill="none" stroke="#047857" strokeWidth={3} strokeDasharray="7 6" />
              <polyline points={pts([past[12], ...fut.map((v) => v * 0.88)], 12)} fill="none" stroke="#a7f3d0" strokeWidth={2} />
              <polyline points={pts([past[12], ...fut.map((v) => v * 1.1)], 12)} fill="none" stroke="#a7f3d0" strokeWidth={2} />
              <text x={bandX + 8} y={28} fontSize={12} fill="#52525b">Forecast</text>
              <text x={10} y={214} fontSize={11} fill="#71717a">Jun 2026</text>
              <text x={520} y={214} fontSize={11} fill="#71717a">{horizon === 12 ? "Jun 2028" : "Jun 2029"}</text>
            </svg>
          </section>
          <section className={card}>
            <h2 className="text-base font-semibold">What drives the forecast</h2><p className="mb-1 text-[13px] text-zinc-500">Change these on the ground to move the number</p>
            <Row a="Farms practising mulching" b="3,900 of 5,012" /><Row a="Satellite match with farmer reports" b="98.7%" />
            <Row a="Monsoon outlook" b="Normal" /><Row a="Drip irrigation behind plan" b={<span className="text-amber-700">− up to 400 t</span>} />
          </section>
        </div>
      </>
    );
  }

  if (screen === "issues") {
    body = (
      <>
        {head("Issues", "Problems we found, who's fixing them, and by when")}
        <section className={`${card} overflow-x-auto`}>
          <table className="w-full min-w-[680px] border-collapse text-sm">
            <thead><tr className="text-left text-xs text-zinc-500">{["Issue", "Where", "Owner", "Due", "Status", ""].map((h) => <th key={h} className="border-b border-zinc-200 px-2.5 py-2 font-medium">{h}</th>)}</tr></thead>
            <tbody>{issues.map((x, i) => (
              <tr key={x.title}>
                <td className="border-b border-zinc-100 px-2.5 py-3 font-semibold">{x.title}</td><td className="border-b border-zinc-100 px-2.5">{x.where}</td>
                <td className="border-b border-zinc-100 px-2.5">{x.owner}</td><td className="border-b border-zinc-100 px-2.5">{x.due}</td>
                <td className="border-b border-zinc-100 px-2.5"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${x.done ? pill.ok : x.overdue ? pill.bad : pill.warn}`}>{x.done ? "Resolved" : x.overdue ? "Overdue" : "In progress"}</span></td>
                <td className="border-b border-zinc-100 px-2.5 text-right">{!x.done && (
                  <button type="button" className={obtn}
                    onClick={() => run(["Saving resolution…", "Notifying field team…"], "Issue resolved", `"${x.title}" is closed. It stays in the audit log.`,
                      () => setIssues((all) => all.map((y, j) => (j === i ? { ...y, done: true } : y))))}>Mark resolved</button>)}</td>
              </tr>
            ))}</tbody>
          </table>
        </section>
      </>
    );
  }

  if (screen === "carbon") {
    const c = claims[Math.min(sel, claims.length - 1)];
    body = (
      <>
        {head("Your carbon credits", "From farm practice to retired in your name")}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3">
          <Kpi label="Issued for your project" value={inr(ISSUED_CREDITS)} note="VCS 2026 vintage" />
          <Kpi label="Received by you" value={inr(received)} note="retired · certificate ready" />
          <Kpi label="Under process" value={inr(inProcess)} note="registry transfer" />
          <Kpi label="Available" value={inr(available)} note={`₹${CREDIT_PRICE} each`} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <section className={card}>
            <h2 className="text-base font-semibold">Your claims</h2><p className="mb-1 text-[13px] text-zinc-500">Click a claim to see where it is</p>
            {claims.map((cl, i) => {
              const tone = cl.step >= 5 ? "ok" : cl.step <= 1 ? "info" : "warn";
              return (
                <button key={cl.id} type="button" onClick={() => setSel(i)} className={`flex w-full items-center justify-between gap-3 rounded-lg border-b border-zinc-100 px-2 py-2.5 text-left text-sm ${i === sel ? "bg-emerald-50" : "hover:bg-zinc-50"}`}>
                  <span><b>{cl.id}</b><br /><span className="text-xs text-zinc-500">{cl.purpose}</span></span>
                  <span>{inr(cl.qty)}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${pill[tone]}`}>{cl.step >= 5 ? "Retired" : cl.step <= 1 ? "Submitted" : "Under process"}</span>
                </button>
              );
            })}
            <p className="mt-4 text-sm font-semibold">{c.id} · {inr(c.qty)} credits</p>
            {CLAIM_STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2.5 py-1.5 text-sm">
                <span className={`h-[22px] w-[22px] flex-none rounded-full ${i < c.step ? "bg-emerald-700" : i === c.step ? "border-2 border-amber-600 bg-amber-100" : "border-2 border-zinc-300 bg-white"}`} />
                <span className={i <= c.step ? "text-zinc-900" : "text-zinc-400"}>{s}{i === c.step ? " · in progress" : ""}</span>
              </div>
            ))}
            {c.step >= 5 && <button type="button" className={`${obtn} mt-3`} onClick={() => window.open(`/verify/report?type=certificate&claim=${c.id}&qty=${c.qty}`, "_blank")}>Download certificate</button>}
          </section>
          <section className={card}>
            <h2 className="text-base font-semibold">Make a new claim</h2><p className="mb-3 text-[13px] text-zinc-500">Only issued credits can be claimed</p>
            <div className="flex items-center gap-3">
              <button type="button" aria-label="100 less" className={`${obtn} text-xl`} onClick={() => setCq(Math.max(100, qty - 100))}>−</button>
              <div className="flex-1 text-center"><p className="text-4xl font-bold">{inr(qty)}</p><p className="text-xs text-zinc-600">credits</p></div>
              <button type="button" aria-label="100 more" className={`${obtn} text-xl`} onClick={() => setCq(Math.min(available, qty + 100))}>+</button>
            </div>
            <div className="my-3 flex flex-wrap gap-2">{PURPOSES.map((p, i) => <button key={p} type="button" className={chip(purpose === i)} onClick={() => setPurpose(i)}>{p}</button>)}</div>
            <Row a="Cost" b={`₹${inr(qty * CREDIT_PRICE)}`} />
            <Row a="Goes to farmers (60%)" b={<span className="text-emerald-700">₹{inr(qty * CREDIT_PRICE * FARMER_SHARE)}</span>} />
            <button type="button" className={`${btn} mt-3 w-full`} disabled={qty <= 0}
              onClick={() => {
                const id = `CL-${String(claims.length + 1).padStart(4, "0")}`;
                const q = qty;
                run(["Reserving credit serial numbers…", "Holding payment in escrow…", "Sending to registry…"], `Claim ${id} submitted`,
                  `${inr(q)} credits reserved. ₹${inr(q * CREDIT_PRICE * FARMER_SHARE)} will reach farmers when the registry transfer completes.`,
                  () => {
                    setSel(claims.length);
                    setClaims((all) => [...all, { id, purpose: PURPOSES[purpose], qty: q, step: 2 }]);
                    timers.current.push(setTimeout(() => setClaims((all) => all.map((x) => (x.id === id ? { ...x, step: 3 } : x))), 5000));
                    timers.current.push(setTimeout(() => {
                      setClaims((all) => all.map((x) => (x.id === id ? { ...x, step: 5 } : x)));
                      setFeed((f) => [{ title: `${id} retired · ${inr(q)} credits`, sub: `Certificate ready · farmers paid ₹${inr(q * CREDIT_PRICE * FARMER_SHARE)}`, tag: "Carbon", tone: "ok" }, ...f]);
                    }, 10000));
                  });
              }}>
              Submit claim
            </button>
          </section>
        </div>
      </>
    );
  }

  if (screen === "reports") {
    body = (
      <>
        {head("Reports", "Built from live data, with the same proof trail")}
        <section className={card}>
          {REPORTS.map((r) => (
            <div key={r.kind} className="flex flex-wrap items-center gap-3.5 border-b border-zinc-100 py-3 last:border-0">
              <span className="flex h-13 w-11 flex-none items-center justify-center rounded-lg border border-zinc-200 bg-emerald-50 text-[11px] font-bold text-emerald-700">{r.fmt}</span>
              <div className="min-w-0 flex-1"><p className="text-[15px] font-semibold">{r.title}</p><p className="text-[13px] text-zinc-500">{r.sub}</p></div>
              <button type="button" className={btn}
                onClick={() => {
                  // Open the tab inside the click so pop-up blockers allow it; fill it after the loader.
                  const tab = window.open("", "_blank");
                  run(["Collecting live data…", "Adding proof references…", `Building ${r.fmt}…`], "Report ready",
                    r.fmt === "CSV" ? `${r.title} has been downloaded.` : `${r.title} opened in a new tab. Use Save as PDF in the print window.`,
                    () => {
                      setDownloaded((d) => ({ ...d, [r.kind]: true }));
                      if (tab) tab.location.href = `/verify/report?type=${r.kind}`;
                      else window.location.href = `/verify/report?type=${r.kind}`;
                    });
                }}>
                {downloaded[r.kind] ? "Download again" : "Download"}
              </button>
            </div>
          ))}
        </section>
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-wrap bg-zinc-100 text-zinc-900">
      <aside className="flex w-full flex-col gap-1 bg-[#14261A] px-3.5 py-4 lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:py-5">
        <div className="flex items-center gap-2.5 px-1.5 pb-3 pt-[env(safe-area-inset-top)] lg:pb-5 lg:pt-0">
          <VerifyMark size={34} dark /><VerifyWordmark dark />
          <button type="button" onClick={() => { setWho(null); setScreen("overview"); }} className="ml-auto min-h-11 px-2 text-sm font-semibold text-[#B5DB7A] lg:hidden">Switch profile</button>
        </div>
        <nav aria-label="Verify" className="flex gap-1 overflow-x-auto lg:flex-col">
          {NAV.map(([k, label]) => {
            const on = screen === k || (k === "funds" && screen === "detail");
            return (
              <button key={k} type="button" onClick={() => go(k)} aria-current={on ? "page" : undefined}
                className={`flex min-h-11 flex-none items-center gap-2 rounded-xl px-3 text-left text-sm font-medium ${on ? "bg-[#B5DB7A] font-semibold text-[#14261A]" : "text-[#d4d8d2] hover:bg-white/10"}`}>
                {label}
                {k === "issues" && openIssues.length > 0 && <span className="ml-auto rounded-full bg-amber-200 px-2 text-xs font-bold text-amber-900">{openIssues.length}</span>}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto hidden border-t border-white/10 px-1.5 pt-3.5 text-[13px] text-[#d4d8d2] lg:block">
          <p className="font-semibold text-white">{COMPANY}</p>{who}
          <button type="button" onClick={() => { setWho(null); setScreen("overview"); }} className="mt-2 block min-h-9 font-semibold text-[#B5DB7A]">Switch profile</button>
        </div>
      </aside>
      <main key={screen} className="ao-page flex min-w-0 flex-1 flex-col gap-4 px-4 py-6 lg:px-8">
        {body}
        <p className="text-xs text-zinc-500">Demo portal · sample data. Carbon figures are estimates until independent verification.</p>
      </main>
      {overlays}
    </div>
  );
}
