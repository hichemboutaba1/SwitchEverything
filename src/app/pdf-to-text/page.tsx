import { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: "PDF to Text Converter — Extract Text from PDF Free",
  description: "Extract text from any PDF file instantly. Free online PDF to TXT converter — no upload, 100% private, processed in your browser.",
  keywords: ["pdf to text", "extract text from pdf", "pdf to txt", "pdf text extractor"],
};

export default function PdfToTextPage() {
  return (
    <ToolPageLayout
      slug="pdf-to-text"
      title="PDF to Text Converter"
      description="Extract all text from any PDF file — free, instant, and 100% private. No upload required."
      from="PDF"
      to="TXT"
      icon="📄"
      accept=".pdf,application/pdf"
    />
  );
}
