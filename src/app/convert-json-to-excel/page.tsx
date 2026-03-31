import type { Metadata } from "next";
import { BASE_URL } from "@/lib/utils";
import ToolPageLayout from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: "JSON to Excel Converter — Free, Instant & Private",
  description:
    "Convert JSON data to Excel (.xlsx) spreadsheets instantly. Free browser-based tool that handles arrays and objects. No upload required.",
  keywords: ["json to excel", "convert json to xlsx", "json excel converter free", "json spreadsheet", "data converter"],
  alternates: { canonical: `${BASE_URL}/convert-json-to-excel` },
  openGraph: {
    title: "JSON to Excel Converter — Free Online Tool",
    description: "Convert JSON to Excel spreadsheets in your browser. Free, private, and instant.",
    url: `${BASE_URL}/convert-json-to-excel`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JSON to Excel Converter",
  url: `${BASE_URL}/convert-json-to-excel`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free JSON to Excel (.xlsx) converter. Client-side processing — no upload needed.",
};

export default function JsonToExcelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPageLayout slug="convert-json-to-excel" />
    </>
  );
}
