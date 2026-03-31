import type { Metadata } from "next";
import { BASE_URL } from "@/lib/utils";
import ToolPageLayout from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: "PNG to WebP Converter — Free, Instant & Private",
  description:
    "Convert PNG images to WebP online for free. Smaller files, same quality. All processing is done locally in your browser — nothing is ever uploaded.",
  keywords: ["png to webp", "convert png to webp", "png webp converter free", "image converter"],
  alternates: { canonical: `${BASE_URL}/convert-png-to-webp` },
  openGraph: {
    title: "PNG to WebP Converter — Free Online Tool",
    description: "Convert PNG to WebP instantly in your browser. No upload, no account, completely free.",
    url: `${BASE_URL}/convert-png-to-webp`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PNG to WebP Converter",
  url: `${BASE_URL}/convert-png-to-webp`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free PNG to WebP converter that works entirely in your browser.",
};

export default function PngToWebpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPageLayout slug="convert-png-to-webp" />
    </>
  );
}
