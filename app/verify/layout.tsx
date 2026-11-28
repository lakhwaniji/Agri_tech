import type { Metadata, Viewport } from "next";

// Everything under /verify installs as its own phone app, "AyaOne Verify".
export const metadata: Metadata = {
  title: "AyaOne Verify",
  description: "Track CSR money from farm to report: funds, live monitoring, carbon credits and reports.",
  manifest: "/verify/manifest.webmanifest",
  appleWebApp: { capable: true, title: "AyaOne Verify", statusBarStyle: "black-translucent" },
  // Icons come from app/verify/icon.png and app/verify/apple-icon.png.
};

export const viewport: Viewport = { themeColor: "#14261A" };

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
