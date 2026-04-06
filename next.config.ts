import type { NextConfig } from "next";
import { faviconPaths } from "./lib/seo/faviconPaths";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: faviconPaths.png32,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
