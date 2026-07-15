# design-sync notes — AgriFintech Super App

## Repo shape

This repo is the AgriFintech Next.js app itself (`src/`), not a dedicated
design-system package — there's no `dist/` build, no `.d.ts` exports, no
Storybook. The sync runs in **package shape, synth-entry mode** (scans
`components/*.tsx` source directly). Scope was deliberately narrowed to
reusable UI pieces only — full app "Screen" components (`FarmGateScreen`,
`HomeScreen`, `CropAdvisoryScreen`, `OpsDashboardScreen`, `OpsVisitScreen`)
are excluded via `componentSrcMap: null` — they're wired to Supabase, routing,
and live data and were never meant to render standalone.

## Self-reference symlink (required)

`node_modules/src` is a symlink to `..` (`ln -sfn .. node_modules/src`),
gitignored (node_modules rules). Without it, `PKG_DIR` can't resolve since
this package (name `"src"`) isn't installed as a dependency of itself —
passing `--entry`/`cfg.entry` instead is the wrong fix: it gets bundled
literally as the dist entry (see git history on this file / the fork below),
not just used as a locator. **On a fresh clone, recreate the symlink** before
running the build: `ln -sfn .. node_modules/src` (from `src/`).

Same pattern for `.design-sync/node_modules` → `../.ds-sync/node_modules`
(needed so the forked `source-kit.mjs` below can resolve `ts-morph`): recreate
with `ln -sfn ../.ds-sync/node_modules .design-sync/node_modules`.

## Fork: `.design-sync/overrides/source-kit.mjs`

**Why:** in synth-entry mode, the upstream script's synthesized entry does
`export * from <file>` for **every** `.tsx` under `srcDir`, regardless of
`cfg.componentSrcMap` null-exclusions — that config only filters the
preview/doc list, not the entry-synthesis file list. Three excluded files
(`Hero.tsx`, `FinalCta.tsx`, `MissionSection.tsx`) import `next/link` and/or
`next/image`; Next's router internals reference `process.env` at top-level
require time, which doesn't exist in a browser and crashed the **entire
bundle** on load (not just those components — every component, including
plain SVG icons with zero dependencies, failed since `window.AgriFintech`
never got populated). The fork excludes `componentSrcMap:null` basenames from
the synthesized entry's file list too. See the fork's header comment for
detail. Declared in `cfg.libOverrides`.

**If re-syncing after an upstream design-sync update:** diff the fork against
the new `lib/source-kit.mjs` and re-apply the same patch (search the fork for
`FORK:`) — the upstream synth-entry logic may have moved.

## Hero / FinalCta / MissionSection are permanently excluded, not deferred

These three components import `next/link` and/or `next/image`, both of which
require Next's own runtime (router context, image optimization server) to
function — they cannot render standalone in any browser bundle, sandboxed or
not, without rewriting them to use plain `<a>`/`<img>`. That's a source change
to the app, not something this sync should do (ship what's actually shipped,
never a reimplementation). If the team wants these in Claude Design, someone
needs to either extract a Next-independent variant of the CTA/image-hero
pattern, or accept plain `<a>`/`<img>` composition in the design agent's own
output instead of importing these specific components.

## Generated CSS is a snapshot, not a live source (re-sync risk)

`.design-sync/generated-styles.css` is a **manually captured, one-time
concatenation** of Next/Tailwind v4's compiled output (`npm run build`, then
`.next/dev/static/chunks/[root-of-the-server]*.css` + the two Geist font
chunks + Leaflet's CSS), because this app has no stable, standalone compiled
stylesheet to point `cssEntry` at — Tailwind v4 compiles via PostCSS at Next
build time into hashed, non-deterministic chunk filenames.

