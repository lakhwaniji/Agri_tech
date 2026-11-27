import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { DemoBadge } from "@/components/DemoBadge";
import { isDemoMode } from "@/lib/demo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Render at request time so DEMO_MODE from AWS Secrets Manager (runtime env)
// takes effect without rebuilding the image.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  appleWebApp: { capable: true, title: "AyaOne", statusBarStyle: "default" },
  title: "AyaOne",
  description:
    "AyaOne — every farm mapped, every farmer financed. Farm digitisation, satellite crop health, credit and inputs for Indian farmers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
        {isDemoMode() && <DemoBadge />}
      </body>
    </html>
  );
}
