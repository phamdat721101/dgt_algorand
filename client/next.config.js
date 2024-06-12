/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
        port: "",
        pathname: "/static/img/coins/64x64/**",
      },
      {
        protocol: "https",
        hostname: "dd.dexscreener.com",
        port: "",
        pathname: "/ds-data/tokens/sui/**",
      },
      {
        protocol: "https",
        hostname: "dd.dexscreener.com",
        port: "",
        pathname: "/ds-data/tokens/ton/**",
      },
      {
        protocol: "https",
        hostname: "xkqpczltzicnmbqvihbc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/logos/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.child_process = false;
    }

    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = withNextIntl(nextConfig);
