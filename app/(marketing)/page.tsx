import type { Metadata } from 'next'
import { getDateTime } from '@/utils'
import { CalendarDaysIcon } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { getForecastData } from '@/lib/helpers'
import { getCountryLabelForPhotoSearch } from '@/lib/photo-country-label'
import { resolveWeatherPageVisual } from '@/lib/resolve-weather-visual'
import { absoluteUrl } from '@/lib/utils'
import ImageKit from '@/components/ImageKit'
import { JsonLd } from '@/components/JsonLd'
import { TemperatureWidget } from '@/components/TemperatureWidget'
import { TemperatureWidgetMini } from '@/components/TemperatureWidgetMini'
import { WeatherPageShell } from '@/components/WeatherPageShell'
import { WeatherStatsBar } from '@/components/WeatherStatsBar'

export const revalidate = 3600

interface searchParamsProps {
  searchParams: Promise<{
    country?: string
    city?: string
    languages?: string
  }>
}

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default async function Home({ searchParams }: searchParamsProps) {
  const sp = await searchParams
  const country = sp.country ?? 'Singapore'
  const city = sp.city ?? 'Singapore'
  const { tomorrowWeather } = await getForecastData(city, country)
  const date = new Date(tomorrowWeather.date)
  const pageUrl = absoluteUrl('/')
  const countryLabelForPhoto = getCountryLabelForPhotoSearch(country) || country
  const visual = await resolveWeatherPageVisual(
    tomorrowWeather.day.condition.text,
    city,
    countryLabelForPhoto
  )

  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: siteConfig.title,
          description: siteConfig.description,
          url: pageUrl,
          isPartOf: {
            '@type': 'WebSite',
            name: siteConfig.siteName,
            url: pageUrl,
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
              item: pageUrl,
            },
          ],
        }}
      />
      <WeatherPageShell visual={visual}>
        <div className="flex flex-col gap-0 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="min-w-0 flex-1 space-y-3 sm:space-y-4">
            <div>
              <h1 className="font-display mt-2 text-[1.65rem] leading-tight font-bold tracking-tight text-white sm:mt-3 sm:text-3xl md:text-4xl lg:text-5xl">
                Tomorrow in{' '}
                <span className="bg-linear-to-r from-amber-300 to-orange-100 bg-clip-text text-transparent">
                  {city}
                </span>
              </h1>
              <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/75 sm:mt-3 sm:text-base">
                <CalendarDaysIcon className="size-5 shrink-0 text-amber-200/90" />
                <span>{getDateTime(date)}</span>
              </p>
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
          </div>
          <WeatherStatsBar day={tomorrowWeather.day} />
        </div>
      </WeatherPageShell>
      {tomorrowWeather?.hour?.length > 0 && (
        <section
          className="mt-12 space-y-5"
          aria-labelledby="hourly-heading-home"
        >
          <div className="flex items-end justify-between gap-4">
            <h2
              id="hourly-heading-home"
              className="font-display text-xl font-bold tracking-tight text-gray-900 md:text-2xl"
            >
              Hour by hour
            </h2>
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            {tomorrowWeather.hour.map(
              (hourlyWeather: {
                time: string
                condition: { text: string }
                temp_c: string
                temp_f: string
              }) => (
                <div
                  className="min-w-[140px] flex-1 sm:min-w-[150px] sm:flex-none"
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
            )}
          </div>
        </section>
      )}
    </>
  )
}
