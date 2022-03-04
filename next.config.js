/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/CSGO-DATA/',
  basePath: '/CSGO-DATA',
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
