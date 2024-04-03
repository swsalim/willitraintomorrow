export async function getForecastData(city: string, country: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/forecast?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`
  )

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return response.json()
}
