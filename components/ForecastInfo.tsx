import Image from 'next/image'

interface forecastProp {
  date: string
  country: string
  city: string
  forecast: any
}

export function ForecastInfo({ date, forecast, city, country }: forecastProp) {
  return (
    <div className="space-y-4">
      <h1 className="mb-8 font-heading text-4xl font-black capitalize md:text-7xl">
        Tomorrow's Weather Forecast
      </h1>
      <div className="text-xl font-medium">
        <span>{city}</span>
        {date && <span className="ml-2"> - {date}</span>}
      </div>
      {forecast && (
        <>
          <div className="text-xl">
            Chance of Rain:{' '}
            <span className="font-semibold">
              {forecast.day.daily_chance_of_rain}%
            </span>
          </div>
          <div className="relative">
            <Image
              src={`https:${forecast.day.condition.icon}`}
              alt={`Tomorrow weather forecast for ${city}, ${country}`}
              width={70}
              height={70}
              unoptimized={false}
            />
            <div className="text-lg font-semibold">
              {forecast.day.condition.text}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
