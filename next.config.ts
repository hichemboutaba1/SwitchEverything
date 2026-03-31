import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is the default in Next.js 16 — no webpack config needed.
  // The libraries (xlsx, jspdf, browser-image-compression) are browser-compatible
  // and work without any special Node.js polyfills in a client-side context.
};

export default nextConfig;
