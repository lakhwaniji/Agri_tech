// Fixed scientific constants — same for every farm, not configurable.
// biomass -> carbon: IPCC default, ~47% of dry biomass is carbon.
// carbon -> CO2: molecular weight ratio (CO2=44 / C=12).
// CO2 -> O2: photosynthesis is 1:1 molar CO2:O2; mass ratio O2=32/CO2=44.
const CARBON_FRACTION = 0.47;
const CO2_PER_CARBON = 3.67;
const O2_PER_CO2 = 0.727;

export type VegetationType =
  | "fruit_trees"
  | "timber_hardwood"
  | "fast_growing_softwood"
  | "mixed_plantation"
  | "field_crops_only";

export type Maturity = "young" | "mature" | "old";

// Rough, illustrative biomass-density coefficients (tons/hectare) — NOT
// validated against forestry literature or an expert. Matches the Founder's
// own framing of this O2 estimate as "theoretical" for a working prototype.
// Revisit before presenting these as authoritative.
const BIOMASS_DENSITY: Record<VegetationType, Record<Maturity, number>> = {
  fruit_trees: { young: 15, mature: 50, old: 70 },
  timber_hardwood: { young: 20, mature: 90, old: 150 },
  fast_growing_softwood: { young: 30, mature: 80, old: 110 },
  mixed_plantation: { young: 20, mature: 60, old: 100 },
  field_crops_only: { young: 3, mature: 6, old: 6 },
};

export function calculateO2Generation({
  vegetationType,
  maturity,
  treeCoverHectares,
}: {
  vegetationType: VegetationType;
  maturity: Maturity;
  treeCoverHectares: number;
}) {
  const densityPerHectare = BIOMASS_DENSITY[vegetationType][maturity];
  const biomassTons = densityPerHectare * treeCoverHectares;
  const carbonTons = biomassTons * CARBON_FRACTION;
  const co2Tons = carbonTons * CO2_PER_CARBON;
  const o2Tons = co2Tons * O2_PER_CO2;

  return { biomassTons, co2Tons, o2Tons };
}
