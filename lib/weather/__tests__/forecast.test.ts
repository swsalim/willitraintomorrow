import { describe, expect, it } from 'vitest'

import { normalizeForecast } from '@/lib/weather/normalize'
import { findBestDryWindow, findPrimaryRainWindow } from '@/lib/weather/rain-window'
import { classifySeverity } from '@/lib/weather/severity'
import type { HourPoint, WeatherApiDay } from '@/lib/weather/types'
import { classifyVerdict } from '@/lib/weather/verdict'

function hour(
  h: number,
  chance: number,
  precip = 0,
  code = 1000
): HourPoint {
  return {
    hour: h,
    localTime: `2026-09-07 ${String(h).padStart(2, '0')}:00`,
    tempC: 28,
    tempF: 82,
    chanceOfRain: chance,
    precipMm: precip,
    willRain: chance >= 50,
    conditionCode: code,
    conditionText: chance >= 50 ? 'Rain' : 'Sunny',
  }
}

function hoursFromPattern(
  chances: number[],
  precips?: number[]
): HourPoint[] {
  return chances.map((c, i) => hour(i, c, precips?.[i] ?? 0))
}

describe('classifyVerdict', () => {
  it('returns NO for dry days', () => {
    const hours = hoursFromPattern(Array(24).fill(5))
    expect(classifyVerdict(8, 0, hours)).toBe('NO')
  })

  it('returns MAYBE for light isolated risk', () => {
    const chances = Array(24).fill(10)
    chances[14] = 35
    chances[15] = 40
    expect(classifyVerdict(30, 0.4, hoursFromPattern(chances, Array(24).fill(0.05)))).toBe(
      'MAYBE'
    )
  })

  it('returns YES for meaningful rain', () => {
    const chances = Array(24).fill(10)
    for (let i = 14; i <= 18; i++) chances[i] = 75
    const precips = Array(24).fill(0)
    for (let i = 14; i <= 18; i++) precips[i] = 1.2
    expect(classifyVerdict(72, 4.8, hoursFromPattern(chances, precips))).toBe('YES')
  })

  it('returns YES_A_LOT for heavy prolonged rain', () => {
    const chances = Array(24).fill(20)
    for (let i = 10; i <= 18; i++) chances[i] = 85
    const precips = Array(24).fill(0)
    for (let i = 10; i <= 18; i++) precips[i] = 3
    expect(classifyVerdict(90, 22, hoursFromPattern(chances, precips))).toBe(
      'YES_A_LOT'
    )
  })

  it('returns YES_A_LOT for storm codes', () => {
    const hours = hoursFromPattern(Array(24).fill(60), Array(24).fill(1))
    hours[15] = hour(15, 80, 5, 389)
    expect(classifyVerdict(70, 8, hours)).toBe('YES_A_LOT')
  })
})

describe('findPrimaryRainWindow', () => {
  it('finds the longest wet stretch', () => {
    const chances = Array(24).fill(5)
    for (let i = 14; i <= 18; i++) chances[i] = 80
    const window = findPrimaryRainWindow(hoursFromPattern(chances))
    expect(window).not.toBeNull()
    expect(window!.startHour).toBe(14)
    expect(window!.endHour).toBe(18)
    expect(window!.peakHour).toBe(14)
  })

  it('bridges a single dry hour', () => {
    const chances = Array(24).fill(5)
    chances[12] = 70
    chances[13] = 10
    chances[14] = 75
    chances[15] = 80
    const window = findPrimaryRainWindow(hoursFromPattern(chances))
    expect(window!.startHour).toBe(12)
    expect(window!.endHour).toBe(15)
  })

  it('returns null when dry', () => {
    expect(findPrimaryRainWindow(hoursFromPattern(Array(24).fill(5)))).toBeNull()
  })
})

describe('findBestDryWindow', () => {
  it('prefers a long daytime dry stretch', () => {
    const chances = Array(24).fill(80)
    for (let i = 9; i <= 12; i++) chances[i] = 10
    const window = findBestDryWindow(hoursFromPattern(chances))
    expect(window).not.toBeNull()
    expect(window!.startHour).toBe(9)
    expect(window!.endHour).toBe(12)
  })
})

describe('classifySeverity', () => {
  it('maps totals to the rain scale', () => {
    expect(classifySeverity(0, hoursFromPattern(Array(24).fill(0)))).toBe('DRY')
    expect(classifySeverity(0.5, hoursFromPattern(Array(24).fill(20)))).toBe(
      'DRIZZLE'
    )
    expect(classifySeverity(3, hoursFromPattern(Array(24).fill(50), Array(24).fill(0.2)))).toBe(
      'RAIN'
    )
    expect(classifySeverity(12, hoursFromPattern(Array(24).fill(80), Array(24).fill(1)))).toBe(
      'HEAVY'
    )
  })
})

describe('normalizeForecast', () => {
  it('builds a complete forecast model', () => {
    const chances = Array(24).fill(10)
    for (let i = 14; i <= 17; i++) chances[i] = 78
    const rawHours = chances.map((c, i) => ({
      time: `2026-09-07 ${String(i).padStart(2, '0')}:00`,
      temp_c: 29,
      temp_f: 84,
      chance_of_rain: c,
      precip_mm: c > 50 ? 1.1 : 0,
      will_it_rain: c > 50 ? 1 : 0,
      condition: { text: c > 50 ? 'Light rain' : 'Partly cloudy', code: c > 50 ? 296 : 116 },
    }))

    const raw: WeatherApiDay = {
      date: '2026-09-07',
      date_epoch: 0,
      day: {
        maxtemp_c: 31,
        maxtemp_f: 88,
        mintemp_c: 27,
        mintemp_f: 81,
        avgtemp_c: 29,
        avgtemp_f: 84,
        maxwind_mph: 10,
        maxwind_kph: 16,
        totalprecip_mm: 4.8,
        totalprecip_in: 0.19,
        avghumidity: 80,
        daily_will_it_rain: 1,
        daily_chance_of_rain: 72,
        condition: { text: 'Moderate rain', code: 302 },
      },
      hour: rawHours,
    }

    const forecast = normalizeForecast(raw, {
      name: 'Singapore',
      displayName: 'Singapore',
      country: 'Singapore',
      countryCode: 'sg',
    })

    expect(forecast.verdict).toBe('YES')
    expect(forecast.rainWindow?.label).toContain('PM')
    expect(forecast.dayparts).toHaveLength(4)
    expect(forecast.umbrella.advice).toBe('BRING_IT')
    expect(forecast.seo.faqs.length).toBe(4)
    expect(forecast.atmosphere).toBe('rain')
  })
})
