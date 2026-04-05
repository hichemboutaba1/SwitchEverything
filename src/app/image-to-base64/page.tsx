import { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: "Image to Base64 Converter — Free Online Tool",
  description: "Convert any image (JPG, PNG, WebP, GIF) to a Base64 data URI instantly. Free, private, and 100% client-side.",
  keywords: ["image to base64", "base64 encoder", "image base64 converter", "data uri generator"],
};

export default function ImageToBase64Page() {
  return (
    <ToolPageLayout
      slug="image-to-base64"
      title="Image to Base64 Converter"
      description="Convert any image to a Base64 data URI — perfect for embedding images in HTML/CSS. Free and 100% private."
      from="Image"
      to="Base64"
      icon="🔢"
      accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
    />
  );
}
