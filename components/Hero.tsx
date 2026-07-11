"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <Image
        src="/images/hero-wheat-field.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover sm:hidden"
      />
      <Image
        src="/images/hero-farmer.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover sm:block"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20 text-center text-white sm:px-10 md:text-left">
        <div className="md:max-w-xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight drop-shadow-lg sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 text-lg text-zinc-100 drop-shadow sm:text-xl">
            {t("hero.subtitle")}
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-600 px-8 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-emerald-700 focus:outline-2 focus:outline-offset-2 focus:outline-white"
          >
            {t("hero.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
