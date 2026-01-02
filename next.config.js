const { withContentlayer } = require('next-contentlayer2');
const createNextIntlPlugin = require('next-intl/plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chev.contrails.space',
        port: '12650',
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: 'www.junglexs.icu',
        pathname: '/images/**'
      }
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  }
}

const withNextIntl = createNextIntlPlugin();

module.exports = withBundleAnalyzer(withNextIntl(withContentlayer(nextConfig)));
