import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["drive.google.com"],
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
};

export default nextConfig;
