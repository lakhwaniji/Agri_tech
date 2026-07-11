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
// a rough tree-cover percentage alongside the average NDVI. Threshold of 0.5
// is a common rough cutoff for dense vegetation — not validated, a starting
// point.
const EVALSCRIPT = `
//VERSION=3
function setup() {
  return {
    input: [{ bands: ["B04", "B08", "dataMask"] }],
    output: [
      { id: "ndvi", bands: 1, sampleType: "FLOAT32" },
      { id: "treeFlag", bands: 1, sampleType: "UINT8" },
      { id: "dataMask", bands: 1 },
    ],
  };
}
function evaluatePixel(sample) {
  let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);
  let treeFlag = ndvi > 0.5 ? 1 : 0;
  return { ndvi: [ndvi], treeFlag: [treeFlag], dataMask: [sample.dataMask] };
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
        data: [{ type: "sentinel-2-l2a" }],
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
