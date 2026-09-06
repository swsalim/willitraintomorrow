import type {
  DaypartSummary,
  RainVerdict,
  TimeWindow,
  WeatherForecast,
} from '@/lib/weather/types'
import { formatChance, formatHourShort, formatPrecipMm } from '@/lib/weather/format'

export function buildSeoCopy(input: {
  cityLabel: string
  countryLabel: string
  verdict: RainVerdict
  dailyChance: number
  totalMm: number
  rainWindow: TimeWindow | null
  dayparts: DaypartSummary[]
  tempMinC: number
  tempMaxC: number
}): WeatherForecast['seo'] {
  const {
    cityLabel,
    countryLabel,
    verdict,
    dailyChance,
    totalMm,
    rainWindow,
    dayparts,
    tempMinC,
    tempMaxC,
  } = input

  const chance = formatChance(dailyChance)
  const precip = formatPrecipMm(totalMm)

  let summary: string
  switch (verdict) {
    case 'NO':
      summary = `It looks dry tomorrow in ${cityLabel}, ${countryLabel}. Rain chance is about ${chance} with ${precip} expected. Temperatures ${Math.round(tempMinC)}-${Math.round(tempMaxC)}°C.`
      break
    case 'MAYBE':
      summary = `Rain is possible tomorrow in ${cityLabel}, ${countryLabel}. Chance around ${chance} with ${precip} possible. Temperatures ${Math.round(tempMinC)}-${Math.round(tempMaxC)}°C.`
      break
    case 'YES_A_LOT':
      summary = `Heavy rain is expected tomorrow in ${cityLabel}, ${countryLabel}. Chance about ${chance} with ${precip} forecast. Temperatures ${Math.round(tempMinC)}-${Math.round(tempMaxC)}°C.`
      break
    default:
      summary = `Yes, it is expected to rain tomorrow in ${cityLabel}, ${countryLabel}. Chance about ${chance} with ${precip} forecast. Temperatures ${Math.round(tempMinC)}-${Math.round(tempMaxC)}°C.`
  }

  const whenSummary = rainWindow
    ? `Rain is most likely ${rainWindow.label}, peaking around ${formatHourShort(rainWindow.peakHour)} (${rainWindow.peakChance}% chance).`
    : verdict === 'NO'
      ? 'No meaningful rain window stands out tomorrow.'
      : 'Rain timing is scattered rather than concentrated in one clear window.'

  const morning = dayparts.find((d) => d.id === 'morning')
  const afternoon = dayparts.find((d) => d.id === 'afternoon')
  const evening = dayparts.find((d) => d.id === 'evening')

  const faqs = [
    {
      q: `Will it rain tomorrow morning in ${cityLabel}?`,
      a: morning
        ? `${morning.microVerdict}. Morning rain chance peaks around ${formatChance(morning.chanceOfRain)}.`
        : 'Morning forecast is unavailable.',
    },
    {
      q: `Will it rain tomorrow afternoon in ${cityLabel}?`,
      a: afternoon
        ? `${afternoon.microVerdict}. Afternoon rain chance peaks around ${formatChance(afternoon.chanceOfRain)}.`
        : 'Afternoon forecast is unavailable.',
    },
    {
      q: `Will it rain tomorrow evening in ${cityLabel}?`,
      a: evening
        ? `${evening.microVerdict}. Evening rain chance peaks around ${formatChance(evening.chanceOfRain)}.`
        : 'Evening forecast is unavailable.',
    },
    {
      q: `What is the chance of rain tomorrow in ${cityLabel}?`,
      a: `About ${chance}, with ${precip} of precipitation expected.`,
    },
  ]

  return { summary, whenSummary, faqs }
}
