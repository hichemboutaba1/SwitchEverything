export interface ConversionResult {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  preview: string;
}

export async function convertSvgToPng(
  file: File,
  onProgress?: (p: number) => void
): Promise<ConversionResult> {
  onProgress?.(10);
  const text = await file.text();
  onProgress?.(30);

  // Parse SVG dimensions
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(text, "image/svg+xml");
  const svgEl = svgDoc.documentElement;
  const viewBox = svgEl.getAttribute("viewBox")?.split(/[\s,]+/).map(Number);
  const w = parseFloat(svgEl.getAttribute("width") ?? "") || viewBox?.[2] || 512;
  const h = parseFloat(svgEl.getAttribute("height") ?? "") || viewBox?.[3] || 512;

  onProgress?.(50);

  const blob = new Blob([text], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      onProgress?.(75);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(svgUrl);

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) { reject(new Error("Canvas export failed.")); return; }
        const url = URL.createObjectURL(pngBlob);
        const filename = file.name.replace(/\.svg$/i, "") + ".png";
        onProgress?.(100);
        resolve({
          url,
          filename,
          sizeOriginal: file.size,
          sizeConverted: pngBlob.size,
          preview: url,
        });
      }, "image/png");
    };
    img.onerror = () => reject(new Error("Failed to load SVG. Check if it is a valid SVG file."));
    img.src = svgUrl;
  });
}
