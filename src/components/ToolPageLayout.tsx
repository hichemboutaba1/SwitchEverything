import Link from "next/link";
import AdSense from "./AdSense";
import ConverterWidget from "./ConverterWidget";
import { TOOLS, type ToolSlug } from "@/lib/utils";

/* ── Format descriptions for SEO ── */
const FORMAT_DESC: Record<string, string> = {
  JPG:      "JPG (JPEG) is the most widely used lossy image format. It uses compression to reduce file size, making it ideal for photographs and complex images with millions of colors. Supported by every browser, OS, and device.",
  PNG:      "PNG (Portable Network Graphics) is a lossless image format that supports transparency (alpha channel). It is ideal for logos, icons, screenshots, and graphics that require crisp edges without compression artifacts.",
  WebP:     "WebP is Google's modern image format that offers both lossless and lossy compression. It produces images 25–35% smaller than equivalent JPEG/PNG files while maintaining comparable visual quality. Supported by all modern browsers.",
  SVG:      "SVG (Scalable Vector Graphics) is an XML-based vector format that scales to any resolution without quality loss. It is ideal for logos, icons, and illustrations. SVG files are tiny and can be animated with CSS.",
  PDF:      "PDF (Portable Document Format) is the universal standard for sharing documents. PDFs preserve exact formatting across all platforms and devices, making them the go-to for professional documents, contracts, and reports.",
  TXT:      "TXT (Plain Text) is the simplest text format — no formatting, no metadata, just raw characters. It is universally readable by any application on any operating system.",
  CSV:      "CSV (Comma-Separated Values) is a plain-text format for tabular data. Each line is a row, each comma-separated value is a column. CSV is supported by Excel, Google Sheets, databases, and virtually every data tool.",
  JSON:     "JSON (JavaScript Object Notation) is the standard data-interchange format on the web. Its clean, human-readable syntax makes it ideal for APIs, configuration files, and data storage.",
  XLSX:     "XLSX is the modern Microsoft Excel format (Office Open XML). It supports multiple sheets, formulas, formatting, charts, and is readable by Excel, Google Sheets, LibreOffice, and Numbers.",
  XML:      "XML (eXtensible Markup Language) is a flexible data format used in enterprise systems, RSS feeds, configuration files, and web services. It represents structured data with customizable tags.",
  Markdown: "Markdown is a lightweight markup language for formatting plain text. It uses simple syntax (# for headings, **bold**, etc.) and is widely used in documentation, README files, and blogging platforms.",
  HTML:     "HTML (HyperText Markup Language) is the standard language for building web pages. An HTML file contains the structure and content of a webpage, rendered by web browsers.",
  Base64:   "Base64 is an encoding scheme that represents binary data as an ASCII string. A Base64 data URI embeds the file content directly inline — no external request needed. It increases file size by ~33% but eliminates HTTP round-trips for small assets.",
};

