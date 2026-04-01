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
  // ── New tools ──────────────────────────────────────────
  {
    slug: "convert-png-to-jpg",
    title: "PNG to JPG Converter",
    description: "Convert PNG images to JPG format online for free. Reduce file size while keeping great visual quality.",
    from: "PNG", to: "JPG", icon: "🖼️",
    accept: "image/png", category: "image",
  },
  {
    slug: "convert-jpg-to-png",
    title: "JPG to PNG Converter",
    description: "Convert JPG images to PNG format with lossless quality. Perfect for images requiring transparency.",
    from: "JPG", to: "PNG", icon: "🖼️",
    accept: "image/jpeg", category: "image",
  },
  {
    slug: "convert-svg-to-png",
    title: "SVG to PNG Converter",
    description: "Convert SVG vector graphics to PNG raster images instantly. Ideal for sharing logos and icons.",
    from: "SVG", to: "PNG", icon: "🎨",
    accept: "image/svg+xml,.svg", category: "image",
  },
  {
    slug: "convert-json-to-csv",
    title: "JSON to CSV Converter",
    description: "Convert JSON arrays and objects to CSV spreadsheets instantly. Free, private, and 100% client-side.",
    from: "JSON", to: "CSV", icon: "📊",
    accept: "application/json,.json", category: "data",
  },
  {
    slug: "convert-xml-to-json",
    title: "XML to JSON Converter",
    description: "Convert XML documents to clean JSON format online for free. Handles attributes and nested elements.",
    from: "XML", to: "JSON", icon: "📊",
    accept: "text/xml,application/xml,.xml", category: "data",
  },
  {
    slug: "convert-csv-to-excel",
    title: "CSV to Excel Converter",
    description: "Convert CSV files to Excel (.xlsx) spreadsheets instantly. No software needed — fully browser-based.",
    from: "CSV", to: "XLSX", icon: "📊",
    accept: "text/csv,.csv", category: "data",
  },
  {
    slug: "convert-excel-to-csv",
    title: "Excel to CSV Converter",
    description: "Convert Excel (.xlsx) spreadsheets to CSV format. Free, instant, and 100% private — no upload.",
    from: "XLSX", to: "CSV", icon: "📊",
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xlsx,.xls", category: "data",
  },
  {
    slug: "convert-markdown-to-html",
    title: "Markdown to HTML Converter",
    description: "Convert Markdown (.md) files to clean, styled HTML pages instantly. Great for docs and blogs.",
    from: "Markdown", to: "HTML", icon: "📝",
    accept: "text/markdown,.md,.markdown", category: "document",
  },
  {
    slug: "convert-html-to-text",
    title: "HTML to Text Converter",
    description: "Strip HTML tags and extract plain text from any HTML file. Fast, free, and completely client-side.",
    from: "HTML", to: "TXT", icon: "📄",
    accept: "text/html,.html,.htm", category: "document",
  },
] as const;

export type ToolSlug = (typeof TOOLS)[number]["slug"];

export const BASE_URL = "https://switcheverything.io";
