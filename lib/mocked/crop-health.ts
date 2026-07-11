// Production swap-in point: replace runMockDiagnosis() with a real CV model
// API call (e.g. Google Cloud Vision, Azure Custom Vision, or a self-hosted
// PyTorch model). The route contract for /api/crop-health-scan stays the same.
//
// Selection is hashed from the uploaded filename + size so the same photo
// gives the same result across demo replays — makes investor demos consistent.

export type DiagnosisResult = {
  label: string;
  confidence: number; // 0–100
  recommendedAction: string;
};

const DIAGNOSES: DiagnosisResult[] = [
  {
    label: "Healthy",
    confidence: 93,
    recommendedAction:
      "Your crop looks healthy! Continue your current irrigation and fertilizer schedule. Scout fields again in 7 days.",
  },
  {
    label: "Early Blight",
    confidence: 81,
    recommendedAction:
      "Apply mancozeb 75 WP (0.25%) or copper-based fungicide. Remove and destroy affected lower leaves. Repeat spray in 10 days.",
  },
  {
    label: "Nitrogen Deficiency",
    confidence: 85,
    recommendedAction:
      "Apply urea top-dressing at 20–30 kg/ha immediately. Yellowing should reverse within 7–10 days. Check soil pH if issue persists.",
  },
  {
    label: "Aphid Infestation",
    confidence: 78,
    recommendedAction:
      "Spray imidacloprid 17.8 SL at 0.3 ml/L water, or neem oil 5 ml/L as an organic option. Repeat in 7 days if colonies persist.",
  },
  {
    label: "Leaf Rust",
    confidence: 79,
    recommendedAction:
      "Apply propiconazole 25 EC at 0.1% at first sign. Avoid overhead irrigation. Remove heavily infected leaves before spraying.",
  },
];

function simpleHash(filename: string, size: number): number {
  let h = size;
  for (let i = 0; i < filename.length; i++) {
    h = (h * 31 + filename.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function runMockDiagnosis(filename: string, fileSize: number): DiagnosisResult {
  const index = simpleHash(filename, fileSize) % DIAGNOSES.length;
  return DIAGNOSES[index];
}
