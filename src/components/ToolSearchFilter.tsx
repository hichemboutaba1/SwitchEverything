"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TOOLS } from "@/lib/utils";

type Tool = (typeof TOOLS)[number];

const CATEGORIES = [
  { key: "all",      label: "All Tools",  icon: "⚡", color: "#6c63ff" },
  { key: "image",    label: "Images",     icon: "🖼️", color: "#6c63ff" },
  { key: "document", label: "Documents",  icon: "📄", color: "#ec4899" },
  { key: "data",     label: "Data",       icon: "📊", color: "#10b981" },
  { key: "utility",  label: "Utilities",  icon: "🛠️", color: "#f59e0b" },
] as const;

const CAT_COLOR: Record<string, string> = {
  image: "#6c63ff",
  document: "#ec4899",
  data: "#10b981",
  utility: "#f59e0b",
};

const POPULAR = ["convert-jpg-to-webp", "word-to-pdf", "pdf-to-image", "compress-image", "pdf-to-text", "qr-code-generator"];

function ToolCard({ tool, featured }: { tool: Tool; featured?: boolean }) {
  const accent = CAT_COLOR[tool.category] ?? "#6c63ff";
  const isPopular = POPULAR.includes(tool.slug);

  return (
    <Link
      href={`/${tool.slug}`}
      className="card-hover group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--surface)",
        border: `1px solid var(--border)`,
        textDecoration: "none",
        minHeight: featured ? 160 : 130,
      }}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${accent}10 0%, transparent 65%)` }} />

      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full z-10"
          style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>
          Popular
        </div>
      )}

      <div className="relative p-5 flex items-start gap-4 flex-1">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${accent}12`, border: `1px solid ${accent}22` }}>
          {tool.icon}
        </div>

        <div className="flex-1 min-w-0">
          {/* Format label */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: `${accent}15`, color: accent }}>
              {tool.from}
            </span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} style={{ color: accent, flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: "var(--surface-2)", color: "var(--text-secondary)" }}>
              {tool.to}
            </span>
          </div>

          <h3 className="font-semibold text-sm mb-1 transition-colors duration-200 group-hover:text-white line-clamp-1"
            style={{ color: "var(--text-primary)" }}>
            {tool.title.replace(" Converter", "").replace(" — Free Online Tool", "")}
          </h3>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {tool.description}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative px-5 py-2.5 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--border)", background: "rgba(0,0,0,0.15)" }}>
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Free · No upload · Instant
        </span>
        <span className="text-xs font-semibold flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
          style={{ color: accent }}>
          Use tool
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function ToolSearchFilter() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    let list = TOOLS as unknown as Tool[];
    if (activeCategory !== "all") {
      list = list.filter((t) => t.category === activeCategory);
    }
    const q = query.toLowerCase().trim();
    if (!q) return list;
    return list.filter(
      (t) => t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q) ||
             t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }, [query, activeCategory]);

  const catColor = CATEGORIES.find((c) => c.key === activeCategory)?.color ?? "#6c63ff";

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          const count = cat.key === "all"
            ? (TOOLS as unknown as Tool[]).length
            : (TOOLS as unknown as Tool[]).filter((t) => t.category === cat.key).length;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0"
              style={{
                background: isActive ? `${cat.color}18` : "var(--surface)",
                border: `1px solid ${isActive ? `${cat.color}45` : "var(--border)"}`,
                color: isActive ? cat.color : "var(--text-secondary)",
                boxShadow: isActive ? `0 0 20px ${cat.color}15` : "none",
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                style={{
                  background: isActive ? `${cat.color}25` : "var(--surface-2)",
                  color: isActive ? cat.color : "var(--text-secondary)",
                }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: "var(--text-secondary)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          placeholder={`Search ${activeCategory === "all" ? "all tools" : activeCategory + " tools"}…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-10 py-3 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          onFocus={(e) => (e.target.style.borderColor = `${catColor}60`)}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        {query && (
          <button onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors hover:text-white"
            style={{ background: "var(--surface-2)", color: "var(--text-secondary)" }}>
            ✕
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium mb-1" style={{ color: "var(--text-primary)" }}>No tools found</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Try a different keyword or category</p>
          <button onClick={() => { setQuery(""); setActiveCategory("all"); }}
            className="mt-4 text-sm px-4 py-2 rounded-lg transition-colors"
            style={{ color: catColor, background: `${catColor}12`, border: `1px solid ${catColor}25` }}>
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {query && (
            <p className="text-xs mb-4" style={{ color: "var(--text-secondary)" }}>
              {filtered.length} tool{filtered.length !== 1 ? "s" : ""} matching &ldquo;{query}&rdquo;
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
