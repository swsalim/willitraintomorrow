'use client'

import { useEffect } from 'react'

import { writeSavedLocation } from '@/lib/location-storage'

/** Persist the current city so `/` can open it next visit. */
export function RememberLocation({
  location,
}: {
  location: {
    name: string
    displayName: string
    country: string
    countryCode: string
    href: string
  }
}) {
  useEffect(() => {
    writeSavedLocation(location)
  }, [location])

  return null
}
