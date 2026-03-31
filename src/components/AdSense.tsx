"use client";

interface AdSenseProps {
  slot: "top-leaderboard" | "sidebar-skyscraper" | "post-conversion-native";
  className?: string;
}

const AD_CONFIGS = {
  "top-leaderboard": { width: 728, height: 90, label: "Advertisement" },
  "sidebar-skyscraper": { width: 300, height: 600, label: "Advertisement" },
  "post-conversion-native": { width: 336, height: 280, label: "Advertisement" },
};

export default function AdSense({ slot, className = "" }: AdSenseProps) {
  const config = AD_CONFIGS[slot];

  return (
    <div
      className={`adsense-placeholder ${className}`}
      style={{ width: config.width, height: config.height, maxWidth: "100%" }}
      data-ad-slot={slot}
      aria-label={config.label}
    >
      <div className="flex flex-col items-center gap-1 pointer-events-none select-none">
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {config.label}
        </span>
        <span className="text-xs opacity-50" style={{ color: "var(--text-secondary)" }}>
          {config.width}×{config.height}
        </span>
      </div>
    </div>
  );
}
