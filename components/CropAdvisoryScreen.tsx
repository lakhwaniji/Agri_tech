"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { CameraIcon, ArrowRightIcon } from "@/components/icons";
import type { Season } from "@/lib/mocked/crop-suggestions";
import type { AdvisoryRule } from "@/lib/mocked/crop-advisory-rules";
import type { MarketplaceItem } from "@/lib/mocked/crop-marketplace-items";

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

function BotBubble({ text }: { text: string }) {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm text-white">
        🌾
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm">
        {text}
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-emerald-600 px-4 py-3 text-sm text-white">
        {text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm text-white">
        🌾
      </div>
      <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
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

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="flex items-center gap-3 border-b border-zinc-200 bg-white px-4 py-4">
        <Link href="/home" className="text-zinc-500 hover:text-zinc-800">←</Link>
        <div>
          <p className="text-xs text-zinc-500">{fullName}</p>
          <h1 className="text-base font-semibold text-zinc-900">
            {t("modules.cropAdvisory")}
          </h1>
        </div>
      </header>

      {/* No farms — simple redirect to FarmGate */}
      {farms.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="text-5xl">🌾</span>
          <p className="text-zinc-600">{t("cropAdvisory.noFarms")}</p>
          <Link
            href="/farmgate"
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white"
          >
            {t("cropAdvisory.goToFarmgate")}
          </Link>
        </div>
      )}

      {/* Chat area */}
      {farms.length > 0 && (
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4 pb-6">
          {messages.map((msg, i) =>
            msg.from === "bot"
              ? <BotBubble key={i} text={msg.text} />
              : <UserBubble key={i} text={msg.text} />,
          )}

          {isLoading && <TypingIndicator />}

          {/* Farm selector */}
          {step === "farmSelect" && (
            <div className="flex flex-col gap-2 pl-10">
              {farms.map((farm) => (
                <button
                  key={farm.id}
                  onClick={() => handleFarmSelect(farm)}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-left text-sm font-medium text-zinc-800 shadow-sm active:scale-95"
                >
                  <div>
                    <p className="font-semibold">{farm.label ?? farm.visit_address}</p>
                    {farm.crop_type && (
                      <p className="text-xs text-emerald-600">🌾 {farm.crop_type}</p>
                    )}
                  </div>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-zinc-400" />
                </button>
              ))}
            </div>
          )}

          {/* Main menu — Disease Analysis or Crop Suggestion */}
          {step === "mainMenu" && (
            <div className="flex flex-col gap-3 pl-10">
              <button
                onClick={() => handleOptionSelect("suggestions")}
                className="flex items-start gap-3 rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-emerald-100 active:scale-95"
              >
                <span className="text-2xl">🌱</span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {t("cropAdvisory.optionSuggestions")}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Best crops for your location and this season
                  </p>
                </div>
              </button>
              <button
                onClick={() => handleOptionSelect("health")}
                className="flex items-start gap-3 rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-lime-100 active:scale-95"
              >
                <span className="text-2xl">🔬</span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {t("cropAdvisory.optionHealth")}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Upload a photo — get instant disease diagnosis
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* Crop suggestion cards */}
          {step === "suggestions" && (
            <div className="flex flex-col gap-2 pl-10">
              {suggestions.map((s) => (
                <button
                  key={s.name}
                  onClick={() => handleCropSelect(s.name)}
                  className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-left shadow-sm ring-1 ring-emerald-100 active:scale-95"
                >
                  <span className="text-2xl">{s.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{s.name}</p>
                    <p className="text-xs text-zinc-500">{s.reason}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Advisory cards */}
          {step === "advisory" && advisory && (
            <div className="flex flex-col gap-3 pl-10">
              <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-2">
                <span className="text-sm font-semibold text-emerald-800">🌾 {cropType}</span>
                <button
                  onClick={() => {
                    setSuggestions([]);
                    setCropType(null);
                    setAdvisory(null);
                    push({ from: "bot", text: t("cropAdvisory.whatHelp") });
                    setStep("mainMenu");
                  }}
                  className="text-xs text-emerald-600 underline"
                >
                  {t("cropAdvisory.changeCrop")}
                </button>
              </div>
              <AdvisoryCard icon="💧" title={t("cropAdvisory.advisory.irrigation")} body={advisory.irrigation} color="blue" />
              <AdvisoryCard icon="🧪" title={t("cropAdvisory.advisory.fertilizer")} body={advisory.fertilizer} color="green" />
              <AdvisoryCard icon="🐛" title={t("cropAdvisory.advisory.pestAlert")} body={advisory.pestAlert} color="orange" />
              <MarketplaceTeaser
                items={marketplaceItems}
                title={t("cropAdvisory.marketplace.title")}
                comingSoonLabel={t("cropAdvisory.marketplace.comingSoon")}
                tractorLabel={t("cropAdvisory.tractor.label")}
                tractorCta={t("cropAdvisory.tractor.cta")}
                onComingSoon={showToast}
              />
            </div>
          )}

          {/* Health upload */}
          {step === "healthUpload" && (
            <div className="pl-10">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-lime-600 px-4 py-3 text-sm font-semibold text-white active:scale-95">
                <CameraIcon className="h-5 w-5" />
                {t("cropAdvisory.health.uploadBtn")}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="sr-only"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}

          {/* Diagnosis result */}
          {step === "healthResult" && diagnosis && (
            <div className="flex flex-col gap-3 pl-10">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-zinc-900">{diagnosis.label}</p>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                    {t("cropAdvisory.health.confidence")}: {diagnosis.confidence}%
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-600">{diagnosis.recommendedAction}</p>
                <p className="mt-3 text-xs italic text-zinc-400">{t("cropAdvisory.health.disclaimer")}</p>
              </div>
              <button
                onClick={() => {
                  setDiagnosis(null);
                  push({ from: "bot", text: t("cropAdvisory.health.uploadPrompt") });
                  setStep("healthUpload");
                }}
                className="rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-lime-700 shadow-sm ring-1 ring-lime-200 active:scale-95"
              >
                {t("cropAdvisory.health.scanAgain")}
              </button>
            </div>
          )}
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

function AdvisoryCard({ icon, title, body, color }: {
  icon: string; title: string; body: string; color: "blue" | "green" | "orange";
}) {
  const p = {
    blue:   { bg: "bg-blue-50",   border: "border-blue-100",   title: "text-blue-800" },
    green:  { bg: "bg-green-50",  border: "border-green-100",  title: "text-green-800" },
    orange: { bg: "bg-orange-50", border: "border-orange-100", title: "text-orange-800" },
  }[color];
  return (
    <div className={`rounded-xl border ${p.bg} ${p.border} p-4`}>
      <p className={`mb-1 text-sm font-semibold ${p.title}`}>{icon} {title}</p>
      <p className="text-sm text-zinc-700">{body}</p>
    </div>
  );
}

function MarketplaceTeaser({ items, title, comingSoonLabel, tractorLabel, tractorCta, onComingSoon }: {
  items: MarketplaceItem[];
  title: string;
  comingSoonLabel: string;
  tractorLabel: string;
  tractorCta: string;
  onComingSoon: (msg: string) => void;
}) {
  return (
    <div className="mt-2 rounded-2xl bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-zinc-700">{title}</p>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => onComingSoon(`${item.name} — ${comingSoonLabel}`)}
            className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5 text-left active:scale-95"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{item.emoji}</span>
              <div>
                <p className="text-xs font-medium text-zinc-800">{item.name}</p>
                <p className="text-xs text-zinc-400">{item.priceRange}</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
              {comingSoonLabel}
            </span>
          </button>
        ))}
        <button
          onClick={() => onComingSoon(`${tractorLabel} — ${comingSoonLabel}`)}
          className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5 text-left active:scale-95"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🚜</span>
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
    </div>
  );
}
