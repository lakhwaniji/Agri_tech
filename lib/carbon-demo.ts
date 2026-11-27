"use client";

// DEMO-ONLY carbon + wallet state for the investor prototype.
// Kept in the browser (localStorage) per farmer so the full flow works
// end to end without database changes: join → credits issued → sell → paid.
// Replace with Supabase tables (carbon_enrollments, carbon_credits,
// wallet_transactions) before real farmers use it.
import { useCallback, useMemo, useSyncExternalStore } from "react";

export const CREDIT_PRICE = 900; // ₹ per credit (demo)
export const FARMER_SHARE = 0.6; // farmer gets 60%
export const PER_CREDIT_TO_FARMER = CREDIT_PRICE * FARMER_SHARE; // ₹540
export const DEMO_ISSUED_CREDITS = 200;

export type WalletTx = { id: string; title: string; sub: string; amount: number; at: string };

export type CarbonState = {
  joined: boolean;
  farmId: string | null;
  farmName: string | null;
  practices: string[];
  earned: number;
  sold: number;
  justIssued: boolean;
  tx: WalletTx[];
};

const SEED_TX: WalletTx[] = [
  { id: "seed-1", title: "Mulching kit support", sub: "ABC Industries CSR", amount: 8000, at: "2026-09-02" },
  { id: "seed-2", title: "Training allowance", sub: "FPO office", amount: 2020, at: "2026-07-20" },
];

const empty = (): CarbonState => ({
  joined: false, farmId: null, farmName: null, practices: [], earned: 0, sold: 0, justIssued: false, tx: SEED_TX,
});

const keyFor = (userKey: string) => `ayaone-carbon-demo:${userKey}`;
const EVT = "ayaone-carbon-demo-change";

const SERVER = "__server__";
let memory: Record<string, string> = {}; // fallback when localStorage is blocked

function raw(userKey: string): string {
  try {
    return window.localStorage.getItem(keyFor(userKey)) ?? memory[userKey] ?? "";
  } catch {
    return memory[userKey] ?? "";
  }
}

function parse(text: string): CarbonState {
  if (!text) return empty();
  try {
    return { ...empty(), ...JSON.parse(text) };
  } catch {
    return empty();
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useCarbonDemo(userKey: string) {
  const text = useSyncExternalStore(subscribe, () => raw(userKey), () => SERVER);
  const ready = text !== SERVER;
  const state = useMemo(() => parse(ready ? text : ""), [text, ready]);

  const update = useCallback(
    (fn: (s: CarbonState) => CarbonState) => {
      const next = fn(parse(raw(userKey)));
      const json = JSON.stringify(next);
      memory = { ...memory, [userKey]: json };
      try {
        window.localStorage.setItem(keyFor(userKey), json);
      } catch {
        /* storage blocked: kept in memory for this session */
      }
      window.dispatchEvent(new Event(EVT));
      return next;
    },
    [userKey],
  );

  const reset = useCallback(() => update(() => empty()), [update]);

  return { state, ready, update, reset, available: state.earned - state.sold };
}

export const inr = (n: number) => Math.round(n).toLocaleString("en-IN");
