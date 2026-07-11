"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { Reveal } from "@/components/Reveal";
import {
  CarbonCreditIcon,
  CropHealthIcon,
  DiseaseMonitorIcon,
  FarmManagementIcon,
  MarketplaceIcon,
  QuickLoanIcon,
  ServicesGridIcon,
} from "@/components/icons";

const FEATURES: {
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  Icon: typeof CropHealthIcon;
  tile: string;
}[] = [
  {
    titleKey: "grid.title1",
    bodyKey: "grid.body1",
    Icon: CropHealthIcon,
    tile: "bg-emerald-100 text-emerald-700",
  },
  {
    titleKey: "grid.title2",
    bodyKey: "grid.body2",
    Icon: CarbonCreditIcon,
    tile: "bg-amber-100 text-amber-700",
  },
  {
    titleKey: "grid.title3",
    bodyKey: "grid.body3",
    Icon: QuickLoanIcon,
    tile: "bg-blue-100 text-blue-700",
  },
  {
    titleKey: "grid.title4",
    bodyKey: "grid.body4",
    Icon: MarketplaceIcon,
    tile: "bg-green-100 text-green-700",
  },
  {
    titleKey: "grid.title5",
    bodyKey: "grid.body5",
    Icon: FarmManagementIcon,
    tile: "bg-purple-100 text-purple-700",
  },
  {
    titleKey: "grid.title6",
    bodyKey: "grid.body6",
    Icon: DiseaseMonitorIcon,
    tile: "bg-yellow-100 text-yellow-700",
  },
];

export function FeatureShowcase() {
  const { t } = useLanguage();

  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
        <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
          {t("grid.heading")}
        </h2>

        <Reveal>
          <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-white p-5 shadow-sm sm:mt-10 sm:flex-row sm:gap-5 sm:p-6">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 sm:h-20 sm:w-20">
              <ServicesGridIcon className="h-9 w-9 sm:h-10 sm:w-10" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-zinc-900 sm:text-xl">
                {t("grid.banner.title")}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 sm:text-base">
                {t("grid.banner.body")}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.titleKey} delayMs={index * 70}>
              <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                <div
                  className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl sm:h-20 sm:w-20 ${feature.tile}`}
                >
                  <feature.Icon className="h-9 w-9 sm:h-10 sm:w-10" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 sm:text-xl">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 sm:text-base">
                    {t(feature.bodyKey)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
