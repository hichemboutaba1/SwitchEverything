"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TOOLS } from "@/lib/utils";

type Tool = (typeof TOOLS)[number];

const COLOR: Record<string, string> = {
  image: "#6c63ff",
  document: "#ec4899",
  data: "#10b981",
};

function ToolCard({ tool }: { tool: Tool }) {
  const accent = COLOR[tool.category] ?? "#6c63ff";
  return (
    <Link
      href={`/${tool.slug}`}
      className="card-hover group rounded-2xl p-5 flex items-start gap-4 relative overflow-hidden"
      style={{ background: "var(--surface-2)", border: "1px solid var(--border)", textDecoration: "none" }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at top left, ${accent}08, transparent 60%)` }} />
      <div className="relative w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}>
        {tool.icon}
      </div>
      <div className="relative flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
            {tool.from} → {tool.to}
          </h3>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
            style={{ color: accent }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>{tool.description}</p>
        <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium" style={{ color: accent }}>Convert now</span>
      </div>
    </Link>
  );
}

function CategorySection({ icon, title, tools }: { icon: string; title: string; tools: Tool[] }) {
  if (tools.length === 0) return null;
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
          style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>{icon}</div>
        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>{title}</h3>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((t) => <ToolCard key={t.slug} tool={t} />)}
      </div>
    </div>
  );
}

export default function ToolSearchFilter() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return TOOLS as unknown as Tool[];
    return (TOOLS as unknown as Tool[]).filter(
      (t) => t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q) ||
             t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }, [query]);

  const images    = filtered.filter((t) => t.category === "image");
  const documents = filtered.filter((t) => t.category === "document");
  const data      = filtered.filter((t) => t.category === "data");

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-8">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "var(--text-secondary)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          placeholder="Search tools… (e.g. &quot;jpg&quot;, &quot;pdf&quot;, &quot;csv&quot;)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm outline-none transition-all duration-200"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(108,99,255,0.5)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs hover:text-white transition-colors"
            style={{ color: "var(--text-secondary)" }}>✕</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No tools match &ldquo;{query}&rdquo;</p>
          <button onClick={() => setQuery("")} className="mt-3 text-sm" style={{ color: "var(--accent)" }}>Clear search</button>
        </div>
      ) : (
        <>
          {query && (
            <p className="text-xs mb-6" style={{ color: "var(--text-secondary)" }}>
              {filtered.length} tool{filtered.length !== 1 ? "s" : ""} matching &ldquo;{query}&rdquo;
            </p>
          )}
          <CategorySection icon="🖼️" title="Image Converters"    tools={images} />
          <CategorySection icon="📄" title="Document Converters" tools={documents} />
          <CategorySection icon="📊" title="Data Converters"     tools={data} />
        </>
      )}
    </div>
  );
}
