'use client'

import { useState } from 'react'
import { setTempScale } from '@/actions/setTempScale'

import { BrandMark } from '@/components/BrandMark'
import { LocationPalette } from '@/components/location/LocationPalette'
import { cn } from '@/lib/utils'

export function SiteNav({
  locationLabel,
  tempScale = 'C',
  className,
}: {
  locationLabel?: string
  tempScale?: string
  className?: string
}) {
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b border-[color-mix(in_oklab,var(--wirt-fg)_10%,transparent)]',
          'bg-[color-mix(in_oklab,var(--wirt-bg)_82%,transparent)] backdrop-blur-xl',
          className
        )}
      >
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
          <BrandMark compact className="min-w-0" />

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className={cn(
                'max-w-[40vw] truncate rounded-lg border border-[color-mix(in_oklab,var(--wirt-fg)_14%,transparent)]',
                'px-3 py-1.5 text-left text-sm transition hover:border-[color-mix(in_oklab,var(--wirt-fg)_28%,transparent)]',
                'active:scale-[0.98]'
              )}
              aria-haspopup="dialog"
              aria-expanded={paletteOpen}
            >
              <span className="text-[var(--wirt-muted)]">
                {locationLabel ? 'Change' : 'Find'}
              </span>{' '}
              <span className="font-medium">
                {locationLabel ?? 'location'}
              </span>
              <span aria-hidden className="ml-1 opacity-50">
                ↓
              </span>
            </button>

            <form
              action={setTempScale}
              className="flex items-center rounded-lg border border-[color-mix(in_oklab,var(--wirt-fg)_14%,transparent)] p-0.5 text-xs font-semibold"
            >
              <button
                name="tempScale"
                value="C"
                type="submit"
                className={cn(
                  'rounded-md px-2 py-1 transition',
                  tempScale === 'C'
                    ? 'bg-[var(--wirt-fg)] text-[var(--wirt-bg)]'
                    : 'text-[var(--wirt-muted)] hover:text-[var(--wirt-fg)]'
                )}
                aria-pressed={tempScale === 'C'}
                aria-label="Celsius"
              >
                °C
              </button>
              <button
                name="tempScale"
                value="F"
                type="submit"
                className={cn(
                  'rounded-md px-2 py-1 transition',
                  tempScale === 'F'
                    ? 'bg-[var(--wirt-fg)] text-[var(--wirt-bg)]'
                    : 'text-[var(--wirt-muted)] hover:text-[var(--wirt-fg)]'
                )}
                aria-pressed={tempScale === 'F'}
                aria-label="Fahrenheit"
              >
                °F
              </button>
            </form>
          </div>
        </div>
      </header>

      <LocationPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  )
}
