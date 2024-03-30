import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { ForecastInfo } from '@/components/ForecastInfo'
import ImageKit from '@/components/ImageKit'

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
  return (
    <div className="container grid place-content-center">
      <div className="mb-4 size-20 drop-shadow-md">
        <ImageKit src="logo-circle.png" alt="Will It Rain Tomorrow?" />
      </div>
      <ForecastInfo country={country} city={city} />
    </div>
  )
}
