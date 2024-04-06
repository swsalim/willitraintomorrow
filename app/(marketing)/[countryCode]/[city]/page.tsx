// https://github.com/dubinc/dub/blob/main/apps/web/app/inspect/%5Bdomain%5D/%5Bkey%5D/page.tsx

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
  const { tomorrowWeather } = await getForecastData(city, countryCode)
  const date = new Date(tomorrowWeather.date)

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
