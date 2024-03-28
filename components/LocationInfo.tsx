interface locationProp {
  country: string
  city: string
  languages: string
}

export function LocationInfo({ country, city, languages }: locationProp) {
  return (
    <div className="space-y-4">
      <h1 className="mb-8 font-heading text-4xl">Your Location Info</h1>
      <p>
        <strong>Country</strong>: {country}
      </p>
      <p>
        <strong>City</strong>: {city}
      </p>
      <p>
        <strong>Language</strong>: {languages}
      </p>
    </div>
  )
}
