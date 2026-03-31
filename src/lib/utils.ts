export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function getSavingPercent(original: number, converted: number): number {
  if (original === 0) return 0;
  return Math.round(((original - converted) / original) * 100);
}

export const TOOLS = [
  {
    slug: "convert-jpg-to-webp",
    title: "JPG to WebP Converter",
    description:
      "Convert JPG images to WebP format online for free. Reduce file size by up to 34% with no quality loss.",
    from: "JPG",
    to: "WebP",
    icon: "🖼️",
    accept: "image/jpeg",
    category: "image",
  },
  {
    slug: "convert-png-to-webp",
    title: "PNG to WebP Converter",
    description:
      "Convert PNG images to WebP format instantly. Smaller files, same quality — free and client-side.",
    from: "PNG",
    to: "WebP",
    icon: "🖼️",
    accept: "image/png",
    category: "image",
  },
  {
    slug: "convert-webp-to-jpg",
    title: "WebP to JPG Converter",
    description:
      "Convert WebP images back to JPG for maximum compatibility. Fast, free, and 100% client-side.",
    from: "WebP",
    to: "JPG",
    icon: "🖼️",
    accept: "image/webp",
    category: "image",
  },
  {
    slug: "convert-webp-to-png",
    title: "WebP to PNG Converter",
    description:
      "Convert WebP to PNG with lossless quality. No upload required — all processing in your browser.",
    from: "WebP",
    to: "PNG",
    icon: "🖼️",
    accept: "image/webp",
    category: "image",
  },
  {
    slug: "convert-text-to-pdf",
    title: "Text to PDF Converter",
    description:
      "Convert TXT files to professional PDF documents instantly. Free, private, and zero server uploads.",
    from: "TXT",
    to: "PDF",
    icon: "📄",
    accept: "text/plain",
    category: "document",
  },
  {
    slug: "convert-csv-to-json",
    title: "CSV to JSON Converter",
    description:
      "Convert CSV spreadsheets to clean JSON arrays. Free online tool with instant preview.",
    from: "CSV",
    to: "JSON",
    icon: "📊",
    accept: "text/csv,.csv",
    category: "data",
  },
  {
    slug: "convert-json-to-excel",
    title: "JSON to Excel Converter",
    description:
      "Convert JSON data to Excel (.xlsx) spreadsheets. Handles nested arrays and objects automatically.",
    from: "JSON",
    to: "XLSX",
    icon: "📊",
    accept: "application/json,.json",
    category: "data",
  },
] as const;

export type ToolSlug = (typeof TOOLS)[number]["slug"];

export const BASE_URL = "https://switcheverything.io";
