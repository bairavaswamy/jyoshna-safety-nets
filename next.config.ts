/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // output: "export",
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

module.exports = nextConfig;