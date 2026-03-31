import Link from "next/link";
import AdSense from "@/components/AdSense";
import HeroAnimation from "@/components/HeroAnimation";
import { TOOLS } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SwitchEverything — Free Universal File Converter Online",
  alternates: { canonical: "/" },
};

const FEATURES = [
  {
    icon: "🔒",
    title: "100% Private",
    desc: "Files never leave your device. All processing is done locally in your browser.",
    color: "#6c63ff",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    desc: "No queues, no server round-trips. Convert files in milliseconds.",
    color: "#f59e0b",
  },
  {
    icon: "🆓",
    title: "Always Free",
    desc: "No sign-ups, no watermarks, no paywalls. Every tool is free forever.",
    color: "#10b981",
  },
  {
    icon: "🌐",
    title: "Works Everywhere",
    desc: "Compatible with all modern browsers on desktop, tablet, and mobile.",
    color: "#ec4899",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Choose a tool", desc: "Pick the conversion you need from our tool grid.", icon: "🔍" },
  { step: "02", title: "Drop your file", desc: "Drag-and-drop or click to browse. Files stay on your device.", icon: "📁" },
  { step: "03", title: "Download instantly", desc: "Your converted file is ready in seconds. Click download.", icon: "✅" },
];

const FAQS = [
  {
    q: "Are my files safe?",
    a: "Yes. Every conversion happens entirely in your browser using JavaScript Canvas and Web APIs — no file ever touches our servers.",
  },
  {
    q: "Is there a file size limit?",
    a: "There is no hard limit since we don't upload files. Practical limits depend on browser memory — typically up to 50 MB works smoothly.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account required. Open the tool, upload your file, and download the result. That's it.",
  },
  {
    q: "Which browsers are supported?",
    a: "All modern browsers — Chrome, Firefox, Safari, Edge on desktop and mobile. Internet Explorer is not supported.",
  },
  {
    q: "Is this really free?",
    a: "Yes. We sustain the site through unobtrusive advertising. All conversion tools are free with no hidden fees.",
  },
];

const STATS = [
  { value: "7", label: "Free Tools", color: "#6c63ff" },
  { value: "0", label: "Files Uploaded", color: "#10b981" },
  { value: "∞", label: "Conversions", color: "#a78bfa" },
  { value: "100%", label: "Private", color: "#ec4899" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">

        {/* Animated background blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{
            position: "absolute",
            top: "-20%", left: "10%",
            width: 600, height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "blob-drift-1 18s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            top: "10%", right: "-5%",
            width: 500, height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "blob-drift-2 22s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            bottom: "-10%", left: "40%",
            width: 400, height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "blob-drift-3 14s ease-in-out infinite",
          }} />
          {/* Grid dots */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(108,99,255,0.06) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full mb-8 fade-in-up"
            style={{
              background: "rgba(108,99,255,0.08)",
              border: "1px solid rgba(108,99,255,0.2)",
              color: "#a78bfa",
              animationDelay: "0.1s",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 pulse-dot" />
            7 free conversion tools — zero upload required
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight fade-in-up"
            style={{ animationDelay: "0.2s", color: "var(--text-primary)" }}
          >
            Convert Any File,{" "}
            <span className="gradient-text">Instantly &amp; Free</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed fade-in-up"
            style={{ color: "var(--text-secondary)", animationDelay: "0.3s" }}
          >
            Images, documents, and data — converted entirely in your browser.
            <br className="hidden sm:block" />
            Zero uploads · Zero cost · Zero compromise on privacy.
          </p>

          {/* Animated conversion illustration */}
          <div className="fade-in-up mb-10" style={{ animationDelay: "0.4s" }}>
            <HeroAnimation />
          </div>

          {/* CTA */}
          <div className="fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationDelay: "0.55s" }}>
            <Link
              href="#tools"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white text-base transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ boxShadow: "0 8px 32px rgba(108,99,255,0.45)" }}
            >
              Start Converting Free
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-medium text-sm transition-all duration-200 hover:text-white hover:border-violet-500"
              style={{
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              How it works →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="text-center rounded-2xl p-5 fade-in-up"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                animationDelay: `${0.1 * i}s`,
              }}
            >
              <div
                className="text-3xl font-black mb-1 leading-none"
                style={{ color: s.color }}
              >
                {s.value}
              </div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tools Grid ───────────────────────────────────────── */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            {/* Section title */}
            <div className="mb-10">
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                All Conversion Tools
              </h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Select a tool — each one runs fully in your browser, no upload needed.
              </p>
            </div>

            {/* Category: Image */}
            <CategorySection
              icon="🖼️"
              title="Image Converters"
              tools={TOOLS.filter((t) => t.category === "image")}
            />
            {/* Category: Document */}
            <CategorySection
              icon="📄"
              title="Document Converters"
              tools={TOOLS.filter((t) => t.category === "document")}
            />
            {/* Category: Data */}
            <CategorySection
              icon="📊"
              title="Data Converters"
              tools={TOOLS.filter((t) => t.category === "data")}
            />
          </div>

          {/* Sidebar ad */}
          <aside className="hidden lg:block flex-shrink-0">
            <div className="sticky top-24">
              <AdSense slot="sidebar-skyscraper" />
            </div>
          </aside>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: "var(--surface)" }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(108,99,255,0.05) 0%, transparent 70%)",
        }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Why Choose SwitchEverything?
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Built for speed, privacy, and simplicity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group rounded-2xl p-6 transition-all duration-300 cursor-default"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  animationDelay: `${0.1 * i}s`,
                }}
              >
                {/* Animated icon container */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${f.color}15`,
                    border: `1px solid ${f.color}30`,
                    boxShadow: `0 4px 20px ${f.color}15`,
                  }}
                >
                  <span className="group-hover:bounce-icon inline-block transition-transform duration-300 group-hover:-translate-y-1">
                    {f.icon}
                  </span>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {f.desc}
                </p>
                {/* Bottom accent line */}
                <div
                  className="mt-5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${f.color}, transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            How It Works
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Three simple steps. No account required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting line on desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-12 left-[calc(16.6%+20px)] right-[calc(16.6%+20px)] h-0.5"
            style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.3), rgba(108,99,255,0.3), transparent)" }}
          >
            {/* Moving dot */}
            <div
              style={{
                width: 8, height: 8,
                borderRadius: "50%",
                background: "#6c63ff",
                boxShadow: "0 0 10px #6c63ff",
                position: "absolute",
                top: -3,
                animation: "drift-right 3s ease-in-out infinite",
                left: 0,
              }}
            />
          </div>

          {HOW_IT_WORKS.map((item, idx) => (
            <div
              key={item.step}
              className="relative rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Step number badge */}
              <div
                className="absolute -top-3 left-6 text-xs font-bold px-2.5 py-0.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                  color: "white",
                  fontSize: 11,
                }}
              >
                STEP {idx + 1}
              </div>

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 floating"
                style={{
                  background: "rgba(108,99,255,0.08)",
                  border: "1px solid rgba(108,99,255,0.15)",
                  animationDelay: `${idx * 0.6}s`,
                }}
              >
                {item.icon}
              </div>

              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="py-20 relative overflow-hidden" style={{ background: "var(--surface)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Everything you need to know about SwitchEverything.
            </p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={faq.q}
                className="group rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  animationDelay: `${0.1 * i}s`,
                }}
              >
                <summary
                  className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <svg
                    width="16" height="16"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    className="flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                    style={{ color: "var(--accent)" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="py-24 text-center relative overflow-hidden">
        {/* Glow */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(108,99,255,0.1) 0%, transparent 70%)",
        }} />
        <div className="relative max-w-2xl mx-auto px-4">
          <div
            className="text-5xl mb-6 inline-block floating"
            aria-hidden="true"
          >
            ⚡
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Ready to Convert Your Files?
          </h2>
          <p className="mb-10 text-base" style={{ color: "var(--text-secondary)" }}>
            Join thousands of users who trust SwitchEverything for fast,
            private file conversion — no account, no cost.
          </p>
          <Link
            href="#tools"
            className="btn-shimmer inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-semibold text-white text-base transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ boxShadow: "0 8px 40px rgba(108,99,255,0.45)" }}
          >
            Try It Free — No Sign-Up
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ── CategorySection ─────────────────────────────────────────────── */
type Tool = (typeof TOOLS)[number];

function CategorySection({
  icon,
  title,
  tools,
}: {
  icon: string;
  title: string;
  tools: Tool[];
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
          style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}
        >
          {icon}
        </div>
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          {title}
        </h3>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}

/* ── ToolCard ────────────────────────────────────────────────────── */
function ToolCard({ tool }: { tool: Tool }) {
  const colorMap: Record<string, string> = {
    image: "#6c63ff",
    document: "#ec4899",
    data: "#10b981",
  };
  const accent = colorMap[tool.category] ?? "#6c63ff";

  return (
    <Link
      href={`/${tool.slug}`}
      className="card-hover group rounded-2xl p-5 flex items-start gap-4 relative overflow-hidden"
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        textDecoration: "none",
      }}
    >
      {/* Background accent on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at top left, ${accent}08, transparent 60%)` }}
      />

      {/* Icon */}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${accent}12`,
          border: `1px solid ${accent}25`,
        }}
      >
        {tool.icon}
      </div>

      <div className="relative flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
            {tool.from} → {tool.to}
          </h3>
          {/* Arrow that slides in on hover */}
          <svg
            width="14" height="14"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2.5}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
            style={{ color: accent }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
          {tool.description}
        </p>
        <span
          className="inline-flex items-center gap-1 mt-2 text-xs font-medium"
          style={{ color: accent }}
        >
          Convert now
        </span>
      </div>
    </Link>
  );
}
