"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export function FinalCta() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-emerald-700 to-emerald-900">
      <Reveal>
        <div className="mx-auto max-w-3xl px-6 py-16 text-center text-white sm:px-10 sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("cta.heading")}
          </h2>
          <p className="mt-4 text-lg text-emerald-100 sm:text-xl">
            {t("cta.subheading")}
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-lg font-semibold text-emerald-800 shadow-lg transition-colors hover:bg-emerald-50 focus:outline-2 focus:outline-offset-2 focus:outline-white"
          >
            {t("cta.button")}
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
