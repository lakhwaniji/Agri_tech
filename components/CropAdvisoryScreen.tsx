"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { CameraIcon, ArrowRightIcon, MapPinIcon } from "@/components/icons";
import { FarmerShell } from "@/components/FarmerShell";
import { SeedIcon, FertilizerIcon, PesticideIcon, EquipmentIcon } from "@/components/marketplace-icons";
import type { Season } from "@/lib/mocked/crop-suggestions";
import type { AdvisoryRule } from "@/lib/mocked/crop-advisory-rules";
import type { MarketplaceItem } from "@/lib/mocked/crop-marketplace-items";

const CATEGORY_VISUALS: Record<MarketplaceItem["category"], { Icon: typeof SeedIcon; bg: string }> = {
  seed: { Icon: SeedIcon, bg: "bg-lime-50" },
  fertilizer: { Icon: FertilizerIcon, bg: "bg-amber-50" },
  pesticide: { Icon: PesticideIcon, bg: "bg-sky-50" },
  equipment: { Icon: EquipmentIcon, bg: "bg-zinc-100" },
};

type Farm = {
  id: string;
  label: string | null;
  visit_address: string;
  crop_type: string | null;
};

type Step =
  | "farmSelect"
  | "mainMenu"
  | "loadingSuggestions"
  | "suggestions"
  | "savingCrop"
  | "advisory"
  | "healthUpload"
  | "healthAnalysing"
  | "healthResult";

type SuggestionItem = { name: string; emoji: string; reason: string };
type DiagnosisResult = { label: string; confidence: number; recommendedAction: string };
type ChatMessage = { from: "bot" | "user"; text: string };

