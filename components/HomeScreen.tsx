"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import {
  BasketIcon,
  CarbonCreditIcon,
  CloudIcon,
  CropHealthIcon,
  CropInsuranceIcon,
  CropLoanIcon,
  DroneIcon,
  ExpertIcon,
  FarmGateIcon,
  FingerprintIcon,
  GovernmentIcon,
  GraduationIcon,
  GroupIcon,
  HealthInsuranceIcon,
  IrrigationIcon,
  MapPinIcon,
  MarketplaceIcon,
  MoneyTransferIcon,
  NewsIcon,
  PriceTagIcon,
  QuickLoanIcon,
  RadioIcon,
  RainIcon,
  ReceiptIcon,
  SatelliteIcon,
  ShoppingBagIcon,
  SoilIcon,
  SolarPanelIcon,
  StorefrontIcon,
  SunIcon,
  TractorIcon,
  TruckIcon,
  UserIcon,
  WalletIcon,
  WarehouseIcon,
  WeatherIcon,
  WrenchIcon,
  FarmManagementIcon,
} from "@/components/icons";
import type { WeatherInfo } from "@/lib/weather";

type IconComponent = typeof FarmGateIcon;
type Tab = "quick" | "fintech" | "agritech" | "services";

const ACTIVE_MODULES: {
  labelKey: TranslationKey;
  Icon: IconComponent;
  tile: string;
  href?: string;
}[] = [
  { labelKey: "modules.farmgate",     Icon: FarmGateIcon,   tile: "bg-emerald-100 text-emerald-700", href: "/farmgate" },
  { labelKey: "modules.cropAdvisory", Icon: CropHealthIcon,  tile: "bg-lime-100 text-lime-700",       href: "/crop-advisory" },
  { labelKey: "modules.marketplace",  Icon: MarketplaceIcon, tile: "bg-amber-100 text-amber-700" },
  { labelKey: "modules.wallet",       Icon: WalletIcon,      tile: "bg-blue-100 text-blue-700" },
  { labelKey: "modules.weather",      Icon: WeatherIcon,     tile: "bg-sky-100 text-sky-700" },
  { labelKey: "modules.loanChecker",  Icon: QuickLoanIcon,   tile: "bg-purple-100 text-purple-700" },
];

const FINTECH_MODULES: { label: string; Icon: IconComponent }[] = [
  { label: "Crop Loan",         Icon: CropLoanIcon },
  { label: "Tractor Loan",      Icon: TractorIcon },
  { label: "Equipment Loan",    Icon: WrenchIcon },
  { label: "Solar Loan",        Icon: SolarPanelIcon },
  { label: "Education Loan",    Icon: GraduationIcon },
  { label: "Aadhaar Pay",       Icon: FingerprintIcon },
  { label: "Bill Payments",     Icon: ReceiptIcon },
  { label: "Crop Insurance",    Icon: CropInsuranceIcon },
  { label: "Health Insurance",  Icon: HealthInsuranceIcon },
  { label: "Money Transfer",    Icon: MoneyTransferIcon },
];

const AGRITECH_MODULES: { label: string; Icon: IconComponent }[] = [
  { label: "Soil Health",       Icon: SoilIcon },
  { label: "Farm Mapping",      Icon: MapPinIcon },
  { label: "Drone Services",    Icon: DroneIcon },
  { label: "Irrigation Mgmt",  Icon: IrrigationIcon },
  { label: "Yield Prediction",  Icon: FarmManagementIcon },
  { label: "Mandi Prices",      Icon: PriceTagIcon },
  { label: "Satellite Monitor", Icon: SatelliteIcon },
  { label: "Expert Connect",    Icon: ExpertIcon },
  { label: "FPO Connect",       Icon: GroupIcon },
  { label: "PM-KISAN",          Icon: GovernmentIcon },
  { label: "Carbon Credits",    Icon: CarbonCreditIcon },
  { label: "Agri News",         Icon: NewsIcon },
];

const SERVICES_MODULES: { label: string; Icon: IconComponent }[] = [
  { label: "Tractor Rental",   Icon: TractorIcon },
  { label: "Drone Rental",     Icon: DroneIcon },
  { label: "Equipment Rental", Icon: WrenchIcon },
  { label: "Input Shop",       Icon: ShoppingBagIcon },
  { label: "Produce Selling",  Icon: BasketIcon },
  { label: "Agri Radio",       Icon: RadioIcon },
  { label: "Warehouse",        Icon: WarehouseIcon },
  { label: "Transport",        Icon: TruckIcon },
];

const TABS: { id: Tab; label: string }[] = [
  { id: "quick",    label: "Quick Access" },
  { id: "fintech",  label: "Fintech" },
  { id: "agritech", label: "Agritech" },
  { id: "services", label: "Services" },
];

