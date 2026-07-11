// Production swap-in point: replace the static RULES object with a call to an
// agronomy API or ML model. Route contract stays the same.

export type AdvisoryRule = {
  irrigation: string;
  fertilizer: string;
  pestAlert: string;
};

const RULES: Record<string, AdvisoryRule> = {
  Paddy: {
    irrigation:  "Keep fields flooded (5–7 cm) during the vegetative stage. Drain fields 10 days before harvest to aid ripening.",
    fertilizer:  "Apply NPK at 120:60:60 kg/ha. Top-dress with urea at 30 days and again at 55 days after transplanting.",
    pestAlert:   "Watch for Brown Plant Hopper (BPH) — drain fields immediately if detected, then apply chlorpyrifos 2.5 ml/L.",
  },
  Wheat: {
    irrigation:  "Six irrigations are critical: crown root initiation, tillering, jointing, flowering, milking, and dough stage.",
    fertilizer:  "Apply NPK at 120:60:40 kg/ha at sowing. Top-dress with full nitrogen dose at first irrigation (tillering).",
    pestAlert:   "Monitor for Yellow Rust — if yellow stripes appear on leaves, apply propiconazole 0.1% immediately.",
  },
  Cotton: {
    irrigation:  "Irrigate every 10–15 days. Avoid waterlogging — cotton roots are sensitive to standing water.",
    fertilizer:  "Apply NPK at 120:60:60 kg/ha. Supplement with potash (60 kg/ha) at boll formation stage.",
    pestAlert:   "Bollworm is the primary threat — install pheromone traps and spray spinosad 45 SC at 10% infestation.",
  },
  Maize: {
    irrigation:  "Critical irrigation stages: emergence (12–15 days), knee-high, tasseling, silking, and grain fill.",
    fertilizer:  "Apply NPK at 120:60:40 kg/ha. Split nitrogen into three doses: basal, knee-high, and tasseling.",
    pestAlert:   "Fall Armyworm — check whorls daily. Apply emamectin benzoate 5 SG at 0.4 g/L if >20% whorls are damaged.",
  },
  Sugarcane: {
    irrigation:  "Irrigate every 7 days in summer and every 15 days in winter. Critical during grand growth period.",
    fertilizer:  "Apply NPK at 250:100:100 kg/ha split across 3 doses over the season. Avoid nitrogen after August.",
    pestAlert:   "Early shoot borer risk at planting — apply carbofuran 3G (33 kg/ha) in furrows at planting if past infestation.",
  },
  Pulses: {
    irrigation:  "Chickpea needs only one or two irrigations — at pre-flowering and pod fill. Avoid waterlogging at all costs.",
    fertilizer:  "Apply NPK at 20:60:20 kg/ha — low nitrogen since legumes fix their own from the air.",
    pestAlert:   "Helicoverpa pod borer is the main threat — spray neem-based pesticide (NSKE 5%) at first sign of egg-laying.",
  },
  Groundnut: {
    irrigation:  "Irrigate every 10–12 days. Pay special attention to pegging and pod-fill stages — moisture stress reduces yield significantly.",
    fertilizer:  "Apply NPK at 25:50:50 kg/ha. Add gypsum (400–500 kg/ha) at pegging stage for better pod fill and calcium uptake.",
    pestAlert:   "Leafminer and Tikka (early leaf spot) disease — apply mancozeb 75 WP at 0.25% every 15 days if symptoms appear.",
  },
  Mustard: {
    irrigation:  "One irrigation at branching stage is the most critical. Avoid excess moisture — waterlogging causes severe stem rot.",
    fertilizer:  "Apply NPK at 80:40:40 kg/ha at sowing. Spray boron (0.1% borax) at flower initiation to improve pod set.",
    pestAlert:   "Aphid colonies build rapidly in cool weather — spray imidacloprid 17.8 SL (0.3 ml/L) if colony count exceeds 20 per plant.",
  },
  Soybean: {
    irrigation:  "Critical at flowering and pod-fill. Provide field drainage — soybean cannot tolerate waterlogging even for 24 hours.",
    fertilizer:  "Apply NPK at 30:80:40 kg/ha. Treat seeds with Rhizobium culture to reduce nitrogen requirement significantly.",
    pestAlert:   "Girdle beetle damage: remove and destroy affected stems immediately. Apply chlorantraniliprole 18.5 SC if infestation spreads.",
  },
  Banana: {
    irrigation:  "Banana needs 60–80 mm of water per week. Drip irrigation reduces water use by 40% while maintaining yield.",
    fertilizer:  "Apply NPK at 200:60:300 g/plant/year. Split into 12 monthly doses. High potash is key for fruit quality.",
    pestAlert:   "Sigatoka leaf spot: spray propiconazole 0.1% fortnightly. For Panama Wilt (Fusarium): no cure — use only certified disease-free suckers.",
  },
  "Mung Bean": {
    irrigation:  "One irrigation at flowering stage if rainfall is insufficient. Short-duration crop — minimal irrigation required.",
    fertilizer:  "Apply NPK at 20:40:20 kg/ha. Rhizobium seed treatment reduces nitrogen need. Avoid excess nitrogen.",
    pestAlert:   "Yellow Mosaic Virus (YMV) spread by whitefly — spray imidacloprid at first sign. Remove and destroy infected plants.",
  },
  Barley: {
    irrigation:  "Two irrigations: crown root initiation and milky stage. Barley is more drought-tolerant than wheat.",
    fertilizer:  "Apply NPK at 60:30:20 kg/ha. Split nitrogen: half at sowing, half at first irrigation.",
    pestAlert:   "Stripe rust and covered smut are main threats — use certified treated seed and apply mancozeb if rust appears.",
  },
  Jute: {
    irrigation:  "Jute thrives on monsoon rain — supplementary irrigation rarely needed. Ensure good field drainage.",
    fertilizer:  "Apply NPK at 40:20:20 kg/ha. Top-dress with urea (20 kg/ha) at 30 days after sowing.",
    pestAlert:   "Stem rot (Macrophomina) in waterlogged areas — ensure drainage. Semilooper attack: spray quinalphos 25 EC.",
  },
};

const DEFAULT_RULE: AdvisoryRule = {
  irrigation:  "Follow standard irrigation schedule for your crop — consult your local Krishi Vigyan Kendra for specific guidance.",
  fertilizer:  "Apply balanced NPK as recommended for your crop type and soil test results.",
  pestAlert:   "Scout fields regularly. At first sign of pest or disease, consult your local agriculture extension officer.",
};

export function getAdvisoryRule(cropType: string): AdvisoryRule {
  return RULES[cropType] ?? DEFAULT_RULE;
}