async function compressImage(file: File, maxKb = 500): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      const MAX = 1200;
      if (width > MAX || height > MAX) {
        const r = Math.min(MAX / width, MAX / height);
        width = Math.round(width * r);
        height = Math.round(height * r);
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      let q = 0.85;
      const go = () =>
        canvas.toBlob(
          (blob) => {
            if (!blob) { resolve(file); return; }
            if (blob.size <= maxKb * 1024 || q <= 0.4)
              resolve(new File([blob], file.name, { type: "image/jpeg" }));
            else { q -= 0.1; go(); }
          },
          "image/jpeg", q,
        );
      go();
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

export function CropAdvisoryScreen({
  fullName,
  farms,
}: {
  fullName: string;
  farms: Farm[];
}) {
  const { t } = useLanguage();

  const [step, setStep] = useState<Step>("farmSelect");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "bot", text: t("cropAdvisory.whichFarm") },
  ]);

  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [cropType, setCropType] = useState<string | null>(null);
  const [advisory, setAdvisory] = useState<AdvisoryRule | null>(null);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  function push(...msgs: ChatMessage[]) {
    setMessages((prev) => [...prev, ...msgs]);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

  function handleFarmSelect(farm: Farm) {
    setSelectedFarm(farm);
    setCropType(farm.crop_type ?? null);
    push(
      { from: "user", text: farm.label ?? farm.visit_address },
      { from: "bot", text: t("cropAdvisory.whatHelp") },
    );
    setStep("mainMenu");
  }

  async function handleOptionSelect(option: "suggestions" | "health") {
    if (!selectedFarm) return;

    const labelKey: TranslationKey =
      option === "suggestions" ? "cropAdvisory.optionSuggestions" : "cropAdvisory.optionHealth";
    push({ from: "user", text: t(labelKey) });

    if (option === "health") {
      push({ from: "bot", text: t("cropAdvisory.health.uploadPrompt") });
      setStep("healthUpload");
      return;
    }

    // If a crop is already saved for this farm, skip suggestions and show advisory.
    if (cropType) {
      await loadAdvisory(selectedFarm.id, cropType);
      return;
    }

    setStep("loadingSuggestions");
    try {
      const res = await fetch(`/api/crop-suggestions?farmId=${selectedFarm.id}`);
      const data = await res.json() as { season: Season; suggestions: SuggestionItem[] };
      const seasonKey = `cropAdvisory.season.${data.season}` as
        | "cropAdvisory.season.kharif"
        | "cropAdvisory.season.rabi"
        | "cropAdvisory.season.zaid";
      setSuggestions(data.suggestions);
      push(
        { from: "bot", text: `${t("cropAdvisory.suggestionsIntro")} ${t(seasonKey)}:` },
        { from: "bot", text: t("cropAdvisory.selectPrompt") },
      );
      setStep("suggestions");
    } catch {
      push({ from: "bot", text: t("cropAdvisory.uploadError") });
      setStep("mainMenu");
    }
  }

  async function handleCropSelect(name: string) {
    if (!selectedFarm) return;
    push({ from: "user", text: name });
    setStep("savingCrop");
    try {
      const res = await fetch("/api/crop-advisory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ farmId: selectedFarm.id, cropType: name }),
      });
      const data = await res.json() as {
        cropType: string;
        advisory: AdvisoryRule;
        marketplaceItems: MarketplaceItem[];
      };
      setCropType(data.cropType);
      setAdvisory(data.advisory);
      setMarketplaceItems(data.marketplaceItems);
      push({ from: "bot", text: `${t("cropAdvisory.selectConfirm")} ${name} ✓` });
      setStep("advisory");
    } catch {
      push({ from: "bot", text: t("cropAdvisory.uploadError") });
      setStep("suggestions");
    }
  }

  async function loadAdvisory(farmId: string, crop: string) {
    setStep("savingCrop");
    try {
      const res = await fetch(`/api/crop-advisory?farmId=${farmId}`);
      const data = await res.json() as {
        cropType: string | null;
        advisory: AdvisoryRule | null;
        marketplaceItems: MarketplaceItem[];
      };
      if (data.advisory) {
        setAdvisory(data.advisory);
        setMarketplaceItems(data.marketplaceItems);
        push({ from: "bot", text: `${t("cropAdvisory.selectConfirm")} ${crop} ✓` });
        setStep("advisory");
      } else {
        setStep("mainMenu");
      }
    } catch {
      setStep("mainMenu");
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!selectedFarm || !e.target.files?.[0]) return;
    const raw = e.target.files[0];
    push(
      { from: "user", text: `📷 ${raw.name}` },
      { from: "bot", text: t("cropAdvisory.health.analysing") },
    );
    setStep("healthAnalysing");
    try {
      const compressed = await compressImage(raw);
      const fd = new FormData();
      fd.append("farmId", selectedFarm.id);
      fd.append("image", compressed);
      const res = await fetch("/api/crop-health-scan", { method: "POST", body: fd });
      if (!res.ok) throw new Error("upload failed");
      const data = await res.json() as { result: DiagnosisResult };
      setDiagnosis(data.result);
      setStep("healthResult");
    } catch {
      push({ from: "bot", text: t("cropAdvisory.uploadError") });
      setStep("healthUpload");
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  const isLoading =
    step === "loadingSuggestions" || step === "savingCrop" || step === "healthAnalysing";

  // Keep the newest message in view as the conversation grows.
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, step]);

  const farmName = selectedFarm ? selectedFarm.label ?? selectedFarm.visit_address.split(",")[0] : null;

  function resetCrop() {
    setSuggestions([]);
    setCropType(null);
    setAdvisory(null);
    push({ from: "bot", text: t("cropAdvisory.whatHelp") });
    setStep("mainMenu");
  }

  return (
    <FarmerShell active="advisory" fullName={fullName}>
      {/* AI hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-700 px-5 pb-8 pt-5 text-white lg:px-10 lg:pb-10 lg:pt-10">
        <svg aria-hidden="true" className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 text-emerald-500/20" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="65" />
          <circle cx="100" cy="100" r="90" />
          <path d="M100 10v180M10 100h180M36 36l128 128M164 36L36 164" />
        </svg>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-4">
          <div className="flex items-center gap-3">
            <Link href="/home" aria-label="Back to home" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white lg:hidden">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-100 ring-1 ring-white/20">
              <SparkleIcon className="h-3.5 w-3.5 text-amber-300" />
              AI Crop Advisor
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold lg:text-4xl">{t("modules.cropAdvisory")}</h1>
            <p className="mt-1 max-w-xl text-sm text-emerald-100 lg:text-base">
              Season-aware crop picks, care plans and leaf-photo disease checks for your farm.
            </p>
          </div>
          {(farmName || cropType) && (
            <div className="flex flex-wrap gap-2">
              {farmName && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm ring-1 ring-white/15">
                  <MapPinIcon className="h-3.5 w-3.5" /> {farmName}
                </span>
              )}
              {cropType && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-300/20 px-3 py-1.5 text-sm text-amber-100 ring-1 ring-amber-200/30">
                  <LeafIcon className="h-3.5 w-3.5" /> {cropType}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-5 lg:px-10 lg:py-8">
        {farms.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-zinc-200 bg-white px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <LeafIcon className="h-7 w-7" />
            </div>
            <p className="text-zinc-700">{t("cropAdvisory.noFarms")}</p>
            <Link href="/farmgate" className="flex min-h-11 items-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white">
              {t("cropAdvisory.goToFarmgate")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* Conversation */}
            <section aria-label="Conversation" className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
              {messages.map((msg, i) =>
                msg.from === "bot" ? <BotBubble key={i} text={msg.text} /> : <UserBubble key={i} text={msg.text} />,
              )}

              {isLoading && <ThinkingIndicator />}

              {step === "farmSelect" && (
                <div className="grid gap-2 sm:grid-cols-2 sm:pl-11">
                  {farms.map((farm) => (
                    <button
                      key={farm.id}
                      onClick={() => handleFarmSelect(farm)}
                      className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-left transition-all hover:border-emerald-400 hover:bg-emerald-50 active:scale-[0.98]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                          <MapPinIcon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-zinc-900">{farm.label ?? farm.visit_address.split(",")[0]}</span>
                          {farm.crop_type && <span className="block text-xs text-emerald-700">{farm.crop_type}</span>}
                        </span>
                      </span>
                      <ArrowRightIcon className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-700" />
                    </button>
                  ))}
                </div>
              )}

              {step === "mainMenu" && (
                <div className="grid gap-3 sm:grid-cols-2 sm:pl-11">
                  <OptionTile
                    onClick={() => handleOptionSelect("suggestions")}
                    title={t("cropAdvisory.optionSuggestions")}
                    body="Best crops for your location and this season"
                    tone="emerald"
                    icon={<SproutIcon className="h-6 w-6" />}
                  />
                  <OptionTile
                    onClick={() => handleOptionSelect("health")}
                    title={t("cropAdvisory.optionHealth")}
                    body="Upload a leaf photo for an instant check"
                    tone="lime"
                    icon={<ScanIcon className="h-6 w-6" />}
                  />
                </div>
              )}

              {step === "suggestions" && (
                <div className="grid gap-3 sm:grid-cols-2 sm:pl-11">
                  {suggestions.map((sug, i) => (
                    <button
                      key={sug.name}
                      onClick={() => handleCropSelect(sug.name)}
                      className={`relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] ${
                        i === 0 ? "border-emerald-400 bg-emerald-50" : "border-zinc-200 bg-white hover:border-emerald-300"
                      }`}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl ring-1 ring-zinc-200">{sug.emoji}</span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-zinc-900">{sug.name}</span>
                          {i === 0 && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                              <SparkleIcon className="h-2.5 w-2.5" /> Best match
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-zinc-600">{sug.reason}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {step === "advisory" && advisory && (
                <div className="flex flex-col gap-3 sm:pl-11">
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 py-3 text-white">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <LeafIcon className="h-4 w-4" /> Care plan · {cropType}
                    </span>
                    <button onClick={resetCrop} className="min-h-9 rounded-lg bg-white/15 px-3 text-xs font-semibold hover:bg-white/25">
                      {t("cropAdvisory.changeCrop")}
                    </button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <AdvisoryCard icon={<DropIcon className="h-5 w-5" />} title={t("cropAdvisory.advisory.irrigation")} body={advisory.irrigation} tone="sky" />
                    <AdvisoryCard icon={<FlaskIcon className="h-5 w-5" />} title={t("cropAdvisory.advisory.fertilizer")} body={advisory.fertilizer} tone="emerald" />
                    <AdvisoryCard icon={<BugIcon className="h-5 w-5" />} title={t("cropAdvisory.advisory.pestAlert")} body={advisory.pestAlert} tone="amber" />
                  </div>
                  <MarketplaceTeaser
                    items={marketplaceItems}
                    cropType={cropType}
                    title={t("cropAdvisory.marketplace.title")}
                    viewAllLabel={t("cropAdvisory.marketplace.viewAll")}
                    tractorLabel={t("cropAdvisory.tractor.label")}
                    tractorCta={t("cropAdvisory.tractor.cta")}
                    comingSoonLabel={t("cropAdvisory.marketplace.comingSoon")}
                    ourPickLabel={t("marketplace.ourPick")}
                    onComingSoon={showToast}
                  />
                </div>
              )}

              {step === "healthUpload" && (
                <div className="sm:pl-11">
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-lime-400 bg-lime-50 px-6 py-8 text-center transition-colors hover:bg-lime-100">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-600 text-white shadow-lg shadow-lime-600/30">
                      <CameraIcon className="h-7 w-7" />
                    </span>
                    <span className="text-sm font-semibold text-lime-900">{t("cropAdvisory.health.uploadBtn")}</span>
                    <span className="text-xs text-lime-800">Close-up of one leaf, in daylight, works best</span>
                    <input ref={fileRef} type="file" accept="image/*" capture="environment" className="sr-only" onChange={handleImageUpload} />
                  </label>
                </div>
              )}

              {step === "healthResult" && diagnosis && (
                <div className="flex flex-col gap-3 sm:pl-11">
                  <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-lime-700">Diagnosis</p>
                        <p className="mt-1 text-lg font-semibold text-zinc-900">{diagnosis.label}</p>
                      </div>
                      <ConfidenceRing value={diagnosis.confidence} label={t("cropAdvisory.health.confidence")} />
                    </div>
                    <div className="mt-4 rounded-xl bg-emerald-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">What to do</p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-800">{diagnosis.recommendedAction}</p>
                    </div>
                    <p className="mt-3 text-xs text-zinc-500">{t("cropAdvisory.health.disclaimer")}</p>
                  </div>
                  <button
                    onClick={() => {
                      setDiagnosis(null);
                      push({ from: "bot", text: t("cropAdvisory.health.uploadPrompt") });
                      setStep("healthUpload");
                    }}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-lime-300 bg-white text-sm font-semibold text-lime-800 hover:bg-lime-50"
                  >
                    <CameraIcon className="h-4 w-4" />
                    {t("cropAdvisory.health.scanAgain")}
                  </button>
                </div>
              )}
              <div ref={endRef} />
            </section>

            {/* Side panel (desktop) */}
            <aside className="hidden flex-col gap-4 lg:flex">
              <div className="rounded-3xl border border-zinc-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">How it works</p>
                <ol className="mt-3 flex flex-col gap-3 text-sm text-zinc-700">
                  {[
                    ["Pick a farm", "We use its location and today’s season."],
                    ["Get crop picks", "Ranked for your district and season."],
                    ["Follow the care plan", "Water, fertilizer and pest alerts."],
                    ["Scan a leaf", "Spot disease early from one photo."],
                  ].map(([a, b], i) => (
                    <li key={a} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800">{i + 1}</span>
                      <span><span className="block font-medium text-zinc-900">{a}</span>{b}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-lime-500 to-emerald-700 p-5 text-white">
                <ScanIcon className="h-7 w-7" />
                <p className="mt-3 font-semibold">Leaf looks unwell?</p>
                <p className="mt-1 text-sm text-lime-50">Pick a farm, then choose the health check to scan a photo.</p>
              </div>
            </aside>
          </div>
        )}
      </div>

      {toast && (
        <div role="status" className="fixed inset-x-0 bottom-24 z-50 mx-auto w-fit rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg lg:bottom-8">
          {toast}
        </div>
      )}
    </FarmerShell>
  );
}

function SparkleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" opacity="0.7" />
    </svg>
  );
}
function LeafIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" />
      <path d="M2 21c0-3 1.9-5.4 5.1-6" />
    </svg>
  );
}
function SproutIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22V12" /><path d="M12 12C12 7 8 4 3 4c0 5 4 8 9 8z" /><path d="M12 14c0-4 3-7 9-7 0 4-3 7-9 7z" />
    </svg>
  );
}
function ScanIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M12 7c-3 1-4.5 3.5-4.5 6 2.5 0 5-1.5 6-4.5M12 7c3 1 4.5 3.5 4.5 6" />
    </svg>
  );
}
function DropIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.7s6 6.3 6 11a6 6 0 0 1-12 0c0-4.7 6-11 6-11z" />
    </svg>
  );
}
function FlaskIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3" /><path d="M7 15h10" />
    </svg>
  );
}
function BugIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="6" width="8" height="14" rx="4" /><path d="M19 7l-3 2M5 7l3 2M19 19l-3-2M5 19l3-2M20 13h-4M4 13h4M10 4l1 2M14 4l-1 2" />
    </svg>
  );
}

function BotAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 text-white shadow-sm shadow-emerald-700/30">
      <SparkleIcon className="h-4 w-4" />
    </div>
  );
}

function BotBubble({ text }: { text: string }) {
  return (
    <div className="flex items-end gap-3">
      <BotAvatar />
      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-900">{text}</div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-emerald-700 px-4 py-3 text-sm text-white">{text}</div>
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex items-end gap-3" role="status" aria-live="polite">
      <BotAvatar />
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-600" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </span>
        Analysing your farm…
      </div>
    </div>
  );
}

function OptionTile({ onClick, title, body, tone, icon }: {
  onClick: () => void; title: string; body: string; tone: "emerald" | "lime"; icon: React.ReactNode;
}) {
  const c = tone === "emerald"
    ? { ring: "hover:border-emerald-400", chip: "bg-emerald-700 text-white shadow-emerald-700/30", bg: "from-emerald-50" }
    : { ring: "hover:border-lime-400", chip: "bg-lime-600 text-white shadow-lime-600/30", bg: "from-lime-50" };
  return (
    <button
      onClick={onClick}
      className={`group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-gradient-to-br ${c.bg} to-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] ${c.ring}`}
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-lg ${c.chip}`}>{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-zinc-900">{title}</span>
        <span className="mt-0.5 block text-xs text-zinc-600">{body}</span>
      </span>
    </button>
  );
}

function ConfidenceRing({ value, label }: { value: number; label: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex shrink-0 flex-col items-center" title={`${label}: ${value}%`}>
      <svg width="64" height="64" viewBox="0 0 64 64" role="img" aria-label={`${label} ${value}%`}>
        <circle cx="32" cy="32" r={r} fill="none" stroke="#e4e4e7" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} fill="none" stroke="#047857" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${(value / 100) * c} ${c}`} transform="rotate(-90 32 32)" />
        <text x="32" y="36" textAnchor="middle" fontSize="13" fontWeight="600" fill="#18181b">{value}%</text>
      </svg>
      <span className="text-[11px] text-zinc-600">{label}</span>
    </div>
  );
}