**This will go stale.** Any new Tailwind utility class used in scoped
components after this sync won't be in the snapshot until it's regenerated.
**To regenerate:** `npm run build` from `src/`, then re-run the extraction
(see the shell history / this file's git blame for the exact `find` +
concatenation commands — re-derive from `.next/dev/static/chunks/`, filename
hashes change every build so don't hardcode them), copy the two Geist woff2
files into `.design-sync/fonts/`, and fix `../media/` → `./fonts/` in the
concatenated file's `url()` references.

Font files (`.design-sync/fonts/*.woff2`) were copied by hand from
`.next/static/media/` for the same reason — the CSS's own relative `url()`
paths pointed at a location outside this sync's control.

## `Reveal` component — scroll-triggered animation, real product behavior

`Reveal` (and `FeatureShowcase`, which uses it twice) starts at
`opacity-0 translate-y-8` and only becomes visible once its
`IntersectionObserver` fires (threshold 0.15). In manual browser verification
this took several seconds to trigger on a fresh page load with no user
scroll — confirmed genuine (not broken): waiting ~6-8s made it resolve to the
fully-styled, fully-visible state. **This is real, shipped behavior of the
component**, not a preview bug, so it wasn't "fixed" — but it means:
- A very fast automated screenshot (had Playwright been installed) would
  likely have flagged these as `[RENDER_THIN]`/blank — expected, not a bug,
  if that ever gets investigated on a future sync with render-check enabled.
- The claude.ai/design agent's own rendering environment may show these
  components washed-out immediately after building with them. Worth
  mentioning to the Founder/team if it comes up.

## `FarmMap` — live network dependency

Renders real OpenStreetMap tiles via a live network request
(`tile.openstreetmap.org`) — verified working in manual browser check (tiles
loaded, marker + boundary polygon both correct). If claude.ai/design's build
environment sandboxes outbound network requests, tiles won't load there even
though the marker/polygon/layout will still render. Not fixable from this
side — it's the real behavior of the shipped `FarmMap` component (Leaflet +
OpenStreetMap, no API key/self-hosted tiles).

## No automated render check / grading this sync

Playwright/Chromium was not installed (Founder chose to review manually
instead — see the "Render check" decision). `package-validate.mjs` ran with
`--no-render-check` throughout. Verification was done manually instead, via
Chrome browser automation (`mcp__claude-in-chrome__*` tools): navigated to
each of the 6 real components' preview HTML directly, took screenshots,
checked console for errors, confirmed a representative sample of icon
previews via the review contact sheet. All 57 components confirmed rendering
with zero console errors. **No `.design-sync/.cache/review/*.grade.json`
grade files exist** — the formal absolute-grading step (`package-capture.mjs`)
also needs Playwright and was not run. A future re-sync with Playwright
installed should run a full `package-capture.mjs` pass to get real graded
verdicts on record, rather than relying on this manual note.

## Icon previews (51 files, `.design-sync/previews/<Name>Icon.tsx`)

Generated programmatically (identical template: bare `Default` + a
`Tile` variant matching the app's real usage pattern — icon inside a
rounded, colored background tile, as seen in `FeatureShowcase.tsx` and the
home dashboard module grid). All use a fixed emerald tile color for
generation simplicity; the real app varies tile color per feature area
(blue/amber/purple/etc. — see `FeatureShowcase.tsx`'s `FEATURES` array) —
not replicated per-icon here since it's cosmetic, not a correctness issue.

## Re-sync risks (read before the next sync)

- The CSS snapshot and fonts (above) are the single most likely thing to go
  stale — any new Tailwind class added to scoped components won't show up
  until `generated-styles.css` is manually regenerated.
- The `source-kit.mjs` fork is pinned to the upstream version at this sync's
  time — if design-sync itself updates `lib/source-kit.mjs`, diff and
  re-apply.
- If `Hero`/`FinalCta`/`MissionSection` are ever refactored to drop
  `next/link`/`next/image` (e.g. swapped for plain `<a>`/`<img>`, or the app
  migrates off Next.js App Router navigation), remove their
  `componentSrcMap: null` entries and re-run — they'd likely sync cleanly at
  that point and the `source-kit.mjs` fork's exclusion filter becomes
  unnecessary (though harmless to leave).
- No grade files exist (see above) — carried-forward-grade tracking on the
  next re-sync starts from zero, not from a prior verified baseline.
