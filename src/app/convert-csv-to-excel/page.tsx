import ToolPageLayout from "@/components/ToolPageLayout";
import type { Metadata } from "next";
import { TOOLS } from "@/lib/utils";

const tool = TOOLS.find((t) => t.slug === "convert-csv-to-excel")!;

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: "/convert-csv-to-excel" },
};

export default function Page() {
  return <ToolPageLayout slug="convert-csv-to-excel" />;
}
