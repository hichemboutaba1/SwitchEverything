export async function convertPdfToImages(
  file: File,
  onProgress: (p: number) => void,
  format: "image/png" | "image/jpeg" = "image/png",
  scale = 2
): Promise<{ pages: { url: string; filename: string; size: number }[]; sizeOriginal: number }> {
  onProgress(10);

  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
  ).toString();

  onProgress(20);

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = pdf.numPages;
  const ext = format === "image/jpeg" ? "jpg" : "png";
  const baseName = file.name.replace(/\.pdf$/i, "");

  const pages: { url: string; filename: string; size: number }[] = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;

    // White background for JPEG
    if (format === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    await page.render({ canvasContext: ctx as unknown as CanvasRenderingContext2D & { canvas: HTMLCanvasElement }, canvas, viewport }).promise;

    const quality = format === "image/jpeg" ? 0.92 : undefined;
    const dataUrl = canvas.toDataURL(format, quality);

    // Convert data URL to Blob
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const filename = numPages > 1 ? `${baseName}_page${i}.${ext}` : `${baseName}.${ext}`;
    pages.push({ url, filename, size: blob.size });

    onProgress(20 + Math.round((i / numPages) * 75));
  }

  onProgress(100);
  return { pages, sizeOriginal: file.size };
}
