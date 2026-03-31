import type { Metadata } from "next";
import { BASE_URL } from "@/lib/utils";
import ToolPageLayout from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: "CSV to JSON Converter — Free, Instant & Private",
  description:
    "Convert CSV spreadsheets to JSON arrays online for free. Clean output with instant preview. No upload, client-side only — your data stays private.",
  keywords: ["csv to json", "convert csv to json online", "csv json converter free", "data converter", "spreadsheet to json"],
  alternates: { canonical: `${BASE_URL}/convert-csv-to-json` },
  openGraph: {
    title: "CSV to JSON Converter — Free Online Tool",
    description: "Convert CSV to JSON in your browser. Instant preview, completely free and private.",
    url: `${BASE_URL}/convert-csv-to-json`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CSV to JSON Converter",
  url: `${BASE_URL}/convert-csv-to-json`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free CSV to JSON converter with instant preview. Client-side, no upload required.",
};

export default function CsvToJsonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPageLayout slug="convert-csv-to-json" />
    </>
  );
}
