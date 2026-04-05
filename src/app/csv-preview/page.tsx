"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ParsedCsv {
  headers: string[];
  rows: string[][];
  total: number;
}

export default function CsvPreviewPage() {
  const [csv, setCsv] = useState<ParsedCsv | null>(null);
  const [filename, setFilename] = useState("");
  const [dragging, setDragging] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 50;

  const parseCsv = (text: string, name: string) => {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length === 0) return;
    const headers = splitCsvLine(lines[0]);
    const rows = lines.slice(1).map(splitCsvLine);
    setCsv({ headers, rows, total: rows.length });
    setFilename(name);
    setSearch("");
    setPage(1);
  };

  const onFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => parseCsv(e.target?.result as string, file.name);
    reader.readAsText(file);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  const filteredRows = csv
    ? csv.rows.filter((row) =>
        !search || row.some((cell) => cell.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const currentRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
              style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
              📋
            </div>
            <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              CSV Viewer & Preview
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              Instantly view any CSV file as a sortable table — no Excel needed. Free and 100% private.
            </p>
          </div>

          {/* Upload zone */}
          {!csv && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className="rounded-2xl p-16 text-center cursor-pointer transition-all"
              style={{
                border: `2px dashed ${dragging ? "var(--accent)" : "var(--border)"}`,
                background: dragging ? "rgba(108,99,255,0.06)" : "var(--surface)",
              }}
              onClick={() => { const i = document.createElement("input"); i.type = "file"; i.accept = ".csv,text/csv"; i.onchange = (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) onFile(f); }; i.click(); }}
            >
              <div className="text-5xl mb-4">📂</div>
              <p className="font-semibold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                Drop your CSV file here
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                or click to browse — file stays in your browser
              </p>
            </div>
          )}

          {/* Table view */}
          {csv && (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{filename}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--surface-2)", color: "var(--text-secondary)" }}>
                    {csv.total.toLocaleString()} rows × {csv.headers.length} cols
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Search…"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="px-3 py-1.5 rounded-lg text-sm outline-none"
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-primary)", width: 180 }}
                  />
                  <button onClick={() => { setCsv(null); setFilename(""); }}
                    className="text-sm px-3 py-1.5 rounded-lg transition-colors"
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                    Load another
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="overflow-x-auto" style={{ maxHeight: 500 }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                        <th className="px-3 py-2 text-left text-xs font-semibold w-10" style={{ color: "var(--text-secondary)" }}>#</th>
                        {csv.headers.map((h, i) => (
                          <th key={i} className="px-3 py-2 text-left text-xs font-semibold whitespace-nowrap" style={{ color: "var(--accent)" }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((row, ri) => (
                        <tr key={ri} className="transition-colors hover:bg-white/5" style={{ borderBottom: "1px solid var(--border)" }}>
                          <td className="px-3 py-1.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                            {(page - 1) * rowsPerPage + ri + 1}
                          </td>
                          {csv.headers.map((_, ci) => (
                            <td key={ci} className="px-3 py-1.5 max-w-xs truncate" style={{ color: "var(--text-primary)" }} title={row[ci]}>
                              {row[ci] ?? ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span>Showing {((page - 1) * rowsPerPage) + 1}–{Math.min(page * rowsPerPage, filteredRows.length)} of {filteredRows.length} rows</span>
                  <div className="flex gap-2">
                    <button disabled={page <= 1} onClick={() => setPage(page - 1)}
                      className="px-3 py-1 rounded-lg disabled:opacity-40 transition-colors"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                      ← Prev
                    </button>
                    <span className="px-3 py-1">{page} / {totalPages}</span>
                    <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}
                      className="px-3 py-1 rounded-lg disabled:opacity-40 transition-colors"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info */}
          <div className="mt-12 space-y-4 text-sm" style={{ color: "var(--text-secondary)" }}>
            <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>CSV Viewer — View Without Excel</h2>
            <p>CSV files are plain text, but opening them in Excel often causes formatting issues, date auto-conversions, and leading-zero stripping. This viewer shows your data exactly as-is, with search/filter and pagination for large files.</p>
            <p>Your CSV file never leaves your browser — it's parsed entirely in JavaScript using the Web APIs.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}
