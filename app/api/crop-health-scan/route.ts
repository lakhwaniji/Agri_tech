import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { runMockDiagnosis } from "@/lib/mocked/crop-health";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const farmId = request.nextUrl.searchParams.get("farmId");
  if (!farmId) {
    return NextResponse.json({ error: "farmId is required" }, { status: 400 });
  }

  const { data: scans } = await supabase
    .from("crop_health_scans")
    .select("id, diagnosis_label, confidence, recommended_action, created_at")
    .eq("farm_id", farmId)
    .eq("farmer_id", userData.user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return NextResponse.json({ scans: scans ?? [] });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const formData = await request.formData();
  const farmId = formData.get("farmId") as string | null;
  const file = formData.get("image") as File | null;

  if (!farmId || !file) {
    return NextResponse.json({ error: "farmId and image are required" }, { status: 400 });
  }

  // Verify the farm belongs to this farmer before uploading.
  const { data: farm } = await supabase
    .from("farms")
    .select("id")
    .eq("id", farmId)
    .eq("farmer_id", userData.user.id)
    .single();

  if (!farm) {
    return NextResponse.json({ error: "Farm not found" }, { status: 404 });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const imagePath = `${userData.user.id}/${farmId}/${Date.now()}.${ext}`;

  // Use admin client for storage upload (bypasses RLS on storage objects).
  const admin = createAdminClient();
  const { error: uploadError } = await admin.storage
    .from("crop-scans")
    .upload(imagePath, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }

  const result = runMockDiagnosis(file.name, file.size);

  const { error: insertError } = await supabase
    .from("crop_health_scans")
    .insert({
      farm_id: farmId,
      farmer_id: userData.user.id,
      image_path: imagePath,
      diagnosis_label: result.label,
      confidence: result.confidence,
      recommended_action: result.recommendedAction,
    });

  if (insertError) {
    return NextResponse.json({ error: "Failed to save scan result" }, { status: 500 });
  }

  return NextResponse.json({ result });
}
