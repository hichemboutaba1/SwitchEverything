import React from "react";

const FROM_FORMATS = [
  { label: "JPG",  color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  delay: "0s",    dur: "3.2s" },
  { label: "PNG",  color: "#6c63ff", bg: "rgba(108,99,255,0.12)",  delay: "0.8s",  dur: "4s"   },
  { label: "TXT",  color: "#10b981", bg: "rgba(16,185,129,0.12)",  delay: "1.6s",  dur: "3.6s" },
  { label: "CSV",  color: "#ec4899", bg: "rgba(236,72,153,0.12)",  delay: "2.4s",  dur: "4.4s" },
];

const TO_FORMATS = [
  { label: "WebP", color: "#a78bfa", bg: "rgba(167,139,250,0.12)", delay: "0.4s",  dur: "3.8s" },
  { label: "PDF",  color: "#ef4444", bg: "rgba(239,68,68,0.12)",   delay: "1.2s",  dur: "3.3s" },
  { label: "JSON", color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  delay: "2.0s",  dur: "4.2s" },
  { label: "XLSX", color: "#10b981", bg: "rgba(16,185,129,0.12)",  delay: "2.8s",  dur: "3.7s" },
];

/* A tiny moving particle that travels left → right */
function Particle({ delay, y, dur }: { delay: string; y: number; dur: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
        top: y,
        left: 0,
        animation: `drift-right ${dur} ease-in-out ${delay} infinite`,
        boxShadow: "0 0 6px rgba(108,99,255,0.8)",
      }}
    />
  );
}

export default function HeroAnimation() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 560,
        height: 220,
        margin: "0 auto",
        userSelect: "none",
      }}
    >
      {/* ── Left column: FROM formats ── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {FROM_FORMATS.map((f) => (
          <div
            key={f.label}
            style={{
              padding: "5px 14px",
              borderRadius: 50,
              background: f.bg,
              border: `1px solid ${f.color}40`,
              color: f.color,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.04em",
              animation: `float ${f.dur} ease-in-out ${f.delay} infinite`,
              boxShadow: `0 0 12px ${f.color}20`,
            }}
          >
            {f.label}
          </div>
        ))}
      </div>

      {/* ── Center: spinning conversion engine ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "1.5px solid rgba(108,99,255,0.15)",
            animation: "spin-slow 10s linear infinite",
          }}
        >
          {/* Ring dot 1 */}
          <div style={{
            position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)",
            width: 8, height: 8, borderRadius: "50%",
            background: "#6c63ff",
            boxShadow: "0 0 8px #6c63ff",
          }} />
        </div>

        {/* Middle ring */}
        <div
          style={{
            position: "absolute",
            width: 76,
            height: 76,
            borderRadius: "50%",
            border: "1.5px dashed rgba(167,139,250,0.2)",
            animation: "spin-reverse 7s linear infinite",
          }}
        >
          {/* Ring dot 2 */}
          <div style={{
            position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
            width: 6, height: 6, borderRadius: "50%",
            background: "#a78bfa",
            boxShadow: "0 0 6px #a78bfa",
          }} />
        </div>

        {/* Inner core */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(108,99,255,0.25), rgba(167,139,250,0.15))",
            border: "1px solid rgba(108,99,255,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            animation: "glow-pulse 3s ease-in-out infinite",
            position: "relative",
            zIndex: 1,
          }}
        >
          ⚡
        </div>

        {/* Particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <Particle delay="0s"    y={-3} dur="2.4s" />
          <Particle delay="0.8s"  y={5}  dur="2.8s" />
          <Particle delay="1.6s"  y={-8} dur="2.2s" />
          <Particle delay="2.4s"  y={2}  dur="3s"   />
        </div>
      </div>

      {/* ── Left → center connector lines (SVG) ── */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(108,99,255,0)" />
            <stop offset="50%" stopColor="rgba(108,99,255,0.35)" />
            <stop offset="100%" stopColor="rgba(108,99,255,0)" />
          </linearGradient>
        </defs>
        {/* 4 horizontal dashed lines from left badges to center */}
        {[38, 80, 122, 164].map((y, i) => (
          <line
            key={i}
            x1="80" y1={y}
            x2="235" y2="110"
            stroke="url(#lineGrad)"
            strokeWidth="1"
            strokeDasharray="4 4"
            style={{
              animation: `draw-line 1.5s ease ${0.2 * i}s both`,
              strokeDashoffset: 200,
            }}
          />
        ))}
        {/* 4 horizontal dashed lines from center to right badges */}
        {[38, 80, 122, 164].map((y, i) => (
          <line
            key={`r${i}`}
            x1="325" y1="110"
            x2="480" y2={y}
            stroke="url(#lineGrad)"
            strokeWidth="1"
            strokeDasharray="4 4"
            style={{
              animation: `draw-line 1.5s ease ${0.4 + 0.2 * i}s both`,
              strokeDashoffset: 200,
            }}
          />
        ))}
      </svg>

      {/* ── Right column: TO formats ── */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {TO_FORMATS.map((f) => (
          <div
            key={f.label}
            style={{
              padding: "5px 14px",
              borderRadius: 50,
              background: f.bg,
              border: `1px solid ${f.color}40`,
              color: f.color,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.04em",
              animation: `float-reverse ${f.dur} ease-in-out ${f.delay} infinite`,
              boxShadow: `0 0 12px ${f.color}20`,
            }}
          >
            {f.label}
          </div>
        ))}
      </div>
    </div>
  );
}
