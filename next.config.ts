import type { NextConfig } from "next";
import { dashboardAliases } from "./components/dashboard/routes";

const nextConfig: NextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  async redirects() {
    return dashboardAliases.map(([source, destination]) => ({
      source: `${source}/:path*`,
      destination: `${destination}/:path*`,
      permanent: true,
    }));
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
