import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Explore page was removed; its links and bookmarks land on the home page instead of a 404.
      { source: '/explore', destination: '/', permanent: true },
      { source: '/explore/:path*', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
