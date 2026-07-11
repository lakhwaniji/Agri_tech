import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Builds a Supabase client for use ON THE SERVER (Server Components, Route
// Handlers, Server Actions) — NOT used by any page yet as of this writing.
// It exists for when we build a page that needs to check "is this user
// logged in?" before rendering anything (e.g. a future protected dashboard).
//
// Why this needs so much more setup than client.ts: the browser has built-in
// access to cookies, but the server does not. A request arrives as raw data;
// nothing automatically turns "data on the request" into "here is the login
// cookie." We have to explicitly read it ourselves (via Next.js's cookies())
// and explicitly hand Supabase a way to read/write it (via getAll/setAll).
export async function createClient() {
  // Reads the cookies that arrived with the current incoming request.
  // This is Next.js's own API, not Supabase's — it's the "waiter who reads
  // the order ticket and tells the kitchen what's on it."
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Supabase calls this whenever IT needs to check "is there a login
        // cookie?" — we just hand back whatever we already read above.
        getAll() {
          return cookieStore.getAll();
        },
        // Supabase calls this when it needs to WRITE a cookie — e.g.
        // refreshing a session token that's about to expire. We take its
        // list of cookies-to-set and tell Next.js to attach them to the
        // outgoing response, which is what makes the browser update its
        // own stored cookie.
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Next.js only allows cookies to be SET from Route Handlers and
            // Server Actions — not from plain Server Components (which can
            // only read them). If this got called from a Server Component,
            // .set() throws here. Safe to ignore: that refresh is expected
            // to happen in middleware instead (not yet built).
          }
        },
      },
    },
  );
}
