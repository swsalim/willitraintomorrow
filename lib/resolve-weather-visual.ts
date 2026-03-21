import { getCachedWeatherHeroPhoto } from '@/lib/weather-hero-photo'
import {
  getWeatherConditionBucket,
  getWeatherVisual,
  type WeatherVisual,
} from '@/lib/weather-visuals'

/**
 * Static gradient + fallback image, optionally replaced by a cached Pexels/Unsplash photo.
 */
export async function resolveWeatherPageVisual(
  condition: string,
  cityLabel: string,
  countryLabel: string
): Promise<WeatherVisual> {
  const base = getWeatherVisual(condition)
  const bucket = getWeatherConditionBucket(condition)

  const photo = await getCachedWeatherHeroPhoto(
    cityLabel,
    countryLabel,
    bucket
  )

  if (!photo?.url) return base

  return {
    ...base,
    imageSrc: photo.url,
    imageAlt: photo.alt,
    attribution: photo.attribution,
  }
}
