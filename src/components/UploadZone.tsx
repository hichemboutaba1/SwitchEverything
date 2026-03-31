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
    (file: File) => {
      if (!disabled) onFile(file);
    },
    [disabled, onFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

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
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-200 select-none ${
        isDragging ? "upload-zone-active" : ""
      } ${disabled ? "opacity-60 cursor-not-allowed" : "hover:border-[#6c63ff] hover:bg-[rgba(108,99,255,0.05)]"}`}
      style={{
        borderColor: isDragging ? "#6c63ff" : "var(--border)",
        backgroundColor: isDragging ? "rgba(108,99,255,0.05)" : "var(--surface)",
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

      {/* Icon */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6"
        style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}
      >
        ✨
      </div>

      {/* Text */}
      <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        Drop your {fromFormat} file here
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
        or click to browse — we&apos;ll convert it to {toFormat} instantly
      </p>

      {/* CTA */}
      <button
        type="button"
        disabled={disabled}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
          boxShadow: "0 4px 20px rgba(108, 99, 255, 0.4)",
        }}
        onClick={(e) => { e.stopPropagation(); !disabled && inputRef.current?.click(); }}
      >
        <span>Choose File</span>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      </button>

      <p className="mt-4 text-xs" style={{ color: "var(--text-secondary)" }}>
        {accept.split(",").join(", ")} • Max 50 MB • Your file never leaves your device
      </p>
    </div>
  );
}
