// Separate web app manifest for AyaOne Verify, so it installs on a phone as
// its own app ("AyaOne Verify", own icon, opens /verify) next to the farmer
// AyaOne app.
export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      id: "/verify",
      name: "AyaOne Verify",
      short_name: "Verify",
      description: "Track CSR money from farm to report: funds, live monitoring, carbon credits and reports.",
      start_url: "/verify",
      scope: "/verify",
      display: "standalone",
      background_color: "#14261A",
      theme_color: "#14261A",
      icons: [
        { src: "/verify/verify-icon.svg", sizes: "any", type: "image/svg+xml" },
        { src: "/verify/verify-192.png", sizes: "192x192", type: "image/png" },
        { src: "/verify/verify-512.png", sizes: "512x512", type: "image/png" },
        { src: "/verify/verify-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } },
  );
}
