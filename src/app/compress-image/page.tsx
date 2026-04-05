"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import AdSense from "@/components/AdSense";
import ConversionResult from "@/components/ConversionResult";
import { compressImage } from "@/lib/converters/compressImage";
import { formatBytes } from "@/lib/utils";

export default function CompressImagePage() {
  const [status, setStatus] = useState<"idle" | "converting" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; filename: string; sizeOriginal: number; sizeConverted: number; preview?: string; originalPreview?: string } | null>(null);
  const [quality, setQuality] = useState(75);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    setStatus("converting"); setProgress(0); setError("");
    const origUrl = URL.createObjectURL(file);
    try {
      const r = await compressImage(file, setProgress, quality);
      setResult({ ...r, originalPreview: origUrl });
      setStatus("done");
    } catch (err) {
      URL.revokeObjectURL(origUrl);
      setError(err instanceof Error ? err.message : "Compression failed.");
      setStatus("error");
    }
  }, [quality]);

  const handleReset = () => { setResult(null); setStatus("idle"); setProgress(0); setError(""); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0 max-w-2xl">
          <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }}>Image Compressor</span>
          </nav>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>⚡</div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Free Image Compressor</h1>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Compress JPG, PNG, and WebP images online. Reduce file size by up to 80% with no perceptible quality loss — 100% free and private.
            </p>
          </div>

          {status === "done" && result ? (
            <ConversionResult result={result} onReset={handleReset} toFormat="Compressed" />
          ) : status === "converting" ? (
            <div className="rounded-2xl p-12 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl spinning-slow" style={{ background: "rgba(108,99,255,0.1)" }}>⚙️</div>
              <p className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Compressing image…</p>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                <div className="h-full rounded-full progress-bar-animated" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>{progress}%</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Quality slider */}
              <div className="rounded-2xl p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Compression Level</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                      style={{ background: quality >= 80 ? "rgba(16,185,129,0.12)" : quality >= 55 ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)", color: quality >= 80 ? "#10b981" : quality >= 55 ? "#f59e0b" : "#ef4444" }}>
                      {quality >= 80 ? "Light" : quality >= 55 ? "Medium" : "Strong"}
                    </span>
                    <span className="text-sm font-bold w-8 text-right" style={{ color: "var(--accent)" }}>{quality}</span>
                  </div>
                </div>
                <input type="range" min={10} max={95} step={5} value={quality} onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ accentColor: "var(--accent)" }} />
                <div className="flex justify-between mt-1">
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Max compression</span>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Best quality</span>
                </div>
              </div>

              {/* Drop zone */}
              <div
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => document.getElementById("compress-input")?.click()}
                className="cursor-pointer rounded-3xl text-center transition-all duration-300"
                style={{ padding: "48px 32px", background: isDragging ? "rgba(108,99,255,0.06)" : "var(--surface)", border: `2px dashed ${isDragging ? "#6c63ff" : "var(--border)"}` }}
              >
                <input id="compress-input" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                <div className="text-4xl mb-4">🗜️</div>
                <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Drop your image here</h2>
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>JPG, PNG, WebP supported · Max 50 MB</p>
                <span className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm" style={{ boxShadow: "0 4px 20px rgba(108,99,255,0.4)" }}>
                  Choose Image
                </span>
                <p className="mt-4 text-xs" style={{ color: "var(--text-secondary)" }}>Your file never leaves your device</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 rounded-xl p-4 flex gap-3" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <span>⚠️</span>
              <div>
                <p className="text-sm font-medium text-red-400">Error</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{error}</p>
                <button onClick={handleReset} className="mt-1 text-xs text-red-400 underline">Try again</button>
              </div>
            </div>
          )}

          {/* Info section */}
          <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "⚡", title: "Instant", desc: "Compresses in your browser — no upload, no waiting." },
              { icon: "🔒", title: "100% Private", desc: "Your images never leave your device." },
              { icon: "🎯", title: "Smart Compression", desc: "Reduces file size up to 80% with minimal quality loss." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="text-xl mb-2">{f.icon}</div>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
              </div>
            ))}
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Related Tools</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: "/convert-jpg-to-webp", label: "JPG → WebP" },
                { href: "/convert-png-to-webp", label: "PNG → WebP" },
                { href: "/convert-png-to-jpg", label: "PNG → JPG" },
                { href: "/convert-svg-to-png", label: "SVG → PNG" },
              ].map((t) => (
                <Link key={t.href} href={t.href} className="card-hover flex items-center gap-2 p-3 rounded-xl text-sm font-medium"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", textDecoration: "none" }}>
                  🖼️ {t.label}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="hidden lg:block flex-shrink-0">
          <div className="sticky top-24"><AdSense slot="sidebar-skyscraper" /></div>
        </aside>
      </div>
    </div>
  );
}
