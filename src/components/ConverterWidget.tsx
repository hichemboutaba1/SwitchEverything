"use client";

import { useCallback, useState } from "react";
import UploadZone from "./UploadZone";
import ConversionResult from "./ConversionResult";
import { convertImage, type ImageOutputFormat } from "@/lib/converters/imageConverter";
import { convertTextToPdf } from "@/lib/converters/textToPdf";
import { convertCsvToJson } from "@/lib/converters/csvToJson";
import { convertJsonToExcel } from "@/lib/converters/jsonToExcel";
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
};

export default function ConverterWidget({
  slug,
  fromFormat,
  toFormat,
  accept,
}: ConverterWidgetProps) {
  const [status, setStatus] = useState<"idle" | "converting" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ResultData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFile = useCallback(
    async (file: File) => {
      setStatus("converting");
      setProgress(0);
      setErrorMsg("");

      try {
        // Image conversions
        if (slug in IMAGE_FORMAT_MAP) {
          const outputFormat = IMAGE_FORMAT_MAP[slug];
          const res = await convertImage(file, outputFormat, setProgress);
          setResult({
            url: res.url,
            filename: res.filename,
            sizeOriginal: res.sizeOriginal,
            sizeConverted: res.sizeConverted,
            preview: res.url,
          });
        } else if (slug === "convert-text-to-pdf") {
          const res = await convertTextToPdf(file, setProgress);
          setResult({
            url: res.url,
            filename: res.filename,
            sizeOriginal: res.sizeOriginal,
            sizeConverted: res.sizeConverted,
          });
        } else if (slug === "convert-csv-to-json") {
          const res = await convertCsvToJson(file, setProgress);
          setResult({
            url: res.url,
            filename: res.filename,
            sizeOriginal: res.sizeOriginal,
            sizeConverted: res.sizeConverted,
            preview: res.preview,
          });
        } else if (slug === "convert-json-to-excel") {
          const res = await convertJsonToExcel(file, setProgress);
          setResult({
            url: res.url,
            filename: res.filename,
            sizeOriginal: res.sizeOriginal,
            sizeConverted: res.sizeConverted,
          });
        }

        setStatus("done");
      } catch (err) {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Conversion failed. Please try again.");
      }
    },
    [slug]
  );

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
          <div className="text-4xl mb-4">⚙️</div>
          <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Converting {fromFormat} → {toFormat}…
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            Processing locally — your file never leaves your device
          </p>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "var(--surface-2)" }}
          >
            <div
              className="h-full rounded-full progress-bar-animated transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>
            {progress}%
          </p>
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
          style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)" }}
        >
          <span className="text-red-400 text-lg">⚠️</span>
          <div>
            <p className="font-medium text-red-400 text-sm">Conversion Error</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{errorMsg}</p>
            <button
              onClick={handleReset}
              className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
