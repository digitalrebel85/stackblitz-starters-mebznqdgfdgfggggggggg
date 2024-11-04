/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    domains: ['images.unsplash.com'],
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Ensure proper chunk loading
  webpack: (config, { isServer }) => {
    // Optimize chunk size
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      cacheGroups: {
        default: false,
        vendors: false,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
        shared: {
          name: (module, chunks) => {
            const allChunksNames = chunks.map((chunk) => chunk.name).join('~');
            return `shared~${allChunksNames}`;
          },
          enforce: true,
          chunks: 'all',
          minChunks: 2,
        },
      },
    };

    return config;
  },
  // Ensure proper page resolution
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  },
};

module.exports = nextConfig;