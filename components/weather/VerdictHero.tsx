import { verdictDisplayLabel } from '@/lib/weather'
import type { WeatherForecast } from '@/lib/weather'
import { formatChance, formatPrecipMm } from '@/lib/weather'
import { cn } from '@/lib/utils'

export function VerdictHero({
  forecast,
  unit = 'C',
  className,
}: {
  forecast: WeatherForecast
  unit?: 'C' | 'F'
  className?: string
}) {
  const {
    location,
    dateLabel,
    verdict,
    headline,
    subcopy,
    precipitation,
    rainWindow,
    temperature,
  } = forecast

  const tempLabel =
    unit === 'C'
      ? `${Math.round(temperature.minC)}° / ${Math.round(temperature.maxC)}°C`
      : `${Math.round(temperature.minF)}° / ${Math.round(temperature.maxF)}°F`

  return (
    <section
      className={cn(
        'flex min-h-[min(70dvh,720px)] flex-col justify-end pt-14 pb-8 md:min-h-[min(76dvh,800px)] md:pt-16 md:pb-10',
        className
      )}
      aria-labelledby="page-question"
    >
      <p className="font-mono text-[11px] tracking-[0.18em] text-[var(--wirt-muted)] uppercase">
        {location.displayName}
        <span className="mx-2 opacity-40">/</span>
        Tomorrow · {dateLabel}
      </p>

      <h1
        id="page-question"
        className="font-display mt-4 max-w-[20ch] text-xl leading-snug font-semibold tracking-tight text-[var(--wirt-fg)] md:text-2xl"
      >
        Will It Rain Tomorrow in {location.displayName}?
      </h1>

      <p
        className={cn(
          'font-display mt-4 max-w-[10ch] text-[clamp(4.25rem,17vw,10.5rem)] leading-[0.85] font-bold tracking-[-0.06em] text-[var(--wirt-verdict)]',
          verdict === 'YES_A_LOT' && 'pb-1'
        )}
        aria-live="polite"
      >
        {verdictDisplayLabel(verdict)}
        {verdict === 'YES_A_LOT' ? (
          <span className="mt-2 block font-mono text-[0.14em] tracking-[0.22em] text-[var(--wirt-accent)] uppercase">
            A lot
          </span>
        ) : null}
      </p>

      <p className="font-display mt-5 max-w-[22ch] text-2xl leading-tight font-semibold tracking-tight md:text-3xl">
        {headline}
      </p>
      <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-[var(--wirt-muted)] md:text-lg">
        {subcopy}
      </p>

      {rainWindow ? (
        <p className="mt-6 font-mono text-sm md:text-base">
          <span className="text-[var(--wirt-muted)]">Most likely</span>{' '}
          <span className="font-semibold tracking-tight">{rainWindow.label}</span>
        </p>
      ) : null}

      <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-[var(--wirt-muted)]">
        <div>
          <dt className="sr-only">Rain chance</dt>
          <dd>{formatChance(precipitation.dailyChance)} chance</dd>
        </div>
        <div>
          <dt className="sr-only">Expected rain</dt>
          <dd>{formatPrecipMm(precipitation.totalMm)}</dd>
        </div>
        <div>
          <dt className="sr-only">Temperature range</dt>
          <dd>{tempLabel}</dd>
        </div>
      </dl>
    </section>
  )
}
