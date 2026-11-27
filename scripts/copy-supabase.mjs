// Copies AgriFintech data from the OLD Supabase project to the NEW (company) one.
//
//   1. Export (reads the OLD project using the keys already in .env.local):
//        node --env-file=.env.local scripts/copy-supabase.mjs export
//      → writes ./supabase-export/ (personal data — git-ignored, delete when done)
//
//   2. In the NEW project, run supabase/000_full_setup.sql first (SQL Editor).
//
//   3. Import into the NEW project:
//        NEW_SUPABASE_URL=https://xxxx.supabase.co \
//        NEW_SUPABASE_SERVICE_ROLE_KEY=eyJ... \
//        node scripts/copy-supabase.mjs import
//
// What is copied: login users (same IDs + phone numbers, so farmers keep their
// accounts), farmers, farms (incl. GPS pin + boundary), visits, ops users,
// green details, crop scans, and the crop-scans photo files.
// Safe to re-run: rows are upserted by id.

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve("supabase-export");
const TABLES = ["farmers", "farms", "farm_visits", "ops_users", "farm_green_details", "crop_health_scans"];
const BUCKET = "crop-scans";
const mode = process.argv[2];

function client(url, key) {
  if (!url || !key) throw new Error("Missing Supabase URL or service role key.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

async function listAllFiles(sb, prefix = "") {
  const out = [];
  const { data, error } = await sb.storage.from(BUCKET).list(prefix, { limit: 1000 });
  if (error) return out; // bucket may not exist yet
  for (const item of data) {
    const p = prefix ? `${prefix}/${item.name}` : item.name;
    if (item.id === null) out.push(...(await listAllFiles(sb, p))); // folder
    else out.push(p);
  }
  return out;
}

async function exportOld() {
  const sb = client(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  fs.mkdirSync(path.join(DIR, "files"), { recursive: true });

  const users = [];
  for (let page = 1; ; page++) {
    const { data, error } = await sb.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(`auth users: ${error.message}`);
    users.push(...data.users.map((u) => ({ id: u.id, phone: u.phone, email: u.email, created_at: u.created_at })));
    if (data.users.length < 1000) break;
  }
  fs.writeFileSync(path.join(DIR, "auth_users.json"), JSON.stringify(users, null, 2));
  console.log(`auth users: ${users.length}`);

  for (const t of TABLES) {
    const { data, error } = await sb.from(t).select("*");
    if (error) { console.log(`${t}: skipped (${error.message})`); continue; }
    fs.writeFileSync(path.join(DIR, `${t}.json`), JSON.stringify(data, null, 2));
    console.log(`${t}: ${data.length} rows`);
  }

  const files = await listAllFiles(sb);
  for (const f of files) {
    const { data, error } = await sb.storage.from(BUCKET).download(f);
    if (error) { console.log(`file ${f}: ${error.message}`); continue; }
    const dest = path.join(DIR, "files", f);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await data.arrayBuffer()));
  }
  console.log(`photos: ${files.length}`);
  console.log(`\nExport done → ${DIR}`);
}

// PostgREST may return PostGIS columns as GeoJSON; turn them back into WKT.
function toWkt(v) {
  if (!v || typeof v !== "object" || !v.type) return v;
  const pt = (c) => `${c[0]} ${c[1]}`;
  if (v.type === "Point") return `SRID=4326;POINT(${pt(v.coordinates)})`;
  if (v.type === "Polygon") return `SRID=4326;POLYGON(${v.coordinates.map((r) => `(${r.map(pt).join(",")})`).join(",")})`;
  return v;
}

async function importNew() {
  const sb = client(process.env.NEW_SUPABASE_URL, process.env.NEW_SUPABASE_SERVICE_ROLE_KEY);
  const read = (n) => (fs.existsSync(path.join(DIR, n)) ? JSON.parse(fs.readFileSync(path.join(DIR, n), "utf8")) : []);

  // Users first, with the SAME ids, so every farmer row still points at its login.
  let made = 0;
  for (const u of read("auth_users.json")) {
    const { error } = await sb.auth.admin.createUser({
      id: u.id,
      phone: u.phone || undefined,
      email: u.email || undefined,
      phone_confirm: !!u.phone,
      email_confirm: !!u.email,
    });
    if (error && !/already/i.test(error.message)) console.log(`user ${u.phone || u.email}: ${error.message}`);
    else made++;
  }
  console.log(`auth users: ${made}`);

  for (const t of TABLES) {
    const rows = read(`${t}.json`).map((r) =>
      Object.fromEntries(Object.entries(r).map(([k, v]) => [k, toWkt(v)])),
    );
    if (!rows.length) { console.log(`${t}: nothing to import`); continue; }
    const { error } = await sb.from(t).upsert(rows, { onConflict: "id" });
    console.log(error ? `${t}: FAILED — ${error.message}` : `${t}: ${rows.length} rows`);
  }

  const base = path.join(DIR, "files");
  const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : []);
  let up = 0;
  for (const f of walk(base)) {
    const key = path.relative(base, f).split(path.sep).join("/");
    const { error } = await sb.storage.from(BUCKET).upload(key, fs.readFileSync(f), { upsert: true, contentType: "image/jpeg" });
    if (error) console.log(`photo ${key}: ${error.message}`); else up++;
  }
  console.log(`photos: ${up}`);
  console.log("\nImport done. Check row counts in the new project's Table Editor.");
}

if (mode === "export") await exportOld();
else if (mode === "import") await importNew();
else console.log("Usage: node scripts/copy-supabase.mjs export|import  (see the top of this file)");
