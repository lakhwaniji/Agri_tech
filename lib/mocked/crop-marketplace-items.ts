// Production swap-in point: replace static lists with live Marketplace API
// queries filtered by crop type. Display-only in prototype — all CTAs show
// "coming soon" toast, no real navigation.

export type MarketplaceItem = {
  name: string;
  category: "fertilizer" | "pesticide" | "seed" | "equipment";
  priceRange: string;
  emoji: string;
};

const ITEMS: Record<string, MarketplaceItem[]> = {
  Paddy: [
    { name: "Urea (45 kg bag)",         category: "fertilizer", priceRange: "₹270–₹290",  emoji: "🧪" },
    { name: "Chlorpyrifos 20 EC (1 L)", category: "pesticide",  priceRange: "₹200–₹240",  emoji: "🌿" },
    { name: "IR36 Paddy Seeds (5 kg)",  category: "seed",       priceRange: "₹180–₹220",  emoji: "🌾" },
    { name: "Portable Water Pump",      category: "equipment",  priceRange: "₹3,500–₹5,000", emoji: "⚙️" },
  ],
  Wheat: [
    { name: "DAP (50 kg bag)",          category: "fertilizer", priceRange: "₹1,350–₹1,400", emoji: "🧪" },
    { name: "Propiconazole 25 EC",      category: "pesticide",  priceRange: "₹320–₹380",  emoji: "🌿" },
    { name: "HD3226 Wheat Seeds (5 kg)",category: "seed",       priceRange: "₹140–₹175",  emoji: "🌾" },
    { name: "Mini Thresher (rental)",   category: "equipment",  priceRange: "₹1,200/day", emoji: "⚙️" },
  ],
  Cotton: [
    { name: "NPK 20:20:0 (50 kg)",      category: "fertilizer", priceRange: "₹1,100–₹1,200", emoji: "🧪" },
    { name: "Spinosad 45 SC (250 ml)",  category: "pesticide",  priceRange: "₹420–₹480",  emoji: "🌿" },
    { name: "Bollgard II BT Seeds",     category: "seed",       priceRange: "₹750–₹850/packet", emoji: "🌿" },
    { name: "Drip Irrigation Kit",      category: "equipment",  priceRange: "₹12,000–₹18,000/acre", emoji: "💧" },
  ],
  Maize: [
    { name: "Urea (45 kg bag)",         category: "fertilizer", priceRange: "₹270–₹290",  emoji: "🧪" },
    { name: "Emamectin Benzoate 5 SG",  category: "pesticide",  priceRange: "₹280–₹340",  emoji: "🌿" },
    { name: "Hybrid Maize Seeds (3 kg)",category: "seed",       priceRange: "₹1,200–₹1,500", emoji: "🌽" },
    { name: "Knapsack Sprayer (16 L)",  category: "equipment",  priceRange: "₹900–₹1,200", emoji: "⚙️" },
  ],
  Sugarcane: [
    { name: "NPK 15:15:15 (50 kg)",     category: "fertilizer", priceRange: "₹1,100–₹1,250", emoji: "🧪" },
    { name: "Carbofuran 3G (5 kg)",     category: "pesticide",  priceRange: "₹320–₹380",  emoji: "🌿" },
    { name: "Sugarcane Setts (per acre)",category: "seed",      priceRange: "₹4,000–₹6,000", emoji: "🎋" },
    { name: "Trash Mulcher (rental)",   category: "equipment",  priceRange: "₹1,500/day", emoji: "⚙️" },
  ],
  Pulses: [
    { name: "DAP (50 kg bag)",          category: "fertilizer", priceRange: "₹1,350–₹1,400", emoji: "🧪" },
    { name: "NSKE 5% Spray (1 L)",      category: "pesticide",  priceRange: "₹90–₹120",   emoji: "🌿" },
    { name: "JG11 Chickpea Seeds (5 kg)",category: "seed",      priceRange: "₹200–₹240",  emoji: "🫘" },
    { name: "Seed Drill (rental)",      category: "equipment",  priceRange: "₹600/acre",  emoji: "⚙️" },
  ],
  Groundnut: [
    { name: "Gypsum (50 kg)",           category: "fertilizer", priceRange: "₹120–₹150",  emoji: "🧪" },
    { name: "Mancozeb 75 WP (500 g)",   category: "pesticide",  priceRange: "₹180–₹220",  emoji: "🌿" },
    { name: "TAG24 Groundnut Seeds",    category: "seed",       priceRange: "₹90–₹110/kg", emoji: "🥜" },
    { name: "Portable Water Pump",      category: "equipment",  priceRange: "₹3,500–₹5,000", emoji: "⚙️" },
  ],
  Mustard: [
    { name: "Borax (1 kg)",             category: "fertilizer", priceRange: "₹50–₹70",    emoji: "🧪" },
    { name: "Imidacloprid 17.8 SL",     category: "pesticide",  priceRange: "₹260–₹310",  emoji: "🌿" },
    { name: "Pusa Bold Mustard Seeds",  category: "seed",       priceRange: "₹80–₹100/kg", emoji: "🌻" },
    { name: "Knapsack Sprayer (16 L)",  category: "equipment",  priceRange: "₹900–₹1,200", emoji: "⚙️" },
  ],
  Soybean: [
    { name: "Rhizobium Culture (200 g)", category: "fertilizer", priceRange: "₹40–₹60",   emoji: "🧪" },
    { name: "Chlorantraniliprole 18.5 SC",category:"pesticide",  priceRange: "₹1,100–₹1,300/100ml", emoji: "🌿" },
    { name: "JS335 Soybean Seeds (5 kg)",category: "seed",       priceRange: "₹280–₹320", emoji: "🌱" },
    { name: "Seed cum Fertiliser Drill", category: "equipment",  priceRange: "₹700/acre", emoji: "⚙️" },
  ],
  Banana: [
    { name: "NPK 13:00:45 (1 kg)",      category: "fertilizer", priceRange: "₹90–₹110",   emoji: "🧪" },
    { name: "Propiconazole 25 EC",      category: "pesticide",  priceRange: "₹320–₹380",  emoji: "🌿" },
    { name: "Tissue Culture Banana Plantlets", category: "seed", priceRange: "₹18–₹25/plant", emoji: "🍌" },
    { name: "Drip Irrigation Kit",      category: "equipment",  priceRange: "₹10,000–₹15,000/acre", emoji: "💧" },
  ],
  "Mung Bean": [
    { name: "DAP (50 kg bag)",          category: "fertilizer", priceRange: "₹1,350–₹1,400", emoji: "🧪" },
    { name: "Imidacloprid 17.8 SL",     category: "pesticide",  priceRange: "₹260–₹310",  emoji: "🌿" },
    { name: "Mung Bean Seeds (2 kg)",   category: "seed",       priceRange: "₹80–₹100",   emoji: "🫘" },
    { name: "Knapsack Sprayer (16 L)",  category: "equipment",  priceRange: "₹900–₹1,200", emoji: "⚙️" },
  ],
};

const DEFAULT_ITEMS: MarketplaceItem[] = [
  { name: "NPK Fertiliser (50 kg)",     category: "fertilizer", priceRange: "₹1,100–₹1,300", emoji: "🧪" },
  { name: "General Pesticide Spray",    category: "pesticide",  priceRange: "₹200–₹400",  emoji: "🌿" },
  { name: "Knapsack Sprayer (16 L)",    category: "equipment",  priceRange: "₹900–₹1,200", emoji: "⚙️" },
];

export function getMarketplaceItems(cropType: string): MarketplaceItem[] {
  return ITEMS[cropType] ?? DEFAULT_ITEMS;
}
