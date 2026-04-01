export interface ConversionResult {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  preview: string;
}

export async function convertHtmlToText(
  file: File,
  onProgress?: (p: number) => void
): Promise<ConversionResult> {
  onProgress?.(10);
  const html = await file.text();
  onProgress?.(40);

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Remove script & style tags
  doc.querySelectorAll("script, style, noscript").forEach((el) => el.remove());

  // Add newlines for block elements
  doc.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, li, tr, br").forEach((el) => {
    el.insertAdjacentText("afterend", "\n");
  });

  const text = (doc.body.textContent ?? "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  onProgress?.(90);

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const filename = file.name.replace(/\.html?$/i, "") + ".txt";
  const preview = text.slice(0, 500) + (text.length > 500 ? "\n…" : "");

  onProgress?.(100);
  return { url, filename, sizeOriginal: file.size, sizeConverted: blob.size, preview };
}
