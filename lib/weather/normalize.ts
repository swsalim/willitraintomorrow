import { resolveAtmosphere } from '@/lib/weather/atmosphere'
import {
  classifyUmbrellaAdvice,
  umbrellaDetail,
  umbrellaLabel,
  verdictHeadline,
  verdictSubcopy,
} from '@/lib/weather/copy'
import { buildDayparts } from '@/lib/weather/dayparts'
import { findBestDryWindow, findPrimaryRainWindow } from '@/lib/weather/rain-window'
import { buildSeoCopy } from '@/lib/weather/seo'
import { classifySeverity } from '@/lib/weather/severity'
import type {
  ForecastLocation,
  HourPoint,
  WeatherApiDay,
  WeatherForecast,
} from '@/lib/weather/types'
import { classifyVerdict } from '@/lib/weather/verdict'

function parseHour(time: string): number {
  // "2026-09-07 15:00"
  const part = time.split(' ')[1] ?? '0:00'
  return Number.parseInt(part.split(':')[0] ?? '0', 10)
}

function mapHours(raw: WeatherApiDay['hour'] | undefined): HourPoint[] {
  if (!raw?.length) return []
  return raw.map((h) => ({
    hour: parseHour(h.time),
    localTime: h.time,
    tempC: h.temp_c,
    tempF: h.temp_f,
    chanceOfRain: h.chance_of_rain ?? 0,
    precipMm: h.precip_mm ?? 0,
    willRain: h.will_it_rain === 1,
    conditionCode: h.condition?.code ?? 0,
    conditionText: h.condition?.text ?? '',
  }))
}

function formatDateLabel(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Convert a WeatherAPI forecast day into the app's normalized model.
 * All UI should consume WeatherForecast, never raw provider payloads.
 */
export function normalizeForecast(
  raw: WeatherApiDay,
  location: ForecastLocation,
  fetchedAt = new Date().toISOString()
): WeatherForecast {
  const hours = mapHours(raw.hour)
  const day = raw.day
  const dailyChance = day.daily_chance_of_rain ?? 0
  const totalMm = day.totalprecip_mm ?? 0

  const verdict = classifyVerdict(dailyChance, totalMm, hours)
  const severity = classifySeverity(totalMm, hours)
  const rainWindow = findPrimaryRainWindow(hours)
  const bestDryWindow = findBestDryWindow(hours)
  const dayparts = buildDayparts(hours)
  const atmosphere = resolveAtmosphere(
    day.condition?.text ?? '',
    day.condition?.code,
    hours
  )

  const advice = classifyUmbrellaAdvice(verdict)
  const peakHour = rainWindow?.peakHour ?? null
  const peakChance = rainWindow?.peakChance ?? dailyChance

  return {
    location,
    date: raw.date,
    dateLabel: formatDateLabel(raw.date),
    atmosphere,
    verdict,
    headline: verdictHeadline(verdict),
    subcopy: verdictSubcopy(verdict, rainWindow),
    temperature: {
      minC: day.mintemp_c,
      maxC: day.maxtemp_c,
      avgC: day.avgtemp_c,
      minF: day.mintemp_f,
      maxF: day.maxtemp_f,
      avgF: day.avgtemp_f,
    },
    precipitation: {
      dailyChance,
      totalMm,
      totalIn: day.totalprecip_in ?? 0,
    },
    wind: {
      maxKph: day.maxwind_kph,
      maxMph: day.maxwind_mph,
    },
    humidity: day.avghumidity,
    severity,
    umbrella: {
      advice,
      label: umbrellaLabel(advice),
      detail: umbrellaDetail(advice, rainWindow, peakChance, peakHour),
      windowLabel: rainWindow?.label,
    },
    rainWindow,
    bestDryWindow,
    dayparts,
    hours,
    seo: buildSeoCopy({
      cityLabel: location.displayName,
      countryLabel: location.country,
      verdict,
      dailyChance,
      totalMm,
      rainWindow,
      dayparts,
      tempMinC: day.mintemp_c,
      tempMaxC: day.maxtemp_c,
    }),
    provider: {
      name: 'weatherapi',
      fetchedAt,
    },
  }
}
