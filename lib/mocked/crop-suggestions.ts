// Production swap-in point: replace getSeasonFromMonth() and
// SUGGESTIONS lookup with a real ML service or weather-API-driven
// recommendation engine. The route contract (/api/crop-suggestions) stays
// the same — only this file changes.

export type Season = "kharif" | "rabi" | "zaid";

export type CropSuggestion = {
  name: string;
  emoji: string;
  reason: string; // one short English sentence — UI renders via i18n wrapper
};

export function getSeasonFromMonth(month: number): Season {
  if (month >= 6 && month <= 10) return "kharif";
  if (month >= 11 || month <= 2) return "rabi";
  return "zaid";
}

type StateGroup = "north" | "central" | "west" | "south_peninsular" | "kerala" | "east";

const STATE_GROUP: Record<string, StateGroup> = {
  "uttar pradesh": "north",
  "punjab":        "north",
  "haryana":       "north",
  "bihar":         "north",
  "rajasthan":     "north",
  "uttarakhand":   "north",
  "himachal pradesh": "north",
  "jammu and kashmir": "north",
  "madhya pradesh": "central",
  "chhattisgarh":  "central",
  "jharkhand":     "central",
  "maharashtra":   "west",
  "gujarat":       "west",
  "telangana":     "south_peninsular",
  "andhra pradesh":"south_peninsular",
  "tamil nadu":    "south_peninsular",
  "karnataka":     "south_peninsular",
  "kerala":        "kerala",
  "west bengal":   "east",
  "odisha":        "east",
  "assam":         "east",
};

