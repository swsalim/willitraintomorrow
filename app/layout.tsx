import type { Metadata } from 'next'
import { Figtree, Gabarito } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'

import { absoluteUrl, cn } from '@/lib/utils'
import { constructMetadata } from '@/utils'
import { siteConfig } from '@/config/site'
import { JsonLd } from '@/components/JsonLd'

import '@/styles/globals.css'

const gabarito = Gabarito({
  variable: '--font-gabarito',
  subsets: ['latin'],
  display: 'swap',
})

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  display: 'swap',
})

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
        gabarito.variable,
        figtree.variable,
        GeistMono.variable
      )}
    >
      <head>
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
      <body className={cn('min-h-screen font-sans antialiased')} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
