import { marked } from "marked";

export interface ConversionResult {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  preview: string;
}

const HTML_TEMPLATE = (title: string, body: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1a1a2e; line-height: 1.7; }
    h1,h2,h3,h4,h5,h6 { line-height: 1.3; margin-top: 1.5em; }
    code { background: #f4f4f8; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
    pre code { display: block; padding: 16px; overflow-x: auto; }
    blockquote { border-left: 4px solid #6c63ff; margin: 0; padding-left: 16px; color: #555; }
    a { color: #6c63ff; }
    img { max-width: 100%; }
    table { border-collapse: collapse; width: 100%; }
    td, th { border: 1px solid #ddd; padding: 8px 12px; }
    th { background: #f4f4f8; }
  </style>
</head>
<body>
${body}
</body>
</html>`;

export async function convertMarkdownToHtml(
  file: File,
  onProgress?: (p: number) => void
): Promise<ConversionResult> {
  onProgress?.(10);
  const text = await file.text();
  onProgress?.(40);

  const body = await marked(text);
  const title = file.name.replace(/\.md$/i, "");
  const html = HTML_TEMPLATE(title, body as string);

  onProgress?.(90);

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const filename = file.name.replace(/\.md$/i, "") + ".html";
  const preview = html.slice(0, 500) + (html.length > 500 ? "\n…" : "");

  onProgress?.(100);
  return { url, filename, sizeOriginal: file.size, sizeConverted: blob.size, preview };
}
