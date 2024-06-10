export async function getForecastData(city: string, country: string) {
  const weatherApiKey = process.env.NEXT_WEATHER_API_KEY
  if (!weatherApiKey) throw new Error('NEXT_WEATHER_API_KEY is not defined!')

  const query = encodeURIComponent(`${city},${country}`)
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${query}&days=2`

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      const errorText = await response.text() // Get the error message from the response
      throw new Error(`Failed to fetch data: ${response.status} - ${errorText}`)
    }

    const weatherData = await response.json()

    // Clean up the received data
    if (weatherData.forecast?.forecastday?.[1]) {
      delete weatherData.forecast.forecastday[1].astro
    }

    const tomorrowWeather = weatherData.forecast?.forecastday[1]

    return { tomorrowWeather }
  } catch (error) {
    console.error('Failed to fetch weather data:', error)
    throw new Error('An error occurred while fetching the weather data.')
  }
}
