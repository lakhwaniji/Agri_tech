"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polygon, Polyline, CircleMarker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Point = { lat: number; lng: number };

// Leaflet's default marker icon references image files by relative path,
// which breaks under Next.js's bundler — the common fix is to skip the
// default icon entirely and use our own inline SVG pin instead.
const pinIcon = L.divIcon({
  html: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" fill="#059669" stroke="#047857" stroke-width="1"/>
    <circle cx="12" cy="9.5" r="2.5" fill="white"/>
  </svg>`,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

// Zooms the map so the whole boundary is in view. Without this the map
// opened at a fixed zoom on the pin, and a boundary bigger than the view (or
// a pin outside the field) left the red outline partly or fully off-screen.
function FitToBoundary({ boundary, padding }: { boundary: Point[]; padding: number }) {
  const map = useMap();
  // Re-fit only when the points actually change (not on every re-render),
  // so panning the map isn't undone.
  const key = boundary.map((p) => `${p.lat.toFixed(6)},${p.lng.toFixed(6)}`).join(";");
  useEffect(() => {
    if (!key) return;
    const pts = key.split(";").map((s) => s.split(",").map(Number) as [number, number]);
    map.fitBounds(L.latLngBounds(pts), { padding: [padding, padding], maxZoom: 19 });
  }, [map, key, padding]);
  return null;
}

export function FarmMap({
  location,
  boundary,
  height = 280,
  interactive = true,
  rounded = true,
  showPoints = false,
  closed = true,
}: {
  location: Point | null;
  boundary: Point[] | null;
  height?: number;
  interactive?: boolean;
  rounded?: boolean;
  /** Draw a dot on every captured boundary point (ops capture view). */
  showPoints?: boolean;
  /** false while the agent is still walking: draw an open line, not a closed shape. */
  closed?: boolean;
}) {
  const pts = boundary ?? [];
  const hasBoundary = closed && pts.length >= 3;
  const center = location ?? (hasBoundary ? boundary![0] : null);

  if (!center) return null;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={17}
      scrollWheelZoom={false}
      dragging={interactive}
      zoomControl={interactive}
      doubleClickZoom={interactive}
      touchZoom={interactive}
      boxZoom={interactive}
      keyboard={interactive}
      style={{ height: `${height}px`, width: "100%", borderRadius: rounded ? "16px" : 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      {location && <Marker position={[location.lat, location.lng]} icon={pinIcon} />}
      {hasBoundary && (
        <Polygon
          positions={pts.map((p) => [p.lat, p.lng])}
          pathOptions={{ color: "#dc2626", weight: 3, fillColor: "#10b981", fillOpacity: 0.2 }}
        />
      )}
      {!hasBoundary && pts.length >= 2 && (
        <Polyline
          positions={pts.map((p) => [p.lat, p.lng])}
          pathOptions={{ color: "#dc2626", weight: 3, dashArray: "6 6" }}
        />
      )}
      {showPoints &&
        pts.map((p, i) => (
          <CircleMarker
            key={`${p.lat}-${p.lng}-${i}`}
            center={[p.lat, p.lng]}
            radius={5}
            pathOptions={{ color: "#ffffff", weight: 2, fillColor: "#dc2626", fillOpacity: 1 }}
          />
        ))}
      {(pts.length > 0 || location) && (
        <FitToBoundary
          boundary={[...pts, ...(location ? [location] : [])]}
          padding={interactive ? 32 : 16}
        />
      )}
    </MapContainer>
  );
}
