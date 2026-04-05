"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSense from "@/components/AdSense";
import { formatBytes } from "@/lib/utils";
import { useToast } from "@/components/Toast";

interface PageResult {
  url: string;
  filename: string;
  size: number;
}

export default function PdfToImagePage() {
  const [status, setStatus] = useState<"idle" | "converting" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [pages, setPages] = useState<PageResult[]>([]);
  const [sizeOriginal, setSizeOriginal] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [dragging, setDragging] = useState(false);
  const [format, setFormat] = useState<"image/png" | "image/jpeg">("image/png");
  const [scale, setScale] = useState(2);
  const { toast } = useToast();

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.match(/\.pdf$/i) && file.type !== "application/pdf") {
      toast("Please upload a PDF file", "error");
      return;
    }
    setStatus("converting");
    setProgress(0);
    setErrorMsg("");
    setPages([]);
    try {
      const { convertPdfToImages } = await import("@/lib/converters/pdfToImage");
      const res = await convertPdfToImages(file, setProgress, format, scale);
      setPages(res.pages);
      setSizeOriginal(res.sizeOriginal);
      setStatus("done");
      toast(`✅ Converted ${res.pages.length} page${res.pages.length > 1 ? "s" : ""} to ${format === "image/png" ? "PNG" : "JPG"}!`, "success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Conversion failed";
      setErrorMsg(msg);
      setStatus("error");
      toast(msg, "error");
    }
  }, [toast, format, scale]);

  const reset = () => {
    pages.forEach((p) => URL.revokeObjectURL(p.url));
    setPages([]);
    setStatus("idle");
    setProgress(0);
    setErrorMsg("");
  };

  const downloadAll = () => {
    pages.forEach((p, i) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = p.url;
        a.download = p.filename;
        a.click();
      }, i * 300);
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://switcheverything.io/" },
                  { "@type": "ListItem", position: 2, name: "PDF to Image", item: "https://switcheverything.io/pdf-to-image/" },
                ],
              }),
            }}
          />
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                <a href="/" className="hover:text-white transition-colors">Home</a>
                <span>/</span>
                <span style={{ color: "var(--text-primary)" }}>PDF to Image</span>
              </nav>

              {/* Hero */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>
                  🖼️
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                  PDF to Image Converter
                </h1>
              </div>
              <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Convert every page of a PDF to a high-quality PNG or JPG image — free, private, and 100% in your browser. Multi-page PDFs export one image per page.
              </p>

              {/* Options */}
              {status === "idle" && (
                <div className="rounded-2xl p-4 mb-4 flex flex-wrap gap-6 items-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <div>
                    <label className="block text-xs mb-2 font-medium" style={{ color: "var(--text-secondary)" }}>Output Format</label>
                    <div className="flex gap-2">
                      {(["image/png", "image/jpeg"] as const).map((f) => (
                        <button key={f} onClick={() => setFormat(f)}
                          className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                          style={{
                            background: format === f ? "rgba(108,99,255,0.15)" : "var(--surface-2)",
                            border: `1px solid ${format === f ? "rgba(108,99,255,0.4)" : "var(--border)"}`,
                            color: format === f ? "var(--accent)" : "var(--text-secondary)",
                          }}>
                          {f === "image/png" ? "PNG" : "JPG"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs mb-2 font-medium" style={{ color: "var(--text-secondary)" }}>
                      Resolution: <span style={{ color: "var(--accent)" }}>{scale}× ({scale === 1 ? "72 dpi" : scale === 2 ? "144 dpi" : "216 dpi"})</span>
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((s) => (
                        <button key={s} onClick={() => setScale(s)}
                          className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
                          style={{
                            background: scale === s ? "rgba(108,99,255,0.15)" : "var(--surface-2)",
                            border: `1px solid ${scale === s ? "rgba(108,99,255,0.4)" : "var(--border)"}`,
                            color: scale === s ? "var(--accent)" : "var(--text-secondary)",
                          }}>
                          {s}×
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Upload zone */}
              {status === "idle" && (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                  onClick={() => { const i = document.createElement("input"); i.type = "file"; i.accept = ".pdf,application/pdf"; i.onchange = (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) handleFile(f); }; i.click(); }}
                  className="rounded-2xl p-16 text-center cursor-pointer transition-all"
                  style={{
                    border: `2px dashed ${dragging ? "var(--accent)" : "var(--border)"}`,
                    background: dragging ? "rgba(108,99,255,0.06)" : "var(--surface)",
                  }}
                >
                  <div className="text-5xl mb-4">📑</div>
                  <p className="font-semibold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                    Drop your PDF here
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    or click to browse — each page becomes an image
                  </p>
                </div>
              )}

              {/* Converting */}
              {status === "converting" && (
                <div className="rounded-2xl p-12 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 spinning-slow"
                    style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>
                    ⚙️
                  </div>
                  <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    Rendering PDF pages…
                  </p>
                  <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                    Processing locally — your file never leaves your device
                  </p>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                    <div className="h-full rounded-full progress-bar-animated transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>{progress}%</p>
                </div>
              )}

              {/* Results */}
              {status === "done" && pages.length > 0 && (
                <div className="space-y-5 fade-in-up">
                  {/* Header bar */}
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
                    <div className="flex items-center justify-between px-5 py-4" style={{ background: "rgba(16,185,129,0.06)" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "rgba(16,185,129,0.15)" }}>✅</div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                            {pages.length} page{pages.length > 1 ? "s" : ""} converted!
                          </p>
                          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                            Original: {formatBytes(sizeOriginal)} → {pages.length} {format === "image/png" ? "PNG" : "JPG"} images
                          </p>
                        </div>
                      </div>
                      {pages.length > 1 && (
                        <button onClick={downloadAll}
                          className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-semibold btn-shimmer"
                          style={{ background: "var(--gradient-accent)", color: "white" }}>
                          ⬇️ Download All
                        </button>
                      )}
                    </div>

                    {/* Page grid */}
                    <div className="p-5" style={{ background: "var(--surface)" }}>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {pages.map((page, i) => (
                          <div key={i} className="rounded-xl overflow-hidden transition-all hover:scale-[1.02]"
                            style={{ border: "1px solid var(--border)", background: "var(--surface-2)" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={page.url} alt={`Page ${i + 1}`} className="w-full object-contain" style={{ maxHeight: 180 }} />
                            <div className="p-2.5">
                              <p className="text-xs font-medium mb-1 truncate" style={{ color: "var(--text-primary)" }}>
                                Page {i + 1}
                              </p>
                              <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>
                                {formatBytes(page.size)}
                              </p>
                              <a href={page.url} download={page.filename}
                                className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-xs font-medium transition-all"
                                style={{ background: "rgba(108,99,255,0.12)", color: "var(--accent)", border: "1px solid rgba(108,99,255,0.2)" }}>
                                ⬇️ Download
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center"><AdSense slot="post-conversion-native" /></div>
                  <button onClick={reset} className="w-full py-3 rounded-xl font-medium text-sm transition-all hover:text-white"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                    ↩ Convert Another PDF
                  </button>
                </div>
              )}

              {status === "error" && (
                <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <span className="text-lg">⚠️</span>
                  <div>
                    <p className="font-medium text-red-400 text-sm">Conversion Error</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{errorMsg}</p>
                    <button onClick={reset} className="mt-2 text-xs text-red-400 hover:text-red-300 underline">Try again</button>
                  </div>
                </div>
              )}

              {/* Benefits */}
              <section className="mt-12">
                <h2 className="text-xl font-semibold mb-5" style={{ color: "var(--text-primary)" }}>Why Convert PDF to Image?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    "Share PDF pages on social media, Slack, or in presentations without a PDF viewer",
                    "Embed PDF content in websites, blogs, or apps that don't support PDF display",
                    "Archive specific pages as images for offline reference or thumbnail generation",
                  ].map((b, i) => (
                    <div key={i} className="rounded-xl p-4 flex items-start gap-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                      <span className="text-lg flex-shrink-0" style={{ color: "#6c63ff" }}>✓</span>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{b}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Privacy */}
              <section className="mt-8 rounded-2xl p-6 flex items-start gap-4"
                style={{ background: "rgba(108,99,255,0.06)", border: "1px solid rgba(108,99,255,0.2)" }}>
                <span className="text-2xl flex-shrink-0">🔒</span>
                <div>
                  <h3 className="font-semibold mb-1 text-sm" style={{ color: "var(--text-primary)" }}>100% Private — Your PDF never leaves your device</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    SwitchEverything renders PDF pages using PDF.js entirely in your browser. No file is uploaded. Your document content stays completely private — no cloud, no server, no data collection.
                  </p>
                </div>
              </section>

              {/* FAQ */}
              <section className="mt-12">
                <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {[
                    { q: "What output formats are supported?", a: "PNG (lossless, best for text and graphics) and JPG (smaller file size, best for photos and color-rich pages)." },
                    { q: "Can it convert multi-page PDFs?", a: "Yes. Each page of a multi-page PDF becomes a separate image file. You can download them individually or all at once." },
                    { q: "What resolution/DPI are the output images?", a: "1× = 72 dpi (screen quality), 2× = 144 dpi (recommended for most uses), 3× = 216 dpi (high quality for print or retina screens)." },
                    { q: "Is there a page limit?", a: "No hard limit. Large PDFs (100+ pages) may take longer and use more browser memory." },
                    { q: "Does it work with scanned PDFs?", a: "Yes. Scanned PDFs are images embedded in PDF — they render as images perfectly. However, text extraction won't work on scanned PDFs." },
                  ].map((faq) => (
                    <details key={faq.q} className="group rounded-xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                      <summary className="flex items-center justify-between gap-4 p-4 cursor-pointer list-none" style={{ color: "var(--text-primary)" }}>
                        <span className="font-medium text-sm">{faq.q}</span>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                          className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180" style={{ color: "var(--accent)" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-4 pb-4"><p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{faq.a}</p></div>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block flex-shrink-0">
              <div className="sticky top-24 space-y-6"><AdSense slot="sidebar-skyscraper" /></div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
