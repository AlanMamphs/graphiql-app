/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: process.env.NODE_ENV !== 'test',
  },
  compiler: {
    removeConsole: true,
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
