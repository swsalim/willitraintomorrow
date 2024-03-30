import type { Metadata } from 'next'
import Link from 'next/link'
import { City } from '@/types'

import { destination } from '@/config/destinations'
import { siteConfig } from '@/config/site'
import { slugify } from '@/lib/utils'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

interface MarketingLayoutProps {
  children: React.ReactNode
}

function DestinationCities({
  title,
  cities,
}: {
  title: string
  cities: City[]
}) {
  return (
    <div>
      <h3 className="text-amber-50 mb-4 font-heading text-lg font-bold capitalize">
        {title}
      </h3>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {cities.map((city, index) => {
          return (
            <Link
              key={`${slugify(city.name)}-${index}`}
              href={`#`}
              className="text-amber-300/90 capitalize"
            >
              {city.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <main className="bg-black flex flex-1 flex-col xl:flex-row">
        <div className="container grid place-content-center py-12 xl:pr-96">
          {children}
        </div>
        <aside className="border-amber-200 bg-amber-950 block w-full space-y-8 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 xl:fixed xl:inset-y-0 xl:right-0 xl:block xl:w-96 xl:border-l">
          <DestinationCities
            title="East Asia"
            cities={destination['East Asia']}
          />
          <DestinationCities
            title="South Asia"
            cities={destination['South Asia']}
          />
          <DestinationCities
            title="West Asia"
            cities={destination['West Asia']}
          />
          <DestinationCities
            title="Western Europe"
            cities={destination['Western Europe']}
          />
          <DestinationCities
            title="Eastern Europe"
            cities={destination['Eastern Europe']}
          />
          <DestinationCities
            title="Southern Europe"
            cities={destination['Southern Europe']}
          />
          <DestinationCities
            title="Northern Europe"
            cities={destination['Northern Europe']}
          />
          <DestinationCities
            title="North America"
            cities={destination['North America']}
          />
          <DestinationCities
            title="South America"
            cities={destination['South America']}
          />
          <DestinationCities title="Africa" cities={destination['Africa']} />
        </aside>
      </main>
    </>
  )
}
