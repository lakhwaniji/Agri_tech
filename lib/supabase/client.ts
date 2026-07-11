import { createBrowserClient } from "@supabase/ssr";

// Builds a Supabase "client" (a toolbox object with methods like
// .auth.signInWithOtp() and .from('table').select()) for use in the BROWSER.
//
// This is for client components only (anything with "use client" at the top —
// forms, buttons, anything interactive). The browser can read/write cookies
// natively, so this client stores the login session as a cookie automatically,
// with no extra plumbing needed (compare to server.ts, which needs much more
// setup because the server has no built-in cookie access).
//
// We call this as a function (createClient()) rather than creating one client
// and exporting it directly, because Supabase recommends building a fresh
// client each time a component needs one — this avoids stale-state bugs across
// React re-renders and Next.js's hot-reload during development.
export function createClient() {
  return createBrowserClient(
    // Which Supabase project to talk to (from .env.local).
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // The public/anon key — safe to expose in browser code. It does NOT bypass
    // Row Level Security, so even though it's public, a user can only ever
    // read/write their own data through it.
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
