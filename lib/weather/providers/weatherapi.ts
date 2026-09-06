import { normalizeForecast } from '@/lib/weather/normalize'
import type { ForecastLocation, WeatherApiDay, WeatherForecast } from '@/lib/weather/types'

const REVALIDATE_SECONDS = 1800 // 30 minutes

export class ForecastFetchError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ForecastFetchError'
  }
}

/**
 * Fetch tomorrow's forecast from WeatherAPI and normalize it.
 * Uses Next fetch cache with a 30-minute revalidation window.
 */
export async function getTomorrowForecast(
  location: ForecastLocation
): Promise<WeatherForecast> {
  const weatherApiKey = process.env.NEXT_WEATHER_API_KEY
  if (!weatherApiKey) {
    throw new ForecastFetchError('NEXT_WEATHER_API_KEY is not defined')
  }

  const query = encodeURIComponent(
    `${location.name},${location.countryCode || location.country}`
  )
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${query}&days=2`

  const response = await fetch(apiUrl, {
    next: { revalidate: REVALIDATE_SECONDS, tags: [`forecast:${location.countryCode}:${location.name}`] },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new ForecastFetchError(
      `WeatherAPI failed: ${response.status} - ${errorText}`
    )
  }

  const weatherData = await response.json()
  const tomorrow: WeatherApiDay | undefined =
    weatherData.forecast?.forecastday?.[1]

  if (!tomorrow?.day) {
    throw new ForecastFetchError('Tomorrow forecast missing from WeatherAPI response')
  }

  // Prefer provider-resolved place names when available
  const resolved: ForecastLocation = {
    ...location,
    displayName: location.displayName || weatherData.location?.name || location.name,
    timezone: weatherData.location?.tz_id,
    lat: weatherData.location?.lat,
    lon: weatherData.location?.lon,
  }

  return normalizeForecast(tomorrow, resolved)
}
