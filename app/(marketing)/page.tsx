import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { LocationInfo } from '@/components/LocationInfo'

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
  searchParams: { country, city, languages },
}: searchParamsProps) {
  return (
    <div className="container grid place-content-center">
      <LocationInfo country={country} city={city} languages={languages} />
    </div>
  )
}
