import type {
  RainSeverity,
  RainVerdict,
  TimeWindow,
  UmbrellaAdvice,
} from '@/lib/weather/types'
import { formatHourShort } from '@/lib/weather/format'

export function verdictDisplayLabel(verdict: RainVerdict): string {
  switch (verdict) {
    case 'NO':
      return 'NO.'
    case 'MAYBE':
      return 'MAYBE.'
    case 'YES':
      return 'YES.'
    case 'YES_A_LOT':
      return 'YES.'
  }
}

export function verdictHeadline(verdict: RainVerdict): string {
  switch (verdict) {
    case 'NO':
      return 'Looks dry tomorrow.'
    case 'MAYBE':
      return 'You might want the umbrella.'
    case 'YES':
      return "It's going to rain."
    case 'YES_A_LOT':
      return 'Heavy rain is coming.'
  }
}

export function verdictSubcopy(
  verdict: RainVerdict,
  rainWindow: TimeWindow | null
): string {
  if (verdict === 'NO') {
    return 'Leave the umbrella at home.'
  }
  if (verdict === 'MAYBE') {
    if (rainWindow) {
      return `A few showers are possible around ${rainWindow.label}.`
    }
    return 'Scattered showers are possible.'
  }
  if (verdict === 'YES_A_LOT') {
    if (rainWindow) {
      return `Expect a wet stretch ${rainWindow.label}. Definitely bring it.`
    }
    return 'Definitely take the umbrella.'
  }
  if (rainWindow) {
    return `Rain likely ${rainWindow.label}.`
  }
  return "Don't say we didn't warn you."
}

export function classifyUmbrellaAdvice(
  verdict: RainVerdict
): UmbrellaAdvice {
  switch (verdict) {
    case 'NO':
      return 'LEAVE_IT'
    case 'MAYBE':
      return 'PROBABLY'
    case 'YES':
      return 'BRING_IT'
    case 'YES_A_LOT':
      return 'DEFINITELY'
  }
}

export function umbrellaLabel(advice: UmbrellaAdvice): string {
  switch (advice) {
    case 'LEAVE_IT':
      return 'LEAVE IT.'
    case 'PROBABLY':
      return 'PROBABLY.'
    case 'BRING_IT':
      return 'BRING IT.'
    case 'DEFINITELY':
      return 'DEFINITELY.'
  }
}

export function umbrellaDetail(
  advice: UmbrellaAdvice,
  rainWindow: TimeWindow | null,
  peakChance: number,
  peakHour: number | null
): string {
  if (advice === 'LEAVE_IT') {
    return 'Dry throughout tomorrow.'
  }
  const peak =
    peakHour !== null
      ? ` Peak: ${peakChance}% at ${formatHourShort(peakHour)}.`
      : ''
  if (advice === 'PROBABLY') {
    if (rainWindow) {
      return `Scattered showers possible ${rainWindow.label}.${peak}`
    }
    return `Scattered showers possible.${peak}`
  }
  if (advice === 'DEFINITELY') {
    if (rainWindow) {
      return `Heavy or prolonged rain expected ${rainWindow.label}.${peak}`
    }
    return `Heavy or prolonged rain expected.${peak}`
  }
  if (rainWindow) {
    return `Rain is most likely ${rainWindow.label}.${peak}`
  }
  return `Rain expected during part of the day.${peak}`
}

export function severityLabel(severity: RainSeverity): string {
  return severity
}
