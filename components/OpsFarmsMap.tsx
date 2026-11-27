"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Polygon, CircleMarker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Point = { lat: number; lng: number };

export type OpsMapFarm = {
  visitId: string;
  farmerName: string;
  farmLabel: string | null;
  address: string;
  status: "done" | "open" | "overdue";
  statusLabel: string;
  areaHa: number | null;
  location: Point | null;
  boundary: Point[] | null;
};

const COLORS = {
  done: { stroke: "#047857", fill: "#10b981" },
  open: { stroke: "#b45309", fill: "#f59e0b" },
  overdue: { stroke: "#b91c1c", fill: "#ef4444" },
};

function FitAll({ points }: { points: [number, number][] }) {
  const map = useMap();
  const key = points.map((p) => p.join(",")).join(";");
  useEffect(() => {
    if (!key) return;
    const pts = key.split(";").map((s) => s.split(",").map(Number) as [number, number]);
    map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 17 });
  }, [map, key]);
  return null;
}

// All farms on one map for the ops team: mapped boundaries as shapes,
// farms with only a GPS pin (or nothing mapped yet) as dots.
export function OpsFarmsMap({ farms, height = 520 }: { farms: OpsMapFarm[]; height?: number }) {
  const placed = farms.filter((f) => (f.boundary && f.boundary.length >= 3) || f.location);
  const allPoints: [number, number][] = placed.flatMap((f) =>
    f.boundary && f.boundary.length >= 3
      ? f.boundary.map((p) => [p.lat, p.lng] as [number, number])
      : [[f.location!.lat, f.location!.lng] as [number, number]],
  );
  const center: [number, number] = allPoints[0] ?? [12.9716, 77.5946];

  return (
    <MapContainer center={center} zoom={allPoints.length ? 13 : 5} scrollWheelZoom style={{ height, width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <FitAll points={allPoints} />
      {placed.map((f) => {
        const c = COLORS[f.status];
        const popup = (
          <Popup>
            <div style={{ minWidth: 180 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{f.farmerName}</p>
              {f.farmLabel && <p style={{ margin: "2px 0 0", color: "#52525b" }}>{f.farmLabel}</p>}
              <p style={{ margin: "6px 0 0", color: "#52525b" }}>
                {f.statusLabel}
                {f.areaHa != null ? ` · ${f.areaHa.toFixed(2)} ha` : ""}
              </p>
              <Link href={`/ops/visit/${f.visitId}`} style={{ display: "inline-block", marginTop: 8, fontWeight: 600, color: "#047857" }}>
                Open visit →
              </Link>
            </div>
          </Popup>
        );
        return f.boundary && f.boundary.length >= 3 ? (
          <Polygon
            key={f.visitId}
            positions={f.boundary.map((p) => [p.lat, p.lng])}
            pathOptions={{ color: c.stroke, weight: 3, fillColor: c.fill, fillOpacity: 0.3 }}
          >
            {popup}
          </Polygon>
        ) : (
          <CircleMarker
            key={f.visitId}
            center={[f.location!.lat, f.location!.lng]}
            radius={9}
            pathOptions={{ color: "#ffffff", weight: 2, fillColor: c.stroke, fillOpacity: 1 }}
          >
            {popup}
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
