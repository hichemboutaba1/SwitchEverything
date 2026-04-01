import * as XLSX from "xlsx";

export interface ConversionResult {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
}

export async function convertCsvToExcel(
  file: File,
  onProgress?: (p: number) => void
): Promise<ConversionResult> {
  onProgress?.(10);
  const text = await file.text();
  onProgress?.(40);

  const wb = XLSX.read(text, { type: "string" });
  onProgress?.(70);

  const buffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  onProgress?.(90);

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const filename = file.name.replace(/\.csv$/i, "") + ".xlsx";

  onProgress?.(100);
  return { url, filename, sizeOriginal: file.size, sizeConverted: blob.size };
}
