// TODO: Fix construct metadata
import { Metadata } from 'next'

import { siteConfig } from '@/config/site'

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.openGraph.image,
  icons = {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      {
        url: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcut: '/icons/favicon-32x32.png',
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  noIndex = false,
  authors = [
    {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  ],
  alternates = {
    canonical: '/',
  },
}: {
  title?: string
  description?: string
  image?: string | null
  icons?: Metadata['icons']
  authors?: Metadata['authors']
  alternates?: Metadata['alternates']
  noIndex?: boolean
} = {}): Metadata {
  return {
    // title: {
    //   default: title,
    //   template: `%s · ${siteConfig.siteName}`,
    // },
    title,
    description,
    metadataBase: siteConfig.url,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      ...(image && {
        images: [
          {
            url: image,
            width: siteConfig.openGraph.width,
            height: siteConfig.openGraph.height,
            alt: siteConfig.openGraph.imageAlt,
          },
        ],
      }),
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: 'summary_large_image',
        images: [image],
      }),
      creator: siteConfig.creator,
    },
    icons,
    alternates,
    authors,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
