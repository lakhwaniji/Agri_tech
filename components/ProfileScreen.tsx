"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FarmerShell } from "@/components/FarmerShell";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MapPinIcon, PhoneIcon, HashIcon, FarmGateIcon } from "@/components/icons";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Props = {
  fullName: string;
  phone: string;
  place: string;
  district: string;
  state: string;
  pincode: string;
  memberSince: string | null;
  farmCount: number;
  demo: boolean;
};

function formatPhone(p: string) {
  // +919876543210 -> +91 98765 43210 ; demo placeholders (+910000…) are hidden
  const d = p.replace(/\D/g, "");
  if (d.startsWith("910000")) return "—";
  if (d.length === 12 && d.startsWith("91")) return `+91 ${d.slice(2, 7)} ${d.slice(7)}`;
  return p || "—";
}

export function ProfileScreen(props: Props) {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const initials =
    props.fullName
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "F";
  const location = [props.district, props.state].filter(Boolean).join(", ");
  const since = props.memberSince
    ? new Date(props.memberSince).toLocaleDateString(locale === "en" ? "en-IN" : `${locale}-IN`, { month: "long", year: "numeric" })
    : "—";

  async function logout() {
    setLeaving(true);
    await fetch("/api/logout", { method: "POST" }).catch(() => {});
    router.replace("/login");
    router.refresh();
  }

  const rows = [
    { Icon: PhoneIcon, label: t("profile.phone"), value: formatPhone(props.phone) },
    { Icon: MapPinIcon, label: t("profile.location"), value: props.place || "—" },
    { Icon: HashIcon, label: t("profile.pincode"), value: props.pincode || "—" },
    { Icon: FarmGateIcon, label: t("profile.farms"), value: String(props.farmCount) },
  ];

  return (
    <FarmerShell active="profile" fullName={props.fullName}>
      <div className="ao-stagger mx-auto flex max-w-xl flex-col gap-5 px-4 pb-8 pt-6 lg:pt-10">
        <section className="flex flex-col items-center gap-3 rounded-3xl bg-emerald-900 px-6 py-8 text-center text-white">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-900 ring-4 ring-emerald-700">
            {initials}
          </span>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">{props.fullName || "—"}</h1>
            {location && <p className="text-sm text-emerald-100">{location}</p>}
            <p className="text-xs text-emerald-200">
              {t("profile.memberSince")} {since}
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-2">
          <h2 className="px-3 pb-1 pt-3 text-sm font-semibold text-zinc-500">{t("profile.details")}</h2>
          <ul>
            {rows.map((r) => (
              <li key={r.label} className="flex min-h-14 items-center gap-3 border-b border-zinc-100 px-3 last:border-b-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <r.Icon className="h-4 w-4" />
                </span>
                <span className="flex-1 text-sm text-zinc-600">{r.label}</span>
                <span className="text-right text-sm font-semibold text-zinc-900">{r.value}</span>
              </li>
            ))}
            <li className="flex min-h-14 items-center gap-3 px-3">
              <span className="flex-1 text-sm text-zinc-600">{t("profile.language")}</span>
              <LanguageToggle />
            </li>
          </ul>
        </section>

        {props.demo && (
          <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">{t("profile.demoNote")}</p>
        )}

        <button
          type="button"
          onClick={logout}
          disabled={leaving}
          className="ao-press min-h-12 w-full rounded-full border border-red-200 bg-white font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60"
        >
          {leaving ? t("profile.loggingOut") : t("profile.logout")}
        </button>
      </div>
    </FarmerShell>
  );
}
