import { slugify } from '@/lib/utils'
import { getAllCities, getCityName } from '@/utils/functions/cities'

export type CountryDestinationGroup = {
  country: string
  countrySlug: string
  cities: { label: string; href: string }[]
}

export function getDestinationsByCountry(): CountryDestinationGroup[] {
  const cities = getAllCities()
  const map = new Map<
    string,
    { country: string; countrySlug: string; cities: { label: string; href: string }[] }
  >()

  for (const city of cities) {
    const code = city.countryCode.toLowerCase()
    if (!map.has(code)) {
      map.set(code, {
        country: city.country,
        countrySlug: slugify(city.countryCode),
        cities: [],
      })
    }
    const group = map.get(code)!
    group.cities.push({
      label: getCityName(city),
      href: `/${slugify(city.countryCode)}/${slugify(city.name)}`,
    })
  }

  return Array.from(map.values())
    .map((g) => ({
      ...g,
      cities: g.cities.sort((a, b) => a.label.localeCompare(b.label)),
    }))
    .sort((a, b) => a.country.localeCompare(b.country))
}
