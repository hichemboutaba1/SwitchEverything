import * as XLSX from "xlsx";

export interface ConversionResult {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  preview: string;
}

export async function convertExcelToCsv(
  file: File,
  onProgress?: (p: number) => void
): Promise<ConversionResult> {
  onProgress?.(10);
  const buffer = await file.arrayBuffer();
  onProgress?.(40);

  const wb = XLSX.read(buffer, { type: "array" });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  onProgress?.(70);

  const csv = XLSX.utils.sheet_to_csv(ws);
  onProgress?.(90);

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const filename = file.name.replace(/\.(xlsx?|xls)$/i, "") + ".csv";
  const preview = csv.slice(0, 500) + (csv.length > 500 ? "\n…" : "");

  onProgress?.(100);
  return { url, filename, sizeOriginal: file.size, sizeConverted: blob.size, preview };
}
