import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Will It Rain Tomorrow?',
    short_name: 'Will it rain?',
    description:
      'One question. One answer. Find out if you need an umbrella tomorrow.',
    start_url: '/',
    display: 'standalone',
    background_color: '#121a24',
    theme_color: '#1d4ed8',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icons/logo.png',
        sizes: '1254x1254',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
