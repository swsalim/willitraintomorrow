// https://vercel.com/templates/next.js/edge-functions-geolocation
import { NextRequest, NextResponse } from 'next/server'
import countries from '@/lib/countries.json'

// run only on homepage
export const config = {
  matcher: '/',
}

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo?.country || 'US'
  const city = geo?.city || 'San Francisco'
  const region = geo?.region || 'CA'

  const countryInfo = countries.find((x) => x.cca2 === country)

  if(!countryInfo) {
    return NextResponse.json({ message: 'Country not found!'}, { status: 404 })
  }

  const currencyCode = Object.keys(countryInfo.currencies)[0]

  // eslint-disable-next-line
  // const currency = countryInfo.currencies[currencyCode]
  const languages = Object.values(countryInfo.languages).join(', ')

  url.searchParams.set('country', country)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)
  url.searchParams.set('currencyCode', currencyCode)
  url.searchParams.set('languages', languages)

  return NextResponse.rewrite(url)
}
