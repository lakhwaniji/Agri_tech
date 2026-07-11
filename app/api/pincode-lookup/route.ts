import { NextRequest, NextResponse } from "next/server";

// Server-side pincode -> district/state lookup, using India Post's free
// public API. Kept server-side (not called directly from the browser) so we
// control the request/response shape in one place and can swap the upstream
// source later without touching any client code.
export async function GET(request: NextRequest) {
  const pincode = request.nextUrl.searchParams.get("pincode");

  if (!pincode || !/^\d{6}$/.test(pincode)) {
    return NextResponse.json(
      { error: "Provide a valid 6-digit pincode." },
      { status: 400 },
    );
  }

  const upstream = await fetch(
    `https://api.postalpincode.in/pincode/${pincode}`,
  );
  const [result] = await upstream.json();

  if (result.Status !== "Success" || !result.PostOffice?.length) {
    return NextResponse.json(
      { error: "Pincode not found." },
      { status: 404 },
    );
  }

  const [postOffice] = result.PostOffice;
  return NextResponse.json({
    district: postOffice.District,
    state: postOffice.State,
  });
}
