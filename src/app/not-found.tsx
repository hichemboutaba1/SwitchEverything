import Link from "next/link";
import type { Metadata } from "next";
import { TOOLS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page Not Found — SwitchEverything",
  description: "The page you're looking for doesn't exist. Browse our free file conversion tools instead.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 300,
          background: "radial-gradient(ellipse, rgba(108,99,255,0.12) 0%, transparent 70%)",
          transform: "translateY(-50%)",
        }}
        aria-hidden="true"
      />

      {/* 404 number */}
      <div
        className="text-8xl sm:text-9xl font-black mb-4 leading-none select-none"
        style={{
          background: "linear-gradient(135deg, rgba(108,99,255,0.3), rgba(167,139,250,0.15))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        404
      </div>

      <h1
        className="text-2xl sm:text-3xl font-bold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        Page not found
      </h1>
      <p
        className="text-base mb-10 max-w-md leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try one of our free conversion tools below.
      </p>

      {/* Quick tool links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10 max-w-2xl w-full">
        {TOOLS.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="card-hover flex flex-col items-center gap-2 p-4 rounded-xl text-center"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <span className="text-2xl">{tool.icon}</span>
            <span
              className="text-xs font-medium leading-tight"
              style={{ color: "var(--text-secondary)" }}
            >
              {tool.from} → {tool.to}
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
          boxShadow: "0 4px 20px rgba(108,99,255,0.4)",
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}
