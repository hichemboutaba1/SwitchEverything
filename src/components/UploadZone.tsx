"use client";

import { useCallback, useRef, useState } from "react";

interface UploadZoneProps {
  accept: string;
  onFile: (file: File) => void;
  disabled?: boolean;
  fromFormat: string;
  toFormat: string;
}

export default function UploadZone({
  accept,
  onFile,
  disabled = false,
  fromFormat,
  toFormat,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => { if (!disabled) onFile(file); },
    [disabled, onFile]
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Upload ${fromFormat} file to convert to ${toFormat}`}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && !disabled && inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative cursor-pointer rounded-3xl text-center transition-all duration-300 select-none ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
      style={{
        padding: "48px 32px",
        background: isDragging
          ? "rgba(108,99,255,0.06)"
          : "var(--surface)",
        border: isDragging
          ? "2px solid rgba(108,99,255,0.7)"
          : "2px dashed var(--border)",
        transform: isDragging ? "scale(1.01)" : "scale(1)",
        boxShadow: isDragging
          ? "0 0 0 4px rgba(108,99,255,0.1), 0 20px 60px rgba(108,99,255,0.15)"
          : "0 8px 40px rgba(0,0,0,0.2)",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="sr-only"
        disabled={disabled}
        aria-hidden="true"
      />

      {/* Pulsing rings (behind the icon) */}
      {!disabled && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: "1px solid rgba(108,99,255,0.15)",
                top: -60,
                left: -60,
                animation: `pulse-ring 3s ease-out ${i * 0.9}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">
        {/* Icon with animated ring */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Spinning gradient ring */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              background: isDragging
                ? "conic-gradient(#6c63ff, #a78bfa, #ec4899, #6c63ff)"
                : "conic-gradient(rgba(108,99,255,0.4), transparent, rgba(108,99,255,0.4))",
              animation: "spin-slow 4s linear infinite",
              padding: 2,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "var(--surface)",
              }}
            />
          </div>

          {/* Icon core */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center relative"
            style={{
              background: "rgba(108,99,255,0.08)",
              border: "1px solid rgba(108,99,255,0.2)",
            }}
          >
            <svg
              width="36"
              height="36"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              className="floating"
              style={{ color: "#a78bfa" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
        </div>

        {/* Format conversion display */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span
            className="px-3 py-1.5 rounded-lg text-sm font-bold"
            style={{
              background: "rgba(108,99,255,0.1)",
              border: "1px solid rgba(108,99,255,0.25)",
              color: "#a78bfa",
            }}
          >
            {fromFormat.toUpperCase()}
          </span>
          <div className="flex items-center gap-1">
            <div style={{ width: 20, height: 1, background: "var(--border)" }} />
            <svg
              width="14" height="14"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={2.5}
              style={{ color: "#6c63ff" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div style={{ width: 20, height: 1, background: "var(--border)" }} />
          </div>
          <span
            className="px-3 py-1.5 rounded-lg text-sm font-bold"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#10b981",
            }}
          >
            {toFormat.toUpperCase()}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          {isDragging ? "Release to convert →" : `Drop your ${fromFormat.toUpperCase()} file here`}
        </h2>
        <p className="text-sm mb-7" style={{ color: "var(--text-secondary)" }}>
          or click anywhere to browse your files
        </p>

        {/* CTA Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => { e.stopPropagation(); !disabled && inputRef.current?.click(); }}
          className="btn-shimmer inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ boxShadow: "0 4px 20px rgba(108,99,255,0.4)" }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          Choose File
        </button>

        <p className="mt-4 text-xs" style={{ color: "var(--text-secondary)" }}>
          {accept.split(",").join(" · ")} &nbsp;·&nbsp; Max 50 MB &nbsp;·&nbsp; Your file never leaves your device
        </p>
      </div>
    </div>
  );
}
