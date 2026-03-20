import { cookies } from 'next/headers'
import { conditions } from '@/utils'
import { Cloud } from '@/components/icons'

interface TemperatureProps {
  hour: string
  tempC: string
  tempF: string
  condition: string
}

export async function TemperatureWidgetMini({
  hour,
  tempC,
  tempF,
  condition,
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
