import type { Metadata } from "next";
import { BASE_URL } from "@/lib/utils";
import ToolPageLayout from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: "Text to PDF Converter — Free, Instant & Private",
  description:
    "Convert TXT text files to professional PDF documents instantly. Free, client-side, no server upload. Your text is never sent anywhere.",
  keywords: ["text to pdf", "txt to pdf converter", "convert text pdf free", "online text pdf", "document converter"],
  alternates: { canonical: `${BASE_URL}/convert-text-to-pdf` },
  openGraph: {
    title: "Text to PDF Converter — Free Online Tool",
    description: "Convert TXT files to PDF in seconds. Client-side processing — 100% private and free.",
    url: `${BASE_URL}/convert-text-to-pdf`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text to PDF Converter",
  url: `${BASE_URL}/convert-text-to-pdf`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free TXT to PDF converter. Works in your browser — no file upload required.",
};

export default function TextToPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPageLayout slug="convert-text-to-pdf" />
    </>
  );
}
