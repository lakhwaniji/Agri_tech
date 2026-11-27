"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FarmerShell } from "@/components/FarmerShell";
import { AyaLoader, AyaTick } from "@/components/AyaLoader";
import { DEMO_ISSUED_CREDITS, PER_CREDIT_TO_FARMER, CREDIT_PRICE, inr, useCarbonDemo } from "@/lib/carbon-demo";

type Farm = { id: string; name: string; areaHa: number };
type Step = "intro" | "join" | "otp" | "loading" | "joined" | "home" | "sell" | "confirm" | "paid";

const PRACTICES = [
  { id: "mulch", name: "No-burn mulching", tPerHa: 0.8 },
  { id: "urea", name: "Less urea", tPerHa: 0.3 },
  { id: "trees", name: "Trees on borders", tPerHa: 0.6 },
  { id: "drip", name: "Drip irrigation", tPerHa: 0.2 },
];

const btn = "ao-press min-h-13 w-full rounded-2xl bg-emerald-700 px-4 py-3.5 text-base font-semibold text-white hover:bg-emerald-800";
const obtn = "min-h-12 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-[15px] font-semibold text-zinc-900";
const card = "rounded-3xl border border-zinc-200 bg-white p-4";

function Row({ a, b, strong }: { a: string; b: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-3 border-b border-zinc-100 py-2.5 text-sm last:border-0">
      <span className="text-zinc-600">{a}</span>
      <span className={strong ? "font-semibold text-zinc-900" : "text-zinc-900"}>{b}</span>
    </div>
  );
}

