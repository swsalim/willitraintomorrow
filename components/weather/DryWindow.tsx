import type { TimeWindow } from '@/lib/weather'
import { cn } from '@/lib/utils'

export function DryWindow({
  window,
  className,
}: {
  window: TimeWindow | null
  className?: string
}) {
  return (
    <section
      className={cn('py-10 md:py-14', className)}
      aria-labelledby="dry-window-heading"
    >
      <h2
        id="dry-window-heading"
        className="font-display text-2xl font-bold tracking-tight md:text-3xl"
      >
        Best dry window
      </h2>
      {window ? (
        <p className="font-display mt-4 text-[clamp(2rem,6vw,3.5rem)] leading-none font-bold tracking-[-0.03em]">
          {window.label}
        </p>
      ) : (
        <p className="mt-4 text-lg text-[var(--wirt-muted)]">
          No solid dry window stands out tomorrow.
        </p>
      )}
      <p className="mt-3 max-w-[42ch] text-[var(--wirt-muted)]">
        Longest stretch with low rain risk. Useful for errands, walks, or
        commuting.
      </p>
    </section>
  )
}
