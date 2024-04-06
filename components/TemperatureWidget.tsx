import { conditions } from '@/utils'

import { Umbrella, UmbrellaOff } from './icons'

interface TemperatureProps {
  chanceOfRain: number
  icon: string
  avgTempC: string
  minTempC: string
  maxTempC: string
  condition: string
}

export function TemperatureWidget({
  chanceOfRain,
  avgTempC,
  minTempC,
  maxTempC,
  condition,
}: TemperatureProps) {
  // const Icon = iconComponents[condition]
  const weatherCondition = conditions.filter(
    (cond) => cond.day.trim().toLowerCase() === condition.trim().toLowerCase()
  )

  const Icon = weatherCondition[0]?.icon || undefined

  return (
    <>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2">
        <div className="flex flex-row items-center">
          <div className="relative">
            {Icon && <Icon className="mr-2 size-10" />}
          </div>
          <div className="text-6xl font-semibold">{avgTempC}°C</div>
        </div>
        <div className="text-base font-semibold">{condition}</div>
        <div className="inline-block text-gray-700 md:flex">
          Feels like {avgTempC}°C · High {maxTempC}°C · Low {minTempC}°C
          <span className="hidden md:block"> ·</span>
          <span className="flex items-center justify-center gap-1 md:ml-1">
            {chanceOfRain >= 50 && <Umbrella className="size-5" />}
            {chanceOfRain < 50 && <UmbrellaOff className="size-5" />}
            {chanceOfRain}%
          </span>
        </div>
      </div>
    </>
  )
}
