export interface ConversionResult {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  preview: string;
}

export async function convertJsonToCsv(
  file: File,
  onProgress?: (p: number) => void
): Promise<ConversionResult> {
  onProgress?.(10);
  const text = await file.text();
  onProgress?.(30);

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON file. Please check the file and try again.");
  }

  const rows: unknown[][] = [];

  if (Array.isArray(data)) {
    if (data.length === 0) throw new Error("JSON array is empty.");
    const firstItem = data[0];
    if (typeof firstItem === "object" && firstItem !== null) {
      const headers = Object.keys(firstItem as object);
      rows.push(headers);
      for (const item of data) {
        rows.push(headers.map((h) => {
          const val = (item as Record<string, unknown>)[h];
          return val === null || val === undefined ? "" : String(val);
        }));
      }
    } else {
      rows.push(["value"]);
      for (const item of data) rows.push([String(item)]);
    }
  } else if (typeof data === "object" && data !== null) {
    rows.push(["key", "value"]);
    for (const [k, v] of Object.entries(data as object)) {
      rows.push([k, typeof v === "object" ? JSON.stringify(v) : String(v)]);
    }
  } else {
    throw new Error("JSON must be an array or object.");
  }

  onProgress?.(70);

  const escape = (v: unknown) => {
    const s = String(v ?? "");
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };

  const csv = rows.map((row) => row.map(escape).join(",")).join("\r\n");
  onProgress?.(90);

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const filename = file.name.replace(/\.json$/i, "") + ".csv";
  const preview = csv.slice(0, 500) + (csv.length > 500 ? "\n…" : "");

  onProgress?.(100);
  return { url, filename, sizeOriginal: file.size, sizeConverted: blob.size, preview };
}
