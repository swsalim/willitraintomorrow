import { unstable_cache } from 'next/cache'

import {
  getConfiguredPhotoProvider,
  getWeatherPhotoCacheRevalidateSeconds,
  isWeatherPhotoFetchDisabled,
} from '@/lib/photo-providers/config'
import { buildWeatherHeroSearchQuery } from '@/lib/photo-providers/weather-query'
import { searchStockPhoto } from '@/lib/photo-providers/search'
import type { StockPhotoHit } from '@/lib/photo-providers/types'
import type { WeatherConditionBucket } from '@/lib/weather-visuals'
import { slugify } from '@/lib/utils'

/**
 * Cached stock photo for the hero. Keys: provider + slugged location + weather bucket.
 * Uses Next.js Data Cache (`unstable_cache`) so the same city/condition reuses one API
 * hit across requests and deploys until `revalidate` expires — primary protection
 * against Pexels/Unsplash rate limits.
 */
export async function getCachedWeatherHeroPhoto(
  cityLabel: string,
  countryLabel: string,
  bucket: WeatherConditionBucket
): Promise<StockPhotoHit | null> {
  if (isWeatherPhotoFetchDisabled()) return null

  const provider = getConfiguredPhotoProvider()
  const cityKey = slugify(cityLabel) || 'city'
  const countryKey = slugify(countryLabel) || 'country'
  const revalidate = getWeatherPhotoCacheRevalidateSeconds()

  const cachedRead = unstable_cache(
    async () => {
      const query = buildWeatherHeroSearchQuery(
        cityLabel,
        countryLabel,
        bucket
      )
      try {
        return await searchStockPhoto(provider, query)
      } catch (e) {
        console.error('[getCachedWeatherHeroPhoto]', e)
        return null
      }
    },
    ['weather-hero-photo', provider, cityKey, countryKey, bucket],
    { revalidate }
  )

  return cachedRead()
}
