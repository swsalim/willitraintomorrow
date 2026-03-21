import { cookies } from 'next/headers'
import { conditions } from '@/utils'

import { cn } from '@/lib/utils'
import { Cloud } from '@/components/icons'

interface TemperatureProps {
  hour: string
  tempC: string
  tempF: string
  condition: string
  className?: string
}

export async function TemperatureWidgetMini({
  hour,
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
        'mx-auto flex max-w-2xl min-w-[132px] snap-start flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white p-4 shadow-lg shadow-black/20 backdrop-blur-md transition',
        className
      )}
    >
      <div className="flex flex-col items-center">
        <div className="mb-1 text-xs font-bold tracking-wider text-gray-700 uppercase">
          {hour}
        </div>
        {Icon && (
          <Icon className="mb-2 size-10 text-amber-100 drop-shadow-md" />
        )}
        <div className="font-display text-xl font-black text-gray-900 tabular-nums">
          {currentTemp}
          {degreeTempScale}
        </div>
      </div>
      <div className="line-clamp-2 text-center text-sm leading-snug font-semibold text-gray-500">
        {condition}
      </div>
    </div>
  )
}
