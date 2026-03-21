import type { NextConfig } from 'next'

const redirectList = [
  {
    source: '/get/simpleanalytics',
    destination: 'https://referral.simpleanalytics.com/yuyu',
  },
]

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'stats.willitraintomorrow.com', port: '' },
      { protocol: 'https', hostname: 'ik.imagekit.io', port: '' },
      { protocol: 'https', hostname: 'cdn.weatherapi.com', port: '' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '' },
      { protocol: 'https', hostname: 'images.pexels.com', port: '' },
    ],
    deviceSizes: [200, 350, 600, 900, 1200, 1800],
    imageSizes: [16, 32, 48, 64, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return redirectList.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }))
  },
  turbopack: {
    rules: {
      // Example: if you had a webpack SVG rule
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    resolveAlias: {
      // migrate any webpack resolve.alias entries here
    },
  },
}

export default nextConfig
