import type { RainSeverity } from '@/lib/weather'
import { cn } from '@/lib/utils'

const SCALE: RainSeverity[] = ['DRY', 'DRIZZLE', 'RAIN', 'HEAVY', 'STORM']

export function SeverityScale({
  severity,
  className,
}: {
  severity: RainSeverity
  className?: string
}) {
  const index = SCALE.indexOf(severity)

  return (
    <section
      className={cn('py-8 md:py-10', className)}
      aria-labelledby="severity-heading"
    >
      <h2
        id="severity-heading"
        className="font-display text-2xl font-bold tracking-tight"
      >
        Rain scale
      </h2>
      <p className="mt-2 text-[var(--wirt-muted)]">
        How to read tomorrow&apos;s precipitation.
      </p>

      <div
        className="mt-8"
        role="img"
        aria-label={`Rain severity: ${severity}`}
      >
        <div className="relative flex items-start justify-between gap-1">
          <div className="absolute top-[5px] right-3 left-3 h-px bg-[color-mix(in_oklab,var(--wirt-fg)_18%,transparent)]" />
          {SCALE.map((level, i) => (
            <div
              key={level}
              className="relative z-10 flex min-w-0 flex-1 flex-col items-center gap-3"
            >
              <span
                className={cn(
                  'size-2.5 rounded-full border-2 bg-[var(--wirt-bg)]',
                  i === index
                    ? 'border-[var(--wirt-accent)] bg-[var(--wirt-accent)]'
                    : 'border-[color-mix(in_oklab,var(--wirt-fg)_30%,transparent)]'
                )}
              />
              <span
                className={cn(
                  'font-mono text-[10px] tracking-[0.12em] uppercase md:text-[11px]',
                  i === index
                    ? 'font-semibold text-[var(--wirt-fg)]'
                    : 'text-[var(--wirt-muted)]'
                )}
              >
                {level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
