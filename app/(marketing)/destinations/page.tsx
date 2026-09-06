import type { Metadata } from 'next'
import Link from 'next/link'
import { constructMetadata } from '@/utils'

import { siteConfig } from '@/config/site'
import { getDestinationsByCountry } from '@/lib/destinations-by-country'
import { absoluteUrl } from '@/lib/utils'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { SiteNav } from '@/components/nav/SiteNav'
import { WeatherEffects } from '@/components/weather/WeatherEffects'

export const metadata: Metadata = constructMetadata({
  title: `Destinations · ${siteConfig.siteName}`,
  description:
    'Browse tomorrow’s rain forecast by country and city. Pick a destination to see a clear yes, no, or maybe.',
  alternates: {
    canonical: '/destinations',
  },
})

export default function DestinationsPage() {
  const groups = getDestinationsByCountry()
  const pageUrl = absoluteUrl('/destinations')

  return (
    <div
      data-theme="light"
      data-atmosphere="cloud"
      className="relative min-h-[100dvh] overflow-hidden bg-[var(--wirt-bg)] text-[var(--wirt-fg)]"
    >
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Destinations · ${siteConfig.siteName}`,
          description:
            'Browse cities by country for tomorrow’s rain forecast.',
          url: pageUrl,
          isPartOf: {
            '@type': 'WebSite',
            name: siteConfig.siteName,
            url: absoluteUrl('/'),
          },
        }}
      />
      <WeatherEffects atmosphere="cloud" />
      <div className="relative z-10">
        <SiteNav />
        <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Destinations
          </h1>
          <p className="mt-3 max-w-[50ch] text-[var(--wirt-muted)]">
            Pick a country, then a city, or use Change location in the header.
          </p>

          <nav
            aria-label="Jump to country"
            className="mt-8 flex flex-wrap gap-2 border-t border-[color-mix(in_oklab,var(--wirt-fg)_12%,transparent)] pt-8"
          >
            {groups.map((g) => (
              <a
                key={g.countrySlug}
                href={`#${g.countrySlug}`}
                className="rounded-lg border border-[color-mix(in_oklab,var(--wirt-fg)_14%,transparent)] px-3 py-1.5 text-xs font-medium transition hover:border-[color-mix(in_oklab,var(--wirt-fg)_30%,transparent)]"
              >
                {g.country}
              </a>
            ))}
          </nav>

          <div className="mt-10 space-y-12">
            {groups.map((g) => (
              <section
                key={g.countrySlug}
                id={g.countrySlug}
                aria-labelledby={`country-${g.countrySlug}`}
              >
                <h2
                  id={`country-${g.countrySlug}`}
                  className="font-display border-b border-[color-mix(in_oklab,var(--wirt-fg)_12%,transparent)] pb-2 text-xl font-bold"
                >
                  {g.country}
                </h2>
                <ul className="mt-4 columns-1 gap-x-10 sm:columns-2">
                  {g.cities.map((c) => (
                    <li key={c.href} className="mb-2 break-inside-avoid">
                      <Link
                        href={c.href}
                        className="text-[var(--wirt-muted)] transition hover:text-[var(--wirt-fg)]"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
