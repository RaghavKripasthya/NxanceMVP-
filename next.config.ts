import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep Turbopack rooted to this app (avoids picking up parent-folder lockfiles)
    root: process.cwd(),
  },
};

export default nextConfig;
