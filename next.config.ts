import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack root to this project; silences the stray-lockfile warning
  // from the user's home directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Build output dir. Defaults to `.next` (dev + normal builds). The shared
  // tunnel/prod server runs with NEXT_DIST_DIR=.next-prod so a concurrently
  // running `next dev` can't clobber the production build it serves from.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
