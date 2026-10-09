import { redirect } from "next/navigation";

// Demo mode: skip the OTP login and go straight to the app.
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  if (process.env.DEMO_MODE === "true") redirect("/home");
  return children;
}
