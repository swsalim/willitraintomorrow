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
import { PageHeader } from '@/components/PageHeader'

export const revalidate = 3600

interface CityPageProps {
  params: {
    city: string
    countryCode: string
  }
}

// TODO: Update title with country name
export async function generateMetadata({ params }: CityPageProps) {
  const { city, countryCode } = params

  return constructMetadata({
    title: `${deslugify(city)}, ${deslugify(countryCode)} - Tomorrow's Weather Forecast`,
    description: `Latest weather forecast for ${deslugify(city)} for tomorrow's, hourly weather forecast, including tomorrow's temperatures in ${deslugify(city)}, wind, rain and more.`,
    image: `/api/og?title=Tomorrow's Weather Forecast in ${deslugify(city)}`,
    alternates: {
      canonical: `/${countryCode}/${city}`,
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
    countryCode: slugify(destination.countryCode),
  }))
}

export default async function CityPage({ params }: CityPageProps) {
  const { city, countryCode } = params
  const data = await getForecastData(city, countryCode)
  const date = new Date(data.tomorrowWeather.date)

  return (
    <>
      <div className="mx-auto mb-4 size-20 drop-shadow-md">
        <ImageKit src="logo-circle.png" alt="Will It Rain Tomorrow?" />
      </div>
      <div className="space-y-4">
        <PageHeader
          className="text-center"
          title={`Tomorrow's Weather Forecast in ${deslugify(city)}`}
        />
        <div className="text-xl font-medium">
          {date && (
            <span className="flex items-center justify-center gap-x-2">
              <CalendarDaysIcon className="size-6" /> {getDateTime(date)}
            </span>
          )}
        </div>
        {data.tomorrowWeather && (
          <>
            <div className="mb-2 flex items-center justify-center gap-x-2 text-xl">
              {data.tomorrowWeather.day.daily_chance_of_rain >= 50 && (
                <CloudHailIcon className="size-6" />
              )}
              {data.tomorrowWeather.day.daily_chance_of_rain < 50 && (
                <UmbrellaOffIcon className="size-6" />
              )}
              Chance of Rain:{' '}
              <span className="font-semibold">
                {data.tomorrowWeather.day.daily_chance_of_rain}%
              </span>
            </div>
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-2">
              <div className="flex flex-row items-center">
                <div className="relative">
                  <Image
                    src={`https:${data.tomorrowWeather.day.condition.icon}`}
                    alt={`Tomorrow weather data.tomorrowWeather for ${city}, ${countryCode}`}
                    width={70}
                    height={70}
                    unoptimized={false}
                  />
                </div>
                <div className="text-6xl font-semibold">
                  {data.tomorrowWeather.day.avgtemp_c}°
                </div>
              </div>
              <div className="text-base font-semibold">
                {data.tomorrowWeather.day.condition.text}
              </div>
              <div className="text-gray-700">
                Feels like {data.tomorrowWeather.day.avgtemp_c}° · High{' '}
                {data.tomorrowWeather.day.maxtemp_c}° · Low{' '}
                {data.tomorrowWeather.day.mintemp_c}°
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
