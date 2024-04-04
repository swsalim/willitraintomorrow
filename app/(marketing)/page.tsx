import type { Metadata } from 'next'
import Image from 'next/image'
import { deslugify, getDateTime } from '@/utils'
import { CalendarDaysIcon, CloudHailIcon, UmbrellaOffIcon } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { getForecastData } from '@/lib/helpers'
import ImageKit from '@/components/ImageKit'
import { PageHeader } from '@/components/PageHeader'

export const revalidate = 3600

interface searchParamsProps {
  searchParams: {
    country: string
    city: string
    languages: string
  }
}

export const metadata: Metadata = {
  title: siteConfig.title,
}

export default async function Home({
  searchParams: { country, city },
}: searchParamsProps) {
  const data = await getForecastData(city, country)
  const date = new Date(data.tomorrowWeather.date)

  return (
    <>
      <div className="mx-auto mb-4 size-20 drop-shadow-md">
        <ImageKit src="logo-circle.png" alt="Will It Rain Tomorrow?" />
      </div>
      <div className="space-y-4">
        <PageHeader
          className="text-center"
          title="Tomorrow's Weather Forecast"
        />
        <div className="flex items-center justify-center gap-x-2 text-xl font-medium">
          <span>{deslugify(city)}</span>
          {date && (
            <span className="flex items-center gap-x-2">
              {' '}
              -
              <span className="flex items-center gap-x-2">
                <CalendarDaysIcon className="size-6" /> {getDateTime(date)}
              </span>
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
                    alt={`Tomorrow weather data.tomorrowWeather for ${city}, ${country}`}
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
              <div>
                Feels like {data.tomorrowWeather.day.avgtemp_c}° · High{' '}
                {data.tomorrowWeather.day.mintemp_c}° · Low{' '}
                {data.tomorrowWeather.day.maxtemp_c}°
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
