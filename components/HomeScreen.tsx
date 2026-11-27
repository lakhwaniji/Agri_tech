"use client";

import Link from "next/link";
import { LanguageToggle } from "@/components/LanguageToggle";
import { FarmerShell, useFarmerShell } from "@/components/FarmerShell";
import { ACTIVE_MODULES } from "@/components/farmer-modules";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import {
  ArrowRightIcon,
  ClockIcon,
  CloudIcon,
  CropHealthIcon,
  MapPinIcon,
  PlusIcon,
  RainIcon,
  ServicesGridIcon,
  SunIcon,
} from "@/components/icons";
import type { WeatherInfo } from "@/lib/weather";
import { inr, PER_CREDIT_TO_FARMER, useCarbonDemo } from "@/lib/carbon-demo";

const SLOT_KEYS: Record<string, TranslationKey> = {
  morning: "farmgate.timeMorning",
  afternoon: "farmgate.timeAfternoon",
  evening: "farmgate.timeEvening",
};

const WEATHER_ICONS = { sun: SunIcon, cloud: CloudIcon, rain: RainIcon };

function formatNumber(n: number, digits: number) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

type HomeProps = {
  fullName: string;
  weather: WeatherInfo | null;
  time: string;
  farmCount: number;
  totalHa: number;
  totalCo2: number;
  upcoming: { farm: string; date: string; slot: string } | null;
  pick: { name: string; price: string } | null;
  userKey: string;
};

export function HomeScreen(props: HomeProps) {
  return (
    <FarmerShell active="home" fullName={props.fullName}>
      <HomeContent {...props} />
    </FarmerShell>
  );
}

