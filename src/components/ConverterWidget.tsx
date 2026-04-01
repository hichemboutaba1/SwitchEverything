"use client";

import { useCallback, useState } from "react";
import UploadZone from "./UploadZone";
import ConversionResult from "./ConversionResult";
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

interface ResultData {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  preview?: string;
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

export default function ConverterWidget({ slug, fromFormat, toFormat, accept }: ConverterWidgetProps) {
  const [status, setStatus]   = useState<"idle" | "converting" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult]   = useState<ResultData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFile = useCallback(async (file: File) => {
    setStatus("converting");
    setProgress(0);
    setErrorMsg("");

    try {
      let res: ResultData;

      if (slug in IMAGE_FORMAT_MAP) {
        const r = await convertImage(file, IMAGE_FORMAT_MAP[slug], setProgress);
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

      } else {
        throw new Error("Converter not found for this tool.");
      }

      setResult(res);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Conversion failed. Please try again.");
    }
  }, [slug]);

  const handleReset = useCallback(() => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setStatus("idle");
    setProgress(0);
    setErrorMsg("");
  }, [result]);

  if (status === "done" && result) {
    return <ConversionResult result={result} onReset={handleReset} toFormat={toFormat} />;
  }

  return (
    <div className="space-y-4">
      {status === "converting" ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 spinning-slow"
            style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}
          >
            ⚙️
          </div>
          <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            Converting {fromFormat} → {toFormat}…
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            Processing locally — your file never leaves your device
          </p>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
            <div
              className="h-full rounded-full progress-bar-animated transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>{progress}%</p>
        </div>
      ) : (
        <UploadZone
          accept={accept}
          onFile={handleFile}
          fromFormat={fromFormat}
          toFormat={toFormat}
        />
      )}

      {status === "error" && (
        <div
          className="rounded-xl p-4 flex items-start gap-3"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <span className="text-lg">⚠️</span>
          <div>
            <p className="font-medium text-red-400 text-sm">Conversion Error</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{errorMsg}</p>
            <button onClick={handleReset} className="mt-2 text-xs text-red-400 hover:text-red-300 underline">
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
