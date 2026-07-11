"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OpsLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/ops-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }

    router.push("/ops/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-lg"
      >
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Ops Login</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Internal access only.
          </p>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 min-h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            autoComplete="username"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 min-h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            autoComplete="current-password"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="min-h-12 w-full rounded-full bg-zinc-900 font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
