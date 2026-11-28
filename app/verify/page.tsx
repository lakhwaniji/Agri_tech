import type { Metadata } from "next";
import { VerifyApp } from "@/components/verify/VerifyApp";

export const metadata: Metadata = {
  title: "AyaOne Verify",
  description: "Track CSR money from farm to report: funds, live monitoring, carbon credits and reports.",
};

// AyaOne Verify — company / CSR portal. Demo: sample data, demo profiles.
export default function VerifyPage() {
  return <VerifyApp />;
}
