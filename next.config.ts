import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Required for GitHub Pages — site is served at /SwitchEverything/
  basePath: isProd ? "/SwitchEverything" : "",
  assetPrefix: isProd ? "/SwitchEverything/" : "",
};

export default nextConfig;
