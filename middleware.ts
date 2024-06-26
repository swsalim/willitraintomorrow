// https://vercel.com/templates/next.js/edge-functions-geolocation
import { NextRequest, NextResponse } from 'next/server'
import { COUNTRIES } from '@/utils'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo?.country || 'US'
  const city = geo?.city || 'San Francisco'
  const region = geo?.region || 'CA'
  const temperature = req.cookies.get('tempScale')?.value

  const countryInfo = COUNTRIES.find((x) => x.cca2 === country)

  if (!countryInfo) {
    return NextResponse.json({ message: 'Country not found!' }, { status: 404 })
  }

  const currencyCode = Object.keys(countryInfo.currencies)[0]

  // eslint-disable-next-line
  const languages = Object.values(countryInfo.languages).join(', ')

  const targetUrl = url.clone()
  targetUrl.searchParams.set('country', country)
  targetUrl.searchParams.set('city', city)
  targetUrl.searchParams.set('region', region)
  targetUrl.searchParams.set('currencyCode', currencyCode)
  targetUrl.searchParams.set('languages', languages)

  const response = NextResponse.rewrite(targetUrl)

  response.cookies.set('tempScale', temperature || 'C')

  return response
}
