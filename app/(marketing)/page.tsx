import type { Metadata } from 'next'
import { deslugify, getDateTime } from '@/utils'
import { CalendarDaysIcon } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { getForecastData } from '@/lib/helpers'
import ImageKit from '@/components/ImageKit'
import { PageHeader } from '@/components/PageHeader'
import { TemperatureWidget } from '@/components/TemperatureWidget'

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
  const { tomorrowWeather } = await getForecastData(city, country)
  const date = new Date(tomorrowWeather.date)

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
