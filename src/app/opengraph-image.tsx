import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SwitchEverything — Free Universal File Converter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FORMATS = ["JPG", "PNG", "WebP", "TXT", "PDF", "CSV", "JSON", "XLSX"];

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0d0d1a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 400,
            background: "radial-gradient(ellipse, rgba(108,99,255,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Grid dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(108,99,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "white",
              boxShadow: "0 8px 30px rgba(108,99,255,0.5)",
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              background: "linear-gradient(135deg, #a78bfa, #e879f9)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            SwitchEverything
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#e8e8f0",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          Convert Any File,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6c63ff 0%, #a78bfa 50%, #ec4899 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Instantly & Free
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#8888aa",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          100% client-side · No upload · No account · No cost
        </div>

        {/* Format pills */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", maxWidth: 700 }}>
          {FORMATS.map((fmt) => (
            <div
              key={fmt}
              style={{
                padding: "8px 20px",
                borderRadius: 50,
                background: "rgba(108,99,255,0.12)",
                border: "1px solid rgba(108,99,255,0.3)",
                color: "#a78bfa",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {fmt}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
