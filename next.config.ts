import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/clojure-workout-tracker/:path*",
        destination:
          "https://dimmin3f9flnh.cloudfront.net/clojure-workout-tracker/:path*",
      },
      {
        source: "/demo-crm/:path*",
        destination: "https://demo-crm-chi.vercel.app/:path*",
      },
    ];
  },
};

export default withContentlayer(nextConfig);
