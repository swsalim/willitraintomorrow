import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const city = requestUrl.searchParams.get('city')
    const country = requestUrl.searchParams.get('country')
    const query = encodeURIComponent(`${city},${country}`)

    const weatherResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_WEATHER_API_KEY}&q=${query}&days=2`
    )
    const weatherData = await weatherResponse.json()

    delete weatherData.forecast?.forecastday[1].astro
    delete weatherData.forecast?.forecastday[1].hour

    // Return the weather forecast data to the client
    if (weatherData) {
      const data = {
        tomorrowWeather: weatherData.forecast?.forecastday[1],
      }
      return NextResponse.json({ success: true, ...data }, { status: 200 })
    } else {
      return NextResponse.json(
        { success: false, error: 'Weather data not found.' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Failed to fetch weather information:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather data.' },
      { status: 500 }
    )
  }
}
