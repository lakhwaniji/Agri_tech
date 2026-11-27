import { NextRequest, NextResponse } from "next/server";
import { DEMO_COOKIE } from "@/lib/demo";

// Clears the demo profile and goes back to the demo picker.
export async function GET(request: NextRequest) {
  const res = NextResponse.redirect(new URL("/login", request.url));
  res.cookies.delete(DEMO_COOKIE);
  return res;
}
