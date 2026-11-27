"use client";

import { FarmerShell } from "@/components/FarmerShell";
import { inr, useCarbonDemo } from "@/lib/carbon-demo";

export function WalletScreen({ userKey, fullName, justPaid }: { userKey: string; fullName: string; justPaid: boolean }) {
  const { state, ready } = useCarbonDemo(userKey);
  const total = state.tx.reduce((a, t) => a + t.amount, 0);
  return (
    <FarmerShell active="wallet" fullName={fullName}>
      <div className="mx-auto w-full max-w-md px-4 pt-5 lg:max-w-3xl lg:px-10 lg:pt-10">
        <h1 className="text-2xl font-semibold text-zinc-900">Wallet</h1>
        <div className="relative mt-4">
          <div className="ao-page rounded-3xl bg-blue-900 p-5 text-white">
            <p className="text-sm text-blue-200">Received this season</p>
            <p className="text-4xl font-bold">₹{ready ? inr(total) : "—"}</p>
            <p className="text-sm text-blue-100">Paid to your bank by DBT</p>
          </div>
          {justPaid && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-56 h-0">
              {[["30%", "20px", 0], ["45%", "0px", 0.1], ["60%", "-30px", 0.2], ["38%", "10px", 0.3], ["55%", "-10px", 0.4]].map(([l, x, d], k) => (
                <span key={k} className="ao-coin" style={{ left: l as string, ["--x" as string]: x, animationDelay: `${d}s` }}>
                  ₹
                </span>
              ))}
            </div>
          )}
        </div>
        <section className="mt-4 rounded-3xl border border-zinc-200 bg-white p-4">
          <h2 className="text-base font-semibold text-zinc-900">Payments</h2>
          <ul className="ao-stagger mt-2">
            {state.tx.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 border-b border-zinc-100 py-3 last:border-0">
                <div>
                  <p className="text-sm font-medium text-zinc-900">{t.title}</p>
                  <p className="text-xs text-zinc-500">
                    {t.at} · {t.sub}
                  </p>
                </div>
                <p className="whitespace-nowrap text-sm font-semibold text-emerald-700">+₹{inr(t.amount)}</p>
              </li>
            ))}
          </ul>
        </section>
        <p className="mt-3 text-center text-xs text-zinc-500">Demo wallet · sample payments</p>
      </div>
    </FarmerShell>
  );
}
