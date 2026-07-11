"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CameraIcon,
  CheckCircleIcon,
  CrosshairIcon,
  PlusIcon,
} from "@/components/icons";
import type { Maturity, VegetationType } from "@/lib/o2-estimate";

type Point = { lat: number; lng: number };

const VEGETATION_LABELS: Record<VegetationType, string> = {
  fruit_trees: "Fruit trees (mango, coconut, banana, etc.)",
  timber_hardwood: "Timber / hardwood (teak, neem)",
  fast_growing_softwood: "Fast-growing softwood (eucalyptus, casuarina)",
  mixed_plantation: "Mixed plantation",
  field_crops_only: "Field crops only — no significant trees",
};

const MATURITY_LABELS: Record<Maturity, string> = {
  young: "Young",
  mature: "Mature",
  old: "Old",
};

type DocSlot = "aadhaarFront" | "aadhaarBack" | "ownershipProof";

const DOC_LABELS: Record<DocSlot, string> = {
  aadhaarFront: "Aadhaar card — front",
  aadhaarBack: "Aadhaar card — back",
  ownershipProof: "Proof of ownership (Patta)",
};

type InitialGreen = {
  vegetation_type: VegetationType;
  maturity: Maturity;
  sample_tree_count: number | null;
  notes: string | null;
  tree_cover_percent: number | null;
  tree_cover_hectares: number | null;
  biomass_tons: number | null;
  co2_tons: number | null;
  o2_tons: number | null;
};

