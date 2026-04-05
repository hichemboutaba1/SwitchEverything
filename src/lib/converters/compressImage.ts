import imageCompression from "browser-image-compression";

export interface ConversionResult {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  preview: string;
}

export async function compressImage(
  file: File,
  onProgress?: (p: number) => void,
  quality = 75
): Promise<ConversionResult> {
  onProgress?.(10);
  const options = {
    maxSizeMB: 10,
    fileType: file.type as "image/jpeg" | "image/png" | "image/webp",
    initialQuality: quality / 100,
    useWebWorker: true,
    onProgress: (p: number) => onProgress?.(10 + p * 0.85),
  };
  const compressed = await imageCompression(file, options);
  onProgress?.(100);
  const url = URL.createObjectURL(compressed);
  return { url, filename: file.name, sizeOriginal: file.size, sizeConverted: compressed.size, preview: url };
}
