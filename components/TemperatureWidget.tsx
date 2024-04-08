import { cookies } from 'next/headers'
import { setTempScale } from '@/actions/setTempScale'
import { TemperatureForecast } from '@/types'
import { cn, conditions } from '@/utils'

import { Umbrella, UmbrellaOff } from '@/components/icons'

interface TemperatureProps {
  chanceOfRain: number
  tempC: TemperatureForecast
  tempF: TemperatureForecast
  condition: string
}

export function TemperatureWidget({
  chanceOfRain,
  tempC,
  tempF,
  condition,
}: TemperatureProps) {
  const tempScale = cookies().get('tempScale')?.value || 'C'
  const degreeTempScale = `°${tempScale}`
  const currentTemp = tempScale === 'C' ? tempC : tempF

  const weatherCondition = conditions.filter(
    (cond) => cond.day.trim().toLowerCase() === condition.trim().toLowerCase()
  )

  const Icon = weatherCondition[0]?.icon || undefined

  return (
    <>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2">
        <div className="flex flex-row items-center">
          <div className="relative">
            {Icon && <Icon className="mr-2 size-20" />}
          </div>
          <div className="flex flex-row text-7xl font-semibold">
            {currentTemp.avg}
            <form className="ml-2 text-xl font-bold" action={setTempScale}>
              <button
                name="tempScale"
                value="C"
                type="submit"
                className={cn(tempScale !== 'C' && 'font-normal text-gray-500')}
              >
                °C
              </button>{' '}
              |{' '}
              <button
                name="tempScale"
                value="F"
                type="submit"
                className={cn(tempScale !== 'F' && 'font-normal text-gray-500')}
              >
                °F
              </button>
            </form>
          </div>
        </div>
        <div className="text-xl font-semibold">{condition}</div>
        <div className="inline-block text-gray-700 md:flex">
          Feels like {currentTemp.avg}
          {degreeTempScale} · High {currentTemp.max}
          {degreeTempScale} · Low {currentTemp.min}
          {degreeTempScale}
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
