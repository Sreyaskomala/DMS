import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/marketplace", destination: "/devices", permanent: false },
      { source: "/pharmacy-portal", destination: "/partner-portal", permanent: false },
      { source: "/dashboard", destination: "/tracker", permanent: false },
      { source: "/dashboard/:path*", destination: "/tracker", permanent: false },
    ];
  },
};
export default nextConfig;
