// AyaOne Verify — DEMO data for the company (CSR) portal.
// All figures are sample data for "ABC Industries Ltd". Replace with real
// tables (companies, csr_projects, initiatives, payments, issues, claims).

export const COMPANY = "ABC Industries Ltd";
export const PROGRAMME = "Tamil Nadu regenerative farming programme";
export const ISSUED_CREDITS = 7467;
export const CREDIT_PRICE = 900;
export const FARMER_SHARE = 0.6;

export const PROFILES = [
  { ini: "PS", org: COMPANY, name: "Priya Sharma", role: "CSR Head" },
  { ini: "RK", org: COMPANY, name: "Rahul Kumar", role: "Finance (view only)" },
  { ini: "SB", org: "State Bank (NBFC view)", name: "Loan officer", role: "financed farms" },
  { ini: "DT", org: "Thanjavur district", name: "Agriculture officer", role: "district view" },
];

export type Initiative = { name: string; partner: string; farmers: string; budget: number; spent: number; proof: number };
export const INITIATIVES: Initiative[] = [
  { name: "Farmer training", partner: "Cauvery Delta FPO", farmers: "5,012", budget: 32, spent: 28, proof: 4870 },
  { name: "No-burn mulching kits", partner: "Thanjavur Farmers PC", farmers: "3,900", budget: 40, spent: 31, proof: 1240 },
  { name: "Drip irrigation", partner: "Nagai Agro FPO", farmers: "1,120", budget: 50, spent: 24, proof: 610 },
  { name: "Agroforestry saplings", partner: "Cauvery Delta FPO", farmers: "2,300", budget: 30, spent: 14, proof: 880 },
  { name: "Women SHG livelihoods", partner: "Kudumbam NGO", farmers: "1,904", budget: 28, spent: 17, proof: 420 },
  { name: "Monitoring and MRV", partner: "AyaOne", farmers: "All", budget: 20, spent: 10, proof: 2100 },
];

export const PAYMENTS = [
  { date: "02 Sep", to: "FPO partner", forWhat: "Inputs batch 1", amount: "₹9.6 L", proof: "62 photos" },
  { date: "18 Sep", to: "412 farmers (DBT)", forWhat: "Input support", amount: "₹12.4 L", proof: "DBT refs" },
  { date: "04 Oct", to: "FPO partner", forWhat: "Inputs batch 2", amount: "₹7.2 L", proof: "118 photos" },
  { date: "20 Oct", to: "Field agents", forWhat: "Distribution visits", amount: "₹1.8 L", proof: "Visit logs" },
];

export const PHOTOS = [
  { color: "#a16207", title: "Mulching done", village: "Orathanadu", gps: "10.62°N 79.25°E" },
  { color: "#4d7c0f", title: "Kits delivered", village: "Mannargudi", gps: "10.66°N 79.45°E" },
  { color: "#b45309", title: "Training, 46 farmers", village: "Kodavasal", gps: "10.85°N 79.48°E" },
  { color: "#166534", title: "No burning after harvest", village: "Kilvelur", gps: "10.77°N 79.74°E" },
];

export type Issue = { title: string; where: string; owner: string; due: string; done: boolean; overdue?: boolean };
export const ISSUES: Issue[] = [
  { title: "Field visit overdue", where: "TN-214 · Mannargudi", owner: "Field agent FA-21", due: "22 Nov", done: false, overdue: true },
  { title: "Soil moisture low", where: "TN-088 · Kodavasal", owner: "Farmer advised", due: "26 Nov", done: false },
  { title: "Payment waiting on bank", where: "412 farmers · DBT batch", owner: "AyaOne finance", due: "25 Nov", done: false },
  { title: "Photo outside boundary", where: "TN-031 · Orathanadu", owner: "Ops review", due: "20 Nov", done: true },
];

export type Claim = { id: string; purpose: string; qty: number; step: number };
export const CLAIMS: Claim[] = [
  { id: "CL-0001", purpose: "BRSR disclosure", qty: 2000, step: 5 },
  { id: "CL-0002", purpose: "Scope 1 offset", qty: 1500, step: 3 },
];
export const CLAIM_STEPS = ["Claim submitted", "Credits reserved", "Payment in escrow", "Registry transfer", "Retired, certificate issued"];
export const PURPOSES = ["Scope 1 offset", "BRSR disclosure", "Product claim"];

export type FeedItem = { title: string; sub: string; tag: string; tone: "ok" | "info" | "warn" };
export const SEED_FEED: FeedItem[] = [
  { title: "Mulching photo logged", sub: "Orathanadu · GPS verified", tag: "Proof", tone: "info" },
  { title: "Satellite pass processed", sub: "1,180 plots · no fires detected", tag: "Satellite", tone: "ok" },
  { title: "Soil moisture low on TN-088", sub: "Sensor · advisory sent to farmer", tag: "Issue", tone: "warn" },
];

export const REPORTS = [
  { kind: "csr", fmt: "PDF", title: "CSR impact report FY 2026–27", sub: "For your board and annual CSR filing" },
  { kind: "brsr", fmt: "PDF", title: "BRSR Principle 6 indicators", sub: "Emissions avoided, water, land under sustainable practice" },
  { kind: "monitoring", fmt: "PDF", title: "Quarterly monitoring report", sub: "Satellite, sensors, field visits · Jul–Sep 2026" },
  { kind: "farmers", fmt: "CSV", title: "Farmer benefit statement", sub: "Every farmer, practice and payment" },
  { kind: "ledger", fmt: "CSV", title: "Fund ledger", sub: "Every rupee with its proof reference" },
] as const;

export const inr = (n: number) => Math.round(n).toLocaleString("en-IN");
