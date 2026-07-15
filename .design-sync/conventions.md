## Setup — wrap in `LanguageProvider`

Several components (`ModuleTabs`, `LanguageToggle`, `FeatureShowcase`) read
translated strings via a `useLanguage()` hook and **throw if rendered without
a `LanguageProvider` ancestor**. Always wrap any composition using them:

```jsx
const { LanguageProvider, ModuleTabs, Logo, FeatureShowcase } = window.AgriFintech;

function Page() {
  return (
    <LanguageProvider>
      <Logo />
      <ModuleTabs />
      <FeatureShowcase />
    </LanguageProvider>
  );
}
```

`Logo`, the icon set, `Reveal`, and `FarmMap` don't need it — they take plain
props only.

## Styling idiom — Tailwind v4 utility classes, no custom token layer

This DS has no bespoke design-token/theme-prop system — components are
styled with plain Tailwind v4 utility classes, compiled and shipped in
`styles.css`. Build new layouts the same way: utility classes, not inline
styles or a separate CSS file.

Real vocabulary actually used across these components (not invented — pulled
from the compiled CSS):

| Purpose | Classes |
|---|---|
| Primary/agritech green | `bg-emerald-50` / `-100` / `-600` / `-700`, `text-emerald-700` / `-900` |
| Fintech blue | `bg-blue-50` / `-100` / `-600`, `text-blue-700` / `-800` |
| Secondary accents | `amber-*`, `green-*` (marketplace/produce), `purple-*` (farm management) |
| Neutral text/surfaces | `zinc-50` through `zinc-900` (`text-zinc-900` for headings, `text-zinc-600`/`-700` for body) |
| Radius | `rounded-full` (pills, buttons, tab chips), `rounded-2xl` (cards, icon tiles), `rounded-xl`/`rounded-lg` |
| Elevation | `shadow-sm` (cards), `shadow-lg` (CTAs, toasts) |
| Icon tiles | Real usage pattern (see `FeatureShowcase`): a `rounded-2xl` tile (`h-16 w-16` mobile / `h-20 w-20` desktop) in a soft `-100` background color, icon inside sized `h-9 w-9`/`h-10 w-10` with the matching `-700` text color |

## Where the truth lives

- `styles.css` — the full compiled stylesheet (imports `_ds_bundle.css` +
  fonts + tokens); read this before styling anything new.
- Per-component `components/<group>/<Name>/<Name>.prompt.md` — usage
  reference generated from the real prop types.
- `_ds_bundle.css` — component-level compiled CSS (Tailwind utilities +
  `--color-*`/`--radius-*` custom properties).

## Icons

51 icon components (`ArrowRightIcon`, `CropHealthIcon`, `WalletIcon`, etc.)
all share one signature: `{ className?: string }`, default size varies by
icon (see each `.prompt.md`). The app's real usage is almost always the
icon-tile pattern above, not a bare icon.

## Build snippet

```jsx
const { LanguageProvider, Logo, ModuleTabs, FarmMap } = window.AgriFintech;

function FarmDashboardHeader() {
  return (
    <LanguageProvider>
      <header className="flex items-center justify-between p-6">
        <Logo />
      </header>
      <ModuleTabs />
      <div className="p-6">
        <FarmMap location={{ lat: 19.9975, lng: 73.7898 }} boundary={null} />
      </div>
    </LanguageProvider>
  );
}
```

## Known limitation

`Hero`, `FinalCta`, and `MissionSection` are **not** in this bundle — they
import `next/link`/`next/image`, which can't run outside Next.js's own
server. Compose hero/CTA sections with plain `<a>`/`<img>` and the styling
vocabulary above instead of expecting those exports.
