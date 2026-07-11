export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 50"
      className={className}
      role="img"
      aria-label="AgriFintech"
    >
      <defs>
        <linearGradient id="uiGreenGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0f5132" />
          <stop offset="100%" stopColor="#198754" />
        </linearGradient>
      </defs>

      <g transform="translate(5, 5)">
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="#198754"
          strokeWidth="2.5"
        />
        <path
          d="M14,14 H26 M14,19 H23 M21,14 C21,22 15,24 15,24 M19,23 L24,30"
          stroke="#198754"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M11,20 C8,15 11,10 14,12 C14,15 13,19 11,20 Z"
          fill="#198754"
          opacity="0.85"
        />
        <path
          d="M29,20 C32,15 29,10 26,12 C26,15 27,19 29,20 Z"
          fill="#198754"
          opacity="0.85"
        />
      </g>

      <g transform="translate(52, 32)">
        <text
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="22"
          fontWeight="700"
          fill="#0f5132"
          letterSpacing="-0.5"
        >
          Agri<tspan fontWeight="600" fill="#198754">Fintech</tspan>
        </text>
      </g>
    </svg>
  );
}
