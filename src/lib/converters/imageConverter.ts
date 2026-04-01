import imageCompression from "browser-image-compression";

export type ImageOutputFormat = "image/webp" | "image/jpeg" | "image/png";

export interface ConversionResult {
  blob: Blob;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  url: string;
}

function getOutputFilename(
  originalName: string,
  outputFormat: ImageOutputFormat
): string {
  const ext = outputFormat.split("/")[1].replace("jpeg", "jpg");
  const base = originalName.replace(/\.[^/.]+$/, "");
  return `${base}.${ext}`;
}

export async function convertImage(
  file: File,
  outputFormat: ImageOutputFormat,
  onProgress?: (p: number) => void,
  quality = 85
): Promise<ConversionResult> {
  onProgress?.(10);

  const options = {
    maxSizeMB: 50,
    fileType: outputFormat,
    initialQuality: quality / 100,
    useWebWorker: true,
    onProgress: (p: number) => onProgress?.(10 + p * 0.8),
  };

  const compressed = await imageCompression(file, options);
  onProgress?.(95);

  const url = URL.createObjectURL(compressed);
  onProgress?.(100);

  return {
    blob: compressed,
    filename: getOutputFilename(file.name, outputFormat),
    sizeOriginal: file.size,
    sizeConverted: compressed.size,
    url,
  };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
