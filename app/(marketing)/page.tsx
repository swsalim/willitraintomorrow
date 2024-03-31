import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { ForecastInfo } from '@/components/ForecastInfo'
import ImageKit from '@/components/ImageKit'

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

async function getData(city: string, country: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/forecast?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`
  )

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

export default async function Home({
  searchParams: { country, city },
}: searchParamsProps) {
  const data = await getData(city, country)
  const date = new Date(data.tomorrowWeather.date)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long', // long name of the month
    day: '2-digit', // day of the month with 2 digits
  }).format(date)

  return (
    <>
      <div className="mb-4 size-20 drop-shadow-md">
        <ImageKit src="logo-circle.png" alt="Will It Rain Tomorrow?" />
      </div>
      <ForecastInfo
        country={country}
        city={city}
        date={formattedDate}
        forecast={data.tomorrowWeather}
      />
    </>
  )
}
