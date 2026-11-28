import type { Metadata } from "next";
import { VerifyReport } from "@/components/verify/VerifyReport";

export const metadata: Metadata = { title: "AyaOne Verify report" };

export default async function ReportPage({ searchParams }: { searchParams: Promise<{ type?: string; claim?: string; qty?: string }> }) {
  const { type, claim, qty } = await searchParams;
  return <VerifyReport type={type ?? "csr"} claim={claim ?? ""} qty={Number(qty) || 0} />;
}
