'use client'

import { cn } from '@/lib/utils'
import type { Atmosphere } from '@/lib/weather'
import { WeatherEffects } from '@/components/weather/WeatherEffects'

/**
 * Full-page light atmosphere shell with visible weather effects.
 */
export function AtmosphereShell({
  atmosphere,
  children,
  className,
}: {
  atmosphere: Atmosphere
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-theme="light"
      data-atmosphere={atmosphere}
      className={cn(
        'relative min-h-[100dvh] overflow-hidden bg-[var(--wirt-bg)] text-[var(--wirt-fg)]',
        className
      )}
    >
      <WeatherEffects atmosphere={atmosphere} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