export function CarbonScreen({ userKey, fullName, phone, farms }: { userKey: string; fullName: string; phone: string; farms: Farm[] }) {
  const router = useRouter();
  const { state, ready, update, reset, available } = useCarbonDemo(userKey);
  const [step, setStep] = useState<Step | null>(null);
  const [farmId, setFarmId] = useState<string>(farms[0]?.id ?? "");
  const [picks, setPicks] = useState<string[]>(["mulch", "urea"]);
  const [qty, setQty] = useState(50);
  const [loader, setLoader] = useState<{ msgs: string[]; then: () => void } | null>(null);
  const [paid, setPaid] = useState<{ qty: number; amount: number; ref: string } | null>(null);

  if (!ready) return <FarmerShell active="carbon" fullName={fullName}><div className="p-10" /></FarmerShell>;
  const current: Step = step ?? (state.joined ? "home" : "intro");
  const farm = farms.find((f) => f.id === farmId) ?? farms[0];
  const est = farm ? PRACTICES.filter((p) => picks.includes(p.id)).reduce((a, p) => a + p.tPerHa * (farm.areaHa || 1), 0) : 0;
  const q = Math.max(0, Math.min(qty, available));
  const masked = phone ? phone.replace(/(\+?\d{2,3})\d+(\d{4})$/, "$1 ••••• $2") : "your phone";

  const run = (msgs: string[], then: () => void) => setLoader({ msgs, then });
  const go = (s: Step) => { setStep(s); window.scrollTo({ top: 0 }); };

  const header = (title: string, back?: Step) => (
    <div className="flex items-center gap-2">
      {back && (
        <button type="button" onClick={() => go(back)} aria-label="Back" className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-zinc-100">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
      )}
      <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
    </div>
  );

  let body: React.ReactNode = null;

  if (current === "intro") {
    body = (
      <>
        {header("Carbon credits")}
        <section className={card}>
          <div className="flex h-36 items-center justify-center rounded-2xl bg-emerald-50">
            <svg width="84" height="88" viewBox="0 0 100 104" aria-hidden="true" className="overflow-visible">
              <circle cx="50" cy="66" r="31" fill="none" stroke="#2F5D2A" strokeWidth="13" />
              <path className="ao-ldr-l1" d="M50 34 C38 34 22 28 14 13 C30 10 44 18 50 34Z" fill="#6FA83C" />
              <path className="ao-ldr-l2" d="M50 34 C53 16 68 4 92 2 C88 22 72 33 50 34Z" fill="#6FA83C" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-zinc-900">Get paid for greener farming</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
            Change one or two things on your farm. We check it with satellite and photos. When a company buys the credits, 60% of the money comes to your bank.
          </p>
        </section>
        <section className={card}>
          {["Pick practices you can do", "Log a photo when you do them", "Credits are checked once a year", "Sell and get paid to your bank"].map((t, i) => (
            <div key={t} className="flex items-center gap-3 py-2">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-700">{i + 1}</span>
              <span className="text-sm text-zinc-900">{t}</span>
            </div>
          ))}
        </section>
        {farms.length > 0 ? (
          <button type="button" className={btn} onClick={() => go("join")}>Join the program</button>
        ) : (
          <a href="/farmgate" className={`${btn} block text-center`}>Add a farm first</a>
        )}
      </>
    );
  }

  if (current === "join" && farm) {
    body = (
      <>
        {header("Join carbon program", "intro")}
        {farms.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {farms.map((f) => (
              <button key={f.id} type="button" onClick={() => setFarmId(f.id)}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${f.id === farm.id ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-300 bg-white text-zinc-800"}`}>
                {f.name}
              </button>
            ))}
          </div>
        )}
        <p className="text-sm text-zinc-600">{farm.name} · {farm.areaHa ? `${farm.areaHa.toFixed(1)} ha` : "area pending"} · tap to choose</p>
        <div className="flex flex-col gap-2">
          {PRACTICES.map((p) => {
            const on = picks.includes(p.id);
            return (
              <button key={p.id} type="button" aria-pressed={on}
                onClick={() => setPicks(on ? picks.filter((x) => x !== p.id) : [...picks, p.id])}
                className={`flex min-h-14 items-center gap-3 rounded-2xl border px-4 text-left text-sm ${on ? "border-emerald-700 bg-emerald-50" : "border-zinc-200 bg-white"}`}>
                <span className={`flex h-6 w-6 flex-none items-center justify-center rounded-md border-2 ${on ? "border-emerald-700 bg-emerald-700" : "border-zinc-400"}`}>
                  {on && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>}
                </span>
                <span className="flex-1 font-medium text-zinc-900">{p.name}</span>
                <span className="text-xs font-semibold text-emerald-700">+{(p.tPerHa * (farm.areaHa || 1)).toFixed(0)} t/yr</span>
              </button>
            );
          })}
        </div>
        <section className={card}>
          <Row a="Estimated credits / year" b={`~${est.toFixed(0)} t`} strong />
          <Row a="Your share" b="60%" strong />
          <Row a="Paid to" b="Your bank account (DBT)" />
        </section>
        <button type="button" className={btn} disabled={picks.length === 0} onClick={() => go("otp")}>Sign with OTP</button>
      </>
    );
  }

  if (current === "otp") {
    body = (
      <>
        {header("Sign the agreement", "join")}
        <p className="text-[15px] text-zinc-800">We sent a 6-digit code to <b>{masked}</b>.</p>
        <div className="flex justify-between gap-2">
          {"482916".split("").map((d, i) => (
            <div key={i} className="flex h-14 w-12 items-center justify-center rounded-xl border-2 border-emerald-700 bg-white text-2xl font-bold">{d}</div>
          ))}
        </div>
        <p className="text-sm font-semibold text-emerald-700">Filled automatically (demo)</p>
        <button type="button" className={btn}
          onClick={() => run(["Checking your code…", "Saving your agreement…", `Linking ${farm?.name ?? "your farm"}…`, "Almost done…"], () => {
            update((s) => ({ ...s, joined: true, farmId: farm?.id ?? null, farmName: farm?.name ?? null, practices: picks }));
            go("joined");
          })}>
          Verify and join
        </button>
      </>
    );
  }

  if (current === "joined") {
    body = (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 text-center">
        <AyaTick />
        <div className="ao-tk-after w-full">
          <h2 className="text-2xl font-bold text-zinc-900">You&apos;ve joined!</h2>
          <p className="mx-auto mt-1 max-w-xs text-[15px] leading-relaxed text-zinc-600">
            {state.farmName} is now in the carbon program. Log a photo each time you do a practice.
          </p>
          <button type="button" className={`${btn} mt-5`}
            onClick={() => run(["Satellite checks for 12 months…", "Verifier reviewing your proof…", "Registry issuing credits…"], () => {
              update((s) => ({ ...s, earned: s.earned + DEMO_ISSUED_CREDITS, justIssued: true }));
              go("home");
            })}>
            Demo: jump to one year later
          </button>
          <p className="mt-2 text-xs text-zinc-500">In real life credits arrive after yearly verification</p>
        </div>
      </div>
    );
  }

  if (current === "home") {
    body = (
      <>
        {header("My carbon")}
        {state.justIssued && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <b>{DEMO_ISSUED_CREDITS} credits issued</b> after verification of {state.farmName}. They&apos;re ready to sell.
          </div>
        )}
        <section className="rounded-3xl bg-emerald-900 p-5 text-white">
          <p className="text-sm text-emerald-200">Ready to sell</p>
          <p className="text-4xl font-bold">{available} credits</p>
          <p className="text-sm text-emerald-100">≈ ₹{inr(available * PER_CREDIT_TO_FARMER)} for you at ₹{CREDIT_PRICE} per credit</p>
          {available > 0 ? (
            <button type="button" onClick={() => { setQty(Math.min(50, available)); go("sell"); }}
              className="ao-press mt-3 min-h-12 w-full rounded-xl bg-white text-[15px] font-semibold text-emerald-900">Sell credits</button>
          ) : (
            <button type="button"
              onClick={() => run(["Satellite checks for 12 months…", "Verifier reviewing your proof…", "Registry issuing credits…"], () => update((s) => ({ ...s, earned: s.earned + DEMO_ISSUED_CREDITS, justIssued: true })))}
              className="mt-3 min-h-12 w-full rounded-xl bg-white/15 text-[15px] font-semibold text-white">Demo: issue next year&apos;s credits</button>
          )}
        </section>
        <div className="grid grid-cols-3 gap-2">
          {[["Earned", state.earned], ["Sold", state.sold], ["Ready", available]].map(([l, v]) => (
            <div key={l as string} className="rounded-2xl border border-zinc-200 bg-white p-3">
              <p className="text-xl font-bold text-zinc-900">{v}</p>
              <p className="text-xs text-zinc-600">{l}</p>
            </div>
          ))}
        </div>
        <section className={card}>
          {farms.map((f) => (
            <Row key={f.id} a={f.name} b={f.id === state.farmId ? "In program · on track" : "Not joined"} strong={f.id === state.farmId} />
          ))}
        </section>
        <button type="button" onClick={reset} className="min-h-11 text-sm font-medium text-zinc-500 underline">Reset demo</button>
      </>
    );
  }

  if (current === "sell") {
    const quick = Array.from(new Set([50, 100, available])).filter((v) => v > 0 && v <= available);
    body = (
      <>
        {header("Sell credits", "home")}
        <section className={card}>
          <p className="text-sm text-zinc-600">How many credits? ({available} available)</p>
          <div className="mt-3 flex items-center justify-between">
            <button type="button" aria-label="10 less" onClick={() => setQty(Math.max(10, q - 10))} className="h-14 w-14 rounded-2xl border border-zinc-300 bg-white text-2xl">−</button>
            <div className="text-center">
              <p className="text-4xl font-bold leading-none text-zinc-900">{q}</p>
              <p className="text-xs text-zinc-600">credits</p>
            </div>
            <button type="button" aria-label="10 more" onClick={() => setQty(Math.min(available, q + 10))} className="h-14 w-14 rounded-2xl border border-zinc-300 bg-white text-2xl">+</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {quick.map((v) => (
              <button key={v} type="button" onClick={() => setQty(v)}
                className={`min-h-10 rounded-full border px-4 text-sm font-semibold ${v === q ? "border-emerald-700 bg-emerald-700 text-white" : "border-zinc-300 bg-white text-zinc-800"}`}>
                {v === available ? `All ${v}` : v}
              </button>
            ))}
          </div>
        </section>
        <section className={card}>
          <Row a="Price today" b={`₹${CREDIT_PRICE} / credit`} />
          <Row a="Sale value" b={`₹${inr(q * CREDIT_PRICE)}`} />
          <div className="flex justify-between gap-3 pt-2.5 text-sm">
            <span className="text-zinc-600">You get (60%)</span>
            <span className="text-lg font-bold text-emerald-700">₹{inr(q * PER_CREDIT_TO_FARMER)}</span>
          </div>
        </section>
        <button type="button" className={btn} disabled={q === 0} onClick={() => setStep("confirm")}>Sell {q} credits</button>
      </>
    );
  }

  if (current === "confirm") {
    body = (
      <>
        {header("Sell credits", "home")}
        <div className="ao-backdrop fixed inset-0 z-50 flex items-end bg-black/45 sm:items-center sm:justify-center" onClick={() => setStep("sell")}>
          <div role="dialog" aria-modal="true" aria-label="Confirm sale" onClick={(e) => e.stopPropagation()}
            className="ao-sheet w-full rounded-t-3xl bg-white p-5 sm:max-w-md sm:rounded-3xl">
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-zinc-300 sm:hidden" />
            <h2 className="text-xl font-semibold text-zinc-900">Confirm sale</h2>
            <p className="mb-2 text-sm text-zinc-600">Once sold, credits can&apos;t be taken back.</p>
            <Row a="Credits" b={String(q)} strong />
            <Row a="Buyer" b="ABC Industries Ltd" />
            <Row a="You get" b={`₹${inr(q * PER_CREDIT_TO_FARMER)}`} strong />
            <Row a="Paid to" b="Your bank account (DBT)" />
            <button type="button" className={`${btn} mt-4`}
              onClick={() => {
                const amount = q * PER_CREDIT_TO_FARMER;
                const ref = "DBT26" + Math.floor(100000 + Math.random() * 899999);
                setStep("sell");
                run(["Placing your offer…", "Buyer found: ABC Industries…", "Transferring credits in registry…", "Sending money to your bank…"], () => {
                  update((s) => ({
                    ...s, sold: s.sold + q, justIssued: false,
                    tx: [{ id: ref, title: `Carbon sale · ${q} credits`, sub: "ABC Industries Ltd", amount, at: new Date().toISOString().slice(0, 10) }, ...s.tx],
                  }));
                  setPaid({ qty: q, amount, ref });
                  go("paid");
                });
              }}>
              Confirm and sell
            </button>
            <button type="button" className={`${obtn} mt-2`} onClick={() => setStep("sell")}>Cancel</button>
          </div>
        </div>
      </>
    );
  }

  if (current === "paid" && paid) {
    body = (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-2 text-center">
        <AyaTick size={130} />
        <div className="ao-tk-after w-full">
          <p className="text-sm text-zinc-600">Money transferred</p>
          <p className="text-4xl font-bold text-emerald-700">₹{inr(paid.amount)}</p>
          <p className="text-sm text-zinc-600">to your bank · DBT ref {paid.ref}</p>
          <p className="mb-5 text-sm text-zinc-600">{paid.qty} credits sold to ABC Industries Ltd</p>
          <button type="button" className={btn} onClick={() => router.push("/wallet?paid=1")}>Open wallet</button>
          <button type="button" className={`${obtn} mt-2`} onClick={() => go("home")}>Back to My carbon</button>
        </div>
      </div>
    );
  }

  return (
    <FarmerShell active="carbon" fullName={fullName}>
      <div key={current} className="ao-page mx-auto flex w-full max-w-md flex-col gap-3 px-4 pt-5 lg:max-w-2xl lg:px-10 lg:pt-10">
        {body}
        <p className="pt-2 text-center text-xs text-zinc-500">Demo flow · sample credits, price and buyer</p>
      </div>
      {loader && <AyaLoader messages={loader.msgs} onDone={() => { const t = loader.then; setLoader(null); t(); }} />}
    </FarmerShell>
  );
}
