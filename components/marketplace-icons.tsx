// Flat, colorful category illustrations for the Marketplace — replaces plain
// emoji glyphs with purpose-built graphics matching each product category.

type IconProps = { className?: string };

export function SeedIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M16 24c0-6 4-10 16-10s16 4 16 10v22a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V24Z"
        fill="#D8B879"
      />
      <path d="M16 24c0-6 4-10 16-10s16 4 16 10" fill="none" stroke="#B8935A" strokeWidth="2" />
      <rect x="16" y="22" width="32" height="5" fill="#C7A468" />
      <path
        d="M32 20c-2-6-8-8-8-8s0 6 5 9c2 1.2 3-0.2 3-1Z"
        fill="#5AA855"
      />
      <path
        d="M32 20c1-7 8-9 8-9s1 6-4 10c-2 1.4-4 0.4-4-1Z"
        fill="#6FBF62"
      />
      <ellipse cx="26" cy="38" rx="3" ry="4" fill="#7A5230" />
      <ellipse cx="34" cy="42" rx="3" ry="4" fill="#8A5E36" />
      <ellipse cx="30" cy="48" rx="3" ry="4" fill="#7A5230" />
    </svg>
  );
}

export function FertilizerIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M20 22h24l3 30a4 4 0 0 1-4 4.4H21a4 4 0 0 1-4-4.4l3-30Z"
        fill="#E3B94F"
      />
      <path d="M18 22h28l-2-6a3 3 0 0 0-3-2H23a3 3 0 0 0-3 2l-2 6Z" fill="#C99A32" />
      <rect x="18" y="30" width="28" height="3" fill="#CBA13C" opacity="0.6" />
      <rect x="18" y="38" width="28" height="3" fill="#CBA13C" opacity="0.6" />
      <circle cx="32" cy="47" r="8" fill="#5AA855" />
      <path d="M32 42v10M27 47h10" stroke="#F4FBF0" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function PesticideIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M17 34c0-2 5-6 12-6l3 3-3 3c-7 0-12-0-12 0Z" fill="#7C8792" />
      <rect x="27" y="30" width="8" height="6" rx="1.5" fill="#4A5763" />
      <path
        d="M35 28h9a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H35a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4Z"
        fill="#6FBEEA"
      />
      <rect x="33" y="22" width="8" height="6" rx="1.5" fill="#3E7C97" />
      <rect x="35" y="36" width="13" height="4" fill="#4FA9DA" opacity="0.7" />
      <circle cx="14" cy="24" r="2.2" fill="#8FD3F4" />
      <circle cx="10" cy="30" r="1.6" fill="#8FD3F4" />
      <circle cx="15" cy="18" r="1.6" fill="#8FD3F4" />
      <path d="M46 48c3 5 1 10-5 10s-8-5-5-10c1.6-3 2.6-6 5-8 2.4 2 3.4 5 5 8Z" fill="#5AA855" />
    </svg>
  );
}

export function EquipmentIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M42 12a10 10 0 0 0-13.9 9.4L14 35.5a4.5 4.5 0 0 0 6.4 6.4L34.6 27.9A10 10 0 0 0 44 14l-6 6-5-1-1-5 6-6c1.1 0.4 2.1 1 3 1.7Z"
        fill="#9AA5B1"
      />
      <circle cx="18" cy="38" r="3" fill="#5B6672" />
      <path
        d="M45 30 34 41l3 3 11-11a6 6 0 1 0 4-9 6 6 0 0 0-7 6Z"
        fill="#E8833A"
      />
      <circle cx="50" cy="34" r="2.4" fill="#C6642A" />
    </svg>
  );
}
