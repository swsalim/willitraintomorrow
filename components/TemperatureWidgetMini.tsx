import { cookies } from 'next/headers'
import { conditions } from '@/utils'

interface TemperatureProps {
  hour: string
  tempC: string
  tempF: string
  condition: string
}

export function TemperatureWidgetMini({
  hour,
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
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 rounded-md bg-white p-4 shadow transition hover:shadow-md">
        <div className="flex flex-col items-center">
          <div className="mb-4 text-base font-semibold">{hour}</div>
          {Icon && <Icon className="mb-2 size-10" />}
          <div className="flex flex-row text-xl font-semibold">
            {currentTemp} {degreeTempScale}
          </div>
        </div>
        <div className="text-sm font-medium text-gray-700">{condition}</div>
      </div>
    </>
  )
}
