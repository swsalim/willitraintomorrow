import type { WeatherDayInfo } from '@/types'
import { CloudRain, Droplets, Eye, Wind } from 'lucide-react'

import { cn } from '@/lib/utils'

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-md transition hover:bg-white/15 sm:rounded-2xl sm:px-4 sm:py-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-white/65 uppercase">
        <Icon className="size-3.5 shrink-0 text-white/80" aria-hidden />
        {label}
      </div>
      <p className="font-display text-lg font-bold text-white tabular-nums">
        {value}
      </p>
    </div>
  )
}

export function WeatherStatsBar({
  day,
  className,
}: {
  day: WeatherDayInfo
  className?: string
}) {
  return (
    <div
      className={cn(
        'mt-5 grid w-full grid-cols-2 gap-2.5 sm:mt-6 sm:grid-cols-4 sm:gap-3 md:grid-cols-2 lg:mt-0 lg:max-w-xl lg:shrink-0 xl:grid-cols-4',
        'border-t border-white/10 pt-5 lg:border-0 lg:pt-0',
        className
      )}
    >
      <Stat icon={Droplets} label="Humidity" value={`${day.avghumidity}%`} />
      <Stat
        icon={CloudRain}
        label="Precipitation"
        value={`${day.totalprecip_mm} mm`}
      />
      <Stat icon={Eye} label="Visibility" value={`${day.avgvis_km} km`} />
      <Stat
        icon={Wind}
        label="Max wind"
        value={`${Math.round(day.maxwind_kph)} km/h`}
      />
    </div>
  )
}
