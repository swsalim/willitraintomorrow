import type { DaypartSummary } from '@/lib/weather'
import { formatChance } from '@/lib/weather'
import { cn } from '@/lib/utils'

export function DaypartStrip({
  dayparts,
  className,
}: {
  dayparts: DaypartSummary[]
  className?: string
}) {
  return (
    <section
      className={cn('py-10 md:py-14', className)}
      aria-labelledby="dayparts-heading"
    >
      <h2
        id="dayparts-heading"
        className="font-display text-2xl font-bold tracking-tight md:text-3xl"
      >
        By time of day
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {dayparts.map((part, i) => (
          <div
            key={part.id}
            className={cn(
              'border-[color-mix(in_oklab,var(--wirt-fg)_12%,transparent)] py-5 sm:px-5',
              i > 0 && 'border-t sm:border-t-0 sm:border-l',
              i >= 2 && 'lg:border-t-0'
            )}
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--wirt-muted)] uppercase">
              {part.label}
            </p>
            <p className="font-display mt-2 text-xl font-semibold tracking-tight">
              {part.microVerdict}
            </p>
            <p className="mt-2 font-mono text-sm text-[var(--wirt-muted)]">
              {formatChance(part.chanceOfRain)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
