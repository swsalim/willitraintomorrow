export type PhotoProviderId = 'pexels' | 'unsplash'

export type StockPhotoHit = {
  url: string
  alt: string
  attribution: { name: string; url: string }
}
