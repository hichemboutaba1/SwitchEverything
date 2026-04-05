"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadHistory, clearHistory, type HistoryEntry } from "@/lib/history";
import { formatBytes } from "@/lib/utils";

export default function ConversionHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
  }, [open]);

  if (history.length === 0) return null;

  return (
    <div className="mt-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-white w-full"
        style={{ color: "var(--text-secondary)" }}
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Recent conversions ({history.length})
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          style={{ marginLeft: "auto", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="mt-3 rounded-2xl overflow-hidden fade-in-up" style={{ border: "1px solid var(--border)" }}>
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {history.map((h, i) => (
              <Link
                key={i}
                href={`/${h.slug}`}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[rgba(108,99,255,0.04)]"
                style={{ background: "var(--surface)", textDecoration: "none" }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: "rgba(108,99,255,0.1)", color: "#a78bfa" }}>
                  {h.to.slice(0, 3)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>{h.filename}</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {h.from} → {h.to} · {formatBytes(h.sizeOriginal)} → {formatBytes(h.sizeConverted)}
                  </p>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
                  {new Date(h.date).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
          <div className="px-4 py-2 flex justify-end" style={{ background: "var(--surface-2)", borderTop: "1px solid var(--border)" }}>
            <button onClick={() => { clearHistory(); setHistory([]); }}
              className="text-xs transition-colors hover:text-white" style={{ color: "var(--text-secondary)" }}>
              Clear history
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
