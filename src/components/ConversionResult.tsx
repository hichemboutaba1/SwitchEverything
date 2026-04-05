"use client";

import { useState } from "react";
import AdSense from "./AdSense";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { formatBytes, getSavingPercent } from "@/lib/utils";

interface ResultData {
  url: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  preview?: string;
  originalPreview?: string; // for before/after
}

interface ConversionResultProps {
  result: ResultData;
  onReset: () => void;
  toFormat: string;
}

export default function ConversionResult({ result, onReset, toFormat }: ConversionResultProps) {
  const saving = getSavingPercent(result.sizeOriginal, result.sizeConverted);
  const isImage = result.filename.match(/\.(webp|jpg|jpeg|png|svg)$/i);
  const isText  = result.filename.match(/\.(json|csv|txt|html|xml|md)$/i);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    try {
      const res = await fetch(result.url);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silent */ }
  };

  const handleShare = async () => {
    const shareData = {
      title: "SwitchEverything — Free File Converter",
      text: `Just converted a file for free using SwitchEverything!`,
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="space-y-5 fade-in-up">
      {/* ── Success header ── */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4" style={{ background: "rgba(16,185,129,0.06)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "rgba(16,185,129,0.15)" }}>
              ✅
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Conversion complete!</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Your {toFormat} file is ready</p>
            </div>
          </div>
          {/* Share button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:text-white"
            style={{ color: "var(--text-secondary)", border: "1px solid var(--border)", background: "var(--surface-2)" }}
          >
            {shared ? "✓ Link copied!" : "↗ Share"}
          </button>
        </div>

        <div className="p-5 space-y-4" style={{ background: "var(--surface)" }}>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Original", value: formatBytes(result.sizeOriginal), color: "var(--text-primary)" },
              { label: "Converted", value: formatBytes(result.sizeConverted), color: "var(--text-primary)" },
              {
                label: saving > 0 ? "Saved" : saving < 0 ? "Grew" : "Same",
                value: saving !== 0 ? `${saving > 0 ? "-" : "+"}${Math.abs(saving)}%` : "—",
                color: saving > 0 ? "#10b981" : saving < 0 ? "#f59e0b" : "var(--text-primary)",
              },
            ].map((s) => (
              <div key={s.label} className="text-center rounded-xl p-3" style={{ background: "var(--surface-2)" }}>
                <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>{s.label}</p>
                <p className="font-bold text-sm" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Before/After slider for images */}
          {isImage && result.preview && result.originalPreview && (
            <BeforeAfterSlider
              originalUrl={result.originalPreview}
              convertedUrl={result.preview}
              label={toFormat}
            />
          )}

          {/* Single image preview (no original available) */}
          {isImage && result.preview && !result.originalPreview && (
            <div className="rounded-xl overflow-hidden" style={{ maxHeight: 240, border: "1px solid var(--border)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result.preview} alt="Preview" className="w-full object-contain" style={{ maxHeight: 240 }} />
            </div>
          )}

          {/* Text preview */}
          {isText && result.preview && (
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <div
                className="flex items-center justify-between px-3 py-2"
                style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}
              >
                <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Preview</span>
                <button
                  onClick={handleCopy}
                  className="text-xs px-2.5 py-1 rounded-lg transition-all hover:text-white"
                  style={{ color: copied ? "#10b981" : "var(--accent)", background: "rgba(108,99,255,0.1)" }}
                >
                  {copied ? "✓ Copied!" : "Copy content"}
                </button>
              </div>
              <pre
                className="text-xs font-mono p-4 overflow-auto"
                style={{ color: "var(--text-secondary)", background: "var(--surface-2)", maxHeight: 160, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {result.preview}
              </pre>
            </div>
          )}

          {/* Download button */}
          <a
            href={result.url}
            download={result.filename}
            className="btn-shimmer flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-[1.01]"
            style={{ boxShadow: "0 4px 20px rgba(108,99,255,0.4)" }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download {result.filename}
          </a>
        </div>
      </div>

      {/* Post-conversion ad */}
      <div className="flex justify-center">
        <AdSense slot="post-conversion-native" />
      </div>

      {/* Convert another */}
      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:text-white hover:border-violet-500"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
      >
        ↩ Convert Another File
      </button>
    </div>
  );
}
