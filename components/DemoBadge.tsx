// Small, quiet marker shown on every page when DEMO_MODE=true.
export function DemoBadge() {
  return (
    <a
      href="/api/demo-switch"
      className="fixed left-1/2 top-2 z-[60] -translate-x-1/2 rounded-full bg-amber-50/95 px-3 py-1 text-[11px] font-medium text-amber-800 shadow-sm ring-1 ring-amber-200 backdrop-blur hover:bg-amber-100"
      title="Switch demo profile"
    >
      Demo mode · Switch profile
    </a>
  );
}
