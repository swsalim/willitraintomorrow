import Link from 'next/link'
import { City } from '@/types'
import { DESTINATIONS, getCityName } from '@/utils'

import { slugify } from '@/lib/utils'
import { Footer } from '@/components/Footer'

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
      <h3 className="font-display mb-4 text-lg font-bold text-amber-50 capitalize">
        {title}
      </h3>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {cities.map((city, index) => {
          return (
            <Link
              key={`${slugify(city.name)}-${index}`}
              href={`/${slugify(city.countryCode)}/${slugify(city.name)}`}
              className="cursor-pointer text-amber-300/90"
            >
              {getCityName(city)}
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
      <main className="flex flex-1 flex-col xl:flex-row">
        <div className="relative mx-auto flex max-w-7xl flex-col px-8 py-12 xl:px-0 xl:pr-96 xl:pb-0">
          <div className="flex flex-1 flex-col xl:place-content-center">
            {children}
          </div>
          <div className="hidden xl:block">
            <Footer />
          </div>
        </div>
        <aside className="block w-full overflow-y-auto border-amber-200 bg-amber-950 py-6 xl:fixed xl:inset-y-0 xl:right-0 xl:block xl:w-96 xl:border-l">
          <div className="space-y-8 px-8">
            <DestinationCities
              title="East Asia"
              cities={DESTINATIONS['East Asia']}
            />
            <DestinationCities
              title="South Asia"
              cities={DESTINATIONS['South Asia']}
            />
            <DestinationCities
              title="West Asia"
              cities={DESTINATIONS['West Asia']}
            />
            <DestinationCities
              title="Western Europe"
              cities={DESTINATIONS['Western Europe']}
            />
            <DestinationCities
              title="Eastern Europe"
              cities={DESTINATIONS['Eastern Europe']}
            />
            <DestinationCities
              title="Southern Europe"
              cities={DESTINATIONS['Southern Europe']}
            />
            <DestinationCities
              title="Northern Europe"
              cities={DESTINATIONS['Northern Europe']}
            />
            <DestinationCities
              title="Central America"
              cities={DESTINATIONS['Central America']}
            />
            <DestinationCities
              title="North America"
              cities={DESTINATIONS['North America']}
            />
            <DestinationCities
              title="South America"
              cities={DESTINATIONS['South America']}
            />
            <DestinationCities title="Africa" cities={DESTINATIONS['Africa']} />
          </div>
        </aside>
        <div className="block xl:hidden">
          <Footer />
        </div>
      </main>
    </>
  )
}
