'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { BrandMark } from '@/components/BrandMark'
import { WeatherEffects } from '@/components/weather/WeatherEffects'
import type { CountryDestinationGroup } from '@/lib/destinations-by-country'
import {
  readSavedLocation,
  writeSavedLocation,
  type SavedLocation,
} from '@/lib/location-storage'
import { cn } from '@/lib/utils'

/**
 * Homepage without a known location: browse cities by country,
 * search inline, or use geolocation. Saved city redirects away.
 */
export function HomeOnboarding({
  groups,
}: {
  groups: CountryDestinationGroup[]
}) {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [q, setQ] = useState('')
  const [geoError, setGeoError] = useState<string | null>(null)
  const [geoLoading, setGeoLoading] = useState(false)

  useEffect(() => {
    const saved = readSavedLocation()
    if (saved?.href) {
      router.replace(saved.href)
      return
    }
    setReady(true)
  }, [router])

  const filteredGroups = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return groups

    return groups
      .map((g) => {
        const countryMatch = g.country.toLowerCase().includes(t)
        const cities = countryMatch
          ? g.cities
          : g.cities.filter((c) => c.label.toLowerCase().includes(t))
        return { ...g, cities }
      })
      .filter((g) => g.cities.length > 0)
  }, [groups, q])

  const totalVisible = filteredGroups.reduce(
    (n, g) => n + g.cities.length,
    0
  )

  function rememberAndGo(href: string, label: string, country: string) {
    const parts = href.split('/').filter(Boolean)
    const saved: SavedLocation = {
      name: label,
      displayName: label,
      country,
      countryCode: parts[0] ?? '',
      href,
    }
    writeSavedLocation(saved)
    router.push(href)
  }

  async function useMyLocation() {
    setGeoError(null)
    if (!navigator.geolocation) {
      setGeoError('Location is not available in this browser.')
      return
    }
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const res = await fetch(
            `/api/geolocate?lat=${latitude}&lon=${longitude}`
          )
          if (!res.ok) throw new Error('Could not resolve location')
          const data = (await res.json()) as SavedLocation
          writeSavedLocation(data)
          router.push(data.href)
        } catch {
          setGeoError('Could not find a nearby city. Try searching below.')
        } finally {
          setGeoLoading(false)
        }
      },
      () => {
        setGeoLoading(false)
        setGeoError(
          'Location permission declined. Search for your city instead.'
        )
      },
      { enableHighAccuracy: false, timeout: 10000 }
    )
  }

  if (!ready) {
    return (
      <div
        data-theme="light"
        data-atmosphere="rain"
        className="flex min-h-[100dvh] items-center justify-center bg-[var(--wirt-bg)] text-[var(--wirt-fg)]"
      >
        <p className="font-mono text-sm tracking-wide text-[var(--wirt-muted)]">
          Checking your city…
        </p>
      </div>
    )
  }

  return (
    <div
      data-theme="light"
      data-atmosphere="rain"
      className="relative min-h-[100dvh] overflow-hidden bg-[var(--wirt-bg)] text-[var(--wirt-fg)]"
    >
      <WeatherEffects atmosphere="rain" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex h-14 items-center sm:h-16">
          <BrandMark />
        </header>

        <main className="flex-1 pb-16">
          <section className="pt-6 pb-10 md:pt-10 md:pb-14">
            <h1 className="font-display max-w-[12ch] text-[clamp(2.75rem,11vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.04em]">
              WILL IT RAIN TOMORROW?
            </h1>
            <p className="mt-5 max-w-[40ch] text-base text-[var(--wirt-muted)] md:text-lg">
              Pick a city to get a clear yes, no, or maybe - and when rain is
              most likely.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Search cities or countries</span>
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search cities or countries…"
                  autoComplete="off"
                  className={cn(
                    'w-full rounded-xl border border-[color-mix(in_oklab,var(--wirt-fg)_16%,transparent)]',
                    'bg-[color-mix(in_oklab,var(--wirt-fg)_6%,transparent)] px-4 py-3 text-base outline-none',
                    'placeholder:text-[var(--wirt-muted)]',
                    'focus:border-[color-mix(in_oklab,var(--wirt-accent)_55%,transparent)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--wirt-accent)_25%,transparent)]'
                  )}
                />
              </label>
              <button
                type="button"
                onClick={useMyLocation}
                disabled={geoLoading}
                className={cn(
                  'shrink-0 rounded-xl border border-[color-mix(in_oklab,var(--wirt-fg)_20%,transparent)] px-5 py-3 text-sm font-semibold',
                  'transition active:scale-[0.98] disabled:opacity-60'
                )}
              >
                {geoLoading ? 'Finding…' : 'Use my location'}
              </button>
            </div>
            {geoError ? (
              <p className="mt-3 text-sm text-rose-300" role="alert">
                {geoError}
              </p>
            ) : null}
          </section>

          <section aria-labelledby="browse-heading">
            <div className="flex flex-wrap items-end justify-between gap-3 border-t border-[color-mix(in_oklab,var(--wirt-fg)_12%,transparent)] pt-8">
              <h2
                id="browse-heading"
                className="font-display text-xl font-bold tracking-tight md:text-2xl"
              >
                {q.trim() ? 'Matching places' : 'Cities by country'}
              </h2>
              <p className="font-mono text-xs text-[var(--wirt-muted)]">
                {totalVisible} {totalVisible === 1 ? 'city' : 'cities'}
              </p>
            </div>

            {!q.trim() ? (
              <nav
                aria-label="Jump to country"
                className="mt-6 flex flex-wrap gap-2"
              >
                {groups.map((g) => (
                  <a
                    key={g.countrySlug}
                    href={`#${g.countrySlug}`}
                    className="rounded-lg border border-[color-mix(in_oklab,var(--wirt-fg)_14%,transparent)] px-3 py-1.5 text-xs font-medium transition hover:border-[color-mix(in_oklab,var(--wirt-fg)_30%,transparent)]"
                  >
                    {g.country}
                  </a>
                ))}
              </nav>
            ) : null}

            {filteredGroups.length === 0 ? (
              <p className="mt-10 text-[var(--wirt-muted)]">
                No cities match &ldquo;{q.trim()}&rdquo;. Try another spelling.
              </p>
            ) : (
              <div className="mt-10 space-y-12">
                {filteredGroups.map((g) => (
                  <section
                    key={g.countrySlug}
                    id={g.countrySlug}
                    aria-labelledby={`country-${g.countrySlug}`}
                  >
                    <h3
                      id={`country-${g.countrySlug}`}
                      className="font-display border-b border-[color-mix(in_oklab,var(--wirt-fg)_12%,transparent)] pb-2 text-lg font-bold"
                    >
                      {g.country}
                    </h3>
                    <ul className="mt-4 columns-1 gap-x-10 sm:columns-2 md:columns-3">
                      {g.cities.map((c) => (
                        <li key={c.href} className="mb-2 break-inside-avoid">
                          <Link
                            href={c.href}
                            onClick={() =>
                              rememberAndGo(c.href, c.label, g.country)
                            }
                            className="text-[var(--wirt-muted)] transition hover:text-[var(--wirt-fg)]"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
