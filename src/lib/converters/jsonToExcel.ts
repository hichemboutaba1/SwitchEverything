import * as XLSX from "xlsx";

export interface ExcelConversionResult {
  blob: Blob;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  url: string;
  rowCount: number;
  columnCount: number;
}

export async function convertJsonToExcel(
  file: File,
  onProgress?: (p: number) => void
): Promise<ExcelConversionResult> {
  onProgress?.(10);

  const text = await file.text();
  onProgress?.(30);

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON: could not parse file.");
  }

  onProgress?.(50);

  // Support array of objects or single object
  const rows: Record<string, unknown>[] = Array.isArray(data)
    ? (data as Record<string, unknown>[])
    : [data as Record<string, unknown>];

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  onProgress?.(80);

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const filename = file.name.replace(/\.[^/.]+$/, "") + ".xlsx";

  onProgress?.(100);

  const columnCount =
    rows.length > 0 ? Object.keys(rows[0] ?? {}).length : 0;

  return {
    blob,
    filename,
    sizeOriginal: file.size,
    sizeConverted: blob.size,
    url,
    rowCount: rows.length,
    columnCount,
  };
}
