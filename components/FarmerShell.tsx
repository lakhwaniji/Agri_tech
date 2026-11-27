"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  CropHealthIcon,
  FarmGateIcon,
  MapPinIcon,
  ServicesGridIcon,
  StorefrontIcon,
  UserIcon,
} from "@/components/icons";
import { ACTIVE_MODULES, SHEET_SECTIONS, type IconComponent } from "@/components/farmer-modules";
import type { TranslationKey } from "@/lib/i18n/translations";

type Section = "home" | "farms" | "advisory" | "market" | "profile" | "carbon" | "wallet";

const ShellContext = createContext<{ openMenu: () => void; comingSoon: (label: string) => void }>({
  openMenu: () => {},
  comingSoon: () => {},
});

// Lets screens inside the shell open the all-services menu or show the
// "coming soon" toast without each keeping its own copy.
export function useFarmerShell() {
  return useContext(ShellContext);
}

const SIDEBAR_LINKS: { id: Section; href: string; labelKey: TranslationKey; Icon: IconComponent }[] = [
  { id: "home", href: "/home", labelKey: "home.navHome", Icon: FarmGateIcon },
  { id: "farms", href: "/farmgate", labelKey: "home.myFarms", Icon: MapPinIcon },
  { id: "advisory", href: "/crop-advisory", labelKey: "modules.cropAdvisory", Icon: CropHealthIcon },
  { id: "market", href: "/marketplace", labelKey: "modules.marketplace", Icon: StorefrontIcon },
];

