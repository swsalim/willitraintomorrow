'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface forecastProp {
  country: string
  city: string
}

export function ForecastInfo({ country, city }: forecastProp) {
  const [forecastData, setForecastData] = useState(null)
  const [tomorrowDate, setTomorrowDate] = useState<string>('')

  useEffect(() => {
    const fetchForecast = async (city: string, country: string) => {
      try {
        const response = await fetch(
          `/api/forecast?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`
        )
        const data = await response.json()

        if (data.success) {
          console.log("Tomorrow's Weather:", data.tomorrowWeather)
          setForecastData(data)

          const date = new Date(data.tomorrowWeather.date)
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long', // long name of the month
            day: '2-digit', // day of the month with 2 digits
          }).format(date)
          setTomorrowDate(formattedDate)
        } else {
          console.error('Error fetching weather data:', data.error)
        }
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }

    fetchForecast(city, country)
  }, [country, city])

  return (
    <div className="space-y-4">
      <h1 className="mb-8 font-heading text-5xl capitalize">
        Tomorrow's Weather Forecast
      </h1>
      <div className="text-xl font-medium">
        <span>{city}</span>
        {tomorrowDate && <span className="ml-2"> - {tomorrowDate}</span>}
      </div>
      {forecastData && (
        <>
          <div className="text-xl">
            Chance of Rain:{' '}
            <span className="font-semibold">
              {forecastData.tomorrowWeather.day.daily_chance_of_rain}%
            </span>
          </div>
          <div className="relative">
            <Image
              src={`https:${forecastData?.tomorrowWeather?.day.condition.icon}`}
              alt={`Tomorrow weather forecast for ${city}, ${country}`}
              width={70}
              height={70}
              unoptimized={false}
            />
            <div className="text-lg font-semibold">
              {forecastData.tomorrowWeather?.day.condition.text}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
