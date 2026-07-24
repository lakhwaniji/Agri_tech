// Production swap-in point: replace static lists with live Marketplace API
// queries filtered by crop type.

type RawItem = {
  name: string;
  category: "fertilizer" | "pesticide" | "seed" | "equipment";
  priceRange: string;
};

export type MarketplaceItem = RawItem & { recommended: boolean };

// Items we vouch for — shown with an "Our Pick" badge. Named centrally
// (rather than as a field on every crop's copy of the item) so the same
// product name reads as recommended everywhere it appears, not just in
// whichever crop list happens to be marked.
const RECOMMENDED_NAMES = new Set<string>([
  "IR36 Paddy Seeds (5 kg)",
  "Hybrid Maize Seeds (3 kg)",
  "Urea (45 kg bag)",
  "DAP (50 kg bag)",
  "General Pesticide Spray",
  "Mancozeb 75 WP (500 g)",
  "Knapsack Sprayer (16 L)",
  "Portable Water Pump",
]);

function withRecommended(item: RawItem): MarketplaceItem {
  return { ...item, recommended: RECOMMENDED_NAMES.has(item.name) };
}

const ITEMS: Record<string, RawItem[]> = {
  Paddy: [
    { name: "Urea (45 kg bag)",         category: "fertilizer", priceRange: "₹270–₹290" },
    { name: "Chlorpyrifos 20 EC (1 L)", category: "pesticide",  priceRange: "₹200–₹240" },
    { name: "IR36 Paddy Seeds (5 kg)",  category: "seed",       priceRange: "₹180–₹220" },
    { name: "Portable Water Pump",      category: "equipment",  priceRange: "₹3,500–₹5,000" },
  ],
  Wheat: [
    { name: "DAP (50 kg bag)",          category: "fertilizer", priceRange: "₹1,350–₹1,400" },
    { name: "Propiconazole 25 EC",      category: "pesticide",  priceRange: "₹320–₹380" },
    { name: "HD3226 Wheat Seeds (5 kg)",category: "seed",       priceRange: "₹140–₹175" },
    { name: "Mini Thresher (rental)",   category: "equipment",  priceRange: "₹1,200/day" },
  ],
  Cotton: [
    { name: "NPK 20:20:0 (50 kg)",      category: "fertilizer", priceRange: "₹1,100–₹1,200" },
    { name: "Spinosad 45 SC (250 ml)",  category: "pesticide",  priceRange: "₹420–₹480" },
    { name: "Bollgard II BT Seeds",     category: "seed",       priceRange: "₹750–₹850/packet" },
    { name: "Drip Irrigation Kit",      category: "equipment",  priceRange: "₹12,000–₹18,000/acre" },
  ],
  Maize: [
    { name: "Urea (45 kg bag)",         category: "fertilizer", priceRange: "₹270–₹290" },
    { name: "Emamectin Benzoate 5 SG",  category: "pesticide",  priceRange: "₹280–₹340" },
    { name: "Hybrid Maize Seeds (3 kg)",category: "seed",       priceRange: "₹1,200–₹1,500" },
    { name: "Knapsack Sprayer (16 L)",  category: "equipment",  priceRange: "₹900–₹1,200" },
  ],
  Sugarcane: [
    { name: "NPK 15:15:15 (50 kg)",     category: "fertilizer", priceRange: "₹1,100–₹1,250" },
    { name: "Carbofuran 3G (5 kg)",     category: "pesticide",  priceRange: "₹320–₹380" },
    { name: "Sugarcane Setts (per acre)",category: "seed",      priceRange: "₹4,000–₹6,000" },
    { name: "Trash Mulcher (rental)",   category: "equipment",  priceRange: "₹1,500/day" },
  ],
  Pulses: [
    { name: "DAP (50 kg bag)",          category: "fertilizer", priceRange: "₹1,350–₹1,400" },
    { name: "NSKE 5% Spray (1 L)",      category: "pesticide",  priceRange: "₹90–₹120" },
    { name: "JG11 Chickpea Seeds (5 kg)",category: "seed",      priceRange: "₹200–₹240" },
    { name: "Seed Drill (rental)",      category: "equipment",  priceRange: "₹600/acre" },
  ],
  Groundnut: [
    { name: "Gypsum (50 kg)",           category: "fertilizer", priceRange: "₹120–₹150" },
    { name: "Mancozeb 75 WP (500 g)",   category: "pesticide",  priceRange: "₹180–₹220" },
    { name: "TAG24 Groundnut Seeds",    category: "seed",       priceRange: "₹90–₹110/kg" },
    { name: "Portable Water Pump",      category: "equipment",  priceRange: "₹3,500–₹5,000" },
  ],
  Mustard: [
    { name: "Borax (1 kg)",             category: "fertilizer", priceRange: "₹50–₹70" },
    { name: "Imidacloprid 17.8 SL",     category: "pesticide",  priceRange: "₹260–₹310" },
    { name: "Pusa Bold Mustard Seeds",  category: "seed",       priceRange: "₹80–₹100/kg" },
    { name: "Knapsack Sprayer (16 L)",  category: "equipment",  priceRange: "₹900–₹1,200" },
  ],
  Soybean: [
    { name: "Rhizobium Culture (200 g)", category: "fertilizer", priceRange: "₹40–₹60" },
    { name: "Chlorantraniliprole 18.5 SC",category:"pesticide",  priceRange: "₹1,100–₹1,300/100ml" },
    { name: "JS335 Soybean Seeds (5 kg)",category: "seed",       priceRange: "₹280–₹320" },
    { name: "Seed cum Fertiliser Drill", category: "equipment",  priceRange: "₹700/acre" },
  ],
  Banana: [
    { name: "NPK 13:00:45 (1 kg)",      category: "fertilizer", priceRange: "₹90–₹110" },
    { name: "Propiconazole 25 EC",      category: "pesticide",  priceRange: "₹320–₹380" },
    { name: "Tissue Culture Banana Plantlets", category: "seed", priceRange: "₹18–₹25/plant" },
    { name: "Drip Irrigation Kit",      category: "equipment",  priceRange: "₹10,000–₹15,000/acre" },
  ],
  "Mung Bean": [
    { name: "DAP (50 kg bag)",          category: "fertilizer", priceRange: "₹1,350–₹1,400" },
    { name: "Imidacloprid 17.8 SL",     category: "pesticide",  priceRange: "₹260–₹310" },
    { name: "Mung Bean Seeds (2 kg)",   category: "seed",       priceRange: "₹80–₹100" },
    { name: "Knapsack Sprayer (16 L)",  category: "equipment",  priceRange: "₹900–₹1,200" },
  ],
};

const DEFAULT_ITEMS: RawItem[] = [
  { name: "NPK Fertiliser (50 kg)",     category: "fertilizer", priceRange: "₹1,100–₹1,300" },
  { name: "General Pesticide Spray",    category: "pesticide",  priceRange: "₹200–₹400" },
  { name: "Knapsack Sprayer (16 L)",    category: "equipment",  priceRange: "₹900–₹1,200" },
];

export function getMarketplaceItems(cropType: string): MarketplaceItem[] {
  return (ITEMS[cropType] ?? DEFAULT_ITEMS).map(withRecommended);
}

// Full browsable catalog for the Marketplace page — flattens every crop's
// item list into one deduped set (same item, e.g. "Urea (45 kg bag)", is
// reused across multiple crops, so dedupe by name to avoid repeats).
export function getAllMarketplaceItems(): MarketplaceItem[] {
  const seen = new Map<string, RawItem>();
  for (const items of [...Object.values(ITEMS), DEFAULT_ITEMS]) {
    for (const item of items) {
      if (!seen.has(item.name)) seen.set(item.name, item);
    }
  }
  return Array.from(seen.values()).map(withRecommended);
}
