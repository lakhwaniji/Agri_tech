import type { MetadataRoute } from "next";

// Lets iPhone/Android users "Add to Home Screen": opens full screen like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AyaOne",
    short_name: "AyaOne",
    description: "Every farm mapped, every farmer financed.",
    start_url: "/login",
    scope: "/",
    display: "standalone",
    background_color: "#10221A",
    theme_color: "#2F5D2A",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
