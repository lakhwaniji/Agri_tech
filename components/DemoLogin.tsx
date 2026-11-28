"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export type DemoFarmer = { id: string; name: string; place: string; farms: number };

// Shown on /login only when DEMO_MODE=true: pick a farmer profile or make a new one.
export function DemoLogin({ farmers }: { farmers: DemoFarmer[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(farmers.length === 0);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");

  async function enter(body: object, key: string) {
    setBusy(key);
    setError(null);
    const res = await fetch("/api/demo-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      setBusy(null);
      return;
    }
    router.push("/home");
    router.refresh();
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Enter a name.");
      return;
    }
    enter({ create: { fullName: name, place, phone } }, "create");
  }

  const input =
    "min-h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-4 py-12">
      <div className="ao-page w-full max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-emerald-900/5 sm:p-8">
        <div className="flex items-center justify-between">
          <Logo className="h-8 w-auto" />
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
            Demo mode
          </span>
        </div>

        <h1 className="mt-6 text-xl font-bold text-zinc-900">Choose a profile</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Explore the app as one of our farmers, or create your own. No OTP needed in the demo.
        </p>

        {farmers.length > 0 && (
          <ul className="ao-stagger mt-5 flex max-h-80 flex-col gap-2 overflow-y-auto">
            {farmers.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => enter({ farmerId: f.id }, f.id)}
                  className="ao-lift flex min-h-14 w-full items-center gap-3 rounded-2xl border border-zinc-200 px-3 py-2 text-left transition-colors hover:border-emerald-300 hover:bg-emerald-50/50 disabled:opacity-60"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">
                    {f.name
                      .split(/\s+/)
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-semibold text-zinc-900">{f.name}</span>
                    <span className="truncate text-xs text-zinc-500">
                      {[f.place, `${f.farms} ${f.farms === 1 ? "farm" : "farms"}`]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                  <span className="text-sm font-medium text-emerald-700">
                    {busy === f.id ? "Opening…" : "Continue"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {!creating ? (
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="mt-4 min-h-12 w-full rounded-full border border-dashed border-emerald-300 font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            + Create your own profile
          </button>
        ) : (
          <form onSubmit={handleCreate} className="mt-5 space-y-3 border-t border-zinc-100 pt-5">
            <p className="text-sm font-semibold text-zinc-900">Create your own profile</p>
            <input className={input} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className={input} placeholder="Village / town (optional)" value={place} onChange={(e) => setPlace(e.target.value)} />
            <input
              className={input}
              placeholder="Mobile number (optional)"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            />
            <button
              type="submit"
              disabled={busy !== null}
              className="min-h-12 w-full rounded-full bg-emerald-600 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {busy === "create" ? "Creating…" : "Create and continue"}
            </button>
          </form>
        )}

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <a
          href="/ops/login"
          className="mt-5 flex min-h-12 items-center justify-between rounded-2xl bg-zinc-50 px-4 text-sm text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-100"
        >
          <span>
            <span className="font-semibold text-zinc-900">Field agent?</span> Ops login
          </span>
          <span aria-hidden="true" className="text-emerald-700">→</span>
        </a>
        <a
          href="/verify"
          className="mt-2 flex min-h-12 items-center justify-between rounded-2xl bg-zinc-50 px-4 text-sm text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-100"
        >
          <span>
            <span className="font-semibold text-zinc-900">Company or CSR team?</span> AyaOne Verify
          </span>
          <span aria-hidden="true" className="text-emerald-700">→</span>
        </a>
      </div>
    </div>
  );
}
