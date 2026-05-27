import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack root to this project; silences the stray-lockfile warning
  // from the user's home directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
