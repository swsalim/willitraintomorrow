import { isHeavyRainCode, isStormCode } from '@/lib/weather/atmosphere'
import type { HourPoint, RainSeverity } from '@/lib/weather/types'

/**
 * Human rain scale from total precip + hour extremes + condition codes.
 *
 * DRY      < 0.2 mm and no meaningful wet hours
 * DRIZZLE  < 1 mm
 * RAIN     < 8 mm
 * HEAVY    >= 8 mm or heavy codes / intense hours
 * STORM    thunder/storm codes present
 */
export function classifySeverity(
  totalPrecipMm: number,
  hours: HourPoint[]
): RainSeverity {
  const hasStorm = hours.some((h) => isStormCode(h.conditionCode))
  if (hasStorm) return 'STORM'

  const maxHourPrecip = hours.reduce((m, h) => Math.max(m, h.precipMm), 0)
  const hasHeavyCode = hours.some((h) => isHeavyRainCode(h.conditionCode))

  if (hasHeavyCode || totalPrecipMm >= 8 || maxHourPrecip >= 4) {
    return 'HEAVY'
  }
  if (totalPrecipMm >= 1 || maxHourPrecip >= 0.5) return 'RAIN'
  if (totalPrecipMm >= 0.2 || maxHourPrecip >= 0.1) return 'DRIZZLE'
  return 'DRY'
}
