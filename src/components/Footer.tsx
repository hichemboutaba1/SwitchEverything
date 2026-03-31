import Link from "next/link";
import { TOOLS } from "@/lib/utils";

export default function Footer() {
  const imageTools = TOOLS.filter((t) => t.category === "image");
  const documentTools = TOOLS.filter((t) => t.category === "document");
  const dataTools = TOOLS.filter((t) => t.category === "data");

  return (
    <footer
      className="border-t mt-24"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #6c63ff, #a78bfa)" }}
              >
                S
              </div>
              <span className="font-semibold gradient-text">SwitchEverything</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              Free, fast, and private file conversion. All processing happens
              in your browser — your files never leave your device.
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              © {new Date().getFullYear()} SwitchEverything. All rights reserved.
            </p>
          </div>

          {/* Image Tools */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Image Converters
            </h3>
            <ul className="space-y-2">
              {imageTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {tool.from} to {tool.to} Converter
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Document & Data Tools */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Document Converters
            </h3>
            <ul className="space-y-2">
              {documentTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {tool.from} to {tool.to} Converter
                  </Link>
                </li>
              ))}
            </ul>

            <h3
              className="text-xs font-semibold uppercase tracking-wider mt-6 mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Data Converters
            </h3>
            <ul className="space-y-2">
              {dataTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {tool.from} to {tool.to} Converter
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Why SwitchEverything
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              {[
                ["🔒", "Zero upload — 100% client-side"],
                ["⚡", "Instant conversion, no waiting"],
                ["🆓", "Completely free, forever"],
                ["🌍", "Works on any browser"],
                ["📱", "Mobile-friendly design"],
                ["🔄", "Batch-ready architecture"],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-start gap-2">
                  <span>{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
