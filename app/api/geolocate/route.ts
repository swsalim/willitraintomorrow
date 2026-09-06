import { NextRequest, NextResponse } from 'next/server'

import { CITY_NAV_ITEMS } from '@/lib/city-nav-index'
import { slugify } from '@/lib/utils'

/**
 * Resolve browser geolocation to a curated city page.
 * Prefers an exact WeatherAPI place, then nearest curated destination by name match.
 */
export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get('lat')
  const lon = request.nextUrl.searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'lat and lon required' }, { status: 400 })
  }

  const key = process.env.NEXT_WEATHER_API_KEY
  if (!key) {
    return NextResponse.json({ error: 'Weather API unavailable' }, { status: 503 })
  }

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${lon}&days=1`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) {
      return NextResponse.json({ error: 'Lookup failed' }, { status: 502 })
    }
    const data = await res.json()
    const name: string = data.location?.name ?? ''
    const country: string = data.location?.country ?? ''
    const countryCode: string = (data.location?.country_code ?? '').toLowerCase()

    const exact = CITY_NAV_ITEMS.find(
      (c) =>
        c.label.toLowerCase() === name.toLowerCase() ||
        c.query.includes(name.toLowerCase())
    )

    if (exact) {
      return NextResponse.json({
        name: exact.label,
        displayName: exact.label,
        country: exact.country,
        countryCode: exact.href.split('/')[1],
        href: exact.href,
      })
    }

    // Fall back to a dynamic slug if we have a country code; otherwise nearest label match
    const cc = countryCode || 'xx'
    if (cc !== 'xx' && name) {
      const href = `/${slugify(cc)}/${slugify(name)}`
      // Only return curated cities to avoid soft-404s on unknown pages
      const curated = CITY_NAV_ITEMS.find((c) =>
        c.query.includes(name.toLowerCase().slice(0, 6))
      )
      if (curated) {
        return NextResponse.json({
          name: curated.label,
          displayName: curated.label,
          country: curated.country,
          countryCode: curated.href.split('/')[1],
          href: curated.href,
        })
      }
    }

    // Last resort: first popular-ish match by country name
    const byCountry = CITY_NAV_ITEMS.find((c) =>
      c.country.toLowerCase().includes(country.toLowerCase().slice(0, 5))
    )
    if (byCountry) {
      return NextResponse.json({
        name: byCountry.label,
        displayName: byCountry.label,
        country: byCountry.country,
        countryCode: byCountry.href.split('/')[1],
        href: byCountry.href,
      })
    }

    return NextResponse.json(
      { error: 'No matching city in catalog', hint: country, place: name },
      { status: 404 }
    )
  } catch {
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 })
  }
}
