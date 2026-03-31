import Link from "next/link";
import AdSense from "./AdSense";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "rgba(10, 10, 15, 0.85)",
        borderColor: "var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Top leaderboard ad — shown on desktop */}
      <div className="hidden lg:flex justify-center py-2 border-b" style={{ borderColor: "var(--border)" }}>
        <AdSense slot="top-leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="SwitchEverything Home">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #6c63ff, #a78bfa)" }}
          >
            S
          </div>
          <span className="font-semibold text-lg gradient-text">SwitchEverything</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: "var(--text-secondary)" }}>
          <Link href="/#tools" className="hover:text-white transition-colors">Tools</Link>
          <Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
          <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
        </nav>

        <div className="flex items-center gap-3">
          <span
            className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
            style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot"></span>
            100% Free &amp; Private
          </span>
        </div>
      </div>
    </header>
  );
}
