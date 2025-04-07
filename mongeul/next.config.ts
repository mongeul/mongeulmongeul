import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  images: {
    domains: ["drive.google.com", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/daw5iggrn/**",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    if (isServer) {
      config.externals = [...(config.externals || [])];
      config.resolve.alias["canvas"] = false;
      config.resolve.alias["konva"] = false;
    }

    return config;
  },

  // PWA 설정
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
};

export default nextConfig;
