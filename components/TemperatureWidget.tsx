import { cookies } from 'next/headers'
import { setTempScale } from '@/actions/setTempScale'
import { TemperatureForecast } from '@/types'
import { conditions } from '@/utils'

import { cn } from '@/lib/utils'
import { Cloud, Umbrella, UmbrellaOff } from '@/components/icons'

interface TemperatureProps {
  chanceOfRain: number
  tempC: TemperatureForecast
  tempF: TemperatureForecast
  condition: string
  className?: string
}

export async function TemperatureWidget({
  chanceOfRain,
  tempC,
  tempF,
  condition,
  className,
}: TemperatureProps) {
  const cookieStore = await cookies()
  const tempScale = cookieStore.get('tempScale')?.value || 'C'
  const degreeTempScale = `°${tempScale}`
  const currentTemp = tempScale === 'C' ? tempC : tempF

  const normalize = (s: string) =>
    s
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s-]/g, '')

  const normalizedCondition = normalize(condition)

  const exactMatch = conditions.find(
    (cond) => normalize(cond.day) === normalizedCondition
  )

  // Fallback for minor API formatting differences or “close” conditions.
  const fuzzyMatch =
    exactMatch ||
    conditions.find((cond) => {
      const day = normalize(cond.day)
      return (
        normalizedCondition.includes(day) || day.includes(normalizedCondition)
      )
    })

  const Icon = fuzzyMatch?.icon || Cloud

  return (
    <div
      className={cn(
        'flex w-full max-w-2xl flex-col gap-2 text-white sm:mx-auto sm:gap-3',
        'items-start text-left sm:items-center sm:text-center',
        className
      )}
    >
      <div className="flex w-full flex-row flex-nowrap items-center justify-start gap-3 sm:justify-center sm:gap-4">
        <div className="motion-safe:animate-float-soft relative shrink-0">
          {Icon && (
            <Icon className="size-14 drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:size-18 md:size-24" />
          )}
        </div>
        <div className="flex min-w-0 flex-row flex-wrap items-baseline gap-2">
          <span className="font-display text-6xl font-bold tracking-tight tabular-nums drop-shadow-md sm:text-7xl md:text-8xl lg:text-9xl">
            {currentTemp.avg}
          </span>
          <form
            className="flex shrink-0 items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs font-semibold backdrop-blur-md sm:text-sm"
            action={setTempScale}
          >
            <button
              name="tempScale"
              value="C"
              type="submit"
              className={cn(
                'cursor-pointer rounded-full px-2 py-0.5 transition',
                tempScale === 'C'
                  ? 'bg-white text-violet-950 shadow'
                  : 'text-white/70 hover:text-white'
              )}
            >
              °C
            </button>
            <span className="text-white/30" aria-hidden>
              |
            </span>
            <button
              name="tempScale"
              value="F"
              type="submit"
              className={cn(
                'cursor-pointer rounded-full px-2 py-0.5 transition',
                tempScale === 'F'
                  ? 'bg-white text-violet-950 shadow'
                  : 'text-white/70 hover:text-white'
              )}
            >
              °F
            </button>
          </form>
        </div>
      </div>
      <p className="font-display text-lg font-semibold tracking-tight text-white/95 sm:text-center sm:text-xl md:text-2xl">
        It will be {condition} tomorrow
      </p>
      <div className="flex w-full max-w-md flex-col items-start gap-1 text-sm font-medium text-white/80 sm:mx-auto sm:items-center sm:text-center md:flex-row md:flex-wrap md:justify-center md:gap-x-2 md:text-base">
        <span>
          Feels like {currentTemp.avg}
          {degreeTempScale} · High {currentTemp.max}
          {degreeTempScale} · Low {currentTemp.min}
          {degreeTempScale}
        </span>
        <span className="hidden text-white/40 md:inline">·</span>
        <span className="inline-flex items-center gap-1.5 font-medium sm:justify-center">
          {chanceOfRain >= 50 && <Umbrella className="size-5 text-amber-200" />}
          {chanceOfRain < 50 && (
            <UmbrellaOff className="size-5 text-emerald-200/90" />
          )}
          {chanceOfRain}% rain
        </span>
      </div>
    </div>
  )
}
