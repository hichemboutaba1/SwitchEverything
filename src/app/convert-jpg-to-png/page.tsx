import ToolPageLayout from "@/components/ToolPageLayout";
import type { Metadata } from "next";
import { TOOLS } from "@/lib/utils";

const tool = TOOLS.find((t) => t.slug === "convert-jpg-to-png")!;

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: "/convert-jpg-to-png" },
};

export default function Page() {
  return <ToolPageLayout slug="convert-jpg-to-png" />;
}
