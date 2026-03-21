import { slugify } from '@/lib/utils'
import { getAllCities, getCityName } from '@/utils/functions/cities'

export type CityNavItem = {
  href: string
  label: string
  country: string
  query: string
}

function buildCityNavItems(): CityNavItem[] {
  const cities = getAllCities()
  return cities.map((city) => {
    const label = getCityName(city)
    const cc = slugify(city.countryCode)
    const citySlug = slugify(city.name)
    return {
      href: `/${cc}/${citySlug}`,
      label,
      country: city.country,
      query: `${label} ${city.country} ${city.name}`.toLowerCase(),
    }
  })
}

/** Static index for client search (all supported cities). */
export const CITY_NAV_ITEMS: CityNavItem[] = buildCityNavItems()
