'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { CITY_NAV_ITEMS } from '@/lib/city-nav-index'
import {
  POPULAR_CITIES,
  readRecents,
  writeSavedLocation,
  type SavedLocation,
} from '@/lib/location-storage'
import { cn } from '@/lib/utils'

function toSaved(item: {
  href: string
  label: string
  country: string
}): SavedLocation {
  const parts = item.href.split('/').filter(Boolean)
  return {
    name: item.label,
    displayName: item.label,
    country: item.country,
    countryCode: parts[0] ?? '',
    href: item.href,
  }
}

export function LocationPalette({
  open,
  onClose,
  className,
  autoGeolocate = false,
}: {
  open: boolean
  onClose: () => void
  className?: string
  autoGeolocate?: boolean
}) {
  const router = useRouter()
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [q, setQ] = useState('')
  const [recents, setRecents] = useState<SavedLocation[]>([])
  const [geoError, setGeoError] = useState<string | null>(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const geoStarted = useRef(false)

  const go = useCallback(
    (location: SavedLocation) => {
      writeSavedLocation(location)
      onClose()
      router.push(location.href)
    },
    [onClose, router]
  )

  const useMyLocation = useCallback(() => {
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
          go(data)
        } catch {
          setGeoError('Could not find a nearby city. Try searching.')
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
  }, [go])

  useEffect(() => {
    if (open) {
      setRecents(readRecents())
      setGeoError(null)
      queueMicrotask(() => inputRef.current?.focus())
      if (autoGeolocate && !geoStarted.current) {
        geoStarted.current = true
        useMyLocation()
      }
    } else {
      setQ('')
      geoStarted.current = false
    }
  }, [open, autoGeolocate, useMyLocation])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return []
    return CITY_NAV_ITEMS.filter((c) => c.query.includes(t)).slice(0, 12)
  }, [q])

  if (!open) return null

  return (
    <div
      className={cn('fixed inset-0 z-80', className)}
      role="dialog"
      aria-modal="true"
      aria-labelledby={inputId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[color-mix(in_oklab,black_55%,transparent)] backdrop-blur-sm"
        aria-label="Close location search"
        onClick={onClose}
      />
      <div className="relative mx-auto mt-[12vh] w-full max-w-lg px-4">
        <div className="overflow-hidden rounded-2xl border border-[color-mix(in_oklab,white_14%,transparent)] bg-[color-mix(in_oklab,#0f1419_92%,transparent)] text-white shadow-2xl">
          <div className="border-b border-white/10 px-4 py-3">
            <label htmlFor={inputId} className="sr-only">
              Where are you?
            </label>
            <input
              ref={inputRef}
              id={inputId}
              type="search"
              value={q}
              autoComplete="off"
              placeholder="Where are you?"
              className="w-full bg-transparent text-lg text-white outline-none placeholder:text-white/40"
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filtered[0]) {
                  e.preventDefault()
                  go(toSaved(filtered[0]))
                }
              }}
            />
          </div>

          <div className="max-h-[50vh] overflow-auto p-2">
            <button
              type="button"
              onClick={useMyLocation}
              disabled={geoLoading}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-white/90 transition hover:bg-white/10 disabled:opacity-60"
            >
              <span className="font-mono text-[10px] tracking-wider text-sky-300 uppercase">
                GPS
              </span>
              {geoLoading ? 'Finding your city…' : 'Use my location'}
            </button>
            {geoError ? (
              <p className="px-3 pb-2 text-xs text-rose-300">{geoError}</p>
            ) : null}

            {q.trim() ? (
              <ul className="mt-1">
                {filtered.length === 0 ? (
                  <li className="px-3 py-3 text-sm text-white/45">
                    No cities match.
                  </li>
                ) : (
                  filtered.map((c) => (
                    <li key={c.href}>
                      <button
                        type="button"
                        className="flex w-full flex-col rounded-xl px-3 py-2.5 text-left transition hover:bg-white/10"
                        onClick={() => go(toSaved(c))}
                      >
                        <span className="font-medium">{c.label}</span>
                        <span className="text-xs text-white/45">{c.country}</span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            ) : (
              <>
                {recents.length > 0 ? (
                  <div className="mt-2">
                    <p className="px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-white/35 uppercase">
                      Recent
                    </p>
                    <ul>
                      {recents.map((r) => (
                        <li key={r.href}>
                          <button
                            type="button"
                            className="flex w-full flex-col rounded-xl px-3 py-2.5 text-left transition hover:bg-white/10"
                            onClick={() => go(r)}
                          >
                            <span className="font-medium">{r.displayName}</span>
                            <span className="text-xs text-white/45">
                              {r.country}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <div className="mt-2">
                  <p className="px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-white/35 uppercase">
                    Popular
                  </p>
                  <ul>
                    {POPULAR_CITIES.map((c) => (
                      <li key={c.href}>
                        <button
                          type="button"
                          className="flex w-full flex-col rounded-xl px-3 py-2.5 text-left transition hover:bg-white/10"
                          onClick={() => go(c)}
                        >
                          <span className="font-medium">{c.displayName}</span>
                          <span className="text-xs text-white/45">{c.country}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2 border-t border-white/10 px-3 py-3">
                  <Link
                    href="/destinations"
                    onClick={onClose}
                    className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline"
                  >
                    Browse all destinations
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
