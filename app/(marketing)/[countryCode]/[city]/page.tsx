import { cookies } from 'next/headers'
import { City } from '@/types'
import {
  constructMetadata,
  DESTINATIONS,
  getAllCities,
  getCityName,
  getCurrentCity,
} from '@/utils'
import { notFound } from 'next/navigation'

import { absoluteUrl, slugify } from '@/lib/utils'
import { getTomorrowForecast } from '@/lib/weather'
import { RememberLocation } from '@/components/location/RememberLocation'
import { SiteNav } from '@/components/nav/SiteNav'
import { JsonLd } from '@/components/JsonLd'
import { AtmosphereShell } from '@/components/weather/AtmosphereShell'
import { DaypartStrip } from '@/components/weather/DaypartStrip'
import { DryWindow } from '@/components/weather/DryWindow'
import { MetricsRow } from '@/components/weather/MetricsRow'
import { RainWindow } from '@/components/weather/RainWindow'
import { RelatedCities } from '@/components/weather/RelatedCities'
import { SeoForecastCopy } from '@/components/weather/SeoForecastCopy'
import { SeverityScale } from '@/components/weather/SeverityScale'
import { ShareTomorrow } from '@/components/weather/ShareTomorrow'
import { UmbrellaCallout } from '@/components/weather/UmbrellaCallout'
import { VerdictHero } from '@/components/weather/VerdictHero'
import { Footer } from '@/components/Footer'

export const revalidate = 1800

interface CityPageProps {
  params: Promise<{
    city: string
    countryCode: string
  }>
}

function getCombinedCities() {
  return Object.values(DESTINATIONS).reduce((acc: City[], current: City[]) => {
    return acc.concat(current)
  }, [])
}

export async function generateMetadata({ params }: CityPageProps) {
  const { city, countryCode } = await params
  const cities: City[] = getAllCities()
  const currentCity = getCurrentCity(city, cities)
  const countryLabel = currentCity?.country ?? countryCode
  const cityLabel = getCityName(currentCity)

  return constructMetadata({
    title: `Will It Rain Tomorrow in ${cityLabel}?`,
    description: `Will it rain tomorrow in ${cityLabel}, ${countryLabel}? Get a clear yes, no, or maybe, plus when rain is most likely.`,
    alternates: {
      canonical: `/${countryCode}/${city}`,
    },
  })
}

export async function generateStaticParams() {
  const combinedCities: City[] = getCombinedCities()

  return combinedCities.map((destination) => ({
    city: slugify(destination.name),
    countryCode: slugify(destination.countryCode),
  }))
}

export default async function CityPage({ params }: CityPageProps) {
  const { city, countryCode } = await params
  const cities: City[] = getAllCities()
  const currentCity = getCurrentCity(city, cities)

  if (!currentCity) {
    notFound()
  }

  const cityLabel = getCityName(currentCity)
  const pageUrl = absoluteUrl(`/${countryCode}/${city}`)
  const cookieStore = await cookies()
  const tempScale = (cookieStore.get('tempScale')?.value || 'C') as 'C' | 'F'

  const forecast = await getTomorrowForecast({
    name: currentCity.name,
    displayName: cityLabel,
    country: currentCity.country,
    countryCode: currentCity.countryCode,
  })

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Will It Rain Tomorrow in ${cityLabel}?`,
          description: forecast.seo.summary,
          url: pageUrl,
          isPartOf: {
            '@type': 'WebSite',
            name: 'Will It Rain Tomorrow',
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
              name: cityLabel,
              item: pageUrl,
            },
          ],
        }}
      />

      <RememberLocation
        location={{
          name: currentCity.name,
          displayName: cityLabel,
          country: currentCity.country,
          countryCode: currentCity.countryCode.toLowerCase(),
          href: `/${countryCode}/${city}`,
        }}
      />

      <AtmosphereShell atmosphere={forecast.atmosphere}>
        <SiteNav locationLabel={cityLabel} tempScale={tempScale} />
        <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <VerdictHero forecast={forecast} unit={tempScale} />
          <div className="flex justify-start pb-2">
            <ShareTomorrow forecast={forecast} />
          </div>
          <RainWindow hours={forecast.hours} rainWindow={forecast.rainWindow} />
          <UmbrellaCallout forecast={forecast} />
          <DaypartStrip dayparts={forecast.dayparts} />
          <MetricsRow forecast={forecast} unit={tempScale} />
          <SeverityScale severity={forecast.severity} />
          <DryWindow window={forecast.bestDryWindow} />
          <SeoForecastCopy forecast={forecast} />
          <RelatedCities
            countryCode={countryCode}
            currentHref={`/${countryCode}/${city}`}
          />
        </main>
        <Footer />
      </AtmosphereShell>
    </>
  )
}
