"use client";

import { useCallback, useRef, useState } from "react";

interface Props {
  originalUrl: string;
  convertedUrl: string;
  label?: string;
}

export default function BeforeAfterSlider({ originalUrl, convertedUrl, label = "Converted" }: Props) {
  const [pos, setPos] = useState(50); // percent
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { dragging.current = true; update(e.clientX); };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) update(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };

  const onTouchStart = (e: React.TouchEvent) => { dragging.current = true; update(e.touches[0].clientX); };
  const onTouchMove  = (e: React.TouchEvent) => { if (dragging.current) update(e.touches[0].clientX); };
  const onTouchEnd   = () => { dragging.current = false; };

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden cursor-col-resize select-none"
        style={{ maxHeight: 320, border: "1px solid var(--border)" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Converted (full width, behind) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={convertedUrl} alt={label} className="w-full object-contain block" style={{ maxHeight: 320 }} />

        {/* Original (clipped to left side) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={originalUrl} alt="Original" className="block object-contain" style={{ maxHeight: 320, width: containerRef.current?.offsetWidth ?? "100%" }} />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
          style={{ left: `${pos}%`, background: "white", boxShadow: "0 0 8px rgba(0,0,0,0.5)" }}
        >
          {/* Handle */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.4)", color: "#333" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5l-7 7 7 7V5zM16 5l7 7-7 7V5z" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.55)", color: "white" }}>
          Original
        </div>
        <div className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(108,99,255,0.8)", color: "white" }}>
          {label}
        </div>
      </div>
      <p className="text-center text-xs" style={{ color: "var(--text-secondary)" }}>
        ← Drag to compare →
      </p>
    </div>
  );
}
