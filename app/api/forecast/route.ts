import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const allowedReferrer = new URL(process.env.NEXT_PUBLIC_BASE_URL!).origin
    const requestReferrer = request.headers.get('referrer')

    if (!requestReferrer || requestReferrer !== allowedReferrer) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized request.' },
        { status: 403 }
      )
    }

    const requestUrl = new URL(request.url)
    const city = requestUrl.searchParams.get('city')
    const country = requestUrl.searchParams.get('country')
    const query = encodeURIComponent(`${city},${country}`)

    const weatherResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_WEATHER_API_KEY}&q=${query}&days=2`
    )

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data.')
    }

    const weatherData = await weatherResponse.json()
    if (weatherData.forecast?.forecastday?.[1]) {
      delete weatherData.forecast.forecastday[1].astro
    }

    // Return the weather forecast data to the client
    const tomorrowWeather = weatherData.forecast?.forecastday[1]

    return NextResponse.json(
      { success: true, tomorrowWeather },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to fetch weather information:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather data.' },
      { status: 500 }
    )
  }
}
