export interface ConversionResult {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  preview: string;
}

function nodeToObject(node: Element): unknown {
  const children = Array.from(node.children);

  if (children.length === 0) {
    const attrs = Object.fromEntries(
      Array.from(node.attributes).map((a) => [`@${a.name}`, a.value])
    );
    const text = node.textContent?.trim() ?? "";
    if (Object.keys(attrs).length > 0) return { ...attrs, "#text": text };
    return text;
  }

  const result: Record<string, unknown> = {};

  for (const attr of Array.from(node.attributes)) {
    result[`@${attr.name}`] = attr.value;
  }

  for (const child of children) {
    const key = child.tagName;
    const val = nodeToObject(child);
    if (key in result) {
      if (!Array.isArray(result[key])) result[key] = [result[key]];
      (result[key] as unknown[]).push(val);
    } else {
      result[key] = val;
    }
  }

  return result;
}

export async function convertXmlToJson(
  file: File,
  onProgress?: (p: number) => void
): Promise<ConversionResult> {
  onProgress?.(10);
  const text = await file.text();
  onProgress?.(30);

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "application/xml");
  const parseErr = doc.querySelector("parsererror");
  if (parseErr) throw new Error("Invalid XML file. Please check and try again.");

  onProgress?.(60);

  const root = doc.documentElement;
  const json = JSON.stringify({ [root.tagName]: nodeToObject(root) }, null, 2);

  onProgress?.(90);

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const filename = file.name.replace(/\.xml$/i, "") + ".json";
  const preview = json.slice(0, 500) + (json.length > 500 ? "\n…" : "");

  onProgress?.(100);
  return { url, filename, sizeOriginal: file.size, sizeConverted: blob.size, preview };
}