function HomeContent({ fullName, weather, time, farmCount, totalHa, totalCo2, upcoming, pick, userKey }: HomeProps) {
  const { t } = useLanguage();
  const { openMenu, comingSoon } = useFarmerShell();
  const WeatherGlyph = weather ? WEATHER_ICONS[weather.icon] : CloudIcon;

  const tileClass =
    "ao-tile flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white p-3 text-center lg:min-h-28";

  return (
    <>
      {/* Green header: greeting, language (phones only — desktop has it in the sidebar), weather */}
      <div className="rounded-b-[28px] bg-emerald-900 px-5 pb-20 pt-5 text-white lg:rounded-none lg:px-10 lg:pb-24 lg:pt-10">
        <div className="mx-auto flex max-w-md flex-col gap-5 lg:max-w-6xl lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-emerald-200">{t("home.welcomeBack")}</p>
              <h1 className="text-2xl font-semibold lg:text-4xl">
                {t("home.greeting")} {fullName}
              </h1>
            </div>
            <div className="rounded-full bg-white text-zinc-900 lg:hidden">
              <LanguageToggle />
            </div>
          </div>
          <div className="ao-lift flex items-center justify-between gap-6 rounded-2xl bg-emerald-800 p-4 lg:min-w-96">
            <div className="flex items-center gap-3">
              <WeatherGlyph className="h-9 w-9 text-amber-200" />
              {weather ? (
                <div>
                  <p className="text-2xl font-semibold leading-tight">{weather.temp}°C</p>
                  <p className="text-sm capitalize text-emerald-100">{weather.condition}</p>
                </div>
              ) : (
                <p className="text-sm text-emerald-100">{t("home.weatherUnavailable")}</p>
              )}
            </div>
            {weather && (
              <p className="flex max-w-[50%] items-center gap-1 text-right text-sm text-emerald-100">
                <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {weather.locationName} · {time}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md px-4 lg:max-w-6xl lg:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left / main column */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* My farms summary, overlapping the header */}
            <div className="ao-page -mt-14 rounded-3xl bg-white p-4 shadow-lg shadow-emerald-900/10 lg:-mt-16 lg:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-zinc-900 lg:text-lg">{t("home.myFarms")}</h2>
                <Link href="/farmgate" className="flex min-h-11 items-center text-sm font-medium text-emerald-700">
                  {t("home.seeAll")}
                </Link>
              </div>
              {farmCount > 0 ? (
                <div className="grid grid-cols-3 gap-2 text-center lg:mt-2 lg:text-left">
                  <div className="lg:rounded-2xl lg:bg-zinc-50 lg:p-4">
                    <p className="text-xl font-semibold text-zinc-900 lg:text-3xl">{farmCount}</p>
                    <p className="text-xs text-zinc-600 lg:text-sm">{t("home.farms")}</p>
                  </div>
                  <div className="lg:rounded-2xl lg:bg-zinc-50 lg:p-4">
                    <p className="text-xl font-semibold text-zinc-900 lg:text-3xl">{totalHa > 0 ? formatNumber(totalHa, 2) : "—"}</p>
                    <p className="text-xs text-zinc-600 lg:text-sm">{t("home.hectares")}</p>
                  </div>
                  <div className="lg:rounded-2xl lg:bg-emerald-50 lg:p-4">
                    <p className="text-xl font-semibold text-emerald-700 lg:text-3xl">
                      {totalCo2 > 0 ? `${formatNumber(totalCo2, 1)} t` : "—"}
                    </p>
                    <p className="text-xs text-zinc-600 lg:text-sm">{t("home.co2PerYear")}</p>
                  </div>
                </div>
              ) : (
                <Link href="/farmgate" className="flex min-h-11 items-center gap-2 text-sm font-medium text-emerald-700">
                  <PlusIcon className="h-4 w-4" />
                  {t("home.noFarmsYet")}
                </Link>
              )}
              {upcoming && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
                  <ClockIcon className="h-4 w-4 shrink-0 text-amber-700" />
                  <span>
                    {t("home.upcomingVisit")} · {upcoming.farm} · {upcoming.date},{" "}
                    {t(SLOT_KEYS[upcoming.slot] ?? "farmgate.timeMorning")}
                  </span>
                </div>
              )}
            </div>

            {/* Carbon credits (new) */}
            <CarbonCard userKey={userKey} />

            {/* Services */}
            <section>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-zinc-900 lg:text-lg">{t("home.services")}</h2>
                <button
                  type="button"
                  onClick={openMenu}
                  className="hidden min-h-11 items-center gap-1.5 text-sm font-medium text-emerald-700 lg:flex"
                >
                  <ServicesGridIcon className="h-4 w-4" />
                  {t("home.allServices")}
                </button>
              </div>
              <div className="ao-stagger mt-3 grid grid-cols-3 gap-3 lg:gap-4">
                {ACTIVE_MODULES.map((m) => {
                  const inner = (
                    <>
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl lg:h-12 lg:w-12 ${m.tile}`}>
                        <m.Icon className="h-6 w-6 lg:h-7 lg:w-7" />
                      </div>
                      <span className="text-xs font-medium text-zinc-800 lg:text-sm">{t(m.labelKey)}</span>
                    </>
                  );
                  return m.href ? (
                    <Link key={m.labelKey} href={m.href} className={tileClass}>
                      {inner}
                    </Link>
                  ) : (
                    <button key={m.labelKey} type="button" onClick={() => comingSoon(t(m.labelKey))} className={tileClass}>
                      {inner}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={openMenu}
                className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-300 text-sm font-medium text-zinc-700 lg:hidden"
              >
                <ServicesGridIcon className="h-5 w-5" />
                {t("home.allServices")}
              </button>
            </section>
          </div>

          {/* Right column on desktop: today for your farm */}
          <section className="lg:pt-2">
            <h2 className="text-base font-semibold text-zinc-900 lg:text-lg">{t("home.todayForFarm")}</h2>
            <div className="ao-stagger mt-3 flex flex-col gap-3">
              <Link
                href="/crop-advisory"
                className="ao-lift flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-100 text-lime-700">
                    <CropHealthIcon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-zinc-900">{t("home.askAdvisor")}</p>
                </div>
                <ArrowRightIcon className="h-5 w-5 shrink-0 text-zinc-400" />
              </Link>
              {pick && (
                <div className="ao-lift flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">★ {t("home.ourPick")}</p>
                    <p className="mt-1 text-sm font-medium text-zinc-900">{pick.name}</p>
                    <p className="text-sm text-zinc-600">{pick.price}</p>
                  </div>
                  <Link
                    href="/marketplace"
                    className="flex min-h-11 items-center rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    {t("home.view")}
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// New: carbon credits entry point on Home. Before joining it invites the
// farmer in; after joining it shows credits ready to sell.
function CarbonCard({ userKey }: { userKey: string }) {
  const { state, ready, available } = useCarbonDemo(userKey);
  if (!ready) return null;
  return (
    <Link href="/carbon" className="ao-lift flex items-center justify-between gap-4 rounded-3xl border border-emerald-300 bg-white p-4 lg:p-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-zinc-900 lg:text-lg">Carbon credits</h2>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">New</span>
        </div>
        <p className="mt-1 text-sm text-zinc-600">
          {state.joined
            ? `${available} credits ready to sell · ≈ ₹${inr(available * PER_CREDIT_TO_FARMER)} for you`
            : "Get paid for greener farming. See how it works."}
        </p>
      </div>
      <span className="ao-pulse-ring flex h-11 min-w-11 items-center justify-center rounded-full bg-emerald-700 px-4 text-sm font-semibold text-white">
        {state.joined ? "Open" : "Start"}
      </span>
    </Link>
  );
}
