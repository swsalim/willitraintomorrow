import type { Metadata } from 'next'
import { getDateTime } from '@/utils'
import { CalendarDaysIcon } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { JsonLd } from '@/components/JsonLd'
import { getForecastData } from '@/lib/helpers'
import { absoluteUrl } from '@/lib/utils'
import ImageKit from '@/components/ImageKit'
import { TemperatureWidget } from '@/components/TemperatureWidget'
import { TemperatureWidgetMini } from '@/components/TemperatureWidgetMini'

export const revalidate = 3600

interface searchParamsProps {
  searchParams: Promise<{
    country: string
    city: string
    languages: string
  }>
}

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default async function Home({ searchParams }: searchParamsProps) {
  const { country, city } = await searchParams
  const { tomorrowWeather } = await getForecastData(city, country)
  const date = new Date(tomorrowWeather.date)
  const pageUrl = absoluteUrl('/')

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
      <div className="mx-auto mb-4 size-20 drop-shadow-md">
        <ImageKit src="logo-circle.png" alt="Will It Rain Tomorrow?" />
      </div>
      <div className="space-y-4">
        <h1 className="font-display mb-4 text-center text-base font-medium tracking-wide capitalize md:text-lg">
          Tomorrow Weather Forecast in{' '}
          <span className="font-black">{city}</span>
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
