export type SavedLocation = {
  name: string
  displayName: string
  country: string
  countryCode: string
  href: string
}

const STORAGE_KEY = 'wirt:saved-location'
const RECENTS_KEY = 'wirt:recent-locations'
const MAX_RECENTS = 6

export function readSavedLocation(): SavedLocation | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SavedLocation
  } catch {
    return null
  }
}

export function writeSavedLocation(location: SavedLocation) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
  pushRecent(location)
}

export function readRecents(): SavedLocation[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as SavedLocation[]
  } catch {
    return []
  }
}

function pushRecent(location: SavedLocation) {
  const existing = readRecents().filter((r) => r.href !== location.href)
  const next = [location, ...existing].slice(0, MAX_RECENTS)
  window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next))
}

export const POPULAR_CITIES: SavedLocation[] = [
  {
    name: 'Singapore',
    displayName: 'Singapore',
    country: 'Singapore',
    countryCode: 'sg',
    href: '/sg/singapore',
  },
  {
    name: 'London',
    displayName: 'London',
    country: 'United Kingdom',
    countryCode: 'gb',
    href: '/gb/london',
  },
  {
    name: 'New York City',
    displayName: 'New York City',
    country: 'United States',
    countryCode: 'us',
    href: '/us/new-york-city',
  },
  {
    name: 'Tokyo',
    displayName: 'Tokyo',
    country: 'Japan',
    countryCode: 'jp',
    href: '/jp/tokyo',
  },
  {
    name: 'Paris',
    displayName: 'Paris',
    country: 'France',
    countryCode: 'fr',
    href: '/fr/paris',
  },
  {
    name: 'Seoul',
    displayName: 'Seoul',
    country: 'South Korea',
    countryCode: 'kr',
    href: '/kr/seoul',
  },
]
