"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/#tools", label: "Tools" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change (click)
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(7,7,15,0.95)" : "rgba(7,7,15,0.75)",
          borderBottom: `1px solid ${scrolled ? "rgba(37,37,64,0.9)" : "rgba(37,37,64,0.4)"}`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="SwitchEverything Home" onClick={closeMenu}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-base transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                boxShadow: "0 4px 16px rgba(108,99,255,0.4)",
              }}
            >
              S
            </div>
            <span className="font-bold text-lg" style={{
              background: "linear-gradient(135deg, #c4b5fd, #f0abfc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              SwitchEverything
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href}
                className="px-4 py-2 rounded-xl transition-all duration-200 hover:text-white hover:bg-white/5 font-medium"
                style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Status badge — desktop */}
            <span className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
              style={{ background: "rgba(16,185,129,0.08)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
              Free &amp; Private
            </span>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-all duration-200"
              style={{ background: menuOpen ? "rgba(108,99,255,0.12)" : "var(--surface)", border: "1px solid var(--border)" }}
              aria-label="Toggle menu"
            >
              <span className="block w-4.5 h-0.5 rounded-full transition-all duration-300"
                style={{ background: menuOpen ? "#6c63ff" : "var(--text-secondary)", width: 18,
                  transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none" }} />
              <span className="block h-0.5 rounded-full transition-all duration-300"
                style={{ background: menuOpen ? "#6c63ff" : "var(--text-secondary)", width: 14,
                  opacity: menuOpen ? 0 : 1 }} />
              <span className="block h-0.5 rounded-full transition-all duration-300"
                style={{ background: menuOpen ? "#6c63ff" : "var(--text-secondary)", width: 18,
                  transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? 300 : 0,
            borderTop: menuOpen ? "1px solid var(--border)" : "none",
          }}
        >
          <nav className="px-4 py-4 flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:text-white hover:bg-white/5"
                style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 flex items-center gap-2 px-2"
              style={{ borderTop: "1px solid var(--border)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
              <span className="text-xs" style={{ color: "#10b981" }}>100% Free — No uploads, no account</span>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
