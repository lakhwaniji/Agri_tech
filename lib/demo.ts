// Demo mode helpers (DEMO_MODE=true in env). Never active in normal mode.
export const DEMO_COOKIE = "demo_farmer";
export const isDemoMode = () => process.env.DEMO_MODE === "true";
