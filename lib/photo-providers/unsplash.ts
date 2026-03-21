import type { StockPhotoHit } from '@/lib/photo-providers/types'

type UnsplashSearchResponse = {
  results?: Array<{
    urls?: { regular?: string; full?: string }
    user?: { name?: string; links?: { html?: string } }
    alt_description?: string | null
    description?: string | null
  }>
}

export async function searchUnsplashPhoto(
  query: string
): Promise<StockPhotoHit | null> {
  const accessKey =
    process.env.UNSPLASH_ACCESS_KEY?.trim() ||
    process.env.UNSPLASH_API_KEY?.trim()
  if (!accessKey) return null

  const url = new URL('https://api.unsplash.com/search/photos')
  url.searchParams.set('query', query)
  url.searchParams.set('per_page', '1')
  url.searchParams.set('orientation', 'landscape')
  url.searchParams.set('content_filter', 'high')

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Client-ID ${accessKey}` },
  })

  if (!res.ok) {
    console.error('[unsplash]', res.status, await res.text().catch(() => ''))
    return null
  }

  const data = (await res.json()) as UnsplashSearchResponse
  const hit = data.results?.[0]
  if (!hit) return null

  const src = hit.urls?.regular || hit.urls?.full || null
  if (!src) return null

  const name = hit.user?.name?.trim() || 'Unsplash'
  const profile = hit.user?.links?.html?.trim() || 'https://unsplash.com'
  const alt =
    hit.alt_description?.trim() ||
    hit.description?.trim() ||
    `${query} — photo via Unsplash`

  return {
    url: src,
    alt,
    attribution: { name, url: profile },
  }
}
