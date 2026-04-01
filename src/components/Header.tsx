"use client";

import Link from "next/link";
import AdSense from "./AdSense";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? "rgba(7, 7, 15, 0.92)"
          : "rgba(7, 7, 15, 0.7)",
        borderBottom: `1px solid ${scrolled ? "rgba(37,37,64,0.8)" : "rgba(37,37,64,0.3)"}`,
        backdropFilter: "blur(16px)",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {/* Top leaderboard ad — desktop */}
      <div
        className="hidden lg:flex justify-center py-2 transition-all duration-300"
        style={{
          borderBottom: "1px solid rgba(37,37,64,0.4)",
          opacity: scrolled ? 0.7 : 1,
        }}
      >
        <AdSense slot="top-leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="SwitchEverything Home">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-base transition-transform duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
              boxShadow: "0 4px 16px rgba(108,99,255,0.4)",
            }}
          >
            S
          </div>
          <span
            className="font-bold text-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #e879f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SwitchEverything
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {[
            { href: "/#tools", label: "Tools" },
            { href: "/#how-it-works", label: "How It Works" },
            { href: "/#faq", label: "FAQ" },
            { href: "/blog", label: "Blog" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-lg transition-all duration-200 hover:text-white"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: status badge */}
        <div className="flex items-center gap-3">
          <span
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-300"
            style={{
              background: "rgba(16,185,129,0.08)",
              color: "#10b981",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            100% Free &amp; Private
          </span>
        </div>
      </div>
    </header>
  );
}
