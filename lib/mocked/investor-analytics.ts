// DEMO DATA for the investor analytics dashboard (/ops/analytics).
// Every number here is made up to show how the dashboard will look at
// network scale. Production swap-in point: replace with aggregate queries
// over farms / farm_green_details / marketplace orders, grouped by state.

export type StateStat = {
  id: string;
  name: string;
  farms: number;
  areaHa: number;
  co2Tons: number; // expected CO₂ captured per year
};

export const STATE_STATS: StateStat[] = [
  { id: "KA", name: "Karnataka", farms: 412, areaHa: 1180, co2Tons: 2950 },
  { id: "TN", name: "Tamil Nadu", farms: 318, areaHa: 905, co2Tons: 2240 },
  { id: "AP", name: "Andhra Pradesh", farms: 276, areaHa: 820, co2Tons: 1890 },
  { id: "MH", name: "Maharashtra", farms: 241, areaHa: 760, co2Tons: 1610 },
  { id: "UP", name: "Uttar Pradesh", farms: 198, areaHa: 540, co2Tons: 1120 },
  { id: "RJ", name: "Rajasthan", farms: 87, areaHa: 410, co2Tons: 520 },
];

// Network-wide monthly enrollments; a single state gets its share of these.
export const MONTHLY_ENROLLMENTS = [
  { month: "May", farms: 96 },
  { month: "Jun", farms: 148 },
  { month: "Jul", farms: 201 },
  { month: "Aug", farms: 263 },
  { month: "Sep", farms: 334 },
  { month: "Oct", farms: 490 },
];

export const FUNNEL = [
  { label: "Registered", share: 1 },
  { label: "Agent visit done", share: 0.78 },
  { label: "Green details captured", share: 0.61 },
  { label: "Carbon-ready", share: 0.34 },
];

export const FLAGGED_FARMS = [
  { state: "KA", farm: "Manalur 1", place: "Mandya, Karnataka", issue: "Satellite NDVI reads 0 — likely cloud cover, re-check" },
  { state: "TN", farm: "Thirumandurai plot 1", place: "Thanjavur, Tamil Nadu", issue: "Agent visit overdue by 14 days" },
  { state: "AP", farm: "Guntur east field", place: "Guntur, Andhra Pradesh", issue: "Boundary has fewer than 3 points" },
  { state: "MH", farm: "Nashik vineyard 3", place: "Nashik, Maharashtra", issue: "Green details missing after visit" },
  { state: "UP", farm: "Mathura farm 2", place: "Mathura, Uttar Pradesh", issue: "Tree count far above satellite estimate" },
  { state: "KA", farm: "Hosur road plot", place: "Bengaluru Rural, Karnataka", issue: "Agent visit overdue by 9 days" },
];

export const ORDER_CATEGORIES = [
  { name: "Fertilizer", share: 0.34 },
  { name: "Seeds", share: 0.27 },
  { name: "Pesticide", share: 0.18 },
  { name: "Equipment", share: 0.12 },
  { name: "Green-tagged", share: 0.09 },
];

// Demo ratios used to derive the other figures from farm counts.
export const RATIOS = {
  farmersPerFarm: 0.83,
  co2CapturedToDateShare: 0.38,
  ordersPerFarm: 3.4,
  avgOrderValue: 2350,
  buyerShare: 0.64,
  repeatBuyerShare: 0.41,
  co2AvoidedPerOrder: 0.031,
  treesPerFarm: 46,
  co2PerCarPerYear: 4.6,
  o2PerCo2: 0.727,
  districtsTotal: 38,
};

// One square per state, roughly where it sits on the map (row, column on an
// 8-column grid). A tile map — not to scale.
export const TILE_LAYOUT: [string, number, number, string][] = [
  ["JK", 0, 2, "Jammu & Kashmir"],
  ["PB", 1, 1, "Punjab"], ["HP", 1, 2, "Himachal Pradesh"], ["UK", 1, 3, "Uttarakhand"],
  ["RJ", 2, 0, "Rajasthan"], ["HR", 2, 1, "Haryana"], ["DL", 2, 2, "Delhi"], ["UP", 2, 3, "Uttar Pradesh"],
  ["BR", 2, 4, "Bihar"], ["SK", 2, 5, "Sikkim"], ["AS", 2, 6, "Assam"], ["AR", 2, 7, "Arunachal Pradesh"],
  ["GJ", 3, 0, "Gujarat"], ["MP", 3, 1, "Madhya Pradesh"], ["CG", 3, 2, "Chhattisgarh"], ["JH", 3, 3, "Jharkhand"],
  ["WB", 3, 4, "West Bengal"], ["ML", 3, 6, "Meghalaya"], ["NL", 3, 7, "Nagaland"],
  ["MH", 4, 1, "Maharashtra"], ["TS", 4, 2, "Telangana"], ["OD", 4, 3, "Odisha"], ["TR", 4, 6, "Tripura"], ["MN", 4, 7, "Manipur"],
  ["GA", 5, 0, "Goa"], ["KA", 5, 1, "Karnataka"], ["AP", 5, 2, "Andhra Pradesh"], ["MZ", 5, 7, "Mizoram"],
  ["KL", 6, 1, "Kerala"], ["TN", 6, 2, "Tamil Nadu"],
];
