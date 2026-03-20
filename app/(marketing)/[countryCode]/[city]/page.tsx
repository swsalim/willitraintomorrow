// https://github.com/dubinc/dub/blob/main/apps/web/app/inspect/%5Bdomain%5D/%5Bkey%5D/page.tsx

import Link from 'next/link'
import { City } from '@/types'
import {
  constructMetadata,
  DESTINATIONS,
  getAllCities,
  getCityName,
  getCurrentCity,
  getDateTime,
} from '@/utils'
import { CalendarDaysIcon } from 'lucide-react'

import { getForecastData } from '@/lib/helpers'
import { slugify, absoluteUrl } from '@/lib/utils'
import ImageKit from '@/components/ImageKit'
import { JsonLd } from '@/components/JsonLd'
import { TemperatureWidget } from '@/components/TemperatureWidget'
import { TemperatureWidgetMini } from '@/components/TemperatureWidgetMini'

export const revalidate = 3600

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
    title: `Will It Rain Tomorrow in ${cityLabel}, ${countryLabel}`,
    description: `Tomorrow’s weather forecast for ${cityLabel}, ${countryLabel}, including rain chance and temperatures. Plan ahead—umbrella or sunglasses?`,
    image: `/api/og?title=Will It Rain Tomorrow in ${cityLabel}, ${countryLabel}`,
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
  const { tomorrowWeather } = await getForecastData(city, countryCode)
  const date = new Date(tomorrowWeather.date)

  const countryLabel = currentCity?.country ?? countryCode
  const cityLabel = getCityName(currentCity as City)
  const pageUrl = absoluteUrl(`/${countryCode}/${city}`)
  const pageTitle = `Will It Rain Tomorrow in ${cityLabel}, ${countryLabel}`
  const pageDescription = `Tomorrow’s weather forecast for ${cityLabel}, ${countryLabel}, including rain chance and temperatures. Plan ahead—umbrella or sunglasses?`

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: pageTitle,
          description: pageDescription,
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
      <div className="mx-auto mb-4 size-20 drop-shadow-md">
        <Link href="/" title="Back to Home">
          <ImageKit src="logo-circle.png" alt="Will It Rain Tomorrow?" />
        </Link>
      </div>
      <div className="space-y-4">
        <h1 className="font-display mb-4 text-center text-base font-semibold tracking-wide capitalize md:text-lg">
          Tomorrow Weather Forecast in{' '}
          <span className="font-black normal-case">
            {getCityName(currentCity)}
          </span>
        </h1>
        <div className="text-xl font-bold">
          {date && (
            <span className="flex items-center justify-center gap-x-2">
              <CalendarDaysIcon className="size-6" /> {getDateTime(date)}
            </span>
          )}
        </div>
        {tomorrowWeather && (
          <TemperatureWidget
            chanceOfRain={tomorrowWeather.day.daily_chance_of_rain}
            condition={tomorrowWeather.day.condition.text}
            tempC={{
              avg: tomorrowWeather.day.avgtemp_c,
              max: tomorrowWeather.day.maxtemp_c,
              min: tomorrowWeather.day.mintemp_c,
            }}
            tempF={{
              avg: tomorrowWeather.day.avgtemp_f,
              max: tomorrowWeather.day.maxtemp_f,
              min: tomorrowWeather.day.mintemp_f,
            }}
          />
        )}
        {tomorrowWeather?.hour?.length > 0 && (
          <div>
            <div className="mt-16 flex flex-row flex-wrap gap-4">
              {tomorrowWeather?.hour.map((hourlyWeather: any) => {
                return (
                  <div
                    className="w-36 min-w-36 flex-1"
                    key={hourlyWeather.time.split(' ')[1]}
                  >
                    <TemperatureWidgetMini
                      hour={hourlyWeather.time.split(' ')[1]}
                      condition={hourlyWeather.condition.text}
                      tempC={hourlyWeather.temp_c}
                      tempF={hourlyWeather.temp_f}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
