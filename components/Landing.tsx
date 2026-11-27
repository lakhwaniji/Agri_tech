"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { locales } from "@/lib/i18n/translations";
import { landingCopy } from "@/lib/i18n/landing";

// Public landing page (/). Animations live in globals.css (.ao-* classes)
// and switch off for users who prefer reduced motion.

const LEAF_R = "M36 21C36 9 46 2 59 2C59 15 50 21 36 21Z";
const LEAF_L = "M36 21C35 13 28 8 17 8C17 16 24 21 36 21Z";

function Sprout({ ring, leaf, className, animate = false }: { ring: string; leaf: string; className?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true">
      <circle cx="36" cy="43" r="22" fill="none" stroke={ring} strokeWidth="9" />
      <path className={animate ? "ao-leafr" : undefined} d={LEAF_R} fill={leaf} />
      <path className={animate ? "ao-leafl" : undefined} d={LEAF_L} fill={leaf} />
    </svg>
  );
}

function Check({ className = "h-[18px] w-[18px]", color = "#B5DB7A" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" className={`${className} shrink-0`} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const SERVICE_STYLE: { icon: string; bg: string; fg: string; status: "live" | "soon" | "pilot" }[] = [
  { icon: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z", bg: "#EAF4DD", fg: "#2F5D2A", status: "live" },
  { icon: "M12 3l1.8 4.6L18 9.4l-4.2 1.8L12 16l-1.8-4.8L6 9.4l4.2-1.8zM18.5 15l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z", bg: "#E7F0F7", fg: "#1E4E79", status: "live" },
  { icon: "M4 7h16l-1.5 11H5.5zM9 7V5a3 3 0 0 1 6 0v2", bg: "#FDF1D8", fg: "#8A5A00", status: "soon" },
  { icon: "M3 7h18v12H3zM3 7l3-3h12l3 3M16 13h2", bg: "#EFE9F8", fg: "#5B3B8C", status: "soon" },
  { icon: "M7 18a4 4 0 0 1-.7-7.9A6 6 0 0 1 18 9.5a4.5 4.5 0 0 1-.5 8.5z", bg: "#E4F1F6", fg: "#16566B", status: "live" },
  { icon: "M12 22V12M12 12C12 7 16 4 21 4c0 5-3 8-9 8zM12 14C12 10 9 7 4 7c0 4 3 7 8 7z", bg: "#EAF4DD", fg: "#2F5D2A", status: "pilot" },
];

const WELCOME = ["Welcome", "स्वागत है", "வரவேற்கிறோம்", "స్వాగతం", "ಸುಸ್ವಾಗತ", "സ്വാഗതം", "AyaOne"];

export function Landing() {
  const { locale, setLocale } = useLanguage();
  const c = landingCopy[locale];
  const [step, setStep] = useState(0);
  const active = c.how.steps[step];

  const display = "font-[family-name:var(--font-sora)]";

  return (
    <div className="overflow-x-hidden bg-[#F6F5EF] text-[#14261A]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#10221A] text-white">
        <svg aria-hidden="true" viewBox="0 0 1680 760" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-35">
          <g className="ao-drift" fill="none" stroke="#2F5D2A" strokeWidth="1.5">
            <path d="M0 620 C 220 560 380 660 600 600 S 980 520 1200 590 S 1560 650 1920 570" />
            <path d="M0 660 C 240 600 400 700 620 640 S 1000 560 1220 630 S 1580 690 1920 610" />
            <path d="M0 700 C 260 640 420 740 640 680 S 1020 600 1240 670 S 1600 730 1920 650" />
            <path d="M0 580 C 200 520 360 620 580 560 S 960 480 1180 550 S 1540 610 1920 530" />
            <path d="M0 540 C 180 480 340 580 560 520 S 940 440 1160 510 S 1520 570 1920 490" />
          </g>
        </svg>
        <div aria-hidden="true" className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(111,168,60,0.28),rgba(111,168,60,0)_70%)]" />

        <header className="relative mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href="/" aria-label="AyaOne home" className="flex items-center gap-2.5 text-white">
            <Sprout ring="#FFFFFF" leaf="#B5DB7A" className="h-10 w-10" animate />
            <span className={`${display} text-2xl font-bold tracking-tight`}>
              Aya<span className="text-[#B5DB7A]">One</span>
            </span>
          </Link>
          <nav aria-label="Main" className="flex flex-wrap items-center gap-1">
            <a href="#how" className="hidden min-h-11 items-center px-3.5 text-[15px] text-[#D5E5CF] hover:text-white md:flex">{c.nav.how}</a>
            <a href="#services" className="hidden min-h-11 items-center px-3.5 text-[15px] text-[#D5E5CF] hover:text-white md:flex">{c.nav.services}</a>
            <a href="#satellite" className="hidden min-h-11 items-center px-3.5 text-[15px] text-[#D5E5CF] hover:text-white md:flex">{c.nav.satellite}</a>
            <label className="ml-1.5">
              <span className="sr-only">Language</span>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as typeof locale)}
                className="min-h-10 cursor-pointer rounded-full border border-[#3D6B45] bg-transparent px-3.5 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-[#B5DB7A]"
              >
                {locales.map((l) => (
                  <option key={l.code} value={l.code} className="text-zinc-900">{l.label}</option>
                ))}
              </select>
            </label>
            <Link href="/login" className="ao-btn ml-1.5 flex min-h-11 items-center rounded-full bg-[#B5DB7A] px-5 text-[15px] font-semibold text-[#10221A]">
              {c.nav.login}
            </Link>
          </nav>
        </header>

        <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-14 px-6 pb-28 pt-10 md:pt-14 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="ao-rise inline-flex items-center gap-2.5 self-start rounded-full border border-[#2F5D2A] bg-[rgba(47,93,42,0.35)] px-3.5 py-2 text-sm text-[#D5E5CF]">
              <span className="relative h-2 w-2">
                <span className="ao-pulse absolute inset-0 rounded-full bg-[#B5DB7A]" />
                <span className="absolute inset-0 rounded-full bg-[#B5DB7A]" />
              </span>
              {c.badge}
            </span>
            <h1 className={`ao-rise ${display} text-[clamp(40px,5.6vw,72px)] font-bold leading-[1.05] tracking-[-0.03em]`} style={{ animationDelay: ".08s" }}>
              {c.title1}
              <br />
              <span className="text-[#B5DB7A]">{c.title2}</span>
            </h1>
            <p className="ao-rise max-w-[520px] text-[clamp(17px,1.5vw,20px)] leading-relaxed text-[#C9D9C3]" style={{ animationDelay: ".16s" }}>
              {c.subtitle}
            </p>
            <div className="ao-rise flex flex-wrap gap-3" style={{ animationDelay: ".24s" }}>
              <Link href="/login" className="ao-btn inline-flex min-h-14 items-center gap-2.5 rounded-full bg-[#6FA83C] px-7 text-[17px] font-semibold text-white shadow-[0_12px_30px_rgba(111,168,60,0.35)] hover:bg-[#649a35]">
                {c.cta}
                <Arrow />
              </Link>
              <a href="#how" className="ao-btn inline-flex min-h-14 items-center rounded-full border border-[#3D6B45] px-6 text-[17px] font-semibold text-white hover:bg-white/5">
                {c.ctaSecondary}
              </a>
            </div>
            <div className="ao-rise flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#A9C2A2]" style={{ animationDelay: ".32s" }}>
              {c.trust.map((t) => (
                <span key={t} className="flex items-center gap-2"><Check />{t}</span>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative flex justify-center py-5">
            <div className="ao-float relative w-[300px] rounded-[42px] bg-[#0A160F] p-3 shadow-[0_40px_80px_rgba(0,0,0,0.45),inset_0_0_0_1px_#2A4A32]">
              <div className="overflow-hidden rounded-[32px] bg-[#F6F5EF] text-[#14261A]">
                <div className="flex flex-col gap-1 bg-[#2F5D2A] px-[18px] pb-12 pt-5 text-white">
                  <span className="text-xs text-[#C9E3B0]">{c.phone.greeting}</span>
                  <span className={`${display} text-[19px] font-semibold`}>{c.phone.farms}</span>
                </div>
                <div className="mx-3 -mt-9 rounded-[20px] bg-white p-3.5 shadow-[0_10px_24px_rgba(20,38,26,0.12)]">
                  <div className="relative h-32 overflow-hidden rounded-[14px] bg-[#E3EED6]">
                    <svg viewBox="0 0 260 128" aria-hidden="true" className="absolute inset-0 h-full w-full">
                      <path d="M0 40 H260 M0 88 H260 M70 0 V128 M180 0 V128" stroke="#D2E4C0" strokeWidth="2" fill="none" />
                      <path d="M78 22 L188 16 L214 62 L170 106 L86 100 Z" fill="#6FA83C" fillOpacity="0.45" stroke="#C2410C" strokeWidth="2.5" strokeLinejoin="round" />
                    </svg>
                    <div className="ao-scan absolute inset-x-0 h-[26px] bg-[linear-gradient(180deg,rgba(181,219,122,0),rgba(181,219,122,0.65),rgba(181,219,122,0))]" />
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-[#2F5D2A] px-2.5 py-1 text-[11px] font-semibold text-white">{c.phone.scan}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3.5">
                    <svg width="64" height="64" viewBox="0 0 110 110" role="img" aria-label="Green score 35%">
                      <circle cx="55" cy="55" r="48" fill="none" stroke="#E7EFE0" strokeWidth="12" />
                      <circle className="ao-ring" cx="55" cy="55" r="48" fill="none" stroke="#6FA83C" strokeWidth="12" strokeLinecap="round" transform="rotate(-90 55 55)" />
                      <text x="55" y="62" textAnchor="middle" fontWeight="700" fontSize="24" fill="#14261A" className={display}>35%</text>
                    </svg>
                    <div className="flex flex-col gap-0.5">
                      <span className={`${display} text-[15px] font-semibold`}>LoveFarm · 1.1 ha</span>
                      <span className="text-xs text-[#4B5E4F]">{c.phone.cover}</span>
                      <span className="text-xs font-semibold text-[#2F5D2A]">{c.phone.co2}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 px-3 pb-[18px] pt-3.5">
                  {c.phone.tiles.map((t) => (
                    <div key={t} className="truncate rounded-[14px] bg-white px-1 py-2.5 text-center text-[11px] font-semibold">{t}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ao-float absolute left-0 top-16 hidden items-center gap-2.5 rounded-2xl bg-white px-3.5 py-3 text-[#14261A] shadow-[0_16px_36px_rgba(0,0,0,0.25)] sm:flex xl:left-4" style={{ animationDelay: "-2s" }}>
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#EAF4DD]">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2F5D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
              </span>
              <span className="flex flex-col"><span className="text-[13px] font-semibold">{c.chips.mappedTitle}</span><span className="text-xs text-[#4B5E4F]">{c.chips.mappedBody}</span></span>
            </div>
            <div className="ao-float absolute bottom-16 right-0 hidden items-center gap-2.5 rounded-2xl bg-white px-3.5 py-3 text-[#14261A] shadow-[0_16px_36px_rgba(0,0,0,0.25)] sm:flex xl:right-2" style={{ animationDelay: "-4s" }}>
              <span className={`${display} flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#FDF1D8] font-bold text-[#8A5A00]`}>₹</span>
              <span className="flex flex-col"><span className="text-[13px] font-semibold">{c.chips.ureaTitle}</span><span className="text-xs text-[#4B5E4F]">{c.chips.ureaBody}</span></span>
            </div>
          </div>
        </div>

        <svg aria-hidden="true" viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute -bottom-px left-0 block h-[60px] w-full">
          <path d="M0 60 L0 30 C 240 0 480 0 720 22 S 1200 58 1440 26 L1440 60 Z" fill="#F6F5EF" />
        </svg>
      </section>

      {/* ================= LANGUAGE MARQUEE ================= */}
      <section aria-label="Languages" className="overflow-hidden pb-2 pt-6">
        <div className={`ao-marquee flex w-max gap-12 whitespace-nowrap ${display} text-[22px] font-semibold text-[#9AAE94]`}>
          {[...WELCOME, ...WELCOME].map((w, i) => (
            <span key={i} className={w === "AyaOne" ? "text-[#2F5D2A]" : undefined}>{w}</span>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="mx-auto flex max-w-[1240px] scroll-mt-6 flex-col gap-10 px-6 py-20">
        <div className="flex max-w-[640px] flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2F5D2A]">{c.how.label}</span>
          <h2 className={`${display} text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.1] tracking-tight`}>{c.how.title}</h2>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <div role="tablist" aria-label={c.how.label} className="flex flex-col gap-2.5">
            {c.how.steps.map((s, i) => {
              const on = i === step;
              return (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setStep(i)}
                  className={`flex items-start gap-4 rounded-[20px] border px-5 py-5 text-left transition-colors ${on ? "border-[#B5DB7A] bg-white shadow-[0_10px_28px_rgba(20,38,26,0.08)]" : "border-[#E2E4D8] bg-transparent hover:bg-white/60"}`}
                >
                  <span className={`${display} flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${on ? "bg-[#2F5D2A] text-white" : "bg-[#ECEEE4] text-[#3B4A3E]"}`}>{i + 1}</span>
                  <span className="flex flex-col gap-1">
                    <span className={`${display} text-lg font-semibold`}>{s.title}</span>
                    <span className="text-[15px] leading-relaxed text-[#4B5E4F]">{s.body}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div role="tabpanel" className="relative flex min-h-[380px] flex-col justify-end gap-3.5 overflow-hidden rounded-[28px] bg-[#10221A] p-9 text-white">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(111,168,60,0.35),rgba(111,168,60,0)_70%)]" />
            <Sprout ring="#2F5D2A" leaf="#6FA83C" className="absolute right-9 top-9 h-28 w-28" animate />
            <div key={step} className="ao-rise relative flex flex-col gap-3.5">
              <span className="text-sm font-semibold text-[#B5DB7A]">{c.how.stepOf.replace("{n}", String(step + 1))}</span>
              <span className={`${display} max-w-[440px] text-[30px] font-bold leading-tight`}>{active.headline}</span>
              <span className="max-w-[460px] text-base leading-relaxed text-[#C9D9C3]">{active.detail}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="scroll-mt-6 bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-6 py-[88px]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="flex max-w-[620px] flex-col gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2F5D2A]">{c.services.label}</span>
              <h2 className={`${display} text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.1] tracking-tight`}>{c.services.title}</h2>
            </div>
            <p className="max-w-[400px] text-[17px] leading-relaxed text-[#4B5E4F]">{c.services.intro}</p>
          </div>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {c.services.items.map((item, i) => {
              const st = SERVICE_STYLE[i];
              const tag = st.status === "live" ? c.services.live : st.status === "soon" ? c.services.soon : c.services.pilot;
              return (
                <article key={item.title} className="ao-card flex flex-col gap-3.5 rounded-3xl border border-[#E6E8DD] bg-[#F6F5EF] p-7">
                  <span className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl" style={{ background: st.bg, color: st.fg }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px]" aria-hidden="true"><path d={st.icon} /></svg>
                  </span>
                  <h3 className={`${display} text-[21px] font-semibold`}>{item.title}</h3>
                  <p className="text-[15px] leading-relaxed text-[#4B5E4F]">{item.body}</p>
                  <span className={`mt-auto self-start rounded-full px-2.5 py-1 text-xs font-semibold ${st.status === "live" ? "bg-[#2F5D2A] text-white" : "bg-[#E6E8DD] text-[#3B4A3E]"}`}>{tag}</span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SATELLITE ================= */}
      <section id="satellite" className="mx-auto grid max-w-[1240px] scroll-mt-6 grid-cols-1 items-center gap-12 px-6 py-[88px] lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#1A2E20]">
          <svg viewBox="0 0 480 360" aria-hidden="true" className="absolute inset-0 h-full w-full">
            <g opacity="0.9">
              <rect x="0" y="0" width="160" height="120" fill="#24402A" /><rect x="160" y="0" width="160" height="120" fill="#3E6B2E" /><rect x="320" y="0" width="160" height="120" fill="#2C4A2A" />
              <rect x="0" y="120" width="160" height="120" fill="#4F7F33" /><rect x="160" y="120" width="160" height="120" fill="#6FA83C" /><rect x="320" y="120" width="160" height="120" fill="#3A5F2E" />
              <rect x="0" y="240" width="160" height="120" fill="#2F5D2A" /><rect x="160" y="240" width="160" height="120" fill="#557F35" /><rect x="320" y="240" width="160" height="120" fill="#24402A" />
            </g>
            <path d="M150 80 L330 64 L372 176 L300 286 L160 274 L118 170 Z" fill="#B5DB7A" fillOpacity="0.25" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="10 8" strokeLinejoin="round" />
            {[[150, 80], [330, 64], [372, 176], [300, 286], [160, 274], [118, 170]].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#FFFFFF" />
            ))}
          </svg>
          <div className="ao-scan absolute inset-x-0 h-[60px] bg-[linear-gradient(180deg,rgba(181,219,122,0),rgba(181,219,122,0.5),rgba(181,219,122,0))]" />
          <div className="absolute bottom-[18px] left-[18px] right-[18px] flex flex-wrap gap-2.5">
            {[["0.28", c.sat.ndvi], ["35%", c.sat.cover], ["44 t", "CO₂"]].map(([v, l]) => (
              <span key={l} className="rounded-xl bg-[rgba(16,34,26,0.85)] px-3.5 py-2.5 text-[13px] text-white">
                <strong className={`${display} mr-1 text-lg text-[#B5DB7A]`}>{v}</strong>{l}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[18px]">
          <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2F5D2A]">{c.sat.label}</span>
          <h2 className={`${display} text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.1] tracking-tight`}>{c.sat.title}</h2>
          <p className="text-[17px] leading-[1.65] text-[#4B5E4F]">{c.sat.body}</p>
          <ul className="flex flex-col gap-3 text-base">
            {c.sat.points.map((p) => (
              <li key={p} className="flex items-start gap-3"><Check className="mt-0.5 h-[22px] w-[22px]" color="#2F5D2A" />{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-6 pb-[88px]">
        <div className="relative mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[36px] bg-[#2F5D2A] px-[clamp(24px,5vw,72px)] py-[clamp(40px,6vw,80px)] text-white">
          <Sprout ring="#B5DB7A" leaf="#B5DB7A" className="absolute -bottom-[70px] -right-10 h-[360px] w-[360px] opacity-[0.18]" animate />
          <div className="relative flex max-w-[620px] flex-col gap-3.5">
            <h2 className={`${display} text-[clamp(32px,4vw,54px)] font-bold leading-[1.05] tracking-tight`}>{c.final.title}</h2>
            <p className="text-lg leading-relaxed text-[#D5E5CF]">{c.final.body}</p>
          </div>
          <Link href="/login" className="ao-btn relative inline-flex min-h-[60px] items-center gap-2.5 rounded-full bg-white px-8 text-lg font-bold text-[#2F5D2A] shadow-[0_14px_34px_rgba(0,0,0,0.2)] hover:bg-[#F2F8EA]">
            {c.final.cta}
            <Arrow />
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#E2E4D8]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-[#4B5E4F]">
          <span className="flex items-center gap-2.5">
            <Sprout ring="#2F5D2A" leaf="#6FA83C" className="h-[26px] w-[26px]" />
            <span className={`${display} font-bold text-[#14261A]`}>AyaOne</span> · {c.footer.place}
          </span>
          <nav aria-label="Footer" className="flex flex-wrap gap-5">
            <a href="#how" className="hover:text-[#14261A]">{c.nav.how}</a>
            <a href="#services" className="hover:text-[#14261A]">{c.nav.services}</a>
            <a href="/ops/login" className="hover:text-[#14261A]">{c.footer.agent}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
