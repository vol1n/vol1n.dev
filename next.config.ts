import type { NextConfig } from "next";
import { withContentlayer } from 'next-contentlayer2';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/clojure-workout-tracker/:path*",
        destination: "https://dimmin3f9flnh.cloudfront.net/clojure-workout-tracker/:path*",
      },
    ];
  },
};

export default withContentlayer(nextConfig);
