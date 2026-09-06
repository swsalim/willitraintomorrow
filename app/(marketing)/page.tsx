import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { getDestinationsByCountry } from '@/lib/destinations-by-country'
import { absoluteUrl } from '@/lib/utils'
import { HomeOnboarding } from '@/components/home/HomeOnboarding'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  const pageUrl = absoluteUrl('/')
  const groups = getDestinationsByCountry()

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.siteName,
          url: pageUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${pageUrl}destinations`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <HomeOnboarding groups={groups} />
    </>
  )
}
