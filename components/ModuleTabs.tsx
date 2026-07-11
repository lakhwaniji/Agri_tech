"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";

type TabId = "fintech" | "agritech" | "unified";

type ModuleChip = {
  icon: string;
  labelKey: TranslationKey;
};

const TABS: {
  id: TabId;
  labelKey: TranslationKey;
  headingKey: TranslationKey;
  descriptionKey: TranslationKey;
  modules: ModuleChip[];
  theme: {
    section: string;
    chip: string;
    activeTab: string;
  };
}[] = [
  {
    id: "fintech",
    labelKey: "tabs.fintech",
    headingKey: "fintech.heading",
    descriptionKey: "fintech.description",
    modules: [
      { icon: "💰", labelKey: "modules.wallet" },
      { icon: "📊", labelKey: "modules.loanChecker" },
    ],
    theme: {
      section: "bg-blue-50",
      chip: "bg-white text-blue-800 border-blue-200 hover:bg-blue-100",
      activeTab: "bg-blue-600 text-white",
    },
  },
  {
    id: "agritech",
    labelKey: "tabs.agritech",
    headingKey: "agritech.heading",
    descriptionKey: "agritech.description",
    modules: [
      { icon: "🌱", labelKey: "modules.farmgate" },
      { icon: "🌾", labelKey: "modules.cropAdvisory" },
      { icon: "☀️", labelKey: "modules.weather" },
    ],
    theme: {
      section: "bg-emerald-50",
      chip: "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-100",
      activeTab: "bg-emerald-600 text-white",
    },
  },
  {
    id: "unified",
    labelKey: "tabs.unified",
    headingKey: "unified.heading",
    descriptionKey: "unified.description",
    modules: [{ icon: "🛒", labelKey: "modules.marketplace" }],
    theme: {
      section: "bg-gradient-to-br from-blue-50 to-emerald-50",
      chip: "bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-100",
      activeTab: "bg-zinc-900 text-white",
    },
  },
];

export function ModuleTabs() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<TabId>("fintech");
  const [toast, setToast] = useState<string | null>(null);

  const active = TABS.find((tab) => tab.id === activeId)!;

  function showComingSoon() {
    setToast(t("comingSoon"));
    setTimeout(() => setToast(null), 2500);
  }

  return (
    <section className={`relative transition-colors duration-300 ${active.theme.section}`}>
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
        <div
          role="tablist"
          aria-label="App sections"
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={tab.id === activeId}
              onClick={() => setActiveId(tab.id)}
              className={`min-h-11 rounded-full border border-transparent px-4 text-sm font-semibold transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-zinc-900 sm:px-6 sm:text-base ${
                tab.id === activeId
                  ? tab.theme.activeTab
                  : "bg-white/70 text-zinc-700 hover:bg-white"
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
            {t(active.headingKey)}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-zinc-700 sm:text-lg">
            {t(active.descriptionKey)}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
          {active.modules.map((module) => (
            <button
              key={module.labelKey}
              onClick={showComingSoon}
              className={`flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium shadow-sm transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-zinc-900 sm:px-5 sm:text-base ${active.theme.chip}`}
            >
              <span aria-hidden="true" className="text-xl">
                {module.icon}
              </span>
              {t(module.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit rounded-full bg-zinc-900 px-6 py-3 text-base font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </section>
  );
}
