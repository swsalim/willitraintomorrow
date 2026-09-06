/**
 * Time formatting helpers for rain windows and dayparts.
 * Uses 12-hour clock without minutes (product speaks in hours).
 */

export function formatHourShort(hour: number): string {
  const h = ((hour % 24) + 24) % 24
  if (h === 0) return '12 AM'
  if (h === 12) return '12 PM'
  if (h < 12) return `${h} AM`
  return `${h - 12} PM`
}

export function formatHourRange(startHour: number, endHour: number): string {
  if (startHour === endHour) return formatHourShort(startHour)
  return `${formatHourShort(startHour)} - ${formatHourShort(endHour)}`
}

export function formatPrecipMm(mm: number): string {
  if (mm < 0.1) return '<0.1 mm'
  if (mm < 10) return `${mm.toFixed(1)} mm`
  return `${Math.round(mm)} mm`
}

export function formatChance(chance: number): string {
  return `${Math.round(chance)}%`
}

export function formatTempPair(
  min: number,
  max: number,
  unit: 'C' | 'F'
): string {
  return `${Math.round(min)}° - ${Math.round(max)}°${unit}`
}
