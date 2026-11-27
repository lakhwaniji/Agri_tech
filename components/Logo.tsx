// AyaOne "Sprout O" logo: two leaves growing out of the top of an "O".
// Brand colours: deep green #2F5D2A, leaf green #6FA83C, pale leaf #B5DB7A.
export function SproutMark({
  ring = "#2F5D2A",
  leaf = "#6FA83C",
  className,
}: {
  ring?: string;
  leaf?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true">
      <g transform="translate(0 -1)">
        <circle cx="36" cy="44" r="22" fill="none" stroke={ring} strokeWidth="9" />
        <path d="M36 22C36 10 46 3 59 3C59 16 50 22 36 22Z" fill={leaf} />
        <path d="M36 22C35 14 28 9 17 9C17 17 24 22 36 22Z" fill={leaf} />
      </g>
    </svg>
  );
}

export function Logo({
  className = "h-9 w-auto",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "white";
}) {
  const white = variant === "white";
  const ring = white ? "#FFFFFF" : "#2F5D2A";
  const leaf = white ? "#B5DB7A" : "#6FA83C";
  return (
    <svg viewBox="0 0 252 76" className={className} role="img" aria-label="AyaOne">
      <g transform="translate(2 1)">
        <circle cx="36" cy="44" r="22" fill="none" stroke={ring} strokeWidth="9" />
        <path d="M36 22C36 10 46 3 59 3C59 16 50 22 36 22Z" fill={leaf} />
        <path d="M36 22C35 14 28 9 17 9C17 17 24 22 36 22Z" fill={leaf} />
      </g>
      <text
        x="82"
        y="60"
        style={{ fontFamily: "var(--font-sora), Sora, system-ui, sans-serif" }}
        fontSize="44"
        fontWeight="700"
        letterSpacing="-1"
        fill={white ? "#FFFFFF" : "#1F2A1A"}
      >
        Aya<tspan fill={white ? "#B5DB7A" : "#2F5D2A"}>One</tspan>
      </text>
    </svg>
  );
}