/* ── Conversion benefits per tool ── */
const CONVERSION_BENEFITS: Record<string, string[]> = {
  "convert-jpg-to-webp":      ["Reduce image file size by up to 34% vs JPG", "Maintain visual quality for web use", "Improve page load speed and Core Web Vitals"],
  "convert-png-to-webp":      ["Smaller files than PNG with similar quality", "Support for transparency just like PNG", "Better performance on modern browsers"],
  "convert-webp-to-jpg":      ["Maximum compatibility with older apps and devices", "Required by some CMS and social platforms", "Easy to share via email and messaging apps"],
  "convert-webp-to-png":      ["Lossless quality with full transparency support", "Widely accepted by design tools like Photoshop", "Perfect for printing and offline editing"],
  "convert-png-to-jpg":       ["Much smaller file size for photographs", "Universal compatibility across all platforms", "Ideal for sharing photos online or via email"],
  "convert-jpg-to-png":       ["Lossless format — no further quality degradation", "Full transparency support (alpha channel)", "Preferred by designers and print workflows"],
  "convert-svg-to-png":       ["Share vector graphics with any app or person", "Required for social media profile images", "Consistent rendering across all platforms"],
  "convert-text-to-pdf":      ["Universal format readable on every device", "Preserves formatting and layout permanently", "Professional look for documents and reports"],
  "convert-csv-to-json":      ["Ready-to-use format for APIs and JavaScript apps", "Structured data for databases and backends", "Human-readable and easy to debug"],
  "convert-json-to-excel":    ["Explore JSON data in a familiar spreadsheet UI", "Share data with non-technical stakeholders", "Filter, sort, and chart in Excel or Google Sheets"],
  "convert-json-to-csv":      ["Import data into Excel, Google Sheets, or databases", "Simpler format for reporting and analytics", "Widely supported by ETL tools and data pipelines"],
  "convert-xml-to-json":      ["Modern format for REST APIs and JavaScript", "Easier to parse and traverse than XML", "Smaller file size and cleaner syntax"],
  "convert-csv-to-excel":     ["Add formulas, charts, and multiple sheets", "Native Excel format for professional reports", "Works directly in Excel, Google Sheets, and Numbers"],
  "convert-excel-to-csv":     ["Import into any database or data tool", "Universal compatibility with all platforms", "Reduce file size and simplify data processing"],
  "convert-markdown-to-html": ["Publish directly on websites and blogs", "Share with non-technical readers in any browser", "Add custom styling with CSS"],
  "convert-html-to-text":     ["Extract readable content from web pages", "Feed text into NLP or analysis pipelines", "Clean input for document processing tools"],
  "pdf-to-text":              ["Extract text for editing, analysis, or indexing", "No Adobe Acrobat or paid software needed", "Works for text-based PDFs entirely in browser"],
  "image-to-base64":          ["Embed images directly in HTML/CSS without extra requests", "Required for self-contained HTML files and email templates", "Useful for API payloads and offline web apps"],
};

type AnyTool = { from: string; to: string; category: string };

/* ── FAQs per category ── */
function getFaqs(tool: AnyTool) {
  const base = [
    {
      q: `Is this ${tool.from} to ${tool.to} converter really free?`,
      a: `Yes, completely free with no limits, no account, and no watermarks. SwitchEverything is sustained by unobtrusive ads.`,
    },
    {
      q: "Is my file safe? Does it get uploaded?",
      a: `No file is ever uploaded. The conversion runs entirely inside your browser using JavaScript APIs. Your ${tool.from} data never leaves your device.`,
    },
    {
      q: "What is the maximum file size?",
      a: "There is no server-side size limit. Practical limits depend on your browser memory — files up to 50 MB convert smoothly on most devices.",
    },
    {
      q: "Does it work on mobile?",
      a: "Yes. SwitchEverything works on Chrome, Safari, Firefox, and Edge on both iOS and Android.",
    },
    {
      q: `Can I convert multiple ${tool.from} files at once?`,
      a: "Batch conversion is coming soon. Currently, convert one file at a time for the best experience.",
    },
  ];

  if (tool.category === "image") {
    base.push({
      q: "Will the image quality be affected?",
      a: `Our converter uses the browser's native Canvas API and optimized settings to preserve maximum visual quality during ${tool.from}→${tool.to} conversion.`,
    });
  }

  return base;
}

interface ToolPageLayoutProps {
  slug: ToolSlug;
  // Allow override for custom pages (e.g. pdf-to-text, image-to-base64) not in TOOLS
  title?: string;
  description?: string;
  from?: string;
  to?: string;
  icon?: string;
  accept?: string;
}

