"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// AyaOne Verify mark: Sprout-O with a green verification arc on an ink ring.
export function VerifyMark({ size = 34, dark = false }: { size?: number; dark?: boolean }) {
  const ring = dark ? "#ffffff" : "#14261A";
  const leaf = dark ? "#B5DB7A" : "#6FA83C";
  return (
    <svg width={size} height={size * 1.04} viewBox="0 0 100 104" aria-hidden="true">
      <circle cx="50" cy="66" r="31" fill="none" stroke={ring} strokeWidth="13" />
      <circle cx="50" cy="66" r="31" fill="none" stroke={leaf} strokeWidth="13" strokeDasharray="58 200" transform="rotate(-90 50 66)" />
      <path d="M50 34 C38 34 22 28 14 13 C30 10 44 18 50 34Z" fill={leaf} />
      <path d="M50 34 C53 16 68 4 92 2 C88 22 72 33 50 34Z" fill={leaf} />
    </svg>
  );
}

export function VerifyWordmark({ dark = false, size = 18 }: { dark?: boolean; size?: number }) {
  return (
    <div className="leading-none">
      <div className="font-bold" style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: size, color: dark ? "#fff" : "#14261A" }}>
        Aya<span style={{ color: dark ? "#B5DB7A" : "#2F5D2A" }}>One</span>
      </div>
      <div className="mt-0.5 font-bold tracking-[3px]" style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: size * 0.55, color: dark ? "#B5DB7A" : "#14261A" }}>
        VERIFY
      </div>
    </div>
  );
}

// Full-screen Verify loader (ring draws in ink, leaves sway). Portalled so an
// animated parent can't trap it.
export function VerifyLoader({ messages, onDone, stepMs = 800 }: { messages: string[]; onDone: () => void; stepMs?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = messages.map((_, k) => setTimeout(() => setI(k), stepMs * k));
    const end = setTimeout(onDone, stepMs * messages.length + 250);
    return () => {
      t.forEach(clearTimeout);
      clearTimeout(end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return createPortal(
    <div role="status" aria-live="polite" className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-[#f6f8f3]">
      <svg width="110" height="115" viewBox="0 0 100 104" aria-hidden="true" className="overflow-visible">
        <circle cx="50" cy="66" r="31" fill="none" stroke="#e3ede0" strokeWidth="13" />
        <circle className="ao-ldr-ring" cx="50" cy="66" r="31" fill="none" stroke="#14261A" strokeWidth="13" transform="rotate(-90 50 66)" />
        <path className="ao-ldr-l1" d="M50 34 C38 34 22 28 14 13 C30 10 44 18 50 34Z" fill="#6FA83C" />
        <path className="ao-ldr-l2" d="M50 34 C53 16 68 4 92 2 C88 22 72 33 50 34Z" fill="#6FA83C" />
      </svg>
      <VerifyWordmark size={22} />
      <div className="h-1.5 w-56 overflow-hidden rounded-full bg-emerald-100">
        <div className="h-full rounded-full bg-emerald-700 transition-[width] duration-500" style={{ width: `${Math.round(((i + 1) / messages.length) * 100)}%` }} />
      </div>
      <p className="min-h-5 text-sm text-zinc-600">{messages[i]}</p>
    </div>,
    document.body,
  );
}

// Success dialog with the logo-to-tick animation.
export function VerifyDone({ title, text, onClose }: { title: string; text: string; onClose: () => void }) {
  return createPortal(
    <div className="ao-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-[#14261A]/45 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-white p-6 text-center">
        <svg width="110" height="115" viewBox="0 0 100 104" aria-hidden="true" className="mx-auto overflow-visible">
          <g className="ao-tk-pop">
            <circle className="ao-tk-ring" cx="50" cy="66" r="31" fill="#ffffff" stroke="#14261A" strokeWidth="13" />
            <path className="ao-tk-tick" d="M36 66 L46 76 L65 55" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g className="ao-tk-leaves">
            <path d="M50 34 C38 34 22 28 14 13 C30 10 44 18 50 34Z" fill="#6FA83C" />
            <path d="M50 34 C53 16 68 4 92 2 C88 22 72 33 50 34Z" fill="#6FA83C" />
          </g>
        </svg>
        <div className="ao-tk-after">
          <h2 className="mt-1 text-xl font-bold text-zinc-900">{title}</h2>
          <p className="mb-4 mt-1 text-sm leading-relaxed text-zinc-600">{text}</p>
          <button type="button" onClick={onClose} className="ao-press min-h-12 w-full rounded-xl bg-emerald-700 font-semibold text-white hover:bg-emerald-800">
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
