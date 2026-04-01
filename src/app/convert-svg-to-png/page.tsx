import ToolPageLayout from "@/components/ToolPageLayout";
import type { Metadata } from "next";
import { TOOLS } from "@/lib/utils";

const tool = TOOLS.find((t) => t.slug === "convert-svg-to-png")!;

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: "/convert-svg-to-png" },
};

export default function Page() {
  return <ToolPageLayout slug="convert-svg-to-png" />;
}
