export async function convertWordToPdf(
  file: File,
  onProgress: (p: number) => void
): Promise<{ url: string; filename: string; sizeOriginal: number; sizeConverted: number; preview: string }> {
  onProgress(10);

  // 1. Extract structured text from DOCX
  const mammoth = await import("mammoth");
  onProgress(25);

  const arrayBuffer = await file.arrayBuffer();
  const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
  onProgress(50);

  // 2. Parse HTML to extract text blocks with styling hints
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlResult.value, "text/html");

  // 3. Build PDF with jsPDF
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageW   = 210;
  const marginX = 20;
  const marginY = 20;
  const contentW = pageW - marginX * 2;
  let y = marginY;
  const pageH = 297;

  const checkNewPage = (needed: number) => {
    if (y + needed > pageH - marginY) {
      pdf.addPage();
      y = marginY;
    }
  };

  const addText = (text: string, size: number, bold: boolean, color: [number,number,number], lineHeight: number, indent = 0) => {
    pdf.setFontSize(size);
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setTextColor(...color);
    const lines = pdf.splitTextToSize(text.trim(), contentW - indent);
    for (const line of lines) {
      checkNewPage(lineHeight);
      pdf.text(line, marginX + indent, y);
      y += lineHeight;
    }
  };

  const processNode = (node: Element) => {
    const tag = node.tagName?.toLowerCase();
    const text = node.textContent?.trim() ?? "";
    if (!text) return;

    if (tag === "h1") {
      y += 4;
      checkNewPage(10);
      addText(text, 18, true, [30, 30, 30], 9);
      y += 2;
    } else if (tag === "h2") {
      y += 3;
      checkNewPage(9);
      addText(text, 14, true, [50, 50, 50], 8);
      y += 2;
    } else if (tag === "h3") {
      y += 2;
      checkNewPage(8);
      addText(text, 12, true, [70, 70, 70], 7);
      y += 1;
    } else if (tag === "p") {
      checkNewPage(7);
      addText(text, 11, false, [30, 30, 30], 6);
      y += 1;
    } else if (tag === "li") {
      checkNewPage(6);
      addText(`• ${text}`, 10, false, [30, 30, 30], 6, 4);
    } else if (tag === "table") {
      const rows = Array.from(node.querySelectorAll("tr"));
      const colCount = Math.max(...rows.map((r) => r.querySelectorAll("td,th").length));
      const colW = contentW / Math.max(colCount, 1);
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll("td,th"));
        const isHeader = cells.some((c) => c.tagName.toLowerCase() === "th");
        checkNewPage(8);
        let cx = marginX;
        for (const cell of cells) {
          pdf.setFillColor(isHeader ? 240 : 255, isHeader ? 240 : 255, isHeader ? 240 : 255);
          pdf.rect(cx, y - 5, colW, 8, "FD");
          pdf.setFontSize(9);
          pdf.setFont("helvetica", isHeader ? "bold" : "normal");
          pdf.setTextColor(30, 30, 30);
          const cellLines = pdf.splitTextToSize(cell.textContent?.trim() ?? "", colW - 2);
          pdf.text(cellLines[0] ?? "", cx + 1, y);
          cx += colW;
        }
        y += 8;
      }
      y += 2;
    }
  };

  // Process body children
  const body = doc.body;
  const walk = (parent: Element) => {
    for (const child of Array.from(parent.children)) {
      const tag = child.tagName?.toLowerCase();
      if (["h1","h2","h3","p","li","table"].includes(tag)) {
        processNode(child);
      } else {
        walk(child);
      }
    }
  };
  walk(body);
  onProgress(85);

  const blob = pdf.output("blob");
  const url = URL.createObjectURL(blob);
  const filename = file.name.replace(/\.docx?$/i, "") + ".pdf";
  const preview = doc.body.textContent?.slice(0, 300) ?? "";
  onProgress(100);

  return { url, filename, sizeOriginal: file.size, sizeConverted: blob.size, preview };
}
