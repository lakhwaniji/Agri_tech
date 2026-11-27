"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// AyaOne brand loader: the Sprout-O ring draws while the two leaves sway,
// with a progress bar and changing status lines. Calls onDone at the end.
export function AyaLoader({ messages, onDone, stepMs = 900 }: { messages: string[]; onDone: () => void; stepMs?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const timers = messages.map((_, k) => setTimeout(() => setI(k), stepMs * k));
    const end = setTimeout(onDone, stepMs * messages.length + 250);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pct = Math.round(((i + 1) / messages.length) * 100);
  // Portal to <body>: an animated (transformed) parent would otherwise trap
  // this "fixed" overlay inside the page box instead of covering the screen.
  return createPortal(
    <div role="status" aria-live="polite" className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-[#f6f8f3]">
      <svg width="120" height="125" viewBox="0 0 100 104" aria-hidden="true" className="overflow-visible">
        <circle cx="50" cy="66" r="31" fill="none" stroke="#e3ede0" strokeWidth="13" />
        <circle className="ao-ldr-ring" cx="50" cy="66" r="31" fill="none" stroke="#2F5D2A" strokeWidth="13" transform="rotate(-90 50 66)" />
        <path className="ao-ldr-l1" d="M50 34 C38 34 22 28 14 13 C30 10 44 18 50 34Z" fill="#6FA83C" />
        <path className="ao-ldr-l2" d="M50 34 C53 16 68 4 92 2 C88 22 72 33 50 34Z" fill="#6FA83C" />
      </svg>
      <p className="text-xl font-bold text-[#14261A]">
        Aya<span className="text-[#2F5D2A]">One</span>
      </p>
      <div className="h-1.5 w-52 overflow-hidden rounded-full bg-emerald-100">
        <div className="h-full rounded-full bg-emerald-700 transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
      <p className="min-h-5 text-sm text-zinc-600">{messages[i]}</p>
    </div>,
    document.body,
  );
}

// The Sprout-O mark morphing into a tick: leaves lift away, ring fills
// green, tick draws in. Used for "joined" and "money transferred".
export function AyaTick({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.04} viewBox="0 0 100 104" aria-hidden="true" className="overflow-visible">
      <g className="ao-tk-pop">
        <circle className="ao-tk-ring" cx="50" cy="66" r="31" fill="#ffffff" stroke="#2F5D2A" strokeWidth="13" />
        <path className="ao-tk-tick" d="M36 66 L46 76 L65 55" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="ao-tk-leaves">
        <path d="M50 34 C38 34 22 28 14 13 C30 10 44 18 50 34Z" fill="#6FA83C" />
        <path d="M50 34 C53 16 68 4 92 2 C88 22 72 33 50 34Z" fill="#6FA83C" />
      </g>
    </svg>
  );
}