export default function ToolPageLayout({ slug, title: titleProp, description: descProp, from: fromProp, to: toProp, icon: iconProp, accept: acceptProp }: ToolPageLayoutProps) {
  const found = TOOLS.find((t) => t.slug === slug);
  const tool = found ?? {
    slug,
    title: titleProp ?? slug,
    description: descProp ?? "",
    from: fromProp ?? "",
    to: toProp ?? "",
    icon: iconProp ?? "🔧",
    accept: acceptProp ?? "",
    category: "document" as const,
  };
  const relatedTools = TOOLS.filter((t) => t.slug !== slug && t.category === tool.category).slice(0, 4);
  const otherTools = TOOLS.filter((t) => t.slug !== slug && t.category !== tool.category).slice(0, 4);
  const benefits = CONVERSION_BENEFITS[slug] ?? ["Fast browser-based conversion", "No upload required", "Free and private"];
  const faqs = getFaqs(tool);
  const fromDesc = FORMAT_DESC[tool.from];
  const toDesc = FORMAT_DESC[tool.to];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://switcheverything.io/" },
      { "@type": "ListItem", position: 2, name: tool.title, item: `https://switcheverything.io/${slug}/` },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="flex flex-col lg:flex-row gap-10">

        {/* ── Main column ── */}
        <div className="flex-1 min-w-0">

          {/* Breadcrumb */}
          <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: "var(--text-secondary)" }} aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }}>{tool.title}</span>
          </nav>

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}
              >
                {tool.icon}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                {tool.title}
              </h1>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {tool.description}{" "}
              <strong style={{ color: "var(--text-primary)" }}>100% free, client-side, and private.</strong>
            </p>
          </div>

          {/* Converter widget */}
          <ConverterWidget slug={slug} fromFormat={tool.from} toFormat={tool.to} accept={tool.accept} />

          {/* ── Why convert section ── */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
              Why Convert {tool.from} to {tool.to}?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 flex items-start gap-3"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <span className="text-lg flex-shrink-0" style={{ color: "#6c63ff" }}>✓</span>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── How to use ── */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
              How to Convert {tool.from} to {tool.to} — 3 Steps
            </h2>
            <ol className="space-y-4">
              {[
                `Click "Choose File" or drag your ${tool.from} file into the upload zone above.`,
                `SwitchEverything converts it to ${tool.to} instantly in your browser — no upload, no waiting, no account needed.`,
                `Click "Download" to save your converted ${tool.to} file to your device.`,
              ].map((step, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #6c63ff, #a78bfa)" }}
                  >
                    {idx + 1}
                  </span>
                  <p className="text-sm leading-relaxed pt-1.5" style={{ color: "var(--text-secondary)" }}>{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Format info ── */}
          {(fromDesc || toDesc) && (
            <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fromDesc && (
                <div className="rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                    <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: "rgba(108,99,255,0.15)", color: "#a78bfa" }}>{tool.from}</span>
                    What is {tool.from}?
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{fromDesc}</p>
                </div>
              )}
              {toDesc && (
                <div className="rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                    <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>{tool.to}</span>
                    What is {tool.to}?
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{toDesc}</p>
                </div>
              )}
            </section>
          )}

          {/* ── Privacy banner ── */}
          <section
            className="mt-8 rounded-2xl p-6 flex items-start gap-4"
            style={{ background: "rgba(108,99,255,0.06)", border: "1px solid rgba(108,99,255,0.2)" }}
          >
            <span className="text-2xl flex-shrink-0">🔒</span>
            <div>
              <h3 className="font-semibold mb-1 text-sm" style={{ color: "var(--text-primary)" }}>
                100% Private — Your files never leave your device
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Unlike most online converters, SwitchEverything processes your <strong>{tool.from}</strong> files entirely within your browser using modern JavaScript and Canvas APIs. No server receives your data — ever. This means faster conversions, zero privacy risk, and no file-size server restrictions.
              </p>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text-primary)" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl overflow-hidden"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <summary
                    className="flex items-center justify-between gap-4 p-4 cursor-pointer list-none"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <span className="font-medium text-sm">{faq.q}</span>
                    <svg
                      width="14" height="14" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth={2.5}
                      className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                      style={{ color: "var(--accent)" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ── Related tools (same category) ── */}
          {relatedTools.length > 0 && (
            <section className="mt-12">
              <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Related {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)} Converters
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedTools.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/${t.slug}`}
                    className="card-hover flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <span className="text-xl">{t.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                      {t.from} → {t.to}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Other tools ── */}
          {otherTools.length > 0 && (
            <section className="mt-8 mb-4">
              <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                More Free Conversion Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {otherTools.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/${t.slug}`}
                    className="card-hover flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <span className="text-xl">{t.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                      {t.from} → {t.to}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── Sidebar ── */}
        <aside className="hidden lg:block flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <AdSense slot="sidebar-skyscraper" />
          </div>
        </aside>
      </div>
    </div>
  );
}
