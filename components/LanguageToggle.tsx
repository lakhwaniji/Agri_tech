"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { locales } from "@/lib/i18n/translations";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">{t("nav.language")}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as typeof locale)}
        className="min-h-11 rounded-full border border-zinc-300 bg-white px-4 text-base font-medium text-zinc-800 shadow-sm focus:outline-2 focus:outline-offset-2 focus:outline-emerald-600"
        aria-label={t("nav.language")}
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
