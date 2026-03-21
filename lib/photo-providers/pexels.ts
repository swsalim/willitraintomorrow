import type { StockPhotoHit } from '@/lib/photo-providers/types'

type PexelsSearchResponse = {
  photos?: Array<{
    src?: { large2x?: string; large?: string; original?: string }
    photographer?: string
    photographer_url?: string
    alt?: string
  }>
}

export async function searchPexelsPhoto(
  query: string
): Promise<StockPhotoHit | null> {
  const apiKey = process.env.PEXELS_API_KEY?.trim()
  if (!apiKey) return null

  const url = new URL('https://api.pexels.com/v1/search')
  url.searchParams.set('query', query)
  url.searchParams.set('per_page', '1')
  url.searchParams.set('orientation', 'landscape')

  const res = await fetch(url.toString(), {
    headers: { Authorization: apiKey },
  })

  if (!res.ok) {
    console.error('[pexels]', res.status, await res.text().catch(() => ''))
    return null
  }

  const data = (await res.json()) as PexelsSearchResponse
  const photo = data.photos?.[0]
  if (!photo) return null

  const src =
    photo.src?.large2x || photo.src?.large || photo.src?.original || null
  if (!src) return null

  const name = photo.photographer?.trim() || 'Pexels'
  const profile = photo.photographer_url?.trim() || 'https://www.pexels.com'

  return {
    url: src,
    alt: photo.alt?.trim() || `${query} — photo via Pexels`,
    attribution: { name, url: profile },
  }
}