function AdvisoryCard({ icon, title, body, tone }: {
  icon: React.ReactNode; title: string; body: string; tone: "sky" | "emerald" | "amber";
}) {
  const p = {
    sky: { chip: "bg-sky-100 text-sky-700", border: "border-sky-100" },
    emerald: { chip: "bg-emerald-100 text-emerald-700", border: "border-emerald-100" },
    amber: { chip: "bg-amber-100 text-amber-800", border: "border-amber-100" },
  }[tone];
  return (
    <div className={`rounded-2xl border ${p.border} bg-white p-4`}>
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${p.chip}`}>{icon}</span>
      <p className="mt-3 text-sm font-semibold text-zinc-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-zinc-700">{body}</p>
    </div>
  );
}

function MarketplaceTeaser({
  items, cropType, title, viewAllLabel, tractorLabel, tractorCta, comingSoonLabel, ourPickLabel, onComingSoon,
}: {
  items: MarketplaceItem[];
  cropType: string | null;
  title: string;
  viewAllLabel: string;
  tractorLabel: string;
  tractorCta: string;
  comingSoonLabel: string;
  ourPickLabel: string;
  onComingSoon: (msg: string) => void;
}) {
  const marketplaceHref = cropType ? `/marketplace?crop=${encodeURIComponent(cropType)}` : "/marketplace";
  return (
    <div className="mt-1 rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="mb-3 text-sm font-semibold text-zinc-700">{title}</p>
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const { Icon, bg } = CATEGORY_VISUALS[item.category];
          return (
            <Link
              key={item.name}
              href={marketplaceHref}
              className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5 text-left active:scale-95"
            >
              <div className="flex items-center gap-2">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-medium text-zinc-800">
                    {item.name}
                    {item.recommended && (
                      <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
                        ★ {ourPickLabel}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-zinc-400">{item.priceRange}</p>
                </div>
              </div>
              <ArrowRightIcon className="h-4 w-4 shrink-0 text-zinc-400" />
            </Link>
          );
        })}
        <button
          onClick={() => onComingSoon(`${tractorLabel} — ${comingSoonLabel}`)}
          className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5 text-left active:scale-95"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="7" cy="17" r="3" /><circle cx="18" cy="18" r="2" /><path d="M10 17h6M4 14V8h6l2 6M12 8h5l2 8" /></svg></span>
            <div>
              <p className="text-xs font-medium text-zinc-800">{tractorLabel}</p>
              <p className="text-xs text-zinc-400">{tractorCta}</p>
            </div>
          </div>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
            {comingSoonLabel}
          </span>
        </button>
      </div>
      <Link
        href={marketplaceHref}
        className="mt-3 flex items-center justify-center gap-1 rounded-xl bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-700 active:scale-95"
      >
        {viewAllLabel} <ArrowRightIcon className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
