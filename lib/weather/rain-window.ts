import type { HourPoint, TimeWindow } from '@/lib/weather/types'
import { formatHourRange, formatHourShort } from '@/lib/weather/format'

const RAIN_CHANCE = 40
const RAIN_PRECIP = 0.2

function isRainyHour(h: HourPoint): boolean {
  return h.chanceOfRain >= RAIN_CHANCE || h.precipMm >= RAIN_PRECIP
}

/**
 * Find the longest contiguous rainy stretch.
 * Gaps of a single dry hour inside a wet stretch are merged.
 */
export function findPrimaryRainWindow(hours: HourPoint[]): TimeWindow | null {
  if (hours.length === 0) return null

  type Run = { start: number; end: number; peakHour: number; peakChance: number }
  const runs: Run[] = []
  let current: Run | null = null
  let gap = 0

  for (let i = 0; i < hours.length; i++) {
    const h = hours[i]!
    const rainy = isRainyHour(h)

    if (rainy) {
      if (!current) {
        current = {
          start: h.hour,
          end: h.hour,
          peakHour: h.hour,
          peakChance: h.chanceOfRain,
        }
      } else {
        current.end = h.hour
        if (
          h.chanceOfRain > current.peakChance ||
          (h.chanceOfRain === current.peakChance &&
            h.precipMm >
              (hours.find((x) => x.hour === current!.peakHour)?.precipMm ?? 0))
        ) {
          current.peakHour = h.hour
          current.peakChance = h.chanceOfRain
        }
      }
      gap = 0
    } else if (current) {
      gap += 1
      if (gap > 1) {
        runs.push(current)
        current = null
        gap = 0
      }
      // gap === 1: bridge a single dry hour
    }
  }
  if (current) runs.push(current)

  if (runs.length === 0) return null

  runs.sort((a, b) => {
    const lenA = a.end - a.start
    const lenB = b.end - b.start
    if (lenB !== lenA) return lenB - lenA
    return b.peakChance - a.peakChance
  })

  const best = runs[0]!
  return {
    startHour: best.start,
    endHour: best.end,
    peakHour: best.peakHour,
    peakChance: best.peakChance,
    label: formatHourRange(best.start, best.end),
  }
}

/**
 * Longest useful dry stretch (>= 2h), preferring daytime 7–21.
 */
export function findBestDryWindow(hours: HourPoint[]): TimeWindow | null {
  const DRY_CHANCE = 30
  const DRY_PRECIP = 0.1

  type Run = { start: number; end: number }
  const runs: Run[] = []
  let current: Run | null = null

  for (const h of hours) {
    const dry = h.chanceOfRain < DRY_CHANCE && h.precipMm < DRY_PRECIP
    if (dry) {
      if (!current) current = { start: h.hour, end: h.hour }
      else current.end = h.hour
    } else if (current) {
      runs.push(current)
      current = null
    }
  }
  if (current) runs.push(current)

  const useful = runs.filter((r) => r.end - r.start + 1 >= 2)
  if (useful.length === 0) return null

  const score = (r: Run) => {
    const length = r.end - r.start + 1
    const midpoint = (r.start + r.end) / 2
    const daytimeBonus = midpoint >= 7 && midpoint <= 21 ? 10 : 0
    return length + daytimeBonus
  }

  useful.sort((a, b) => score(b) - score(a))
  const best = useful[0]!

  // Peak = driest hour in the window (lowest chance)
  let peakHour = best.start
  let peakChance = 100
  for (const h of hours) {
    if (h.hour < best.start || h.hour > best.end) continue
    if (h.chanceOfRain < peakChance) {
      peakChance = h.chanceOfRain
      peakHour = h.hour
    }
  }

  return {
    startHour: best.start,
    endHour: best.end,
    peakHour,
    peakChance,
    label: formatHourRange(best.start, best.end),
  }
}

export function describePeak(hours: HourPoint[], window: TimeWindow | null): string {
  if (!window) return ''
  const peak = hours.find((h) => h.hour === window.peakHour)
  if (!peak) return ''
  return `${window.peakChance}% at ${formatHourShort(window.peakHour)}`
}
