import type { Metadata } from 'next'
import { Figtree, Petrona } from 'next/font/google'

import { absoluteUrl, cn } from '@/lib/utils'

import '@/styles/globals.css'

import { constructMetadata } from '@/utils'

import { siteConfig } from '@/config/site'
import { JsonLd } from '@/components/JsonLd'

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
})

const petrona = Petrona({
  variable: '--font-petrona',
  subsets: ['latin'],
})

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.title,
//     template: `%s · ${siteConfig.siteName}`,
//   },
//   description: siteConfig.description,
//   metadataBase: siteConfig.url,
//   alternates: {
//     canonical: '/',
//   },
//   authors: [
//     {
//       name: siteConfig.author.name,
//       url: siteConfig.author.url,
//     },
//   ],
//   openGraph: {
//     title: siteConfig.title,
//     description: siteConfig.description,
//     url: siteConfig.url,
//     images: [
//       {
//         url: siteConfig.openGraph.image,
//         width: siteConfig.openGraph.width,
//         height: siteConfig.openGraph.height,
//         alt: siteConfig.openGraph.imageAlt,
//       },
//     ],
//     locale: 'en_US',
//     type: 'website',
//   },
//   icons: {
//     icon: '/icons/favicon-32x32.png',
//     shortcut: '/icons/apple-touch-icon.png',
//     apple: '/icons/apple-touch-icon.png',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: siteConfig.title,
//     description: siteConfig.description,
//     creator: siteConfig.creator,
//     images: [siteConfig.openGraph.image],
//   },
//   robots: {
//     index: true,
//   },
// }

export const metadata: Metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = absoluteUrl('/')

  return (
    <html
      lang="en"
      className={cn(
        'font-sans antialiased',
        figtree.variable,
        petrona.variable
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="//ik.imagekit.io" />
        <link rel="dns-prefetch" href="//ik.imagekit.io" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        <JsonLd
          schema={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteConfig.author.name,
            url: siteConfig.author.url,
          }}
        />
        <JsonLd
          schema={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteConfig.siteName,
            url: baseUrl,
            publisher: {
              '@type': 'Organization',
              name: siteConfig.author.name,
              url: siteConfig.author.url,
            },
          }}
        />
        <script
          async
          src="https://cdn.seline.com/seline.js"
          data-token="8ae9eccbaff1765"
        ></script>
      </head>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-amber-100 font-sans antialiased',
          figtree.variable,
          petrona.variable
        )}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
