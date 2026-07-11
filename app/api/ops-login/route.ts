import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

// Ops staff login check. Deliberately NOT Supabase Auth — ops_users has its
// own username/password columns (plaintext, per Founder's explicit choice),
// checked here with the service_role key since RLS has no auth.uid() to
// check against for this table. On match, we set our own simple session
// cookie (just the ops_users.id) — there is no token signing/expiry here,
// which is fine for a 2-3 person internal team but would need hardening
// before this ever has more users or higher stakes.
export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();
  const { data: opsUser } = await supabase
    .from("ops_users")
    .select("id, full_name, password")
    .eq("username", username)
    .single();

  if (!opsUser || opsUser.password !== password) {
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("ops_session", opsUser.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({ success: true, fullName: opsUser.full_name });
}