export function OpsVisitScreen({
  farmId,
  visitId,
  farmerName,
  address,
  initialLocation,
  initialBoundary,
  initialGreen,
}: {
  farmId: string;
  visitId: string;
  farmerName: string;
  address: string;
  initialLocation?: Point | null;
  initialBoundary?: Point[] | null;
  initialGreen?: InitialGreen | null;
}) {
  // Document previews live only in browser memory (object URLs) — nothing
  // here is ever uploaded or saved to the database. Capturing/showing the
  // photo is the whole requirement; storing it raises Aadhaar-data
  // compliance questions we haven't cleared yet (see agents/tech-lead/
  // MEMORY.md), so we deliberately stop short of persisting it.
  const [docs, setDocs] = useState<Record<DocSlot, string | null>>({
    aadhaarFront: null,
    aadhaarBack: null,
    ownershipProof: null,
  });

  const [mappingMode, setMappingMode] = useState<"gps" | "map">("gps");

  const [location, setLocation] = useState<Point | null>(initialLocation ?? null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [boundary, setBoundary] = useState<Point[]>(initialBoundary ?? []);
  const [boundaryClosed, setBoundaryClosed] = useState(
    (initialBoundary?.length ?? 0) >= 3,
  );
  const [addingPoint, setAddingPoint] = useState(false);
  const [boundaryError, setBoundaryError] = useState<string | null>(null);

  // No timeout means the browser can hang on "Locating..." forever if it
  // can't get a fix (common on laptops, which have no real GPS chip and
  // rely on slow/sometimes-failing Wi-Fi positioning). 15s is generous for
  // a phone's GPS, which should usually resolve in 1-3s outdoors.
  const GEO_OPTIONS: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0,
  };

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [greenMode, setGreenMode] = useState<"manual" | "drone">("manual");
  const [vegetationType, setVegetationType] = useState<VegetationType>(
    initialGreen?.vegetation_type ?? "mixed_plantation",
  );
  const [maturity, setMaturity] = useState<Maturity>(
    initialGreen?.maturity ?? "mature",
  );
  const [sampleTreeCount, setSampleTreeCount] = useState(
    initialGreen?.sample_tree_count != null ? String(initialGreen.sample_tree_count) : "",
  );
  const [greenNotes, setGreenNotes] = useState(initialGreen?.notes ?? "");
  const [calculating, setCalculating] = useState(false);
  const [greenError, setGreenError] = useState<string | null>(null);
  const [greenResult, setGreenResult] = useState<{
    treeCoverPercent: number;
    treeCoverHectares: number;
    biomassTons: number;
    co2Tons: number;
    o2Tons: number;
  } | null>(
    initialGreen?.o2_tons != null
      ? {
          treeCoverPercent: initialGreen.tree_cover_percent ?? 0,
          treeCoverHectares: initialGreen.tree_cover_hectares ?? 0,
          biomassTons: initialGreen.biomass_tons ?? 0,
          co2Tons: initialGreen.co2_tons ?? 0,
          o2Tons: initialGreen.o2_tons,
        }
      : null,
  );
  // Lets the agent explicitly choose to redo the analysis even though a
  // previous result is pre-filled — re-running shows the form again instead
  // of just the locked-in result.
  const [recalculating, setRecalculating] = useState(false);

  async function handleCalculateGreen() {
    setCalculating(true);
    setGreenError(null);

    const res = await fetch("/api/ops-calculate-green", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        farmId,
        vegetationType,
        maturity,
        sampleTreeCount: sampleTreeCount ? Number(sampleTreeCount) : undefined,
        notes: greenNotes || undefined,
      }),
    });
    const data = await res.json();
    setCalculating(false);

    if (!res.ok) {
      setGreenError(data.error ?? "Something went wrong.");
      return;
    }

    setGreenResult(data);
  }

  function handleDocCapture(slot: DocSlot, file: File | undefined) {
    if (!file) return;
    setDocs((prev) => ({ ...prev, [slot]: URL.createObjectURL(file) }));
  }

  function handleLockLocation() {
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        setLocationError(
          err.code === err.TIMEOUT
            ? "Timed out getting your location. This is common on laptops without GPS — try on a phone outdoors, or try again."
            : "Couldn't get your location. Check location permission is allowed for this site.",
        );
      },
      GEO_OPTIONS,
    );
  }

  function handleAddBoundaryPoint() {
    setAddingPoint(true);
    setBoundaryError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setBoundary((prev) => [
          ...prev,
          { lat: position.coords.latitude, lng: position.coords.longitude },
        ]);
        setAddingPoint(false);
      },
      (err) => {
        setAddingPoint(false);
        setBoundaryError(
          err.code === err.TIMEOUT
            ? "Timed out getting this point. Try again."
            : "Couldn't get this point. Check location permission is allowed for this site.",
        );
      },
      GEO_OPTIONS,
    );
  }

  function handleResetBoundary() {
    setBoundary([]);
    setBoundaryClosed(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);

    const res = await fetch("/api/ops-save-farm-geo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        farmId,
        visitId,
        location: location ?? undefined,
        boundary: boundary.length >= 3 ? boundary : undefined,
      }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setSaveError(data.error ?? "Something went wrong.");
      return;
    }

    setSaved(true);
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-16">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
        <div>
          <p className="text-sm text-zinc-500">Registering farm for</p>
          <p className="font-semibold text-zinc-900">{farmerName}</p>
        </div>
        <Link
          href="/ops/dashboard"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-900"
        >
          Back
        </Link>
      </header>

      <div className="mx-auto max-w-2xl space-y-6 px-6 py-6">
        <p className="text-sm text-zinc-500">{address}</p>

        {/* Document capture — preview only, never uploaded/stored */}
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-zinc-900">Documents</h2>
          <p className="mt-0.5 text-sm text-zinc-500">
            Capture for visual verification only. These photos are not saved.
          </p>

          <div className="mt-3 space-y-3">
            {(Object.keys(DOC_LABELS) as DocSlot[]).map((slot) => (
              <div key={slot} className="flex items-center gap-3">
                {docs[slot] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={docs[slot]!}
                    alt={DOC_LABELS[slot]}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400">
                    <CameraIcon className="h-6 w-6" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-800">
                    {DOC_LABELS[slot]}
                  </p>
                  <label className="mt-1 inline-block cursor-pointer text-sm font-medium text-emerald-700">
                    {docs[slot] ? "Retake photo" : "Capture photo"}
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) =>
                        handleDocCapture(slot, e.target.files?.[0])
                      }
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location & boundary */}
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-zinc-900">Farm location & boundary</h2>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setMappingMode("gps")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                mappingMode === "gps"
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              GPS mapping
            </button>
            <button
              disabled
              className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-400"
              title="Coming soon"
            >
              Map support (coming soon)
            </button>
          </div>

          {mappingMode === "gps" && (
            <div className="mt-4 space-y-5">
              {/* Step 1: exact location */}
              <div>
                <p className="text-sm font-medium text-zinc-700">
                  1. Stand somewhere inside the farm, then lock the location.
                </p>
                <button
                  onClick={handleLockLocation}
                  disabled={locating}
                  className="mt-2 flex items-center gap-1.5 rounded-full border-2 border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-50"
                >
                  <CrosshairIcon className="h-4 w-4" />
                  {locating
                    ? "Locating..."
                    : location
                      ? "Re-lock location"
                      : "Lock farm location"}
                </button>
                {location && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700">
                    <CheckCircleIcon className="h-4 w-4" />
                    Location locked ({location.lat.toFixed(5)},{" "}
                    {location.lng.toFixed(5)})
                  </p>
                )}
                {locationError && (
                  <p className="mt-1.5 text-sm text-red-600">{locationError}</p>
                )}
              </div>

              {/* Step 2: boundary */}
              <div>
                <p className="text-sm font-medium text-zinc-700">
                  2. Walk to the field&apos;s edge. Tap &ldquo;Add point&rdquo;
                  every ~5 meters as you walk the full perimeter.
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleAddBoundaryPoint}
                    disabled={addingPoint || boundaryClosed}
                    className="flex items-center gap-1.5 rounded-full border-2 border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-50"
                  >
                    <PlusIcon className="h-4 w-4" />
                    {addingPoint ? "Capturing..." : "Add point"}
                  </button>
                  {boundary.length > 0 && !boundaryClosed && (
                    <button
                      onClick={() => setBoundaryClosed(true)}
                      disabled={boundary.length < 3}
                      className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                    >
                      Finish boundary
                    </button>
                  )}
                  {boundary.length > 0 && (
                    <button
                      onClick={handleResetBoundary}
                      className="text-sm font-medium text-zinc-500 hover:text-zinc-900"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <p className="mt-1.5 text-sm text-zinc-500">
                  Points captured: {boundary.length}
                  {boundary.length > 0 && boundary.length < 3 && " (need at least 3)"}
                </p>

                {boundaryClosed && (
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-emerald-700">
                    <CheckCircleIcon className="h-4 w-4" />
                    Boundary closed with {boundary.length} points
                  </p>
                )}
                {boundaryError && (
                  <p className="mt-1 text-sm text-red-600">{boundaryError}</p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Green Details — vegetation/canopy capture feeding the O2 estimate */}
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="font-semibold text-zinc-900">Green Details</h2>
          <p className="mt-0.5 text-sm text-zinc-500">
            Used to estimate this farm&apos;s O₂ generation — combines your
            entries below with a satellite analysis of the farm boundary.
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setGreenMode("manual")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                greenMode === "manual"
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              Manual entry
            </button>
            <button
              disabled
              className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-400"
              title="Coming soon"
            >
              Drone entry (coming soon)
            </button>
          </div>

          {greenMode === "manual" && (
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-zinc-700">
                  Dominant tree/vegetation type
                </span>
                <select
                  value={vegetationType}
                  onChange={(e) => setVegetationType(e.target.value as VegetationType)}
                  className="mt-1 min-h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-zinc-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                >
                  {(Object.keys(VEGETATION_LABELS) as VegetationType[]).map((key) => (
                    <option key={key} value={key}>
                      {VEGETATION_LABELS[key]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-zinc-700">
                  Approximate tree maturity
                </span>
                <select
                  value={maturity}
                  onChange={(e) => setMaturity(e.target.value as Maturity)}
                  className="mt-1 min-h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-zinc-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                >
                  {(Object.keys(MATURITY_LABELS) as Maturity[]).map((key) => (
                    <option key={key} value={key}>
                      {MATURITY_LABELS[key]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-zinc-700">
                  Sample tree count (in a rough 10m×10m patch)
                </span>
                <input
                  type="number"
                  min={0}
                  value={sampleTreeCount}
                  onChange={(e) => setSampleTreeCount(e.target.value)}
                  className="mt-1 min-h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  placeholder="e.g. 6"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-zinc-700">Notes</span>
                <textarea
                  value={greenNotes}
                  onChange={(e) => setGreenNotes(e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  placeholder="Anything else worth noting"
                />
              </label>

              {greenError && <p className="text-sm text-red-600">{greenError}</p>}

              {greenResult && !recalculating ? (
                <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
                  <p>Tree cover: {greenResult.treeCoverPercent.toFixed(1)}% ({greenResult.treeCoverHectares.toFixed(2)} ha)</p>
                  <p className="mt-1">Estimated biomass: {greenResult.biomassTons.toFixed(1)} tons</p>
                  <p className="mt-1">CO₂ absorbed: {greenResult.co2Tons.toFixed(1)} tons/year</p>
                  <p className="mt-1 font-semibold">
                    O₂ generated: {greenResult.o2Tons.toFixed(1)} tons/year
                  </p>
                  <button
                    onClick={() => setRecalculating(true)}
                    className="mt-2 text-sm font-medium text-emerald-700 underline-offset-2 hover:underline"
                  >
                    Recalculate
                  </button>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    await handleCalculateGreen();
                    setRecalculating(false);
                  }}
                  disabled={calculating}
                  className="min-h-12 w-full rounded-full bg-emerald-600 font-semibold text-white shadow-sm shadow-emerald-600/30 transition-colors hover:bg-emerald-700 disabled:opacity-50"
                >
                  {calculating ? "Calculating..." : "Calculate O₂ Generation"}
                </button>
              )}
            </div>
          )}
        </section>

        {saveError && <p className="text-sm text-red-600">{saveError}</p>}

        {saved ? (
          <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
            <CheckCircleIcon className="h-5 w-5" />
            Saved
            {location && boundary.length >= 3
              ? " — this visit is now marked completed."
              : ". You can come back and add the boundary later to complete this visit."}
          </p>
        ) : (
          <button
            onClick={handleSave}
            disabled={saving || (!location && boundary.length < 3)}
            className="min-h-12 w-full rounded-full bg-emerald-600 font-semibold text-white shadow-sm shadow-emerald-600/30 transition-colors hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save location & boundary"}
          </button>
        )}
      </div>
    </div>
  );
}
