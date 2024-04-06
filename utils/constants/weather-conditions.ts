import {
  Cloud,
  CloudHail,
  CloudRain,
  CloudSun,
  CloudSunRain,
  Cloudy,
  Sun,
} from '@/components/icons'

interface Condition {
  day: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const conditions: Condition[] = [
  {
    day: 'Sunny',
    icon: Sun,
  },
  {
    day: 'Partly Cloudy',
    icon: CloudSun,
  },
  {
    day: 'Cloudy',
    icon: Cloud,
  },
  {
    day: 'Overcast',
    icon: Cloudy,
  },
  // {
  //   day: 'Mist',
  //   icon: 143,
  // },
  {
    day: 'Patchy rain nearby',
    icon: CloudSunRain,
  },
  // {
  //   day: 'Patchy snow possible',
  //   icon: 179,
  // },
  // {
  //   day: 'Patchy sleet possible',
  //   icon: 182,
  // },
  // {
  //   day: 'Patchy freezing drizzle possible',
  //   icon: 185,
  // },
  // {
  //   day: 'Thundery outbreaks possible',
  //   icon: 200,
  // },
  // {
  //   day: 'Blowing snow',
  //   icon: 227,
  // },
  // {
  //   day: 'Blizzard',
  //   icon: 230,
  // },
  // {
  //   day: 'Fog',
  //   icon: 248,
  // },
  // {
  //   day: 'Freezing fog',
  //   icon: 260,
  // },
  // {
  //   day: 'Patchy light drizzle',
  //   icon: 263,
  // },
  // {
  //   day: 'Light drizzle',
  //   icon: 266,
  // },
  // {
  //   day: 'Freezing drizzle',
  //   icon: 281,
  // },
  // {
  //   day: 'Heavy freezing drizzle',
  //   icon: 284,
  // },
  // {
  //   day: 'Patchy light rain',
  //   icon: 293,
  // },
  // {
  //   day: 'Light rain',
  //   icon: 296,
  // },
  // {
  //   day: 'Moderate rain at times',
  //   icon: 299,
  // },
  {
    day: 'Moderate rain',
    icon: CloudHail,
  },
  // {
  //   day: 'Heavy rain at times',
  //   icon: 305,
  // },
  {
    day: 'Heavy rain',
    icon: CloudRain,
  },
  // {
  //   day: 'Light freezing rain',
  //   icon: 311,
  // },
  // {
  //   day: 'Moderate or heavy freezing rain',
  //   icon: 314,
  // },
  // {
  //   day: 'Light sleet',
  //   icon: 317,
  // },
  // {
  //   day: 'Moderate or heavy sleet',
  //   icon: 320,
  // },
  // {
  //   day: 'Patchy light snow',
  //   icon: 323,
  // },
  // {
  //   day: 'Light snow',
  //   icon: 326,
  // },
  // {
  //   day: 'Patchy moderate snow',
  //   icon: 329,
  // },
  // {
  //   day: 'Moderate snow',
  //   icon: 332,
  // },
  // {
  //   day: 'Patchy heavy snow',
  //   icon: 335,
  // },
  // {
  //   day: 'Heavy snow',
  //   icon: 338,
  // },
  // {
  //   day: 'Ice pellets',
  //   icon: 350,
  // },
  // {
  //   day: 'Light rain shower',
  //   icon: 353,
  // },
  // {
  //   day: 'Moderate or heavy rain shower',
  //   icon: 356,
  // },
  // {
  //   day: 'Torrential rain shower',
  //   icon: 359,
  // },
  // {
  //   day: 'Light sleet showers',
  //   icon: 362,
  // },
  // {
  //   day: 'Moderate or heavy sleet showers',
  //   icon: 365,
  // },
  // {
  //   day: 'Light snow showers',
  //   icon: 368,
  // },
  // {
  //   day: 'Moderate or heavy snow showers',
  //   icon: 371,
  // },
  // {
  //   day: 'Light showers of ice pellets',
  //   icon: 374,
  // },
  // {
  //   day: 'Moderate or heavy showers of ice pellets',
  //   icon: 377,
  // },
  // {
  //   day: 'Patchy light rain with thunder',
  //   icon: 386,
  // },
  // {
  //   day: 'Moderate or heavy rain with thunder',
  //   icon: 389,
  // },
  // {
  //   day: 'Patchy light snow with thunder',
  //   icon: 392,
  // },
  // {
  //   day: 'Moderate or heavy snow with thunder',
  //   icon: 395,
  // },
]
