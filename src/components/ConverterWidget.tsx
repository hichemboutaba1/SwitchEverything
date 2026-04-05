"use client";

import { useCallback, useEffect, useState } from "react";
import UploadZone from "./UploadZone";
import ConversionResult from "./ConversionResult";
import BatchConverterWidget from "./BatchConverterWidget";
import { useToast } from "./Toast";
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
import { convertPdfToText } from "@/lib/converters/pdfToText";
import { convertImageToBase64 } from "@/lib/converters/imageToBase64";
import type { ToolSlug } from "@/lib/utils";

interface ResultData {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  preview?: string;
  originalPreview?: string;
}

interface ConverterWidgetProps {
  slug: ToolSlug;
  fromFormat: string;
  toFormat: string;
  accept: string;
}

const IMAGE_FORMAT_MAP: Record<string, ImageOutputFormat> = {
  "convert-jpg-to-webp": "image/webp",
  "convert-png-to-webp": "image/webp",
  "convert-webp-to-jpg": "image/jpeg",
  "convert-webp-to-png": "image/png",
  "convert-png-to-jpg":  "image/jpeg",
  "convert-jpg-to-png":  "image/png",
};

const IS_IMAGE_TOOL = (slug: string) => slug in IMAGE_FORMAT_MAP || slug === "convert-svg-to-png";

export default function ConverterWidget({ slug, fromFormat, toFormat, accept }: ConverterWidgetProps) {
  const [status,   setStatus]   = useState<"idle" | "converting" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [result,   setResult]   = useState<ResultData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [quality,  setQuality]  = useState(85);
  const [batchMode, setBatchMode] = useState(false);
  const [originalPreview, setOriginalPreview] = useState<string | undefined>();
  const { toast } = useToast();

  // Ctrl+V clipboard paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (status !== "idle") return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            toast(`Pasted "${file.name}" — converting…`, "info");
            handleFile(file);
          }
          break;
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleFile = useCallback(async (file: File) => {
    setStatus("converting");
    setProgress(0);
    setErrorMsg("");

    // Create preview of original for before/after
    if (IS_IMAGE_TOOL(slug) && file.type.startsWith("image/")) {
      const origUrl = URL.createObjectURL(file);
      setOriginalPreview(origUrl);
    }

    try {
      let res: ResultData;

      if (slug in IMAGE_FORMAT_MAP) {
        const r = await convertImage(file, IMAGE_FORMAT_MAP[slug], setProgress, quality);
        res = { ...r, preview: r.url };

      } else if (slug === "convert-svg-to-png") {
        const r = await convertSvgToPng(file, setProgress);
        res = { ...r, preview: r.preview };

      } else if (slug === "convert-text-to-pdf") {
        res = await convertTextToPdf(file, setProgress);

      } else if (slug === "convert-csv-to-json") {
        const r = await convertCsvToJson(file, setProgress);
        res = { ...r, preview: r.preview };

      } else if (slug === "convert-json-to-excel") {
        res = await convertJsonToExcel(file, setProgress);

      } else if (slug === "convert-json-to-csv") {
        const r = await convertJsonToCsv(file, setProgress);
        res = { ...r, preview: r.preview };

      } else if (slug === "convert-xml-to-json") {
        const r = await convertXmlToJson(file, setProgress);
        res = { ...r, preview: r.preview };

      } else if (slug === "convert-markdown-to-html") {
        const r = await convertMarkdownToHtml(file, setProgress);
        res = { ...r, preview: r.preview };

      } else if (slug === "convert-html-to-text") {
        const r = await convertHtmlToText(file, setProgress);
        res = { ...r, preview: r.preview };

      } else if (slug === "convert-csv-to-excel") {
        res = await convertCsvToExcel(file, setProgress);

      } else if (slug === "convert-excel-to-csv") {
        const r = await convertExcelToCsv(file, setProgress);
        res = { ...r, preview: r.preview };

      } else if (slug === "pdf-to-text") {
        const r = await convertPdfToText(file, setProgress);
        res = { ...r, preview: r.preview };

      } else if (slug === "image-to-base64") {
        const r = await convertImageToBase64(file, setProgress);
        res = { ...r, preview: r.preview };

      } else {
        throw new Error("Converter not found for this tool.");
      }

      setResult({ ...res, originalPreview });
      setStatus("done");
      toast(`✅ Converted to ${toFormat} successfully!`, "success");
    } catch (err) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Conversion failed. Please try again.";
      setErrorMsg(msg);
      toast(msg, "error");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, quality, originalPreview]);

  const handleReset = useCallback(() => {
    if (result?.url) URL.revokeObjectURL(result.url);
    if (originalPreview) URL.revokeObjectURL(originalPreview);
    setResult(null);
    setStatus("idle");
    setProgress(0);
    setErrorMsg("");
    setOriginalPreview(undefined);
  }, [result, originalPreview]);

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      {status === "idle" && !batchMode && (
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Press <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>Ctrl+V</kbd> to paste from clipboard
          </span>
          <button
            onClick={() => setBatchMode(true)}
            className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all hover:text-white"
            style={{ color: "var(--accent)", border: "1px solid rgba(108,99,255,0.3)", background: "rgba(108,99,255,0.06)" }}
          >
            📂 Batch mode
          </button>
        </div>
      )}

      {batchMode && status === "idle" ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              Batch Conversion
            </span>
            <button onClick={() => setBatchMode(false)} className="text-xs hover:text-white transition-colors" style={{ color: "var(--text-secondary)" }}>
              ← Single file
            </button>
          </div>
          <BatchConverterWidget slug={slug} accept={accept} fromFormat={fromFormat} toFormat={toFormat} quality={quality} />
        </div>
      ) : status === "done" && result ? (
        <ConversionResult result={result} onReset={handleReset} toFormat={toFormat} />
      ) : status === "converting" ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 spinning-slow"
            style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>
            ⚙️
          </div>
          <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            Converting {fromFormat} → {toFormat}…
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            Processing locally — your file never leaves your device
          </p>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
            <div className="h-full rounded-full progress-bar-animated transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>{progress}%</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Quality slider for image tools */}
          {IS_IMAGE_TOOL(slug) && slug !== "convert-svg-to-png" && (
            <div className="rounded-2xl p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Output Quality</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{
                      background: quality >= 80 ? "rgba(16,185,129,0.12)" : quality >= 60 ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)",
                      color: quality >= 80 ? "#10b981" : quality >= 60 ? "#f59e0b" : "#ef4444",
                    }}>
                    {quality >= 85 ? "High" : quality >= 65 ? "Medium" : "Low"}
                  </span>
                  <span className="text-sm font-bold w-8 text-right" style={{ color: "var(--accent)" }}>{quality}</span>
                </div>
              </div>
              <input type="range" min={10} max={100} step={5} value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "var(--accent)" }} />
              <div className="flex justify-between mt-1">
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Smaller file</span>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Best quality</span>
              </div>
            </div>
          )}
          <UploadZone accept={accept} onFile={handleFile} fromFormat={fromFormat} toFormat={toFormat} />
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl p-4 flex items-start gap-3"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <span className="text-lg">⚠️</span>
          <div>
            <p className="font-medium text-red-400 text-sm">Conversion Error</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{errorMsg}</p>
            <button onClick={handleReset} className="mt-2 text-xs text-red-400 hover:text-red-300 underline">Try again</button>
          </div>
        </div>
      )}
    </div>
  );
}
