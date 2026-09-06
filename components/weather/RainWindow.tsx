'use client'

import { useId, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'
import {
  formatChance,
  formatHourShort,
  formatPrecipMm,
  type HourPoint,
  type TimeWindow,
} from '@/lib/weather'

/**
 * Combine chance + precip into a visible bar height.
 * Chance drives readability; precip boosts intensity when amounts are meaningful.
 */
function hourIntensity(h: HourPoint, maxPrecip: number): number {
  const chance = Math.max(0, Math.min(100, h.chanceOfRain))
  const precipShare =
    maxPrecip > 0 ? Math.min(100, (h.precipMm / maxPrecip) * 100) : 0
  // Weighted mix, then ensure wet-ish hours still clear a visible floor.
  const mixed = chance * 0.7 + precipShare * 0.3
  if (chance < 10 && h.precipMm < 0.1) return Math.max(mixed * 0.35, 3)
  if (chance >= 20 || h.precipMm >= 0.2) return Math.max(mixed, 22)
  return Math.max(mixed, 8)
}

export function RainWindow({
  hours,
  rainWindow,
  className,
}: {
  hours: HourPoint[]
  rainWindow: TimeWindow | null
  className?: string
}) {
  const labelId = useId()
  const [active, setActive] = useState<number | null>(
    rainWindow?.peakHour ?? null
  )

  const maxPrecip = useMemo(
    () => Math.max(...hours.map((h) => h.precipMm), 0.5),
    [hours]
  )
  const selected = hours.find((h) => h.hour === active) ?? null

  return (
    <section
      className={cn('py-10 md:py-14', className)}
      aria-labelledby={labelId}
    >
      <h2
        id={labelId}
        className="font-display text-2xl font-bold tracking-tight md:text-3xl"
      >
        When?
      </h2>
      <p className="mt-2 max-w-[50ch] text-[var(--wirt-muted)]">
        Tomorrow as a timeline. Taller bars mean higher rain chance and more
        expected rain.
      </p>

      <div className="mt-8">
        <div
          className="relative flex h-36 items-end gap-0.5 rounded-xl border border-[color-mix(in_oklab,var(--wirt-fg)_10%,transparent)] bg-[color-mix(in_oklab,var(--wirt-fg)_4%,transparent)] px-1.5 pt-8 pb-1.5 md:h-44 md:gap-1 md:px-2"
          role="list"
          aria-label="Hourly rain intensity"
        >
          {/* Baseline guide */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-2 bottom-1.5 top-8 rounded-md border border-dashed border-[color-mix(in_oklab,var(--wirt-fg)_8%,transparent)]"
          />

          {hours.map((h) => {
            const height = hourIntensity(h, maxPrecip)
            const isWet = h.chanceOfRain >= 30 || h.precipMm >= 0.2
            const isPeak = rainWindow?.peakHour === h.hour
            const isInWindow = Boolean(
              rainWindow &&
                h.hour >= rainWindow.startHour &&
                h.hour <= rainWindow.endHour
            )
            const isActive = active === h.hour

            return (
              <button
                key={h.hour}
                type="button"
                role="listitem"
                aria-label={`${formatHourShort(h.hour)}: ${formatChance(h.chanceOfRain)} rain, ${formatPrecipMm(h.precipMm)}`}
                aria-pressed={isActive}
                className={cn(
                  'group relative z-10 flex min-w-0 flex-1 flex-col items-center justify-end',
                  'h-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wirt-accent)]'
                )}
                onMouseEnter={() => setActive(h.hour)}
                onFocus={() => setActive(h.hour)}
                onClick={() => setActive(h.hour)}
              >
                {/* Full-height hit/track */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 top-0 rounded-sm bg-transparent transition group-hover:bg-[color-mix(in_oklab,var(--wirt-accent)_8%,transparent)]"
                />

                <span
                  className={cn(
                    'relative w-full max-w-[14px] rounded-t-md rounded-b-sm transition-[height,background-color,box-shadow] duration-300 md:max-w-none',
                    isInWindow || isWet
                      ? 'bg-[var(--wirt-accent)] shadow-[0_0_0_1px_color-mix(in_oklab,var(--wirt-accent)_35%,transparent)]'
                      : 'bg-[color-mix(in_oklab,var(--wirt-fg)_22%,transparent)]',
                    isPeak &&
                      'bg-[color-mix(in_oklab,var(--wirt-accent)_82%,#0b1f4a)] shadow-[0_0_18px_color-mix(in_oklab,var(--wirt-accent)_45%,transparent)]',
                    isActive &&
                      'ring-2 ring-[var(--wirt-accent)] ring-offset-2 ring-offset-[var(--wirt-bg)]'
                  )}
                  style={{
                    height: `${height}%`,
                    minHeight: isWet ? '12px' : '4px',
                  }}
                />

                {isPeak ? (
                  <span className="pointer-events-none absolute -top-6 left-1/2 z-20 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-semibold tracking-wider text-[var(--wirt-accent)] uppercase sm:block">
                    Peak
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex justify-between font-mono text-[10px] text-[var(--wirt-muted)] md:text-xs">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>12 AM</span>
        </div>

        {selected ? (
          <div
            className="mt-5 border-t border-[color-mix(in_oklab,var(--wirt-fg)_12%,transparent)] pt-4 font-mono text-sm"
            aria-live="polite"
          >
            <p className="text-base font-semibold text-[var(--wirt-fg)]">
              {formatHourShort(selected.hour)}
            </p>
            <p className="mt-1 text-[var(--wirt-muted)]">
              {formatChance(selected.chanceOfRain)} rain ·{' '}
              {formatPrecipMm(selected.precipMm)} ·{' '}
              {Math.round(selected.tempC)}°C
            </p>
          </div>
        ) : null}

        <details className="mt-4 text-sm text-[var(--wirt-muted)]">
          <summary className="cursor-pointer text-[var(--wirt-fg)]">
            Hourly rain details
          </summary>
          <ul className="mt-3 space-y-1 font-mono text-xs">
            {hours
              .filter((h) => h.chanceOfRain >= 30 || h.precipMm >= 0.1)
              .map((h) => (
                <li key={h.hour}>
                  {formatHourShort(h.hour)}: {formatChance(h.chanceOfRain)},{' '}
                  {formatPrecipMm(h.precipMm)}
                </li>
              ))}
          </ul>
        </details>
      </div>
    </section>
  )
}
