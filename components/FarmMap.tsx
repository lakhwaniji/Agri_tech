"use client";

import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
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

export function FarmMap({
  location,
  boundary,
}: {
  location: Point | null;
  boundary: Point[] | null;
}) {
  const hasBoundary = !!boundary && boundary.length >= 3;
  const center = location ?? (hasBoundary ? boundary![0] : null);

  if (!center) return null;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={17}
      scrollWheelZoom={false}
      style={{ height: "280px", width: "100%", borderRadius: "16px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {location && <Marker position={[location.lat, location.lng]} icon={pinIcon} />}
      {hasBoundary && (
        <Polygon
          positions={boundary!.map((p) => [p.lat, p.lng])}
          pathOptions={{ color: "#dc2626", weight: 3, fillOpacity: 0.1 }}
        />
      )}
    </MapContainer>
  );
}
