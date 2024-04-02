// https://github.com/dubinc/dub/blob/main/apps/web/app/inspect/%5Bdomain%5D/%5Bkey%5D/page.tsx

import Image from 'next/image'
import { City } from '@/types'
import {
  constructMetadata,
  deslugify,
  DESTINATIONS,
  getDateTime,
  slugify,
} from '@/utils'
import { CalendarDaysIcon, CloudHailIcon, UmbrellaOffIcon } from 'lucide-react'

import { getForecastData } from '@/lib/helpers'
import ImageKit from '@/components/ImageKit'

export const revalidate = 3600

interface CityPageProps {
  params: {
    city: string
    country: string
  }
}

export async function generateMetadata({ params }: CityPageProps) {
  const { city, country } = params

  return constructMetadata({
    title: `${deslugify(city)}, ${deslugify(country)} - Tomorrow's Weather Forecast`,
    description: `Latest weather forecast for ${deslugify(city)} for tomorrow's, hourly weather forecast, including tomorrow's temperatures in ${deslugify(city)}, wind, rain and more.`,
    image: `/api/og?title=Tomorrow's Weather Forecast in ${deslugify(city)}`,
    alternates: {
      canonical: `/${country}/${city}`,
    },
  })
}

export async function generateStaticParams() {
  const combinedCities: City[] = Object.values(DESTINATIONS).reduce(
    (acc: City[], current: City[]) => {
      return acc.concat(current)
    },
    []
  )

  return combinedCities.map((destination) => ({
    city: slugify(destination.name),
    country: slugify(destination.country),
  }))
}

export default async function CityPage({ params }: CityPageProps) {
  const { city, country } = params
  const data = await getForecastData(city, country)
  const date = new Date(data.tomorrowWeather.date)

  return (
    <>
      <div className="mb-4 size-20 drop-shadow-md">
        <ImageKit src="logo-circle.png" alt="Will It Rain Tomorrow?" />
      </div>
      <div className="space-y-4">
        <h1 className="mb-8 font-heading text-4xl font-black capitalize md:text-7xl">
          Tomorrow's Weather Forecast in {deslugify(city)}
        </h1>
        <div className="text-xl font-medium">
          {date && (
            <span className="flex items-center gap-x-2">
              <CalendarDaysIcon className="size-4" /> {getDateTime(date)}
            </span>
          )}
        </div>
        {data.tomorrowWeather && (
          <>
            <div className="flex items-center gap-x-2 text-xl">
              {data.tomorrowWeather.day.daily_chance_of_rain >= 50 && (
                <CloudHailIcon className="size-4" />
              )}
              {data.tomorrowWeather.day.daily_chance_of_rain < 50 && (
                <UmbrellaOffIcon className="size-4" />
              )}
              Chance of Rain:{' '}
              <span className="font-semibold">
                {data.tomorrowWeather.day.daily_chance_of_rain}%
              </span>
            </div>
            <div className="relative">
              <Image
                src={`https:${data.tomorrowWeather.day.condition.icon}`}
                alt={`Tomorrow weather data.tomorrowWeather for ${city}, ${country}`}
                width={70}
                height={70}
                unoptimized={false}
              />
              <div className="text-lg font-semibold">
                {data.tomorrowWeather.day.condition.text}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
