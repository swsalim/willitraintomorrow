'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

import { CITY_NAV_ITEMS } from '@/lib/city-nav-index'
import { cn } from '@/lib/utils'

export function CitySearch({
  className,
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return []
    return CITY_NAV_ITEMS.filter((c) => c.query.includes(t)).slice(0, 14)
  }, [q])

  useEffect(() => {
    function handlePointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  function goFirst() {
    const first = filtered[0]
    if (first) {
      router.push(first.href)
      setQ('')
      setOpen(false)
      onNavigate?.()
    }
  }

  const showPanel = open && q.trim().length > 0

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40"
          aria-hidden
        />
        <input
          type="search"
          value={q}
          autoComplete="off"
          aria-expanded={showPanel}
          aria-controls="city-search-results"
          aria-autocomplete="list"
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              goFirst()
            }
            if (e.key === 'Escape') setOpen(false)
          }}
          placeholder="Search cities…"
          className="w-full rounded-full border border-white/15 bg-white/10 py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/45 focus:border-violet-400/45 focus:outline-none focus:ring-2 focus:ring-violet-500/25"
        />
      </div>
      {showPanel && (
        <ul
          id="city-search-results"
          role="listbox"
          className="absolute top-full z-60 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-white/15 bg-slate-900/95 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-sm text-white/50">No cities match.</li>
          ) : (
            filtered.map((c) => (
              <li key={c.href} role="option">
                <Link
                  href={c.href}
                  className="block px-4 py-2.5 text-left transition hover:bg-white/10"
                  onClick={() => {
                    setOpen(false)
                    setQ('')
                    onNavigate?.()
                  }}
                >
                  <span className="font-medium text-white">{c.label}</span>
                  <span className="mt-0.5 block text-xs text-white/50">
                    {c.country}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
