"use client";

interface AdSenseProps {
  slot: "top-leaderboard" | "sidebar-skyscraper" | "post-conversion-native";
  className?: string;
}

/**
 * Ad slot dimensions & responsive behaviour:
 *
 * top-leaderboard      → 728×90  desktop  |  320×50  mobile  (banner)
 * sidebar-skyscraper   → 300×600 desktop  |  hidden on mobile (sidebar only)
 * post-conversion-native → 336×280 all screens (medium rectangle)
 *
 * Replace the inner <div> with the real AdSense <ins> tag once you have
 * your publisher & ad-unit IDs.
 */
const AD_CONFIGS = {
  "top-leaderboard": {
    desktop: { width: 728, height: 90 },
    mobile:  { width: 320, height: 50 },
    label: "Advertisement",
  },
  "sidebar-skyscraper": {
    desktop: { width: 300, height: 600 },
    mobile:  null, // hidden on mobile — handled via CSS
    label: "Advertisement",
  },
  "post-conversion-native": {
    desktop: { width: 336, height: 280 },
    mobile:  { width: 336, height: 280 },
    label: "Advertisement",
  },
};

export default function AdSense({ slot, className = "" }: AdSenseProps) {
  const config = AD_CONFIGS[slot];

  if (slot === "top-leaderboard") {
    return (
      <>
        {/* Desktop leaderboard — hidden on small screens */}
        <div
          className={`hidden sm:flex adsense-placeholder ${className}`}
          style={{ width: config.desktop.width, height: config.desktop.height }}
          data-ad-slot={slot}
          aria-label={config.label}
        >
          <AdLabel w={config.desktop.width} h={config.desktop.height} />
        </div>

        {/* Mobile banner — shown only on small screens */}
        <div
          className={`flex sm:hidden adsense-placeholder ${className}`}
          style={{ width: "100%", maxWidth: config.mobile!.width, height: config.mobile!.height }}
          data-ad-slot={`${slot}-mobile`}
          aria-label={config.label}
        >
          <AdLabel w={config.mobile!.width} h={config.mobile!.height} />
        </div>
      </>
    );
  }

  if (slot === "sidebar-skyscraper") {
    // Fully controlled by the parent (hidden lg:block in Header/ToolPageLayout)
    return (
      <div
        className={`adsense-placeholder ${className}`}
        style={{ width: config.desktop.width, height: config.desktop.height }}
        data-ad-slot={slot}
        aria-label={config.label}
      >
        <AdLabel w={config.desktop.width} h={config.desktop.height} />
      </div>
    );
  }

  // post-conversion-native — responsive width, fixed height
  return (
    <div
      className={`adsense-placeholder ${className}`}
      style={{ width: "100%", maxWidth: config.desktop.width, height: config.desktop.height }}
      data-ad-slot={slot}
      aria-label={config.label}
    >
      <AdLabel w={config.desktop.width} h={config.desktop.height} />
    </div>
  );
}

function AdLabel({ w, h }: { w: number; h: number }) {
  return (
    <div className="flex flex-col items-center gap-1 pointer-events-none select-none">
      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
        Advertisement
      </span>
      <span className="text-xs opacity-40" style={{ color: "var(--text-secondary)" }}>
        {w}×{h}
      </span>
    </div>
  );
}
