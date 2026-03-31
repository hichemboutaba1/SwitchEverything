export interface JsonConversionResult {
  blob: Blob;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  url: string;
  preview: string;
  rowCount: number;
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] ?? "";
    });
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export async function convertCsvToJson(
  file: File,
  onProgress?: (p: number) => void
): Promise<JsonConversionResult> {
  onProgress?.(10);

  const text = await file.text();
  onProgress?.(40);

  const data = parseCSV(text);
  onProgress?.(70);

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const filename = file.name.replace(/\.[^/.]+$/, "") + ".json";

  onProgress?.(100);

  return {
    blob,
    filename,
    sizeOriginal: file.size,
    sizeConverted: blob.size,
    url,
    preview: json.slice(0, 500) + (json.length > 500 ? "\n..." : ""),
    rowCount: data.length,
  };
}
