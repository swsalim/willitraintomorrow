import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import Image from 'next/image'
import Script from 'next/script'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import '@/styles/globals.css'

const fontHeading = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  metadataBase: siteConfig.url,
  alternates: {
    canonical: '/',
  },
  authors: [
    {
      name: 'Yuyu',
      url: 'https://www.yuurrific.com',
    },
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.openGraph.image,
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: siteConfig.openGraph.imageAlt,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/icons/favicon-32x32.png',
    shortcut: '/icons/apple-touch-icon.png',
    apple: '/icons/apple-touch-icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.creator,
    images: [siteConfig.openGraph.image],
  },
  robots: {
    index: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn('antialiased', fontBody.variable, fontHeading.variable)}
    >
      <head>
        <link rel="preconnect" href="//ik.imagekit.io" />
        <link rel="preconnect" href="//stats.willitraintomorrow.com" />
        <link rel="dns-prefetch" href="//stats.willitraintomorrow.com" />
        <link rel="dns-prefetch" href="//ik.imagekit.io" />
        <Script
          id="simple-analytics"
          dangerouslySetInnerHTML={{
            __html: `window.sa_event=window.sa_event||function(){var a=[].slice.call(arguments);window.sa_event.q?window.sa_event.q.push(a):window.sa_event.q=[a]};`,
          }}
        />
        <Script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="c2fbac7b-0b09-48f0-b925-7a5a61de2a3b"
          async
        />
      </head>
      <body
        className="bg-amber-100 flex min-h-screen flex-col font-sans"
        suppressHydrationWarning
      >
        {children}
        <script
          async
          src="https://stats.willitraintomorrow.com/latest.js"
        ></script>
        <script
          async
          src="https://stats.willitraintomorrow.com/auto-events.js"
        ></script>
        <noscript>
          <Image
            src="https://stats.willitraintomorrow.com/noscript.gif?collect-dnt=true"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
            width="1"
            height="1"
            unoptimized
          />
        </noscript>
      </body>
    </html>
  )
}
