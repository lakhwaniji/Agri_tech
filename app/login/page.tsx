"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Logo } from "@/components/Logo";
import {
  CheckCircleIcon,
  HashIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@/components/icons";

// Which screen is currently showing. This is the whole "single page, not two
// pages" flow we designed: phone -> otp -> (register, only if new) -> done.
type Step = "phone" | "otp" | "register" | "done";

const STEP_INDEX: Record<Step, number> = {
  phone: 0,
  otp: 1,
  register: 2,
  done: 3,
};

export default function LoginPage() {
  // One Supabase client for this component. It talks to Supabase using the
  // public anon key, so every query below is automatically restricted by
  // Row Level Security to "only this logged-in user's own row" — there's no
  // way for this code to accidentally read/write someone else's data.
  const supabase = createClient();
  const router = useRouter();
  const { t } = useLanguage();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<
    "idle" | "loading" | "found" | "not-found"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // As soon as the pincode reaches 6 digits, ask our own API route to
  // resolve it to a district/state — the farmer never has to type those.
  useEffect(() => {
    // Don't reset state here for an incomplete pincode — the JSX below only
    // shows the result box when pincode.length === 6, so a stale status from
    // a previous 6-digit entry simply stays hidden until this effect re-fires.
    if (pincode.length !== 6) return;

    let cancelled = false;
    // Deferred via queueMicrotask so this isn't a synchronous setState call
    // directly in the effect body (the lint rule wants async-triggered state
    // updates only) — behavior is identical, it just fires a tick later.
    queueMicrotask(() => {
      if (!cancelled) setPincodeStatus("loading");
    });

    fetch(`/api/pincode-lookup?pincode=${pincode}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.district && data.state) {
          setDistrict(data.district);
          setState(data.state);
          setPincodeStatus("found");
        } else {
          setPincodeStatus("not-found");
        }
      })
      .catch(() => {
        if (!cancelled) setPincodeStatus("not-found");
      });

    return () => {
      cancelled = true;
    };
  }, [pincode]);

  // Step 1: user submits their phone number.
  // signInWithOtp is the SAME call whether this phone number is brand new or
  // has logged in 100 times before — Supabase decides internally whether to
  // create a new auth.users row or reuse the existing one. We never need to
  // know or check which case it is at this point.
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^\d{10}$/.test(phone)) {
      setError(t("login.phoneError"));
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone: `+91${phone}`,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    setStep("otp");
  }

  // Step 2: user submits the 6-digit code they received.
  // If this succeeds, Supabase has now created a session (and, if this phone
  // is brand new, the database trigger has already created a bare farmers
  // row in the background — see supabase/001_farmers_table.sql).
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^\d{6}$/.test(otp)) {
      setError(t("login.otpError"));
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      phone: `+91${phone}`,
      token: otp,
      type: "sms",
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    // This is the branch point: we check our OWN farmers table to find out
    // if this is a first-time user (full_name still NULL, since the trigger
    // only ever inserts id + phone_number) or a returning one.
    const userId = data.user?.id;
    const { data: farmer, error: farmerError } = await supabase
      .from("farmers")
      .select("full_name")
      .eq("id", userId)
      .single();
    setLoading(false);

    if (farmerError) {
      setError(farmerError.message);
      return;
    }

    if (!farmer.full_name) {
      // First time -> row exists (trigger made it) but is still empty.
      setStep("register");
    } else {
      // Returning user -> already has a name on file, skip straight in.
      setStep("done");
      router.push("/home");
    }
  }

  // Step 3 (first-time users only): fill in the basic profile.
  // This is an UPDATE, not an INSERT, because the trigger already created
  // this row the moment the account was created. RLS allows this update
  // because auth.uid() (from the user's own session) matches this row's id.
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      !fullName.trim() ||
      !address.trim() ||
      pincodeStatus !== "found"
    ) {
      setError(t("login.registerError"));
      return;
    }

    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("farmers")
      .update({
        full_name: fullName.trim(),
        place: address.trim(),
        pincode,
        district,
        state,
      })
      .eq("id", userData.user?.id);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    setStep("done");
    router.push("/home");
  }

  const inputClass =
    "min-h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-11 pr-3 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-6 py-12">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl shadow-emerald-900/5 sm:p-10">
        <div className="flex justify-center">
          <Logo className="h-8 w-auto" />
        </div>

        {/* Step progress dots */}
        {step !== "done" && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {(["phone", "otp", "register"] as Step[]).map((s) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  STEP_INDEX[s] === STEP_INDEX[step]
                    ? "w-8 bg-emerald-600"
                    : STEP_INDEX[s] < STEP_INDEX[step]
                      ? "w-4 bg-emerald-300"
                      : "w-4 bg-zinc-200"
                }`}
              />
            ))}
          </div>
        )}

        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="mt-7 space-y-4">
            <div className="text-center">
              <h1 className="text-xl font-bold text-zinc-900">
                {t("login.heading")}
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                {t("login.subtitle")}
              </p>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                {t("login.phoneLabel")}
              </span>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400">
                  <PhoneIcon className="h-4 w-4" />
                </span>
                <span className="absolute inset-y-0 left-9 flex items-center text-sm text-zinc-500">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  className={`${inputClass} pl-16`}
                  placeholder="98765 43210"
                />
              </div>
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="min-h-12 w-full rounded-full bg-emerald-600 font-semibold text-white shadow-sm shadow-emerald-600/30 transition-colors hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? t("login.sending") : t("login.sendOtp")}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="mt-7 space-y-4">
            <div className="text-center">
              <h1 className="text-xl font-bold text-zinc-900">
                {t("login.otpHeading")}
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                {t("login.otpSubtitle")} +91 {phone}
              </p>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400">
                <ShieldCheckIcon className="h-4 w-4" />
              </span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className={`${inputClass} text-center tracking-[0.3em]`}
                placeholder="••••••"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="min-h-12 w-full rounded-full bg-emerald-600 font-semibold text-white shadow-sm shadow-emerald-600/30 transition-colors hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? t("login.verifying") : t("login.verify")}
            </button>
          </form>
        )}

        {step === "register" && (
          <form onSubmit={handleRegister} className="mt-7 space-y-4">
            <div className="text-center">
              <h1 className="text-xl font-bold text-zinc-900">
                {t("login.registerHeading")}
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                {t("login.registerSubtitle")}
              </p>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                {t("login.fullNameLabel")}
              </span>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400">
                  <UserIcon className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClass}
                  placeholder={t("login.fullNamePlaceholder")}
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                {t("login.addressLabel")}
              </span>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400">
                  <MapPinIcon className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClass}
                  placeholder={t("login.addressPlaceholder")}
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                {t("login.pincodeLabel")}
              </span>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400">
                  <HashIcon className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) =>
                    setPincode(e.target.value.replace(/\D/g, ""))
                  }
                  className={inputClass}
                  placeholder="6-digit pincode"
                />
              </div>
            </label>

            {/* Auto-filled, read-only — this is the payoff of the pincode lookup */}
            {pincode.length === 6 && pincodeStatus !== "idle" && (
              <div className="rounded-xl bg-zinc-50 px-4 py-3 text-sm">
                {pincodeStatus === "loading" && (
                  <span className="text-zinc-500">
                    {t("login.pincodeLoading")}
                  </span>
                )}
                {pincodeStatus === "found" && (
                  <span className="text-zinc-700">
                    <span className="font-medium text-emerald-700">
                      {district}, {state}
                    </span>{" "}
                    — {t("login.pincodeFoundSuffix")}
                  </span>
                )}
                {pincodeStatus === "not-found" && (
                  <span className="text-red-600">
                    {t("login.pincodeNotFound")}
                  </span>
                )}
              </div>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="min-h-12 w-full rounded-full bg-emerald-600 font-semibold text-white shadow-sm shadow-emerald-600/30 transition-colors hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? t("login.saving") : t("login.continue")}
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="mt-6 flex flex-col items-center text-center">
            <CheckCircleIcon className="h-14 w-14 text-emerald-600" />
            <h1 className="mt-4 text-xl font-bold text-zinc-900">
              {t("login.doneHeading")}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {t("login.doneSubtitle")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
