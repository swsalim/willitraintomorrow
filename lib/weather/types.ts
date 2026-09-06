export type RainVerdict = 'NO' | 'MAYBE' | 'YES' | 'YES_A_LOT'

export type Atmosphere = 'clear' | 'cloud' | 'rain' | 'storm' | 'snow' | 'fog'

export type DaypartId = 'overnight' | 'morning' | 'afternoon' | 'evening'

export type UmbrellaAdvice = 'LEAVE_IT' | 'PROBABLY' | 'BRING_IT' | 'DEFINITELY'

export type RainSeverity = 'DRY' | 'DRIZZLE' | 'RAIN' | 'HEAVY' | 'STORM'

export interface HourPoint {
  hour: number
  localTime: string
  tempC: number
  tempF: number
  chanceOfRain: number
  precipMm: number
  willRain: boolean
  conditionCode: number
  conditionText: string
}

export interface TimeWindow {
  startHour: number
  endHour: number
  peakHour: number
  peakChance: number
  label: string
}

export interface DaypartSummary {
  id: DaypartId
  label: string
  startHour: number
  endHour: number
  chanceOfRain: number
  precipMm: number
  microVerdict: string
}

export interface ForecastLocation {
  name: string
  displayName: string
  country: string
  countryCode: string
  timezone?: string
  lat?: number
  lon?: number
}

export interface WeatherForecast {
  location: ForecastLocation
  date: string
  dateLabel: string
  atmosphere: Atmosphere
  verdict: RainVerdict
  headline: string
  subcopy: string
  temperature: {
    minC: number
    maxC: number
    avgC: number
    minF: number
    maxF: number
    avgF: number
  }
  precipitation: {
    dailyChance: number
    totalMm: number
    totalIn: number
  }
  wind: {
    maxKph: number
    maxMph: number
  }
  humidity: number
  severity: RainSeverity
  umbrella: {
    advice: UmbrellaAdvice
    label: string
    detail: string
    windowLabel?: string
  }
  rainWindow: TimeWindow | null
  bestDryWindow: TimeWindow | null
  dayparts: DaypartSummary[]
  hours: HourPoint[]
  seo: {
    summary: string
    whenSummary: string
    faqs: { q: string; a: string }[]
  }
  provider: {
    name: 'weatherapi'
    fetchedAt: string
  }
}

/** Raw WeatherAPI forecast day shape we care about. */
export interface WeatherApiHour {
  time: string
  temp_c: number
  temp_f: number
  chance_of_rain: number
  precip_mm: number
  will_it_rain: number
  condition: { text: string; code: number }
}

export interface WeatherApiDay {
  date: string
  date_epoch: number
  day: {
    maxtemp_c: number
    maxtemp_f: number
    mintemp_c: number
    mintemp_f: number
    avgtemp_c: number
    avgtemp_f: number
    maxwind_mph: number
    maxwind_kph: number
    totalprecip_mm: number
    totalprecip_in: number
    avghumidity: number
    daily_will_it_rain: number
    daily_chance_of_rain: number
    condition: { text: string; code: number; icon?: string }
  }
  hour: WeatherApiHour[]
}
