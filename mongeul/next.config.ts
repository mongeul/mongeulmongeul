import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
      config.externals = [...(config.externals || []), "konva", "canvas"];
    }
    return config;
  },
};

export default nextConfig;
