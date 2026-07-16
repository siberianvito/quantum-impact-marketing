import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app is its own workspace (the parent folder holds sibling client sites)
  turbopack: { root: __dirname },
};

export default nextConfig;
