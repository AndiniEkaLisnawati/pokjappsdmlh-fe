import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.pexels.com", "www.scm.co.id", "tiptxowdywysrlajnbxt.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tiptxowdywysrlajnbxt.supabase.co",
        pathname: "/storage/v1/object/public/profile-pictures/**"

      }
    ]
  },
  reactStrictMode: false, 
};

export default nextConfig;