const NAV_ITEMS: { labelKey: TranslationKey; Icon: IconComponent }[] = [
  { labelKey: "home.navHome",        Icon: FarmGateIcon },
  { labelKey: "modules.marketplace", Icon: StorefrontIcon },
  { labelKey: "modules.wallet",      Icon: WalletIcon },
  { labelKey: "home.navProfile",     Icon: UserIcon },
];

const WEATHER_ICONS = { sun: SunIcon, cloud: CloudIcon, rain: RainIcon };

export function HomeScreen({
  fullName,
  weather,
  time,
}: {
  fullName: string;
  weather: WeatherInfo | null;
  time: string;
}) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("quick");
  const [toast, setToast] = useState<string | null>(null);

  function showComingSoon(label: string) {
    setToast(`${label} — ${t("home.comingSoon")}`);
    setTimeout(() => setToast(null), 2000);
  }

  const WeatherGlyph = weather ? WEATHER_ICONS[weather.icon] : CloudIcon;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 pb-36">
      <header className="flex items-center justify-between px-6 py-4">
        <Logo className="h-7 w-auto" />
        <LanguageToggle />
      </header>

      {/* Greeting + weather card */}
      <div className="px-6">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">{t("home.welcomeBack")}</p>
          <h1 className="text-2xl font-bold text-zinc-900">
            {t("home.greeting")} {fullName}
          </h1>
          <div className="mt-4 flex items-center gap-3 border-t border-zinc-100 pt-4">
            <WeatherGlyph className="h-9 w-9 text-zinc-800" />
            <div>
              {weather ? (
                <>
                  <p className="text-lg font-semibold text-zinc-900">
                    {weather.temp}°C
                    <span className="ml-1 font-normal capitalize text-zinc-500">
                      {weather.condition}
                    </span>
                  </p>
                  <p className="flex items-center gap-1 text-sm text-zinc-500">
                    <MapPinIcon className="h-3.5 w-3.5" />
                    {weather.locationName} · {time}
                  </p>
                </>
              ) : (
                <p className="text-sm text-zinc-500">{t("home.weatherUnavailable")}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Module grid — switches based on active tab */}
      <div className="mt-6 px-6">
        {/* Quick Access */}
        {activeTab === "quick" && (
          <div className="grid grid-cols-3 gap-4">
            {ACTIVE_MODULES.map((module) => {
              const inner = (
                <>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${module.tile}`}>
                    <module.Icon className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-medium text-zinc-700">{t(module.labelKey)}</span>
                </>
              );
              return module.href ? (
                <Link
                  key={module.labelKey}
                  href={module.href}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-sm active:scale-95"
                >
                  {inner}
                </Link>
              ) : (
                <button
                  key={module.labelKey}
                  onClick={() => showComingSoon(t(module.labelKey))}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-sm active:scale-95"
                >
                  {inner}
                </button>
              );
            })}
          </div>
        )}

        {/* Fintech */}
        {activeTab === "fintech" && (
          <div className="grid grid-cols-3 gap-4">
            {FINTECH_MODULES.map((mod) => (
              <button
                key={mod.label}
                onClick={() => showComingSoon(mod.label)}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-sm active:scale-95"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <mod.Icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-medium text-zinc-600">{mod.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Agritech */}
        {activeTab === "agritech" && (
          <div className="grid grid-cols-3 gap-4">
            {AGRITECH_MODULES.map((mod) => (
              <button
                key={mod.label}
                onClick={() => showComingSoon(mod.label)}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-sm active:scale-95"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <mod.Icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-medium text-zinc-600">{mod.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Services */}
        {activeTab === "services" && (
          <div className="grid grid-cols-3 gap-4">
            {SERVICES_MODULES.map((mod) => (
              <button
                key={mod.label}
                onClick={() => showComingSoon(mod.label)}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-sm active:scale-95"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <mod.Icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-medium text-zinc-600">{mod.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab switcher — sits above bottom nav */}
      <div className="fixed inset-x-0 bottom-14 z-40 px-4 pb-2">
        <div className="flex gap-2 rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-zinc-200">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 flex items-center justify-around border-t border-zinc-200 bg-white py-2">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.labelKey}
            onClick={() => i !== 0 && showComingSoon(t(item.labelKey))}
            className={`flex flex-col items-center gap-1 px-4 py-1 text-xs font-medium ${
              i === 0 ? "text-emerald-700" : "text-zinc-500"
            }`}
          >
            <item.Icon className="h-5 w-5" />
            {t(item.labelKey)}
          </button>
        ))}
      </nav>

      {toast && (
        <div
          role="status"
          className="fixed inset-x-0 bottom-28 z-50 mx-auto w-fit rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
