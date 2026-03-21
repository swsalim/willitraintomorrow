import type { Metadata } from 'next'
import Link from 'next/link'
import { constructMetadata } from '@/utils'

import { siteConfig } from '@/config/site'
import { getDestinationsByCountry } from '@/lib/destinations-by-country'
import { absoluteUrl } from '@/lib/utils'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = constructMetadata({
  title: `Destinations · ${siteConfig.siteName}`,
  description:
    'Browse tomorrow’s weather by country and city. Search or pick a destination to see rain chances and temperatures.',
  alternates: {
    canonical: '/destinations',
  },
})

export default function DestinationsPage() {
  const groups = getDestinationsByCountry()
  const pageUrl = absoluteUrl('/destinations')

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Destinations · ${siteConfig.siteName}`,
          description:
            'Browse cities by country for tomorrow’s weather forecast and rain chances.',
          url: pageUrl,
          isPartOf: {
            '@type': 'WebSite',
            name: siteConfig.siteName,
            url: absoluteUrl('/'),
          },
        }}
      />
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: absoluteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Destinations',
              item: pageUrl,
            },
          ],
        }}
      />

      <div className="mx-auto w-full max-w-7xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Destinations
        </h1>
        <p className="mt-3 text-base leading-relaxed text-gray-500 sm:text-lg">
          Pick a country, then a city—or use the search bar in the header to
          jump anywhere quickly.
        </p>
        <nav
          aria-label="Jump to country"
          className="mt-8 flex flex-wrap gap-2 border-t border-gray-200 pt-8"
        >
          {groups.map((g) => (
            <a
              key={g.countrySlug}
              href={`#${g.countrySlug}`}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-900 transition"
            >
              {g.country}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 w-full max-w-7xl space-y-12">
        {groups.map((g) => (
          <section
            key={g.countrySlug}
            id={g.countrySlug}
            aria-labelledby={`country-${g.countrySlug}`}
            className="w-full"
          >
            <h2
              id={`country-${g.countrySlug}`}
              className="font-display border-b border-gray-200 pb-2 text-xl font-bold text-gray-900"
            >
              {g.country}
            </h2>
            <ul className="mt-4 columns-1 gap-x-10 sm:columns-2">
              {g.cities.map((c) => (
                <li key={c.href} className="mb-2 break-inside-avoid">
                  <Link
                    href={c.href}
                    className="text-gray-500 transition hover:text-gray-900"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
