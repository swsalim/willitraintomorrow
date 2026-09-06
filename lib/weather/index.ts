export { resolveAtmosphere } from '@/lib/weather/atmosphere'
export {
  classifyUmbrellaAdvice,
  umbrellaDetail,
  umbrellaLabel,
  verdictDisplayLabel,
  verdictHeadline,
  verdictSubcopy,
} from '@/lib/weather/copy'
export { buildDayparts } from '@/lib/weather/dayparts'
export {
  formatChance,
  formatHourRange,
  formatHourShort,
  formatPrecipMm,
  formatTempPair,
} from '@/lib/weather/format'
export { normalizeForecast } from '@/lib/weather/normalize'
export {
  findBestDryWindow,
  findPrimaryRainWindow,
} from '@/lib/weather/rain-window'
export { classifySeverity } from '@/lib/weather/severity'
export type {
  Atmosphere,
  DaypartSummary,
  ForecastLocation,
  HourPoint,
  RainSeverity,
  RainVerdict,
  TimeWindow,
  UmbrellaAdvice,
  WeatherForecast,
} from '@/lib/weather/types'
export { classifyVerdict } from '@/lib/weather/verdict'
export {
  ForecastFetchError,
  getTomorrowForecast,
} from '@/lib/weather/providers/weatherapi'
