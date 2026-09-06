'use client'

import { useState } from 'react'

import { verdictDisplayLabel, type WeatherForecast } from '@/lib/weather'
import { cn } from '@/lib/utils'

export function ShareTomorrow({
  forecast,
  className,
}: {
  forecast: WeatherForecast
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const text = [
    'Will It Rain Tomorrow?',
    forecast.location.displayName,
    verdictDisplayLabel(forecast.verdict),
    `${Math.round(forecast.precipitation.dailyChance)}% · ${forecast.subcopy}`,
    forecast.rainWindow ? `Most likely ${forecast.rainWindow.label}` : null,
    'willitraintomorrow.com',
  ]
    .filter(Boolean)
    .join('\n')

  async function share() {
    const url =
      typeof window !== 'undefined' ? window.location.href : undefined
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Will It Rain Tomorrow?', text, url })
        return
      }
      await navigator.clipboard.writeText(url ? `${text}\n${url}` : text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // user cancelled share
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cn(
        'rounded-lg border border-[color-mix(in_oklab,var(--wirt-fg)_16%,transparent)] px-4 py-2 text-sm font-medium transition',
        'hover:border-[color-mix(in_oklab,var(--wirt-fg)_30%,transparent)] active:scale-[0.98]',
        className
      )}
    >
      {copied ? 'Copied' : 'Share tomorrow'}
    </button>
  )
}
