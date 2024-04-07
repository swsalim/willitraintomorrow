// https://github.com/dubinc/dub/blob/main/apps/web/app/inspect/%5Bdomain%5D/%5Bkey%5D/page.tsx

import Link from 'next/link'
import { City } from '@/types'
import {
  constructMetadata,
  deslugify,
  DESTINATIONS,
  getDateTime,
  slugify,
} from '@/utils'
import { CalendarDaysIcon } from 'lucide-react'

import { getForecastData } from '@/lib/helpers'
import ImageKit from '@/components/ImageKit'
import { PageHeader } from '@/components/PageHeader'
import { TemperatureWidget } from '@/components/TemperatureWidget'

export const revalidate = 3600

interface CityPageProps {
  params: {
    city: string
    countryCode: string
  }
}

function getCombinedCities() {
  return Object.values(DESTINATIONS).reduce((acc: City[], current: City[]) => {
    return acc.concat(current)
  }, [])
}

// TODO: Update title with country name
// Weather in Kolkata, West Bengal, India | Tomorrow.io
// Kolkata, West Bengal, India Weather Forecast | AccuWeather
// Kolkata, West Bengal, India 14 day weather forecast
// The most accurate current weather forecast in Kolkata. Be prepared for today's weather with a detailed local report.
// Kolkata, West Bengal, India Weather Forecast, with current conditions, wind, air quality, and what to expect for the next 3 days.
// Forecasted weather conditions the coming 2 weeks for Kolkata

export async function generateMetadata({ params }: CityPageProps) {
  const { city, countryCode } = params
  const cities: City[] = getCombinedCities()

  const currentCity = cities.filter((c) => c.name.trim() === deslugify(city))[0]

  return constructMetadata({
    title: `Tomorrow Weather in ${currentCity.name}, ${currentCity.country} - Will It Rain?`,
    description: `Get the latest on tomorrow weather forecast in ${currentCity.name}, ${currentCity.country}. Precise rain forecast to help you decide: umbrella or sunglasses?`,
    image: `/api/og?title=Tomorrow Weather Forecast in ${currentCity.name}, ${currentCity.country}`,
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
  const { city, countryCode } = params
  const { tomorrowWeather } = await getForecastData(city, countryCode)
  const date = new Date(tomorrowWeather.date)

  return (
    <>
      <div className="mx-auto mb-4 size-20 drop-shadow-md">
        <Link href="/" title="Back to Home">
          <ImageKit src="logo-circle.png" alt="Will It Rain Tomorrow?" />
        </Link>
      </div>
      <div className="space-y-4">
        <PageHeader
          className="text-center"
          title={`Tomorrow Weather Forecast in ${deslugify(city)}`}
        />
        <div className="text-xl font-medium">
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
      </div>
    </>
  )
}
