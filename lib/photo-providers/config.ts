import type { PhotoProviderId } from '@/lib/photo-providers/types'

/**
 * Which stock API to use for hero photos.
 * Set `WEATHER_PHOTO_PROVIDER=pexels` or `unsplash`.
 */
export function getConfiguredPhotoProvider(): PhotoProviderId {
  const v = process.env.WEATHER_PHOTO_PROVIDER?.toLowerCase()?.trim()
  if (v === 'unsplash') return 'unsplash'
  return 'pexels'
}

export function getWeatherPhotoCacheRevalidateSeconds(): number {
  const n = Number(process.env.WEATHER_PHOTO_CACHE_REVALIDATE_SECONDS)
  if (Number.isFinite(n) && n >= 60) return Math.floor(n)
  return 60 * 60 * 24 * 7
}

export function isWeatherPhotoFetchDisabled(): boolean {
  return process.env.WEATHER_PHOTO_DISABLED === '1'
}
