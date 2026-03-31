import Link from "next/link";
import AdSense from "./AdSense";
import ConverterWidget from "./ConverterWidget";
import { TOOLS, type ToolSlug } from "@/lib/utils";

interface ToolPageLayoutProps {
  slug: ToolSlug;
}

export default function ToolPageLayout({ slug }: ToolPageLayoutProps) {
  const tool = TOOLS.find((t) => t.slug === slug)!;
  const relatedTools = TOOLS.filter((t) => t.slug !== slug).slice(0, 4);

  const steps = [
    `Click "Choose File" or drag your ${tool.from} file into the upload zone.`,
    `Our browser-based engine converts it to ${tool.to} instantly — no upload needed.`,
    `Click "Download" to save your converted ${tool.to} file.`,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main column */}
        <div className="flex-1 max-w-2xl">
          {/* Breadcrumb */}
          <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: "var(--text-secondary)" }} aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }}>{tool.title}</span>
          </nav>

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{tool.icon}</span>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                {tool.title}
              </h1>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {tool.description}{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                100% free, client-side, and private.
              </strong>
            </p>
          </div>

          {/* Converter widget */}
          <ConverterWidget
            slug={slug}
            fromFormat={tool.from}
            toFormat={tool.to}
            accept={tool.accept}
          />

          {/* How to use */}
          <section className="mt-12">
            <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              How to Convert {tool.from} to {tool.to}
            </h2>
            <ol className="space-y-3">
              {steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #6c63ff, #a78bfa)" }}
                  >
                    {idx + 1}
                  </span>
                  <p className="text-sm leading-relaxed pt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Why client-side */}
          <section className="mt-10 rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <h2 className="text-base font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              Why is this converter 100% private?
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Unlike most online converters, SwitchEverything processes your{" "}
              <strong>{tool.from}</strong> files entirely within your web
              browser using modern JavaScript APIs. Your files are{" "}
              <strong>never uploaded to any server</strong> — not ours, not
              anyone&apos;s. This means faster conversions, zero data-privacy risk,
              and no file-size server restrictions.
            </p>
          </section>

          {/* Related tools */}
          <section className="mt-10">
            <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              More Conversion Tools
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
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <AdSense slot="sidebar-skyscraper" />
          </div>
        </aside>
      </div>
    </div>
  );
}
