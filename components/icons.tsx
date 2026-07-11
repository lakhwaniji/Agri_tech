type IconProps = {
  className?: string;
};

export function CropHealthIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 40c8-2 14-9 14-18 0-4-1-7-2-9-5 1-9 3-12 7-3-4-7-6-12-7-1 2-2 5-2 9 0 9 6 16 14 18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 40V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M33 12l3-3M33 12l4 1M33 12l-1 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CarbonCreditIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="19" cy="20" r="12" fill="currentColor" opacity="0.9" />
      <text
        x="19"
        y="25"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="white"
      >
        $
      </text>
      <circle
        cx="31"
        cy="30"
        r="9"
        fill="currentColor"
        opacity="0.6"
        stroke="white"
        strokeWidth="1.5"
      />
      <text
        x="31"
        y="34"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="white"
      >
        ₹
      </text>
    </svg>
  );
}

export function WalletIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 16a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V16Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 16 26 9l6 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31" cy="27" r="3" fill="currentColor" />
    </svg>
  );
}

export function ChipIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="15"
        y="15"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M20 15v-5M28 15v-5M20 38v-5M28 38v-5M15 20h-5M15 28h-5M33 20h5M33 28h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  );
}

export function StorefrontIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9 17l2-7h26l2 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 17a4 4 0 0 0 8 0 4 4 0 0 0 8 0 4 4 0 0 0 8 0 4 4 0 0 0 8 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 17v18a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19 37v-9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FarmManagementIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 30l6-6 6 4 9-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="30" r="2.5" fill="currentColor" />
      <circle cx="16" cy="24" r="2.5" fill="currentColor" />
      <circle cx="22" cy="28" r="2.5" fill="currentColor" />
      <circle cx="31" cy="18" r="2.5" fill="currentColor" />
      <path
        d="M11 38v-6M19 38v-9M27 38v-5M35 38v-12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DiseaseMonitorIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 16c7 0 13 4.5 16 8-3 3.5-9 8-16 8s-13-4.5-16-8c3-3.5 9-8 16-8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      <path
        d="M24 16V11M31 18l3-4M17 18l-3-4M24 32v5M31 30l3 4M17 30l-3 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function QuickLoanIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="2" />
      <path
        d="M24 15v9l7 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 12l3 3-3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MarketplaceIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 18l3-8h22l3 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 18h28v16a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19 24a5 5 0 0 0 10 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ServicesGridIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="8" y="8" width="10" height="10" rx="2.5" fill="currentColor" />
      <rect
        x="29"
        y="8"
        width="10"
        height="10"
        rx="2.5"
        fill="currentColor"
        opacity="0.85"
      />
      <rect
        x="8"
        y="29"
        width="10"
        height="10"
        rx="2.5"
        fill="currentColor"
        opacity="0.85"
      />
      <rect
        x="29"
        y="29"
        width="10"
        height="10"
        rx="2.5"
        fill="currentColor"
      />
      <path
        d="M18 13h11M13 18v11M34 18v11M18 34h11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MapPinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function HashIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9 4 7 20M17 4l-2 16M4 9h16M3.5 15h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckCircleIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15 24l6 6 12-13"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FarmGateIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 20 24 8l18 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 19v17h28V19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19 36v-9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 14v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WeatherIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="18" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
      <path
        d="M18 6v2M9 16h-2M27 16h-2M11.5 9.5l1.4 1.4M24.5 9.5l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 30a7 7 0 0 1 1-13.9A9 9 0 0 1 32 21a6 6 0 0 1-1 12H14a5 5 0 0 1 0-3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 3v2M12 19v2M5 5l1.4 1.4M17.6 17.6 19 19M3 12h2M19 12h2M5 19l1.4-1.4M17.6 6.4 19 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloudIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 18a4 4 0 0 1 .5-7.9A5.5 5.5 0 0 1 18 11a3.5 3.5 0 0 1-.5 7H7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RainIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 14a4 4 0 0 1 .5-7.9A5.5 5.5 0 0 1 18 7a3.5 3.5 0 0 1-.5 7H7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 18l-1 3M13 18l-1 3M17 18l-1 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CalendarIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5"
        width="17"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.5 9.5h17M8 3v3M16 3v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ClockIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CrosshairIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <path
        d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CameraIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── New icons for coming-soon modules ─────────────────────────────────────────

