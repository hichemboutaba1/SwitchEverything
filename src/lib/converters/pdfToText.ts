export async function convertPdfToText(
  file: File,
  onProgress: (p: number) => void
): Promise<{ url: string; filename: string; sizeOriginal: number; sizeConverted: number; preview: string }> {
  onProgress(10);

  const pdfjsLib = await import("pdfjs-dist");
  // Use local worker to avoid CDN dependency
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
  ).toString();

  onProgress(20);

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = pdf.numPages;
  let fullText = "";

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? (item.str ?? "") : ""))
      .join(" ");
    fullText += `--- Page ${i} ---\n${pageText}\n\n`;
    onProgress(20 + Math.round((i / numPages) * 70));
  }

  const blob = new Blob([fullText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const filename = file.name.replace(/\.pdf$/i, "") + ".txt";
  onProgress(100);

  return {
    url,
    filename,
    sizeOriginal: file.size,
    sizeConverted: blob.size,
    preview: fullText.slice(0, 500) + (fullText.length > 500 ? "…" : ""),
  };
}
