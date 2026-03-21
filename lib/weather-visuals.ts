/** Bold photography + gradient overlays keyed by forecast wording. */
export type WeatherConditionBucket =
  | 'snow'
  | 'storm'
  | 'rain'
  | 'fog'
  | 'cloud'
  | 'clear'

export type WeatherVisual = {
  imageSrc: string
  /** Hero image description when using stock photos */
  imageAlt?: string
  overlayClassName: string
  orbClassName: string
  attribution?: { name: string; url: string }
}

const CLEAR: WeatherVisual = {
  imageSrc:
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=85',
  overlayClassName:
    'bg-gradient-to-br from-amber-500/55 via-orange-600/40 to-violet-950/85',
  orbClassName: 'bg-amber-400/30',
}

const RAIN: WeatherVisual = {
  imageSrc:
    'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=2000&q=85',
  overlayClassName:
    'bg-gradient-to-br from-slate-900/80 via-blue-900/65 to-indigo-950/90',
  orbClassName: 'bg-sky-400/25',
}

const CLOUD: WeatherVisual = {
  imageSrc:
    'https://images.unsplash.com/photo-1534088568585-a6fff0f4d168?auto=format&fit=crop&w=2000&q=85',
  overlayClassName:
    'bg-gradient-to-br from-slate-700/50 via-violet-900/55 to-slate-950/88',
  orbClassName: 'bg-violet-300/20',
}

const STORM: WeatherVisual = {
  imageSrc:
    'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=2000&q=85',
  overlayClassName:
    'bg-gradient-to-br from-indigo-950/85 via-purple-900/70 to-slate-950/92',
  orbClassName: 'bg-violet-500/35',
}

const SNOW: WeatherVisual = {
  imageSrc:
    'https://images.unsplash.com/photo-1491002052546-bfb38f6630c9?auto=format&fit=crop&w=2000&q=85',
  overlayClassName:
    'bg-gradient-to-br from-sky-200/35 via-slate-800/60 to-indigo-950/88',
  orbClassName: 'bg-cyan-200/25',
}

const FOG: WeatherVisual = {
  imageSrc:
    'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=85',
  overlayClassName:
    'bg-gradient-to-br from-slate-500/45 via-slate-800/65 to-zinc-950/90',
  orbClassName: 'bg-slate-300/15',
}

const BY_BUCKET: Record<WeatherConditionBucket, WeatherVisual> = {
  snow: SNOW,
  storm: STORM,
  rain: RAIN,
  fog: FOG,
  cloud: CLOUD,
  clear: CLEAR,
}

export function getWeatherConditionBucket(condition: string): WeatherConditionBucket {
  const c = condition.trim().toLowerCase()

  if (
    c.includes('snow') ||
    c.includes('blizzard') ||
    c.includes('sleet') ||
    c.includes('ice')
  ) {
    return 'snow'
  }
  if (
    c.includes('thunder') ||
    c.includes('storm') ||
    c.includes('lightning')
  ) {
    return 'storm'
  }
  if (
    c.includes('rain') ||
    c.includes('drizzle') ||
    c.includes('shower') ||
    c.includes('pellets')
  ) {
    return 'rain'
  }
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) {
    return 'fog'
  }
  if (
    c.includes('cloud') ||
    c.includes('overcast') ||
    c.includes('grey') ||
    c.includes('gray')
  ) {
    return 'cloud'
  }
  if (
    c.includes('clear') ||
    c.includes('sunny') ||
    c.includes('sun') ||
    c.includes('bright')
  ) {
    return 'clear'
  }

  return 'clear'
}

export function getWeatherVisual(condition: string): WeatherVisual {
  return BY_BUCKET[getWeatherConditionBucket(condition)]
}
