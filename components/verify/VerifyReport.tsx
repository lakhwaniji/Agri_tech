"use client";

import { useEffect, useState } from "react";
import { VerifyMark, VerifyWordmark } from "@/components/verify/VerifyMarks";
import { COMPANY, CREDIT_PRICE, FARMER_SHARE, INITIATIVES, PAYMENTS, PROGRAMME, inr } from "@/components/verify/data";

// Printable demo reports (Save as PDF from the print window) and CSV exports.
const FARMERS = [
  ["AYA-F-10231", "Gopal", "Manalur", "Cauvery Delta FPO", "No-burn mulching", 24600],
  ["AYA-F-10268", "Lakshmi R", "Mannargudi", "Thanjavur Farmers PC", "Drip irrigation", 18200],
  ["AYA-F-10305", "Senthil K", "Kodavasal", "Nagai Agro FPO", "Reduced urea", 9400],
  ["AYA-F-10342", "Kavitha M", "Kilvelur", "Cauvery Delta FPO", "Agroforestry border", 12750],
  ["AYA-F-10379", "Murugan S", "Orathanadu", "Thanjavur Farmers PC", "No-burn mulching", 15300],
];

function csvFor(type: string) {
  if (type === "farmers") {
    return ["farmer_id,name,village,fpo,practice,paid_inr", ...FARMERS.map((r) => r.join(","))].join("\n");
  }
  return ["date,paid_to,purpose,amount,proof", ...PAYMENTS.map((p) => [p.date, p.to, p.forWhat, p.amount.replace("₹", "INR "), p.proof].join(","))].join("\n");
}

export function VerifyReport({ type, claim, qty }: { type: string; claim: string; qty: number }) {
  const isCsv = type === "farmers" || type === "ledger";
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isCsv) {
      const blob = new Blob([csvFor(type)], { type: "text/csv" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `AyaOne_${type === "farmers" ? "farmer_statement" : "fund_ledger"}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
      const t = setTimeout(() => setSaved(true), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => window.print(), 600);
    return () => clearTimeout(t);
  }, [isCsv, type]);

  if (isCsv) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-6 text-center">
        <div className="rounded-3xl bg-white p-8">
          <VerifyMark size={46} />
          <p className="mt-3 font-semibold">{saved ? "Your CSV has downloaded." : "Preparing your CSV…"}</p>
          <button type="button" onClick={() => window.close()} className="mt-4 min-h-11 rounded-xl border border-zinc-300 px-4 text-sm font-semibold">Close tab</button>
        </div>
      </div>
    );
  }

  const title = {
    csr: "CSR impact report, FY 2026–27", brsr: "BRSR Principle 6: environmental indicators",
    monitoring: "Quarterly monitoring report, Jul–Sep 2026", certificate: "Certificate of retirement",
  }[type] ?? "Report";
  const spent = INITIATIVES.reduce((a, i) => a + i.spent, 0);

  return (
    <div className="mx-auto max-w-3xl bg-white p-8 text-zinc-900 print:p-0">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-3"><VerifyMark size={40} /><VerifyWordmark size={20} /></div>
        <div className="text-right text-xs text-zinc-500">Generated {new Date().toLocaleString("en-IN")}<br />Demo report · sample data</div>
      </div>
      <h1 className="mt-6 text-2xl font-bold">{title}</h1>
      <p className="text-sm text-zinc-600">{COMPANY} · {PROGRAMME} · Thanjavur, Tiruvarur, Nagapattinam</p>

      {type === "certificate" ? (
        <div className="mt-8 rounded-2xl border-2 border-emerald-700 p-8 text-center">
          <p className="text-5xl font-bold text-emerald-700">{inr(qty)} tCO₂e</p>
          <p className="mt-3">retired on behalf of <b>{COMPANY}</b></p>
          <p className="text-sm text-zinc-600">Claim {claim} · VCS 2026 vintage · VM0042</p>
          <p className="mt-2 text-sm text-zinc-600">Farmers benefited: ₹{inr(qty * CREDIT_PRICE * FARMER_SHARE)} paid by DBT</p>
        </div>
      ) : (
        <>
          <h2 className="mt-6 font-semibold">Summary</h2>
          <table className="mt-2 w-full text-sm"><tbody>
            {[["CSR budget committed", "₹2.00 crore (2% obligation met)"], ["Funds spent", `₹${(spent / 100).toFixed(2)} crore`], ["Farmers reached", "5,012 (38% women)"],
              ["Area monitored", "10,240 acres · 1,180 plots"], ["Burning avoided", "3,900 acres · 0 fires since enrolment"], ["Estimated CO₂ reduced", "8,214 t (pending verification)"]].map(([a, b]) => (
              <tr key={a} className="border-b border-zinc-100"><td className="py-2 text-zinc-600">{a}</td><td className="py-2 text-right font-semibold">{b}</td></tr>
            ))}
          </tbody></table>
          <h2 className="mt-6 font-semibold">Spending by initiative (₹ lakh)</h2>
          <table className="mt-2 w-full text-sm"><tbody>
            {INITIATIVES.map((i) => (
              <tr key={i.name} className="border-b border-zinc-100"><td className="py-2">{i.name}</td><td className="py-2 text-zinc-600">{i.partner}</td><td className="py-2 text-right font-semibold">{i.spent} / {i.budget}</td></tr>
            ))}
          </tbody></table>
          {type === "csr" && (
            <>
              <h2 className="mt-6 font-semibold">Schedule VII mapping</h2>
              <ul className="mt-2 list-disc pl-5 text-sm"><li>(i) Eradicating hunger and poverty: farmer income</li><li>(iv) Environmental sustainability, agroforestry, soil and water</li><li>(x) Rural development projects</li></ul>
            </>
          )}
        </>
      )}
      <p className="mt-8 text-xs text-zinc-500">All figures are sample data for demonstration. Carbon volumes are estimates and become credits only after independent verification and registry issuance. Field evidence is geotagged, timestamped and fingerprinted in AyaOne.</p>
      <button type="button" onClick={() => window.print()} className="mt-6 min-h-11 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white print:hidden">Print / Save as PDF</button>
    </div>
  );
}
