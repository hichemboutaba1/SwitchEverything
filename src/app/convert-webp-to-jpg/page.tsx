import type { Metadata } from "next";
import { BASE_URL } from "@/lib/utils";
import ToolPageLayout from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: "WebP to JPG Converter — Free, Instant & Private",
  description:
    "Convert WebP images to JPG format online for free. Maximum compatibility, zero quality compromise. Client-side processing — no file upload needed.",
  keywords: ["webp to jpg", "webp to jpeg converter", "convert webp jpg free", "image converter online"],
  alternates: { canonical: `${BASE_URL}/convert-webp-to-jpg` },
  openGraph: {
    title: "WebP to JPG Converter — Free Online Tool",
    description: "Convert WebP to JPG instantly in your browser. Fast, free, and completely private.",
    url: `${BASE_URL}/convert-webp-to-jpg`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WebP to JPG Converter",
  url: `${BASE_URL}/convert-webp-to-jpg`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free WebP to JPG converter. Browser-based — no upload required.",
};

export default function WebpToJpgPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPageLayout slug="convert-webp-to-jpg" />
    </>
  );
}
