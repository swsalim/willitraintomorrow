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
  slugify,
} from '@/utils'
import { CalendarDaysIcon } from 'lucide-react'

import { getForecastData } from '@/lib/helpers'
import ImageKit from '@/components/ImageKit'
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

export async function generateMetadata({ params }: CityPageProps) {
  const { city, countryCode } = params
  const cities: City[] = getAllCities()

  const currentCity = getCurrentCity(city, cities)

  // console.log(`city`)
  // console.log(city, deslugify(city))
  // console.log(currentCity)

  return constructMetadata({
    title: `Tomorrow Weather in ${getCityName(currentCity)}, ${currentCity?.country} - Will It Rain?`,
    description: `Get the latest on tomorrow weather forecast in ${getCityName(currentCity)}, ${currentCity?.country}. Precise rain forecast to help you decide: umbrella or sunglasses?`,
    image: `/api/og?title=Tomorrow Weather Forecast in ${getCityName(currentCity)}, ${currentCity?.country}`,
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
  const cities: City[] = getAllCities()
  const currentCity = getCurrentCity(city, cities)
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
        <h1 className="mb-4 text-center font-heading text-base font-bold capitalize tracking-wide md:text-lg">
          Tomorrow Weather Forecast in{' '}
          <span className="font-black normal-case">
            {getCityName(currentCity)}
          </span>
        </h1>
        <div className="text-2xl font-black">
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
