"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSense from "@/components/AdSense";
import { formatBytes, getSavingPercent } from "@/lib/utils";
import { useToast } from "@/components/Toast";

export default function WordToPdfPage() {
  const [status, setStatus] = useState<"idle" | "converting" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; filename: string; sizeOriginal: number; sizeConverted: number; preview: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [dragging, setDragging] = useState(false);
  const { toast } = useToast();

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.match(/\.docx?$/i)) {
      toast("Please upload a .doc or .docx file", "error");
      return;
    }
    setStatus("converting");
    setProgress(0);
    setErrorMsg("");
    try {
      const { convertWordToPdf } = await import("@/lib/converters/wordToPdf");
      const res = await convertWordToPdf(file, setProgress);
      setResult(res);
      setStatus("done");
      toast("✅ Converted to PDF successfully!", "success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Conversion failed";
      setErrorMsg(msg);
      setStatus("error");
      toast(msg, "error");
    }
  }, [toast]);

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setStatus("idle");
    setProgress(0);
    setErrorMsg("");
  };

  const saving = result ? getSavingPercent(result.sizeOriginal, result.sizeConverted) : 0;

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
                  { "@type": "ListItem", position: 2, name: "Word to PDF", item: "https://switcheverything.io/word-to-pdf/" },
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
                <span style={{ color: "var(--text-primary)" }}>Word to PDF</span>
              </nav>

              {/* Hero */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>
                  📝
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                  Word to PDF Converter
                </h1>
              </div>
              <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Convert Word documents (.doc, .docx) to PDF instantly — free, private, and 100% in your browser. No Microsoft Office required.
              </p>

              {/* Converter */}
              {status === "idle" && (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                  onClick={() => { const i = document.createElement("input"); i.type = "file"; i.accept = ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"; i.onchange = (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) handleFile(f); }; i.click(); }}
                  className="rounded-2xl p-16 text-center cursor-pointer transition-all"
                  style={{
                    border: `2px dashed ${dragging ? "var(--accent)" : "var(--border)"}`,
                    background: dragging ? "rgba(108,99,255,0.06)" : "var(--surface)",
                  }}
                >
                  <div className="text-5xl mb-4">📄</div>
                  <p className="font-semibold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                    Drop your Word document here
                  </p>
                  <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                    or click to browse — .doc and .docx supported
                  </p>
                  <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(108,99,255,0.12)", color: "var(--accent)" }}>
                    Ctrl+V to paste a file
                  </span>
                </div>
              )}

              {status === "converting" && (
                <div className="rounded-2xl p-12 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 spinning-slow"
                    style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>
                    ⚙️
                  </div>
                  <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Converting Word → PDF…</p>
                  <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>Processing locally — your file never leaves your device</p>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                    <div className="h-full rounded-full progress-bar-animated transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>{progress}%</p>
                </div>
              )}

              {status === "done" && result && (
                <div className="space-y-5 fade-in-up">
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
                    <div className="flex items-center justify-between px-5 py-4" style={{ background: "rgba(16,185,129,0.06)" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "rgba(16,185,129,0.15)" }}>✅</div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Conversion complete!</p>
                          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Your PDF is ready</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 space-y-4" style={{ background: "var(--surface)" }}>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "Original", value: formatBytes(result.sizeOriginal) },
                          { label: "PDF Size", value: formatBytes(result.sizeConverted) },
                          { label: saving > 0 ? "Saved" : "Size", value: saving !== 0 ? `${saving > 0 ? "-" : "+"}${Math.abs(saving)}%` : "—" },
                        ].map((s) => (
                          <div key={s.label} className="text-center rounded-xl p-3" style={{ background: "var(--surface-2)" }}>
                            <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>{s.label}</p>
                            <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                          </div>
                        ))}
                      </div>
                      {result.preview && (
                        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                          <div className="px-3 py-2 text-xs font-medium" style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                            Content preview
                          </div>
                          <pre className="text-xs font-mono p-4 overflow-auto" style={{ color: "var(--text-secondary)", background: "var(--surface-2)", maxHeight: 120, whiteSpace: "pre-wrap" }}>
                            {result.preview}…
                          </pre>
                        </div>
                      )}
                      <a href={result.url} download={result.filename}
                        className="btn-shimmer flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white"
                        style={{ boxShadow: "0 4px 20px rgba(108,99,255,0.4)" }}>
                        ⬇️ Download {result.filename}
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-center"><AdSense slot="post-conversion-native" /></div>
                  <button onClick={reset} className="w-full py-3 rounded-xl font-medium text-sm transition-all hover:text-white"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                    ↩ Convert Another File
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
                <h2 className="text-xl font-semibold mb-5" style={{ color: "var(--text-primary)" }}>Why Convert Word to PDF?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    "PDF preserves formatting on any device — no font substitution, no layout shifts",
                    "Universal format readable without Microsoft Word or any paid software",
                    "Professional look for resumes, reports, contracts, and client documents",
                  ].map((b, i) => (
                    <div key={i} className="rounded-xl p-4 flex items-start gap-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                      <span className="text-lg flex-shrink-0" style={{ color: "#6c63ff" }}>✓</span>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{b}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* How to */}
              <section className="mt-12">
                <h2 className="text-xl font-semibold mb-5" style={{ color: "var(--text-primary)" }}>How to Convert Word to PDF — 3 Steps</h2>
                <ol className="space-y-4">
                  {[
                    "Drop your .doc or .docx file into the upload zone above.",
                    "SwitchEverything uses mammoth.js to parse the document and jsPDF to build a professionally formatted PDF — entirely in your browser.",
                    "Click Download to save your PDF. No signup, no watermarks, no size limits.",
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #6c63ff, #a78bfa)" }}>{idx + 1}</span>
                      <p className="text-sm leading-relaxed pt-1.5" style={{ color: "var(--text-secondary)" }}>{step}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Privacy */}
              <section className="mt-8 rounded-2xl p-6 flex items-start gap-4"
                style={{ background: "rgba(108,99,255,0.06)", border: "1px solid rgba(108,99,255,0.2)" }}>
                <span className="text-2xl flex-shrink-0">🔒</span>
                <div>
                  <h3 className="font-semibold mb-1 text-sm" style={{ color: "var(--text-primary)" }}>100% Private — Your Word file never leaves your device</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Unlike most converters that upload your document to a server, SwitchEverything converts everything locally in your browser. Your content — contracts, resumes, business documents — stays completely private.
                  </p>
                </div>
              </section>

              {/* FAQ */}
              <section className="mt-12">
                <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {[
                    { q: "Does it work with .doc files (old Word format)?", a: "Yes. SwitchEverything supports both .doc and .docx formats via the mammoth.js library." },
                    { q: "Will my formatting be preserved?", a: "Headings, paragraphs, lists, bold/italic text, and basic tables are preserved. Complex elements like text boxes, SmartArt, and embedded charts may not render." },
                    { q: "Is there a file size limit?", a: "No server-side limit. Files up to 20 MB convert smoothly on most devices." },
                    { q: "Do I need Microsoft Word installed?", a: "No. The conversion uses mammoth.js, a JavaScript library that reads DOCX format natively." },
                    { q: "Is this free?", a: "Yes, completely free. No account, no watermark, no limits." },
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
