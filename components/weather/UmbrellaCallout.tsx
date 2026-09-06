import type { WeatherForecast } from '@/lib/weather'
import { cn } from '@/lib/utils'

export function UmbrellaCallout({
  forecast,
  className,
}: {
  forecast: WeatherForecast
  className?: string
}) {
  const { umbrella } = forecast

  return (
    <section
      className={cn(
        'border-y border-[color-mix(in_oklab,var(--wirt-fg)_12%,transparent)] py-10 md:py-14',
        className
      )}
      aria-labelledby="umbrella-heading"
    >
      <h2
        id="umbrella-heading"
        className="font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-none font-bold tracking-[-0.04em]"
      >
        {umbrella.label}
      </h2>
      <p className="mt-4 max-w-[48ch] text-lg text-[var(--wirt-muted)]">
        {umbrella.detail}
      </p>
    </section>
  )
}
