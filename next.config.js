const redirectList = [
  {
    source: '/get/simpleanalytics',
    destination: 'https://referral.simpleanalytics.com/yuyu',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverMinification: false,
  },
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'stats.willitraintomorrow.com', port: '' },
      { protocol: 'https', hostname: 'ik.imagekit.io', port: '' },
      { protocol: 'https', hostname: 'cdn.weatherapi.com', port: '' },
    ],
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
      statusCode: 301,
    }))
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    config.infrastructureLogging = {
      level: 'error',
    }
    // Important: return the modified config
    // https://nextjs.org/docs/messages/undefined-webpack-config
    return config
  },
}

module.exports = nextConfig
