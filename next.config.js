const { ON_GITHUB_PAGES } = process.env;

const basePath = ON_GITHUB_PAGES ? "/CSGO-DATA" : "";
const assetPrefix = ON_GITHUB_PAGES ? "/CSGO-DATA/" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix,
  basePath,
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '/',
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
