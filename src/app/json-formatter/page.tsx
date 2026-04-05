"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);

  const format = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      const sorted = sortKeys ? sortObject(parsed) : parsed;
      setOutput(JSON.stringify(sorted, null, indent));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minify = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
              style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
              🧹
            </div>
            <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              JSON Formatter & Validator
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              Beautify, minify, and validate JSON — free, instant, no upload required.
            </p>
          </div>

          {/* Options bar */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm" style={{ color: "var(--text-secondary)" }}>Indent:</label>
              {[2, 4].map((n) => (
                <button key={n} onClick={() => setIndent(n)}
                  className="px-3 py-1 rounded-lg text-sm font-mono transition-all"
                  style={{
                    background: indent === n ? "rgba(108,99,255,0.15)" : "var(--surface-2)",
                    border: `1px solid ${indent === n ? "rgba(108,99,255,0.4)" : "var(--border)"}`,
                    color: indent === n ? "var(--accent)" : "var(--text-secondary)",
                  }}>
                  {n}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--text-secondary)" }}>
              <input type="checkbox" checked={sortKeys} onChange={(e) => setSortKeys(e.target.checked)}
                className="rounded" style={{ accentColor: "var(--accent)" }} />
              Sort keys
            </label>
          </div>

          {/* Editor grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Input */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>INPUT</span>
                <button onClick={() => setInput("")} className="text-xs hover:text-white transition-colors" style={{ color: "var(--text-secondary)" }}>Clear</button>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={'{\n  "name": "SwitchEverything",\n  "type": "converter"\n}'}
                className="w-full p-4 text-sm font-mono resize-none outline-none"
                rows={20}
                style={{ background: "var(--surface-2)", color: "var(--text-primary)", minHeight: 400 }}
              />
            </div>

            {/* Output */}
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${error ? "rgba(239,68,68,0.4)" : "var(--border)"}` }}>
              <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                <span className="text-xs font-semibold" style={{ color: error ? "#ef4444" : "var(--text-secondary)" }}>
                  {error ? "ERROR" : "OUTPUT"}
                </span>
                {output && (
                  <div className="flex gap-2">
                    <button onClick={copy} className="text-xs transition-colors" style={{ color: copied ? "#10b981" : "var(--text-secondary)" }}>
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button onClick={download} className="text-xs transition-colors hover:text-white" style={{ color: "var(--text-secondary)" }}>Download</button>
                  </div>
                )}
              </div>
              {error ? (
                <div className="p-4">
                  <p className="text-sm font-mono text-red-400">{error}</p>
                </div>
              ) : (
                <pre className="p-4 text-sm font-mono overflow-auto" style={{ color: "var(--text-primary)", background: "var(--surface-2)", minHeight: 400 }}>
                  {output || <span style={{ color: "var(--text-secondary)" }}>Formatted JSON will appear here…</span>}
                </pre>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-4">
            <button onClick={format} disabled={!input.trim()}
              className="flex-1 py-3 rounded-xl font-semibold transition-all btn-shimmer disabled:opacity-50"
              style={{ background: "var(--gradient-accent)", color: "white" }}>
              ✨ Beautify
            </button>
            <button onClick={minify} disabled={!input.trim()}
              className="px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
              Minify
            </button>
          </div>

          {/* Info */}
          <div className="mt-12 space-y-4 text-sm" style={{ color: "var(--text-secondary)" }}>
            <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>JSON Formatter & Validator</h2>
            <p>Paste raw or minified JSON and click <strong>Beautify</strong> to get a readable, indented format. The validator instantly highlights syntax errors with the exact location and error message. Use <strong>Minify</strong> to compress JSON for APIs or storage.</p>
            <p>All processing is done in your browser — no data leaves your device.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function sortObject(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortObject);
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .reduce((acc: Record<string, unknown>, key) => {
        acc[key] = sortObject((obj as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return obj;
}
