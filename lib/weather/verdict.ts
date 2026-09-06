import { isHeavyRainCode, isStormCode } from '@/lib/weather/atmosphere'
import type { HourPoint, RainVerdict } from '@/lib/weather/types'

const WET_CHANCE = 40
const WET_PRECIP_MM = 0.2

export function countWetHours(hours: HourPoint[]): number {
  return hours.filter(
    (h) => h.chanceOfRain >= WET_CHANCE || h.precipMm >= WET_PRECIP_MM
  ).length
}

export function peakChance(hours: HourPoint[]): number {
  return hours.reduce((m, h) => Math.max(m, h.chanceOfRain), 0)
}

export function maxHourPrecip(hours: HourPoint[]): number {
  return hours.reduce((m, h) => Math.max(m, h.precipMm), 0)
}

export function longestWetStreak(hours: HourPoint[]): number {
  let best = 0
  let run = 0
  for (const h of hours) {
    const wet = h.chanceOfRain >= WET_CHANCE || h.precipMm >= WET_PRECIP_MM
    if (wet) {
      run += 1
      best = Math.max(best, run)
    } else {
      run = 0
    }
  }
  return best
}

/**
 * Deterministic rain verdict.
 *
 * NO         Low chance, negligible precip, few wet hours
 * MAYBE      Some uncertainty / light isolated risk
 * YES        Meaningful rain expected
 * YES_A_LOT  Heavy, prolonged, or stormy rain
 *
 * Thresholds combine daily aggregates with hourly evidence so a single
 * WeatherAPI condition string cannot alone drive the answer.
 */
export function classifyVerdict(
  dailyChance: number,
  totalPrecipMm: number,
  hours: HourPoint[]
): RainVerdict {
  const wetHours = countWetHours(hours)
  const peak = peakChance(hours)
  const maxPrecip = maxHourPrecip(hours)
  const streak = longestWetStreak(hours)
  const storm = hours.some((h) => isStormCode(h.conditionCode))
  const heavyCode = hours.some((h) => isHeavyRainCode(h.conditionCode))

  const isNo =
    dailyChance < 20 && totalPrecipMm < 0.2 && wetHours < 2 && peak < 35

  if (isNo) return 'NO'

  const isHeavy =
    storm ||
    heavyCode ||
    totalPrecipMm >= 15 ||
    maxPrecip >= 4 ||
    (streak >= 6 && peak >= 70)

  const isYes =
    dailyChance >= 45 || totalPrecipMm >= 1 || wetHours >= 3 || peak >= 70

  if (isYes && isHeavy) return 'YES_A_LOT'
  if (isYes) return 'YES'

  // Borderline / isolated showers
  if (
    dailyChance < 45 &&
    (totalPrecipMm < 1 || peak < 60) &&
    wetHours < 3
  ) {
    return 'MAYBE'
  }

  return 'MAYBE'
}
