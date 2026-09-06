import type { WeatherForecast } from '@/lib/weather'
import { formatChance, formatPrecipMm } from '@/lib/weather'
import { cn } from '@/lib/utils'

export function MetricsRow({
  forecast,
  unit = 'C',
  className,
}: {
  forecast: WeatherForecast
  unit?: 'C' | 'F'
  className?: string
}) {
  const temp =
    unit === 'C'
      ? `${Math.round(forecast.temperature.minC)}° → ${Math.round(forecast.temperature.maxC)}°C`
      : `${Math.round(forecast.temperature.minF)}° → ${Math.round(forecast.temperature.maxF)}°F`

  const items = [
    { label: 'Temperature', value: temp },
    {
      label: 'Rain chance',
      value: formatChance(forecast.precipitation.dailyChance),
    },
    {
      label: 'Expected rain',
      value: formatPrecipMm(forecast.precipitation.totalMm),
    },
    {
      label: 'Wind',
      value: `${Math.round(forecast.wind.maxKph)} km/h`,
    },
  ]

  return (
    <section
      className={cn('py-10 md:py-14', className)}
      aria-labelledby="metrics-heading"
    >
      <h2 id="metrics-heading" className="sr-only">
        Supporting weather details
      </h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="font-mono text-[11px] tracking-[0.14em] text-[var(--wirt-muted)] uppercase">
              {item.label}
            </dt>
            <dd className="font-display mt-2 text-xl font-semibold tracking-tight tabular-nums md:text-2xl">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
