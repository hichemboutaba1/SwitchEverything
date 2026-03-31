import Link from "next/link";
import AdSense from "@/components/AdSense";
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
    desc: "Files never leave your device. All processing happens locally in your browser using WebAssembly & Canvas APIs.",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    desc: "No queues, no server round-trips. Convert files in seconds regardless of your internet speed.",
  },
  {
    icon: "🆓",
    title: "Completely Free",
    desc: "No sign-ups, no watermarks, no file-size paywalls. Every tool is free, forever.",
  },
  {
    icon: "🌐",
    title: "Works Everywhere",
    desc: "Compatible with all modern browsers on desktop, tablet, and mobile. No software to install.",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Choose a tool", desc: "Pick the conversion you need from our tool grid or use the universal upload." },
  { step: "02", title: "Drop your file", desc: "Drag-and-drop or click to browse. Files are read directly from your disk." },
  { step: "03", title: "Download instantly", desc: "Your converted file is ready in seconds. Click download — done." },
];

const FAQS = [
  {
    q: "Are my files safe?",
    a: "Yes. Every conversion happens entirely in your browser. We use JavaScript Canvas and Web APIs — no file ever touches our servers.",
  },
  {
    q: "Is there a file size limit?",
    a: "There is no hard server limit since we don't upload files. Practical limits depend on your browser memory — typically up to 50 MB works smoothly.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account required. Open the tool, upload your file, and download the result. That's it.",
  },
  {
    q: "Which browsers are supported?",
    a: "All modern browsers — Chrome, Firefox, Safari, Edge (Chromium) on desktop and mobile. Internet Explorer is not supported.",
  },
  {
    q: "Is this really free?",
    a: "Yes. We sustain the site through unobtrusive advertising. All conversion tools are free with no hidden fees.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(108, 99, 255, 0.15) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center relative">
          <div
            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(108, 99, 255, 0.1)",
              border: "1px solid rgba(108, 99, 255, 0.25)",
              color: "#a78bfa",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 pulse-dot"></span>
            7 free conversion tools — no upload required
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Convert Any File,{" "}
            <span className="gradient-text">Instantly &amp; Free</span>
          </h1>

          <p
            className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Images, documents, and data files — converted entirely in your
            browser. Zero uploads. Zero cost. Zero compromise on privacy.
          </p>

          <Link
            href="#tools"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white text-lg transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
              boxShadow: "0 8px 30px rgba(108, 99, 255, 0.4)",
            }}
          >
            Start Converting Free
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              All Conversion Tools
            </h2>
            <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
              Select a tool to get started — each one runs fully in your browser.
            </p>

            {/* Category: Image */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🖼️</span>
                <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  Image Converters
                </h3>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TOOLS.filter((t) => t.category === "image").map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </div>

            {/* Category: Document */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">📄</span>
                <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  Document Converters
                </h3>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TOOLS.filter((t) => t.category === "document").map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </div>

            {/* Category: Data */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">📊</span>
                <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  Data Converters
                </h3>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TOOLS.filter((t) => t.category === "data").map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar ad */}
          <aside className="hidden lg:block flex-shrink-0">
            <div className="sticky top-24">
              <AdSense slot="sidebar-skyscraper" />
            </div>
          </aside>
        </div>
      </section>

      {/* Features */}
      <section className="py-16" style={{ background: "var(--surface)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-3" style={{ color: "var(--text-primary)" }}>
            Why Choose SwitchEverything?
          </h2>
          <p className="text-center text-sm mb-12" style={{ color: "var(--text-secondary)" }}>
            Built for speed, privacy, and simplicity.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: "rgba(108, 99, 255, 0.1)" }}
                >
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-3" style={{ color: "var(--text-primary)" }}>
          How It Works
        </h2>
        <p className="text-center text-sm mb-12" style={{ color: "var(--text-secondary)" }}>
          Three simple steps. No account required.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, idx) => (
            <div key={item.step} className="text-center">
              <div
                className="text-5xl font-bold mb-4 leading-none"
                style={{ color: "rgba(108, 99, 255, 0.2)" }}
              >
                {item.step}
              </div>
              <div className="relative">
                {idx < HOW_IT_WORKS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-4 w-8 text-center"
                    style={{ color: "var(--border)" }}
                  >
                    →
                  </div>
                )}
                <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16" style={{ background: "var(--surface)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-3" style={{ color: "var(--text-primary)" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-center text-sm mb-12" style={{ color: "var(--text-secondary)" }}>
            Everything you need to know about SwitchEverything.
          </p>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl p-6"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
              >
                <h3 className="font-semibold mb-2 flex items-start gap-2" style={{ color: "var(--text-primary)" }}>
                  <span style={{ color: "#6c63ff" }}>Q.</span>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed pl-5" style={{ color: "var(--text-secondary)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Ready to Convert Your Files?
        </h2>
        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
          Join thousands of users who trust SwitchEverything for fast, private file conversion.
        </p>
        <Link
          href="#tools"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-200 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
            boxShadow: "0 8px 30px rgba(108, 99, 255, 0.4)",
          }}
        >
          Try It Free — No Sign-Up
        </Link>
      </section>
    </div>
  );
}

function ToolCard({ tool }: { tool: (typeof TOOLS)[number] }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="card-hover rounded-2xl p-5 flex items-start gap-4 group"
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        textDecoration: "none",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: "rgba(108, 99, 255, 0.1)" }}
      >
        {tool.icon}
      </div>
      <div>
        <h3
          className="font-semibold text-sm mb-1 group-hover:text-white transition-colors"
          style={{ color: "var(--text-primary)" }}
        >
          {tool.from} → {tool.to}
        </h3>
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
          {tool.description}
        </p>
        <span
          className="inline-flex items-center gap-1 mt-2 text-xs font-medium"
          style={{ color: "#6c63ff" }}
        >
          Convert now →
        </span>
      </div>
    </Link>
  );
}