export function CropLoanIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="17" cy="30" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M17 26v8M15 28h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 10c0 0-5 4-5 9 0 4 2 6 5 7 3-1 5-3 5-7 0-5-5-9-5-9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 26v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TractorIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <ellipse cx="15" cy="34" rx="7" ry="7" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="36" cy="36" rx="4" ry="4" stroke="currentColor" strokeWidth="2" />
      <path d="M22 34h6M8 34V20l5-6h14l3 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 14h8l3 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WrenchIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M32 10a10 10 0 0 0-10 14L10 36a3 3 0 0 0 4 4l12-12a10 10 0 0 0 14-10 10 10 0 0 0-2-5l-5 5-4-4 5-5a10 10 0 0 0-2 1Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function SolarPanelIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="18" width="34" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 27h34M7 36h34M24 18v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 14V9M30 11l-2 4M18 11l2 4M36 16l-3 2M12 16l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GraduationIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 12L8 20l16 8 16-8-16-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 24v9c0 4 4 7 10 7s10-3 10-7v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 20v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}

export function FingerprintIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M16 22a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 26a13 13 0 0 1 26 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 26a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 30a18 18 0 0 1 36 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 30v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ReceiptIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M12 8h24v32l-4-3-4 3-4-3-4 3-4-3-4 3V8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 18h12M18 24h12M18 30h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CropInsuranceIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 6l14 6v10c0 9-6 15-14 18C16 37 10 31 10 22V12l14-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 20c0 0-6 3-6 8 0 3 2 5 6 6 4-1 6-3 6-6 0-5-6-8-6-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function HealthInsuranceIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 6l14 6v10c0 9-6 15-14 18C16 37 10 31 10 22V12l14-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 24c0-2.5 2-4 5-2 3-2 5 0 5 2 0 3-5 6-5 6s-5-3-5-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function MoneyTransferIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="17" cy="20" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M17 17v6M15 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 14l8 4-8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 18h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 32c2 3 7 5 13 5s11-2 13-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SoilIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M8 18h32M8 28h32M8 38h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 12l-3 6M24 10l-3 8M32 12l-3 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DroneIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M24 19v-5M24 34v5M19 24h-5M34 24h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="19" cy="14" rx="4" ry="2" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="29" cy="14" rx="4" ry="2" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="19" cy="34" rx="4" ry="2" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="29" cy="34" rx="4" ry="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IrrigationIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 8c0 0-10 10-10 18a10 10 0 0 0 20 0C34 18 24 8 24 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 30a6 6 0 0 0 6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 14l3 3M7 22h4M41 14l-3 3M41 22h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PriceTagIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M10 10h16l14 14-16 16L10 26V10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function SatelliteIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="30" cy="18" r="3" fill="currentColor" />
      <path d="M22 26l8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 14a18 18 0 0 1 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 10a26 26 0 0 1 28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 26l-9 9 4 4 9-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function ExpertIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="19" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M7 40c0-7 5-11 12-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="26" y="22" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M30 31l-3 5 6-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 27h8M30 30h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GroupIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M14 38c0-6 4-9 10-9s10 3 10 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="18" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 36c0-5 2-8 6-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="38" cy="18" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M44 36c0-5-2-8-6-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GovernmentIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M8 40h32M6 22h36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 8l18 14H6L24 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 22v18M20 22v18M28 22v18M34 22v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function NewsIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="10" width="26" height="30" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="34" y="14" width="6" height="22" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M14 18h14M14 24h14M14 30h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ShoppingBagIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M14 18h20l-3 20H17L14 18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 18v-4a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BasketIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M8 22h32l-4 18H12L8 22Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 22l6-12M32 22l-6-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="19" cy="32" r="2" fill="currentColor" />
      <circle cx="29" cy="32" r="2" fill="currentColor" />
      <circle cx="24" cy="36" r="2" fill="currentColor" />
    </svg>
  );
}

export function RadioIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="10" y="24" width="28" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="21" cy="32" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M31 27h4M31 32h4M31 37h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 24L24 12M30 24L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WarehouseIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M6 22L24 10l18 12v18H6V22Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 40V28h12v12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 28h6M33 28h6M9 34h6M33 34h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TruckIcon({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M6 14h26v20H6V14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M32 20h6l4 8v6H32V20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="14" cy="36" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
