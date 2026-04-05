"use client";

import { useCallback, useRef, useState } from "react";
import { convertImage, type ImageOutputFormat } from "@/lib/converters/imageConverter";
import { convertTextToPdf } from "@/lib/converters/textToPdf";
import { convertCsvToJson } from "@/lib/converters/csvToJson";
import { convertJsonToExcel } from "@/lib/converters/jsonToExcel";
import { convertJsonToCsv } from "@/lib/converters/jsonToCsv";
import { convertXmlToJson } from "@/lib/converters/xmlToJson";
import { convertMarkdownToHtml } from "@/lib/converters/markdownToHtml";
import { convertHtmlToText } from "@/lib/converters/htmlToText";
import { convertCsvToExcel } from "@/lib/converters/csvToExcel";
import { convertExcelToCsv } from "@/lib/converters/excelToCsv";
import { convertSvgToPng } from "@/lib/converters/svgToPng";
import type { ToolSlug } from "@/lib/utils";
import { formatBytes } from "@/lib/utils";

const IMAGE_FORMAT_MAP: Record<string, ImageOutputFormat> = {
  "convert-jpg-to-webp": "image/webp",
  "convert-png-to-webp": "image/webp",
  "convert-webp-to-jpg": "image/jpeg",
  "convert-webp-to-png": "image/png",
  "convert-png-to-jpg": "image/jpeg",
  "convert-jpg-to-png": "image/png",
};

type FileStatus = "waiting" | "converting" | "done" | "error";

interface BatchFile {
  id: string;
  file: File;
  status: FileStatus;
  progress: number;
  resultUrl?: string;
  resultFilename?: string;
  resultSize?: number;
  error?: string;
}

async function runConverter(
  slug: ToolSlug,
  file: File,
  quality: number,
  onProgress: (p: number) => void
): Promise<{ url: string; filename: string; size: number }> {
  if (slug in IMAGE_FORMAT_MAP) {
    const r = await convertImage(file, IMAGE_FORMAT_MAP[slug], onProgress, quality);
    return { url: r.url, filename: r.filename, size: r.sizeConverted };
  }
  if (slug === "convert-svg-to-png") {
    const r = await convertSvgToPng(file, onProgress);
    return { url: r.url, filename: r.filename, size: r.sizeConverted };
  }
  if (slug === "convert-text-to-pdf") {
    const r = await convertTextToPdf(file, onProgress);
    return { url: r.url, filename: r.filename, size: r.sizeConverted };
  }
  if (slug === "convert-csv-to-json") {
    const r = await convertCsvToJson(file, onProgress);
    return { url: r.url, filename: r.filename, size: r.sizeConverted };
  }
  if (slug === "convert-json-to-excel") {
    const r = await convertJsonToExcel(file, onProgress);
    return { url: r.url, filename: r.filename, size: r.sizeConverted };
  }
  if (slug === "convert-json-to-csv") {
    const r = await convertJsonToCsv(file, onProgress);
    return { url: r.url, filename: r.filename, size: r.sizeConverted };
  }
  if (slug === "convert-xml-to-json") {
    const r = await convertXmlToJson(file, onProgress);
    return { url: r.url, filename: r.filename, size: r.sizeConverted };
  }
  if (slug === "convert-markdown-to-html") {
    const r = await convertMarkdownToHtml(file, onProgress);
    return { url: r.url, filename: r.filename, size: r.sizeConverted };
  }
  if (slug === "convert-html-to-text") {
    const r = await convertHtmlToText(file, onProgress);
    return { url: r.url, filename: r.filename, size: r.sizeConverted };
  }
  if (slug === "convert-csv-to-excel") {
    const r = await convertCsvToExcel(file, onProgress);
    return { url: r.url, filename: r.filename, size: r.sizeConverted };
  }
  if (slug === "convert-excel-to-csv") {
    const r = await convertExcelToCsv(file, onProgress);
    return { url: r.url, filename: r.filename, size: r.sizeConverted };
  }
  throw new Error("Converter not found.");
}

interface Props {
  slug: ToolSlug;
  accept: string;
  fromFormat: string;
  toFormat: string;
  quality: number;
}

