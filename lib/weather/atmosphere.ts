import type { Atmosphere } from '@/lib/weather/types'

const STORM_CODES = new Set([
  200, 386, 389, 392, 395,
])

const SNOW_CODES = new Set([
  179, 182, 185, 227, 230, 323, 326, 329, 332, 335, 338, 350, 368, 371,
  374, 377, 392, 395,
])

const RAIN_CODES = new Set([
  176, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 353, 356,
  359, 362, 365,
])

const FOG_CODES = new Set([143, 248, 260])

const CLOUD_CODES = new Set([116, 119, 122])

/**
 * Map WeatherAPI condition codes / text into a page atmosphere.
 * Prefer codes when present; fall back to text matching.
 */
export function resolveAtmosphere(
  conditionText: string,
  conditionCode?: number,
  hours?: { conditionCode: number; chanceOfRain: number; precipMm: number }[]
): Atmosphere {
  if (conditionCode !== undefined) {
    if (STORM_CODES.has(conditionCode)) return 'storm'
    if (SNOW_CODES.has(conditionCode)) return 'snow'
    if (FOG_CODES.has(conditionCode)) return 'fog'
    if (RAIN_CODES.has(conditionCode)) return 'rain'
    if (CLOUD_CODES.has(conditionCode)) return 'cloud'
    if (conditionCode === 1000) return 'clear'
  }

  const c = conditionText.trim().toLowerCase()
  if (
    c.includes('thunder') ||
    c.includes('storm') ||
    c.includes('lightning')
  ) {
    return 'storm'
  }
  if (
    c.includes('snow') ||
    c.includes('blizzard') ||
    c.includes('sleet') ||
    c.includes('ice')
  ) {
    return 'snow'
  }
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) {
    return 'fog'
  }
  if (
    c.includes('rain') ||
    c.includes('drizzle') ||
    c.includes('shower') ||
    c.includes('pellets')
  ) {
    return 'rain'
  }
  if (c.includes('cloud') || c.includes('overcast')) {
    return 'cloud'
  }

  // If day text is clear but hours show meaningful rain, bias toward rain.
  if (hours?.some((h) => h.chanceOfRain >= 50 || h.precipMm >= 0.5)) {
    return 'rain'
  }

  return 'clear'
}

export function isStormCode(code: number): boolean {
  return STORM_CODES.has(code)
}

export function isHeavyRainCode(code: number): boolean {
  return [305, 308, 356, 359, 389].includes(code)
}
