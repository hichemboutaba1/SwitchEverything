import type { Metadata } from "next";
import { BASE_URL } from "@/lib/utils";
import ToolPageLayout from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: "WebP to PNG Converter — Free, Instant & Private",
  description:
    "Convert WebP images to PNG with lossless quality online. Free browser-based tool — no upload, no account, instant results.",
  keywords: ["webp to png", "convert webp to png", "webp png converter free", "lossless image converter"],
  alternates: { canonical: `${BASE_URL}/convert-webp-to-png` },
  openGraph: {
    title: "WebP to PNG Converter — Free Online Tool",
    description: "Convert WebP to lossless PNG in your browser. Zero upload, completely free.",
    url: `${BASE_URL}/convert-webp-to-png`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WebP to PNG Converter",
  url: `${BASE_URL}/convert-webp-to-png`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free WebP to PNG converter. Lossless output, browser-based.",
};

export default function WebpToPngPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPageLayout slug="convert-webp-to-png" />
    </>
  );
}