const SUGGESTIONS: Record<StateGroup, Record<Season, CropSuggestion[]>> = {
  north: {
    kharif: [
      { name: "Paddy",     emoji: "🌾", reason: "Ideal for monsoon season in northern plains — high water availability." },
      { name: "Maize",     emoji: "🌽", reason: "Fast-growing, good market demand; suits loamy soils of UP and Bihar." },
      { name: "Sugarcane", emoji: "🎋", reason: "Long-duration cash crop; well-suited to UP and Haryana conditions." },
      { name: "Soybean",   emoji: "🌱", reason: "Emerging Kharif crop with strong MSP support; nitrogen-fixing." },
    ],
    rabi: [
      { name: "Wheat",     emoji: "🌾", reason: "Prime Rabi crop for northern India — high yield, strong market." },
      { name: "Mustard",   emoji: "🌻", reason: "Cold-tolerant oilseed; strong demand and government MSP support." },
      { name: "Pulses",    emoji: "🫘", reason: "Chickpea and lentil suit dry Rabi conditions; improves soil health." },
      { name: "Barley",    emoji: "🌾", reason: "Water-efficient grain; good choice in low-rainfall Rabi zones." },
    ],
    zaid: [
      { name: "Maize",     emoji: "🌽", reason: "Short-duration varieties fit the Zaid window well." },
      { name: "Groundnut", emoji: "🥜", reason: "Summer groundnut performs well in sandy-loam soils." },
      { name: "Mung Bean", emoji: "🫘", reason: "Short-duration pulse; improves soil nitrogen for next Kharif." },
    ],
  },
  central: {
    kharif: [
      { name: "Soybean",   emoji: "🌱", reason: "MP and Chhattisgarh are India's top soybean belt — ideal fit." },
      { name: "Paddy",     emoji: "🌾", reason: "Well-suited to heavy Kharif rainfall in central India." },
      { name: "Cotton",    emoji: "🌿", reason: "Black cotton soils in Vidarbha and central MP are ideal for this." },
      { name: "Maize",     emoji: "🌽", reason: "Good alternative to paddy in lighter soils; water-efficient." },
    ],
    rabi: [
      { name: "Wheat",     emoji: "🌾", reason: "Rabi staple for central India; stable yields with canal irrigation." },
      { name: "Pulses",    emoji: "🫘", reason: "Chickpea thrives in Rabi in MP — one of the largest producers." },
      { name: "Mustard",   emoji: "🌻", reason: "Oilseed with low water need; fits Rabi schedule well." },
    ],
    zaid: [
      { name: "Mung Bean", emoji: "🫘", reason: "Short-duration Zaid pulse; improves soil for next Kharif." },
      { name: "Groundnut", emoji: "🥜", reason: "Suits light soils of central India in the Zaid window." },
    ],
  },
  west: {
    kharif: [
      { name: "Cotton",    emoji: "🌿", reason: "Maharashtra and Gujarat are India's largest cotton producers." },
      { name: "Groundnut", emoji: "🥜", reason: "Gujarat's prime Kharif oilseed — strong state procurement support." },
      { name: "Soybean",   emoji: "🌱", reason: "Growing Kharif option in Vidarbha and Marathwada." },
      { name: "Sugarcane", emoji: "🎋", reason: "Major cash crop in western Maharashtra sugar belt." },
    ],
    rabi: [
      { name: "Wheat",     emoji: "🌾", reason: "Important Rabi grain in Gujarat and parts of Maharashtra." },
      { name: "Pulses",    emoji: "🫘", reason: "Chickpea (Harbhara) is a key Rabi crop across Maharashtra." },
      { name: "Mustard",   emoji: "🌻", reason: "Low-water oilseed; suits Rabi in drier Gujarat districts." },
    ],
    zaid: [
      { name: "Groundnut", emoji: "🥜", reason: "Summer groundnut (irrigated) is a strong choice in Gujarat." },
      { name: "Mung Bean", emoji: "🫘", reason: "Zaid legume that suits warm conditions and light soils." },
    ],
  },
  south_peninsular: {
    kharif: [
      { name: "Paddy",     emoji: "🌾", reason: "First Kharif (Kharif/Vanakalam) paddy season — backbone of AP, Telangana, Karnataka." },
      { name: "Cotton",    emoji: "🌿", reason: "Black soil regions of Telangana and northern Karnataka are ideal." },
      { name: "Maize",     emoji: "🌽", reason: "High-yield maize belt in Telangana and AP during Kharif." },
      { name: "Groundnut", emoji: "🥜", reason: "Prominent Kharif oilseed in Tamil Nadu and Karnataka." },
    ],
    rabi: [
      { name: "Paddy",     emoji: "🌾", reason: "Second (Rabi) paddy season is strong across South India with irrigation." },
      { name: "Pulses",    emoji: "🫘", reason: "Red gram (tur) and chickpea suit the Rabi window in AP/TN." },
      { name: "Mustard",   emoji: "🌻", reason: "Emerging oilseed option in cooler Rabi conditions of Karnataka." },
    ],
    zaid: [
      { name: "Paddy",     emoji: "🌾", reason: "Short-duration summer paddy with good irrigation support." },
      { name: "Groundnut", emoji: "🥜", reason: "Well-suited to TN and Karnataka in the Zaid season." },
      { name: "Mung Bean", emoji: "🫘", reason: "Short-season pulse that fits between Rabi harvest and Kharif sowing." },
    ],
  },
  kerala: {
    kharif: [
      { name: "Paddy",     emoji: "🌾", reason: "Virippu (first crop) paddy is the cornerstone of Kerala farming." },
      { name: "Banana",    emoji: "🍌", reason: "Year-round crop; highest value-per-acre in Kerala's smallholder farms." },
      { name: "Groundnut", emoji: "🥜", reason: "Good Kharif option for laterite upland areas of Kerala." },
    ],
    rabi: [
      { name: "Paddy",     emoji: "🌾", reason: "Mundakan (second crop) paddy after Kharif harvest with irrigation." },
      { name: "Banana",    emoji: "🍌", reason: "Perennial crop — planting in Rabi gives good Nendran yield." },
      { name: "Pulses",    emoji: "🫘", reason: "Black-eyed pea and cowpea suit Kerala's Rabi conditions." },
    ],
    zaid: [
      { name: "Banana",    emoji: "🍌", reason: "Planting in Zaid avoids monsoon disease pressure at early stage." },
      { name: "Mung Bean", emoji: "🫘", reason: "Short-duration pulse bridges the gap before Kharif sowing." },
      { name: "Groundnut", emoji: "🥜", reason: "Short-duration summer groundnut works in upland Kerala." },
    ],
  },
  east: {
    kharif: [
      { name: "Paddy",     emoji: "🌾", reason: "West Bengal and Odisha are major Aman (Kharif) paddy states." },
      { name: "Jute",      emoji: "🌿", reason: "Bengal is India's largest jute producer — strong Kharif crop." },
      { name: "Maize",     emoji: "🌽", reason: "Increasingly popular in upland areas of eastern states." },
    ],
    rabi: [
      { name: "Wheat",     emoji: "🌾", reason: "Boro wheat is grown post-Kharif paddy in Bihar and WB." },
      { name: "Paddy",     emoji: "🌾", reason: "Boro (Rabi) paddy with irrigation is common in WB and Assam." },
      { name: "Pulses",    emoji: "🫘", reason: "Masur (lentil) and chickpea suit eastern Rabi conditions." },
      { name: "Mustard",   emoji: "🌻", reason: "Key Rabi oilseed across Bihar, WB, and Assam." },
    ],
    zaid: [
      { name: "Mung Bean", emoji: "🫘", reason: "Popular short-duration Zaid pulse in eastern India." },
      { name: "Groundnut", emoji: "🥜", reason: "Summer groundnut suits upland sandy soils in the east." },
    ],
  },
};

const DEFAULT_SUGGESTIONS: Record<Season, CropSuggestion[]> = {
  kharif: [
    { name: "Paddy",     emoji: "🌾", reason: "Reliable Kharif staple across most of India." },
    { name: "Maize",     emoji: "🌽", reason: "Versatile Kharif crop; good market demand nationwide." },
    { name: "Groundnut", emoji: "🥜", reason: "Popular Kharif oilseed with strong procurement support." },
  ],
  rabi: [
    { name: "Wheat",     emoji: "🌾", reason: "Primary Rabi grain crop across India." },
    { name: "Pulses",    emoji: "🫘", reason: "Nitrogen-fixing legume; suits most Rabi zones." },
    { name: "Mustard",   emoji: "🌻", reason: "Low-water oilseed with wide adaptability." },
  ],
  zaid: [
    { name: "Mung Bean", emoji: "🫘", reason: "Short-duration pulse ideal for Zaid fallow period." },
    { name: "Groundnut", emoji: "🥜", reason: "Summer groundnut suits irrigated Zaid conditions." },
    { name: "Maize",     emoji: "🌽", reason: "Short-duration varieties fit the Zaid window." },
  ],
};

export function getCropSuggestions(state: string, season: Season): CropSuggestion[] {
  const group = STATE_GROUP[state.toLowerCase()];
  return group ? SUGGESTIONS[group][season] : DEFAULT_SUGGESTIONS[season];
}
