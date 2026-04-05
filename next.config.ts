import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - allowedDevOrigins is required for cross-origin dev access but might not be in the type definition yet
  allowedDevOrigins: ["100.83.102.24"]
};

export default nextConfig;
