import type { MetadataRoute } from 'next'
import { City } from '@/types'
import { DESTINATIONS } from '@/utils'

import { slugify } from '@/lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

  const staticRoutes: MetadataRoute.Sitemap = ['', '/destinations'].map(
    (path) => ({
      url: `${baseUrl}${path || '/'}`,
      lastModified: new Date(),
    })
  )

  const cities: City[] = Object.values(DESTINATIONS).reduce(
    (acc: City[], current: City[]) => acc.concat(current),
    []
  )

  const cityRoutes: MetadataRoute.Sitemap = cities.map((destination) => ({
    url: `${baseUrl}/${slugify(destination.countryCode)}/${slugify(destination.name)}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...cityRoutes]
}
