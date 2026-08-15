// Sentinel Hub integration — converts a farm boundary into tree-cover stats.
// Verified working end-to-end against a real Sentinel Hub account (2026-06-29)
// — initially failed with "Output dataMask requested but missing from
// function setup()"; fixed by adding a dataMask input/output band to the
// evalscript (Sentinel Hub's Statistical API requires it to mark which
// pixels are valid vs. cloud-masked).

type GeoJSONPolygon = {
  type: string;
  coordinates: number[][][];
};

export type TreeCoverStats = {
  ndviAvg: number;
  treeCoverPercent: number;
};

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SENTINEL_HUB_CLIENT_ID;
  const clientSecret = process.env.SENTINEL_HUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const res = await fetch("https://services.sentinel-hub.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token ?? null;
}

// Evalscript computes NDVI per pixel and a simple "is this pixel tree-like"
// flag (NDVI above a threshold), so the Statistical API's histogram gives us
// a rough tree-cover percentage alongside the average NDVI. Threshold of 0.3
// targets general vegetation (crops, young trees, mixed plantation), not just
// dense forest canopy — 0.5 was too strict and made tree_cover_percent (and
// everything derived from it: biomass/CO2/O2) round to ~0 for most real farm
// boundaries. Still not validated against forestry literature, a starting
// point.
//
// dataMask is folded together with CLM (the s2cloudless cloud mask band) so
// cloud pixels are excluded from the stats, not just true no-data edge
// pixels. Found 2026-08-15: a farm's tree_cover_percent (and everything
// derived from it) came back as 0 because the most recent Sentinel-2 pass
// was fully cloud-covered — clouds read as near-zero NDVI, same signature as
// bare land, and nothing was filtering them out before this fix.
const EVALSCRIPT = `
//VERSION=3
function setup() {
  return {
    input: [{ bands: ["B04", "B08", "dataMask", "CLM"] }],
    output: [
      { id: "ndvi", bands: 1, sampleType: "FLOAT32" },
      { id: "treeFlag", bands: 1, sampleType: "UINT8" },
      { id: "dataMask", bands: 1 },
    ],
  };
}
function evaluatePixel(sample) {
  let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);
  let treeFlag = ndvi > 0.3 ? 1 : 0;
  let isValid = sample.dataMask * (1 - sample.CLM);
  return { ndvi: [ndvi], treeFlag: [treeFlag], dataMask: [isValid] };
}
`;

export async function getTreeCoverStats(
  boundaryGeoJson: GeoJSONPolygon,
): Promise<TreeCoverStats | null> {
  const token = await getAccessToken();
  if (!token) return null;

  // Look back 90 days and let Sentinel Hub pick the best available data
  // within that window — avoids demanding a cloud-free image from "today",
  // which can be unavailable for weeks during monsoon season.
  const now = new Date();
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  const res = await fetch("https://services.sentinel-hub.com/api/v1/statistics", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: {
        bounds: { geometry: boundaryGeoJson },
        // Without dataFilter, a single wide aggregationInterval (see below)
        // defaults to the most recent scene regardless of cloud cover —
        // that's what produced the all-zero O2 result on 2026-08-15.
        // leastCC + maxCloudCoverage make it pick the clearest scene in the
        // window instead.
        data: [
          {
            type: "sentinel-2-l2a",
            dataFilter: { mosaickingOrder: "leastCC", maxCloudCoverage: 20 },
          },
        ],
      },
      aggregation: {
        timeRange: {
          from: ninetyDaysAgo.toISOString(),
          to: now.toISOString(),
        },
        aggregationInterval: { of: "P90D" },
        evalscript: EVALSCRIPT,
      },
    }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  // Expected shape (per Sentinel Hub docs): data.data[0].outputs.ndvi.bands.B0.stats.mean
  // and .outputs.treeFlag.bands.B0.stats.mean (mean of a 0/1 flag = fraction
  // of pixels that are tree-like). Defensive parsing since this is untested.
  try {
    const outputs = data?.data?.[0]?.outputs;
    const ndviAvg = outputs?.ndvi?.bands?.B0?.stats?.mean;
    const treeFraction = outputs?.treeFlag?.bands?.B0?.stats?.mean;

    if (typeof ndviAvg !== "number" || typeof treeFraction !== "number") {
      return null;
    }

    return { ndviAvg, treeCoverPercent: treeFraction * 100 };
  } catch {
    return null;
  }
}
