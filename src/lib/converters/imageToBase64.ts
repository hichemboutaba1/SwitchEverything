export async function convertImageToBase64(
  file: File,
  onProgress: (p: number) => void
): Promise<{ url: string; filename: string; sizeOriginal: number; sizeConverted: number; preview: string }> {
  onProgress(20);

  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  onProgress(80);

  const mimeType = base64.split(";")[0].replace("data:", "");
  const b64data = base64.split(",")[1];

  // Output as plain text (just the data URI)
  const output = `data:${mimeType};base64,${b64data}`;
  const blob = new Blob([output], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const filename = file.name.replace(/\.[^.]+$/, "") + ".txt";

  onProgress(100);

  return {
    url,
    filename,
    sizeOriginal: file.size,
    sizeConverted: blob.size,
    preview: output.slice(0, 200) + "…",
  };
}
