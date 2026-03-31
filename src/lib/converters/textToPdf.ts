import { jsPDF } from "jspdf";

export interface PdfConversionResult {
  blob: Blob;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  url: string;
}

export async function convertTextToPdf(
  file: File,
  onProgress?: (p: number) => void
): Promise<PdfConversionResult> {
  onProgress?.(10);

  const text = await file.text();
  onProgress?.(40);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  const maxWidth = pageWidth - margin * 2;
  const maxY = pageHeight - margin;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(30, 30, 30);

  // Add filename as title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  const title = file.name.replace(/\.[^/.]+$/, "");
  doc.text(title, margin, margin + 5);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const lines = text.split("\n");
  let y = margin + 18;

  onProgress?.(60);

  for (const rawLine of lines) {
    const wrapped = doc.splitTextToSize(rawLine || " ", maxWidth) as string[];
    for (const segment of wrapped) {
      if (y + lineHeight > maxY) {
        doc.addPage();
        y = margin;
      }
      doc.text(segment, margin, y);
      y += lineHeight;
    }
  }

  onProgress?.(90);

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const filename = file.name.replace(/\.[^/.]+$/, "") + ".pdf";

  onProgress?.(100);

  return {
    blob: pdfBlob,
    filename,
    sizeOriginal: file.size,
    sizeConverted: pdfBlob.size,
    url,
  };
}
