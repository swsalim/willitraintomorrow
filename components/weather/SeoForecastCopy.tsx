import type { WeatherForecast } from '@/lib/weather'
import { cn } from '@/lib/utils'

/**
 * Server-rendered SEO content. Keeps answers factual and short.
 * The interactive experience above already answered the question visually.
 */
export function SeoForecastCopy({
  forecast,
  className,
}: {
  forecast: WeatherForecast
  className?: string
}) {
  const city = forecast.location.displayName

  return (
    <section
      className={cn(
        'border-t border-[color-mix(in_oklab,var(--wirt-fg)_12%,transparent)] py-12 md:py-16',
        className
      )}
    >
      <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
        Will it rain tomorrow in {city}?
      </h2>
      <p className="mt-4 max-w-[65ch] leading-relaxed text-[var(--wirt-muted)]">
        {forecast.seo.summary}
      </p>

      <h3 className="font-display mt-10 text-xl font-semibold tracking-tight">
        When will it rain tomorrow?
      </h3>
      <p className="mt-3 max-w-[65ch] leading-relaxed text-[var(--wirt-muted)]">
        {forecast.seo.whenSummary}
      </p>

      <h3 className="font-display mt-10 text-xl font-semibold tracking-tight">
        Tomorrow by time of day
      </h3>
      <ul className="mt-4 max-w-[65ch] space-y-2 text-[var(--wirt-muted)]">
        {forecast.dayparts.map((part) => (
          <li key={part.id}>
            <span className="font-medium text-[var(--wirt-fg)]">
              {part.label}:
            </span>{' '}
            {part.microVerdict} ({Math.round(part.chanceOfRain)}% chance)
          </li>
        ))}
      </ul>

      <h3 className="font-display mt-10 text-xl font-semibold tracking-tight">
        Frequently asked questions
      </h3>
      <dl className="mt-4 max-w-[65ch] space-y-6">
        {forecast.seo.faqs.map((faq) => (
          <div key={faq.q}>
            <dt className="font-medium text-[var(--wirt-fg)]">{faq.q}</dt>
            <dd className="mt-1 text-[var(--wirt-muted)]">{faq.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
