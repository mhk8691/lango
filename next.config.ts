// import type { NextConfig } from "next";
// import { dashboardAliases } from "./components/dashboard/routes";

// const nextConfig: NextConfig = {
//   async redirects() {
//     return dashboardAliases.map(([source, destination]) => ({
//       source: `${source}/:path*`,
//       destination: `${destination}/:path*`,
//       permanent: true,
//     }));
//   },
//   experimental: {
//     agentFeedback: true,
//   },
//   cacheComponents: true,
//   partialPrefetching: true,
//   turbopack: {
//     rules: {
//       "*.css": {
//         loaders: ["@tailwindcss/turbopack"],
//         as: "*.css",
//       },
//     },
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";
import { dashboardAliases } from "./components/dashboard/routes";


const nextConfig: NextConfig = {
  async redirects() {
    return dashboardAliases.map(([source, destination]) => ({
      source: `${source}/:path*`,
      destination: `${destination}/:path*`,
      permanent: true,
    }));
  },
  output: 'standalone',
  images: {
    unoptimized: true,
  },
};


export default nextConfig;
