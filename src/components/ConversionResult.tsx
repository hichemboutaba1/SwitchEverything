"use client";

import AdSense from "./AdSense";
import { formatBytes, getSavingPercent } from "@/lib/utils";

interface ResultData {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  preview?: string; // base64 image or text snippet
}

interface ConversionResultProps {
  result: ResultData;
  onReset: () => void;
  toFormat: string;
}

export default function ConversionResult({ result, onReset, toFormat }: ConversionResultProps) {
  const saving = getSavingPercent(result.sizeOriginal, result.sizeConverted);
  const isImage = result.filename.match(/\.(webp|jpg|jpeg|png)$/i);

  return (
    <div className="space-y-6 fade-in-up">
      {/* Success header */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "rgba(16, 185, 129, 0.15)" }}
          >
            ✅
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
              Conversion Complete!
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Your {toFormat} file is ready to download
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div
            className="rounded-xl p-3 text-center"
            style={{ background: "var(--surface-2)" }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>Original</p>
            <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              {formatBytes(result.sizeOriginal)}
            </p>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{ background: "var(--surface-2)" }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>Converted</p>
            <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              {formatBytes(result.sizeConverted)}
            </p>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{
              background: saving > 0 ? "rgba(16, 185, 129, 0.1)" : "var(--surface-2)",
            }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>
              {saving > 0 ? "Saved" : "Size Change"}
            </p>
            <p
              className="font-semibold text-sm"
              style={{ color: saving > 0 ? "#10b981" : "var(--text-primary)" }}
            >
              {saving > 0 ? `-${saving}%` : saving < 0 ? `+${Math.abs(saving)}%` : "Same"}
            </p>
          </div>
        </div>

        {/* Image preview */}
        {isImage && result.preview && (
          <div className="mb-5 rounded-xl overflow-hidden" style={{ maxHeight: 200 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.preview}
              alt="Converted image preview"
              className="w-full object-contain"
              style={{ maxHeight: 200 }}
            />
          </div>
        )}

        {/* Text preview */}
        {result.preview && !isImage && (
          <div
            className="mb-5 rounded-xl p-4 text-xs font-mono overflow-auto"
            style={{
              background: "var(--surface-2)",
              color: "var(--text-secondary)",
              maxHeight: 160,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {result.preview}
          </div>
        )}

        {/* Download button */}
        <a
          href={result.url}
          download={result.filename}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
            boxShadow: "0 4px 20px rgba(108, 99, 255, 0.4)",
          }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download {result.filename}
        </a>
      </div>

      {/* Post-conversion ad */}
      <div className="flex justify-center">
        <AdSense slot="post-conversion-native" />
      </div>

      {/* Convert another */}
      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:text-white"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        ↩ Convert Another File
      </button>
    </div>
  );
}
