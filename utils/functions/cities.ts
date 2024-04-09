import { City } from '@/types'
import { deslugify, DESTINATIONS } from '@/utils'

export function getAllCities() {
  return Object.values(DESTINATIONS).reduce((acc: City[], current: City[]) => {
    return acc.concat(current)
  }, [])
}

export function getCurrentCity(city: string, cities: City[]) {
  return cities.filter(
    (c) => c.name.trim().toLowerCase() === deslugify(city).toLowerCase()
  )[0]
}

export function getCityName(city: City) {
  return city?.displayName || city.name
}
