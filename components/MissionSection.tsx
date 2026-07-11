"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { Reveal } from "@/components/Reveal";
import { ChipIcon, StorefrontIcon, WalletIcon } from "@/components/icons";

const PILLARS: {
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  Icon: typeof WalletIcon;
}[] = [
  {
    titleKey: "mission.pillar1.title",
    bodyKey: "mission.pillar1.body",
    Icon: WalletIcon,
  },
  {
    titleKey: "mission.pillar2.title",
    bodyKey: "mission.pillar2.body",
    Icon: ChipIcon,
  },
  {
    titleKey: "mission.pillar3.title",
    bodyKey: "mission.pillar3.body",
    Icon: StorefrontIcon,
  },
];

export function MissionSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
        <Reveal>
          <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:items-center">
            <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72 md:h-80">
              <Image
                src="/images/agritech-crop-rows.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="text-center md:text-left">
              <span className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                {t("mission.label")}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-zinc-900 sm:text-3xl">
                {t("mission.heading")}
              </h2>
              <p className="mt-4 text-base text-zinc-600 sm:text-lg">
                {t("mission.body")}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.titleKey} delayMs={index * 80} className="h-full">
              <div className="flex h-full flex-col items-center rounded-xl border border-zinc-100 bg-zinc-50 p-5 text-center sm:items-start sm:text-left">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <pillar.Icon className="h-8 w-8" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-zinc-900 sm:text-lg">
                  {t(pillar.titleKey)}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 sm:text-base">
                  {t(pillar.bodyKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
