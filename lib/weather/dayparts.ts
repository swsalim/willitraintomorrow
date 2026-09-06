import type { DaypartId, DaypartSummary, HourPoint } from '@/lib/weather/types'

const DAYPARTS: {
  id: DaypartId
  label: string
  startHour: number
  endHour: number
}[] = [
  { id: 'overnight', label: 'Overnight', startHour: 0, endHour: 5 },
  { id: 'morning', label: 'Morning', startHour: 6, endHour: 11 },
  { id: 'afternoon', label: 'Afternoon', startHour: 12, endHour: 17 },
  { id: 'evening', label: 'Evening', startHour: 18, endHour: 23 },
]

function microVerdict(chance: number, precipMm: number): string {
  if (chance < 20 && precipMm < 0.2) return 'Dry'
  if (chance < 40 || precipMm < 0.5) return 'Mostly dry'
  if (chance < 60 && precipMm < 2) return 'Light showers'
  if (precipMm >= 8 || chance >= 80) return 'Heavy rain'
  return 'Rain'
}

export function buildDayparts(hours: HourPoint[]): DaypartSummary[] {
  return DAYPARTS.map((part) => {
    const slice = hours.filter(
      (h) => h.hour >= part.startHour && h.hour <= part.endHour
    )
    const chanceOfRain =
      slice.length === 0
        ? 0
        : Math.max(...slice.map((h) => h.chanceOfRain))
    const precipMm = slice.reduce((s, h) => s + h.precipMm, 0)

    return {
      id: part.id,
      label: part.label,
      startHour: part.startHour,
      endHour: part.endHour,
      chanceOfRain,
      precipMm: Math.round(precipMm * 10) / 10,
      microVerdict: microVerdict(chanceOfRain, precipMm),
    }
  })
}
