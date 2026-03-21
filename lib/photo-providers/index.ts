/**
 * Stock photos for weather heroes — **switch provider with env**:
 *
 * - **Pexels (default):** `WEATHER_PHOTO_PROVIDER=pexels` + `PEXELS_API_KEY`
 * - **Unsplash:** `WEATHER_PHOTO_PROVIDER=unsplash` + `UNSPLASH_ACCESS_KEY` (or `UNSPLASH_API_KEY`)
 *
 * **Caching:** `getCachedWeatherHeroPhoto` in `@/lib/weather-hero-photo` wraps API calls in
 * `unstable_cache` keyed by provider + city + country + weather bucket. Tune TTL with
 * `WEATHER_PHOTO_CACHE_REVALIDATE_SECONDS` (default 7 days). Set `WEATHER_PHOTO_DISABLED=1`
 * to skip API calls (fallback images only).
 */

export type { PhotoProviderId, StockPhotoHit } from '@/lib/photo-providers/types'
export {
  getConfiguredPhotoProvider,
  getWeatherPhotoCacheRevalidateSeconds,
  isWeatherPhotoFetchDisabled,
} from '@/lib/photo-providers/config'
export { buildWeatherHeroSearchQuery } from '@/lib/photo-providers/weather-query'
export { searchPexelsPhoto } from '@/lib/photo-providers/pexels'
export { searchUnsplashPhoto } from '@/lib/photo-providers/unsplash'
export { searchStockPhoto } from '@/lib/photo-providers/search'
