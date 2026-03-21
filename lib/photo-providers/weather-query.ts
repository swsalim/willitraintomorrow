import type { WeatherConditionBucket } from '@/lib/weather-visuals'

const BUCKET_PHRASE: Record<WeatherConditionBucket, string> = {
  clear: 'sunny clear sky cityscape',
  cloud: 'cloudy overcast city skyline',
  rain: 'rain rainy city street',
  storm: 'thunderstorm lightning storm city',
  snow: 'snow winter snowy city',
  fog: 'fog foggy misty city',
}

/** Search phrase: location + weather mood (kept short for API limits). */
export function buildWeatherHeroSearchQuery(
  cityLabel: string,
  countryLabel: string,
  bucket: WeatherConditionBucket
): string {
  const phrase = BUCKET_PHRASE[bucket]
  const raw = `${cityLabel} ${countryLabel} ${phrase}`
  return raw.replace(/\s+/g, ' ').trim().slice(0, 140)
}
