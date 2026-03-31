import type { Metadata } from "next";
import { BASE_URL } from "@/lib/utils";
import ToolPageLayout from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: "JPG to WebP Converter — Free, Instant & Private",
  description:
    "Convert JPG images to WebP format online for free. Reduce image file size by up to 34% with no quality loss. Client-side — your files never upload.",
  keywords: ["jpg to webp", "jpeg to webp converter", "convert jpg webp free", "image converter online"],
  alternates: { canonical: `${BASE_URL}/convert-jpg-to-webp` },
  openGraph: {
    title: "JPG to WebP Converter — Free Online Tool",
    description: "Instantly convert JPG to WebP in your browser. No upload, no account, no cost.",
    url: `${BASE_URL}/convert-jpg-to-webp`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JPG to WebP Converter",
  url: `${BASE_URL}/convert-jpg-to-webp`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free online JPG to WebP converter. Works entirely in your browser — no upload required.",
};

export default function JpgToWebpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPageLayout slug="convert-jpg-to-webp" />
    </>
  );
}
