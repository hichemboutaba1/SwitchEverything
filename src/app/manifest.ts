import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SwitchEverything — Free File Converter",
    short_name: "SwitchEverything",
    description: "Convert images, documents and data files instantly — free, private, 100% in your browser.",
    start_url: "/",
    display: "standalone",
    background_color: "#07070f",
    theme_color: "#6c63ff",
    orientation: "portrait-primary",
    categories: ["utilities", "productivity"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    shortcuts: [
      { name: "JPG to WebP", url: "/convert-jpg-to-webp", description: "Convert JPG images to WebP" },
      { name: "PNG to WebP", url: "/convert-png-to-webp", description: "Convert PNG images to WebP" },
      { name: "CSV to JSON", url: "/convert-csv-to-json", description: "Convert CSV to JSON" },
    ],
  };
}