// The farmer app frame. Desktop (lg and up): a fixed left sidebar with the
// main sections, an "All services" button, language and profile. Phones and
// tablets: a bottom bar with a raised centre button that opens the same
// all-services menu. Content goes in `children`.
export function FarmerShell({
  active,
  fullName,
  children,
}: {
  active: Section;
  fullName: string;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function comingSoon(label: string) {
    setToast(`${label} — ${t("home.comingSoon")}`);
    setTimeout(() => setToast(null), 2000);
  }

  const tileClass =
    "ao-tile flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white p-3 text-center";

  return (
    <ShellContext.Provider value={{ openMenu: () => setMenuOpen(true), comingSoon }}>
      <div className="min-h-screen bg-zinc-100">
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-zinc-200 bg-white px-4 py-5 lg:flex">
          <Link href="/home" className="px-2">
            <Logo className="h-8 w-auto" />
          </Link>
          <nav aria-label="Main" className="mt-8 flex flex-col gap-1">
            {SIDEBAR_LINKS.map((l) => (
              <Link
                key={l.id}
                href={l.href}
                aria-current={active === l.id ? "page" : undefined}
                className={`ao-nav flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${
                  active === l.id ? "bg-emerald-50 text-emerald-800" : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <l.Icon className="h-5 w-5" />
                {t(l.labelKey)}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              <ServicesGridIcon className="h-5 w-5" />
              {t("home.allServices")}
            </button>
          </nav>
          <div className="mt-auto flex flex-col gap-3 border-t border-zinc-200 pt-4">
            <LanguageToggle />
            <Link
              href="/profile"
              aria-current={active === "profile" ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-xl px-2 text-left hover:bg-zinc-100 ${active === "profile" ? "bg-emerald-50" : ""}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">
                {fullName.trim().charAt(0).toUpperCase() || "F"}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-zinc-900">{fullName}</span>
                <span className="block text-xs text-zinc-600">{t("home.navProfile")}</span>
              </span>
            </Link>
          </div>
        </aside>

        <div className="ao-page pb-28 lg:pb-10 lg:pl-64">{children}</div>

        {/* Phone / tablet bottom bar with centre menu button */}
        <nav
          aria-label="Main"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
        >
          <div className="mx-auto grid max-w-md grid-cols-5 items-end px-2 pb-2 pt-1.5">
            {[
              { id: "home", href: "/home", labelKey: "home.navHome" as TranslationKey, Icon: FarmGateIcon },
              { id: "farms", href: "/farmgate", labelKey: "home.navFarms" as TranslationKey, Icon: MapPinIcon },
            ].map((l) => (
              <Link
                key={l.id}
                href={l.href}
                aria-current={active === l.id ? "page" : undefined}
                className={`ao-nav flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
                  active === l.id ? "font-semibold text-emerald-700" : "text-zinc-600"
                }`}
              >
                <l.Icon className="h-5 w-5" />
                {t(l.labelKey)}
              </Link>
            ))}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t("home.allServices")}
                aria-expanded={menuOpen}
                className="ao-pulse-ring ao-press -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-700/40 ring-4 ring-white transition-transform hover:rotate-90 hover:bg-emerald-800"
              >
                <ServicesGridIcon className="h-7 w-7" />
              </button>
            </div>
            <Link
              href="/marketplace"
              className={`ao-nav flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
                active === "market" ? "font-semibold text-emerald-700" : "text-zinc-600"
              }`}
            >
              <StorefrontIcon className="h-5 w-5" />
              {t("modules.marketplace")}
            </Link>
            <Link
              href="/profile"
              aria-current={active === "profile" ? "page" : undefined}
              className={`ao-nav flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
                active === "profile" ? "font-semibold text-emerald-700" : "text-zinc-600"
              }`}
            >
              <UserIcon className="h-5 w-5" />
              {t("home.navProfile")}
            </Link>
          </div>
        </nav>

        {/* All-services menu: bottom sheet on phones, centred dialog on desktop */}
        {menuOpen && (
          <div
            className="ao-backdrop fixed inset-0 z-50 flex items-end bg-black/40 sm:items-center sm:justify-center sm:p-6"
            onClick={() => setMenuOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t("home.allServices")}
              className="ao-sheet max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-zinc-50 p-5 sm:max-w-2xl sm:rounded-3xl sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-zinc-300 sm:hidden" />
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900">{t("home.allServices")}</h2>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="min-h-11 px-2 text-sm font-medium text-zinc-600"
                >
                  {t("home.close")}
                </button>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {ACTIVE_MODULES.map((m) => {
                  const inner = (
                    <>
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${m.tile}`}>
                        <m.Icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-medium text-zinc-800">{t(m.labelKey)}</span>
                    </>
                  );
                  return m.href ? (
                    <Link key={m.labelKey} href={m.href} onClick={() => setMenuOpen(false)} className={tileClass}>
                      {inner}
                    </Link>
                  ) : (
                    <button key={m.labelKey} type="button" onClick={() => comingSoon(t(m.labelKey))} className={tileClass}>
                      {inner}
                    </button>
                  );
                })}
              </div>
              {SHEET_SECTIONS.map((section) => (
                <section key={section.title} className="mt-5">
                  <h3 className="text-sm font-semibold text-zinc-700">{section.title}</h3>
                  <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {section.modules.map((mod) => {
                      const cls = "flex min-h-20 flex-col items-center justify-start gap-1.5 rounded-xl p-1.5 text-center hover:bg-zinc-100 active:bg-zinc-100";
                      const inner = (
                        <>
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${section.tile}`}>
                            <mod.Icon className="h-6 w-6" />
                          </div>
                          <span className="text-[11px] font-medium leading-tight text-zinc-700">{mod.label}</span>
                        </>
                      );
                      // Modules with a page open it; the rest still show "coming soon".
                      return mod.href ? (
                        <Link key={`${section.title}-${mod.label}`} href={mod.href} onClick={() => setMenuOpen(false)} className={`${cls} ring-1 ring-emerald-200`}>
                          {inner}
                        </Link>
                      ) : (
                        <button key={`${section.title}-${mod.label}`} type="button" onClick={() => comingSoon(mod.label)} className={cls}>
                          {inner}
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {toast && (
          <div
            role="status"
            className="fixed inset-x-0 bottom-24 z-[60] mx-auto w-fit rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg lg:bottom-8 lg:left-64"
          >
            {toast}
          </div>
        )}
      </div>
    </ShellContext.Provider>
  );
}
