"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#1a1a2e");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const QRCode = (await import("qrcode")).default;
      const canvas = canvasRef.current!;
      canvas.width = size;
      canvas.height = size;
      await QRCode.toCanvas(canvas, text, {
        width: size,
        color: { dark: fgColor, light: bgColor },
        margin: 2,
        errorCorrectionLevel: "H",
      });
      setQrDataUrl(canvas.toDataURL("image/png"));
    } catch {
      // silently fail
    }
    setLoading(false);
  };

  const download = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
              style={{ background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.2)" }}>
              📱
            </div>
            <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              QR Code Generator
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              Generate a QR code from any URL or text — free, instant, no account needed.
            </p>
          </div>

          {/* Input card */}
          <div className="rounded-2xl p-6 mb-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
              URL or Text
            </label>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://your-website.com"
              className="w-full rounded-xl px-4 py-3 text-sm font-mono resize-none outline-none focus:ring-2 ring-purple-500/40"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
            />

            {/* Options */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>Size (px)</label>
                <select
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                >
                  {[200, 300, 400, 600].map((s) => (
                    <option key={s} value={s}>{s}×{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>QR Color</label>
                <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                  <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-6 rounded cursor-pointer border-0 p-0 bg-transparent" />
                  <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{fgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>Background</label>
                <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-6 rounded cursor-pointer border-0 p-0 bg-transparent" />
                  <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{bgColor}</span>
                </div>
              </div>
            </div>

            <button
              onClick={generate}
              disabled={!text.trim() || loading}
              className="w-full mt-5 py-3 rounded-xl font-semibold transition-all btn-shimmer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "var(--gradient-accent)", color: "white" }}
            >
              {loading ? "Generating…" : "⚡ Generate QR Code"}
            </button>
          </div>

          {/* Preview */}
          <canvas ref={canvasRef} className="hidden" />
          {qrDataUrl && (
            <div className="rounded-2xl p-6 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <img src={qrDataUrl} alt="QR Code" className="mx-auto rounded-xl mb-4" style={{ maxWidth: size, width: "100%" }} />
              <div className="flex gap-3 justify-center">
                <button
                  onClick={download}
                  className="px-6 py-2.5 rounded-xl font-semibold transition-all btn-shimmer"
                  style={{ background: "var(--gradient-accent)", color: "white" }}
                >
                  ⬇️ Download PNG
                </button>
                <button
                  onClick={() => { setText(""); setQrDataUrl(null); }}
                  className="px-6 py-2.5 rounded-xl font-medium transition-colors"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Info section */}
          <div className="mt-12 space-y-4 text-sm" style={{ color: "var(--text-secondary)" }}>
            <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>About QR Code Generator</h2>
            <p>QR codes (Quick Response codes) are two-dimensional barcodes readable by smartphones and cameras. They can encode URLs, contact details, Wi-Fi credentials, plain text, and more. This tool uses error correction level H (30%) for maximum readability even if the code is partially obscured.</p>
            <p>All generation happens in your browser — no data is sent to any server.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
