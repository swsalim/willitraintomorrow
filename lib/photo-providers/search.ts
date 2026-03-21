import { searchPexelsPhoto } from '@/lib/photo-providers/pexels'
import type { PhotoProviderId, StockPhotoHit } from '@/lib/photo-providers/types'
import { searchUnsplashPhoto } from '@/lib/photo-providers/unsplash'

/**
 * Fetch one landscape photo for the query using the given provider.
 * Caching is handled by `getCachedWeatherHeroPhoto` (unstable_cache).
 */
export async function searchStockPhoto(
  provider: PhotoProviderId,
  query: string
): Promise<StockPhotoHit | null> {
  if (provider === 'unsplash') return searchUnsplashPhoto(query)
  return searchPexelsPhoto(query)
}
