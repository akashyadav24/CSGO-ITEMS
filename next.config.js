const { ON_GITHUB_PAGES } = process.env;

const basePath = ON_GITHUB_PAGES ? "/CSGO_ITEMS" : "";
const assetPrefix = ON_GITHUB_PAGES ? "/CSGO_ITEMS/" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix,
  basePath,
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