export default function BatchConverterWidget({ slug, accept, fromFormat, toFormat, quality }: Props) {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    setFiles((prev) => [
      ...prev,
      ...arr.map((f) => ({
        id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
        file: f,
        status: "waiting" as FileStatus,
        progress: 0,
      })),
    ]);
  }, []);

  const convertAll = useCallback(async () => {
    setFiles((prev) =>
      prev.map((f) => (f.status === "waiting" ? { ...f, status: "converting" } : f))
    );

    const waiting = files.filter((f) => f.status === "waiting");
    for (const item of waiting) {
      setFiles((prev) =>
        prev.map((f) => (f.id === item.id ? { ...f, status: "converting", progress: 0 } : f))
      );
      try {
        const result = await runConverter(slug, item.file, quality, (p) => {
          setFiles((prev) =>
            prev.map((f) => (f.id === item.id ? { ...f, progress: p } : f))
          );
        });
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? { ...f, status: "done", progress: 100, resultUrl: result.url, resultFilename: result.filename, resultSize: result.size }
              : f
          )
        );
      } catch (err) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? { ...f, status: "error", error: err instanceof Error ? err.message : "Failed" }
              : f
          )
        );
      }
    }
  }, [files, slug, quality]);

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f?.resultUrl) URL.revokeObjectURL(f.resultUrl);
      return prev.filter((x) => x.id !== id);
    });
  };

  const clearAll = () => {
    files.forEach((f) => { if (f.resultUrl) URL.revokeObjectURL(f.resultUrl); });
    setFiles([]);
  };

  const waitingCount = files.filter((f) => f.status === "waiting").length;
  const doneCount = files.filter((f) => f.status === "done").length;

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200"
        style={{
          borderColor: isDragging ? "#6c63ff" : "var(--border)",
          background: isDragging ? "rgba(108,99,255,0.06)" : "var(--surface)",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="sr-only"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <div className="text-3xl mb-3">📂</div>
        <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
          Drop multiple {fromFormat} files here
        </p>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          or click to browse — convert all at once to {toFormat}
        </p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}
          >
            <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
              {files.length} file{files.length !== 1 ? "s" : ""} · {doneCount} converted
            </span>
            <button onClick={clearAll} className="text-xs hover:text-white transition-colors" style={{ color: "var(--text-secondary)" }}>
              Clear all
            </button>
          </div>

          {/* Files */}
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {files.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-4 py-3" style={{ background: "var(--surface)" }}>
                {/* Status icon */}
                <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: item.status === "done" ? "rgba(16,185,129,0.12)" : item.status === "error" ? "rgba(239,68,68,0.12)" : item.status === "converting" ? "rgba(108,99,255,0.12)" : "var(--surface-2)" }}>
                  {item.status === "done" && "✓"}
                  {item.status === "error" && "✗"}
                  {item.status === "converting" && <span className="spinning-slow inline-block">⚙</span>}
                  {item.status === "waiting" && "·"}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>{item.file.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{formatBytes(item.file.size)}</span>
                    {item.resultSize && (
                      <>
                        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>→</span>
                        <span className="text-xs" style={{ color: "#10b981" }}>{formatBytes(item.resultSize)}</span>
                      </>
                    )}
                    {item.status === "error" && (
                      <span className="text-xs" style={{ color: "#ef4444" }}>{item.error}</span>
                    )}
                  </div>
                  {item.status === "converting" && (
                    <div className="h-1 rounded-full mt-1.5 overflow-hidden" style={{ background: "var(--surface-2)" }}>
                      <div className="h-full rounded-full progress-bar-animated transition-all duration-200" style={{ width: `${item.progress}%` }} />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.status === "done" && item.resultUrl && (
                    <a
                      href={item.resultUrl}
                      download={item.resultFilename}
                      className="text-xs px-2.5 py-1 rounded-lg font-medium text-white transition-all hover:scale-105"
                      style={{ background: "linear-gradient(135deg, #6c63ff, #a78bfa)" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      ↓
                    </a>
                  )}
                  <button
                    onClick={() => removeFile(item.id)}
                    className="text-xs w-6 h-6 rounded-lg flex items-center justify-center transition-colors hover:text-white"
                    style={{ color: "var(--text-secondary)", background: "var(--surface-2)" }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Convert button */}
          {waitingCount > 0 && (
            <div className="p-3" style={{ background: "var(--surface-2)", borderTop: "1px solid var(--border)" }}>
              <button
                onClick={convertAll}
                className="btn-shimmer w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.01]"
                style={{ boxShadow: "0 4px 16px rgba(108,99,255,0.35)" }}
              >
                Convert {waitingCount} file{waitingCount !== 1 ? "s" : ""} to {toFormat} →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
