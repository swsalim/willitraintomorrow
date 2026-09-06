'use client'

import { useId } from 'react'
import { useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'
import type { Atmosphere } from '@/lib/weather'

/** Soft illustrated cloud with volume shading (unique gradient ids per instance). */
function FluffyCloud({
  className,
  delay = 0,
  duration = 48,
  variant = 'day',
}: {
  className?: string
  delay?: number
  duration?: number
  variant?: 'day' | 'storm' | 'fog'
}) {
  const uid = useId().replace(/:/g, '')
  const fill = `cloudFill-${uid}`
  const shade = `cloudShade-${uid}`
  const blur = `cloudBlur-${uid}`

  const top =
    variant === 'storm' ? '#c5cedd' : variant === 'fog' ? '#e8ecf1' : '#ffffff'
  const mid =
    variant === 'storm' ? '#9aa8bf' : variant === 'fog' ? '#d5dbe4' : '#eef2f7'
  const bottomColor =
    variant === 'storm' ? '#7d8aa3' : variant === 'fog' ? '#c8d0db' : '#cfd8e6'

  return (
    <svg
      viewBox="0 0 320 160"
      className={cn('absolute drop-shadow-md', className)}
      style={
        duration > 0
          ? {
              animation: `cloud-drift ${duration}s ease-in-out ${delay}s infinite alternate`,
            }
          : undefined
      }
      aria-hidden
    >
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="55%" stopColor={mid} />
          <stop offset="100%" stopColor={bottomColor} />
        </linearGradient>
        <radialGradient id={shade} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id={blur} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
        </filter>
      </defs>
      <g filter={`url(#${blur})`}>
        <ellipse cx="78" cy="98" rx="58" ry="36" fill={`url(#${fill})`} />
        <ellipse cx="140" cy="72" rx="62" ry="48" fill={`url(#${fill})`} />
        <ellipse cx="210" cy="86" rx="70" ry="44" fill={`url(#${fill})`} />
        <ellipse cx="255" cy="104" rx="48" ry="30" fill={`url(#${fill})`} />
        <ellipse cx="160" cy="112" rx="110" ry="34" fill={`url(#${fill})`} />
        <ellipse cx="120" cy="78" rx="40" ry="32" fill={`url(#${shade})`} />
      </g>
    </svg>
  )
}

function SunIllustration({ reduce }: { reduce: boolean | null }) {
  const uid = useId().replace(/:/g, '')
  const core = `sunCore-${uid}`
  const glow = `sunGlow-${uid}`

  return (
    <div className="absolute -top-6 right-[-4%] h-[48vmin] w-[48vmin] max-h-[420px] max-w-[420px] md:top-4 md:right-[4%]">
      {/* Outer atmospheric glow */}
      <div
        className={cn(
          'absolute inset-[-18%] rounded-full bg-[#ffd27a]/45 blur-3xl',
          !reduce && 'motion-safe:animate-[sun-glow_8s_ease-in-out_infinite_alternate]'
        )}
      />
      <svg viewBox="0 0 200 200" className="relative h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={glow} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff6d0" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ffcc4d" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffb020" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={core} cx="38%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#fff9e6" />
            <stop offset="55%" stopColor="#ffd34d" />
            <stop offset="100%" stopColor="#f0a020" />
          </radialGradient>
        </defs>

        {/* Soft halo */}
        <circle cx="100" cy="100" r="78" fill={`url(#${glow})`} />

        {/* Rays */}
        <g
          className={cn(
            'origin-center',
            !reduce && 'motion-safe:animate-[sun-spin_48s_linear_infinite]'
          )}
          style={{ transformOrigin: '100px 100px' }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180
            const x1 = 100 + Math.cos(a) * 52
            const y1 = 100 + Math.sin(a) * 52
            const x2 = 100 + Math.cos(a) * 74
            const y2 = 100 + Math.sin(a) * 74
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f0b429"
                strokeWidth="5"
                strokeLinecap="round"
                opacity={0.55}
              />
            )
          })}
        </g>

        {/* Core */}
        <circle cx="100" cy="100" r="40" fill={`url(#${core})`} />
        <circle cx="88" cy="88" r="14" fill="#fff8e0" opacity="0.55" />
      </svg>
    </div>
  )
}

function RainDrops({ heavy = false }: { heavy?: boolean }) {
  const cols = heavy
    ? [
        2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56,
        59, 62, 65, 68, 71, 74, 77, 80, 83, 86, 89, 92, 95, 98,
      ]
    : [6, 12, 19, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 96]

  const layer2 = heavy
    ? [4, 10, 16, 22, 28, 34, 40, 46, 52, 58, 64, 70, 76, 82, 88, 94]
    : []

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Diagonal rain sheet for density */}
      <div
        className="absolute inset-0 opacity-30 motion-safe:animate-[rain-sheet_0.55s_linear_infinite]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-18deg, transparent 0 11px, color-mix(in oklab, var(--wirt-accent) 34%, #4a7fd4) 11px 12px)',
          backgroundSize: '22px 28px',
          maskImage:
            'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
        }}
      />

      {cols.map((left, i) => (
        <span
          key={`a-${left}`}
          className="absolute top-[-12%] rounded-full bg-[color-mix(in_oklab,var(--wirt-accent)_75%,#1e4f9a)]"
          style={{
            left: `${left}%`,
            width: heavy ? 2.5 : 2,
            height: 22 + ((i * 7) % 28),
            opacity: 0.75,
            transform: 'rotate(14deg)',
            animation: `rain-drop ${0.55 + (i % 5) * 0.08}s linear ${
              (i % 7) * 0.09
            }s infinite`,
          }}
        />
      ))}

      {layer2.map((left, i) => (
        <span
          key={`b-${left}`}
          className="absolute top-[-12%] rounded-full bg-[color-mix(in_oklab,var(--wirt-accent)_55%,#6ea0e0)]"
          style={{
            left: `${left}%`,
            width: 1.5,
            height: 16 + ((i * 5) % 18),
            opacity: 0.55,
            transform: 'rotate(16deg)',
            animation: `rain-drop ${0.7 + (i % 4) * 0.1}s linear ${
              0.2 + (i % 6) * 0.11
            }s infinite`,
          }}
        />
      ))}

      {/* Splash ripples */}
      {(heavy
        ? [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96]
        : [12, 28, 44, 58, 72, 86]
      ).map((left, i) => (
        <span
          key={`s-${left}`}
          className="absolute bottom-[7%] h-2.5 w-6 -translate-x-1/2 rounded-[50%] border-2 border-[color-mix(in_oklab,var(--wirt-accent)_45%,transparent)]"
          style={{
            left: `${left}%`,
            animation: `rain-splash ${0.85 + (i % 3) * 0.12}s ease-out ${
              i * 0.1
            }s infinite`,
          }}
        />
      ))}
    </div>
  )
}

function ThunderFlash() {
  return (
    <>
      <div className="absolute inset-0 bg-[color-mix(in_oklab,#dfe7ff_70%,var(--wirt-accent))] motion-safe:animate-[storm-flash_7.5s_ease-in-out_infinite]" />
      <svg
        viewBox="0 0 80 140"
        className="absolute top-[10%] right-[16%] h-32 w-18 text-[#5b6fd6] opacity-0 drop-shadow-lg motion-safe:animate-[storm-bolt_7.5s_ease-in-out_infinite] md:h-40 md:w-22"
        aria-hidden
      >
        <path
          d="M44 6 L16 74 H38 L26 134 L70 54 H46 Z"
          fill="currentColor"
        />
        <path
          d="M44 6 L16 74 H38 L26 134 L70 54 H46 Z"
          fill="#f4f7ff"
          opacity="0.35"
        />
      </svg>
    </>
  )
}

/**
 * Visible weather theatrics with illustrated sun/clouds and stronger rain.
 * Honors prefers-reduced-motion (static mood only).
 */
export function WeatherEffects({
  atmosphere,
  className,
}: {
  atmosphere: Atmosphere
  className?: string
}) {
  const reduce = useReducedMotion()
  const cloudVariant =
    atmosphere === 'storm' ? 'storm' : atmosphere === 'fog' ? 'fog' : 'day'

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <div className="absolute -top-1/4 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[var(--wirt-glow)] blur-3xl" />

      {atmosphere === 'clear' ? <SunIllustration reduce={reduce} /> : null}

      {(atmosphere === 'cloud' ||
        atmosphere === 'rain' ||
        atmosphere === 'storm' ||
        atmosphere === 'fog') && (
        <>
          <FluffyCloud
            variant={cloudVariant}
            className="top-[4%] left-[-8%] w-[56vw] max-w-[520px] min-w-[220px] opacity-95"
            delay={0}
            duration={reduce ? 0 : 38}
          />
          <FluffyCloud
            variant={cloudVariant}
            className="top-[10%] right-[-10%] w-[48vw] max-w-[440px] min-w-[200px] opacity-80"
            delay={reduce ? 0 : 1.5}
            duration={reduce ? 0 : 52}
          />
          <FluffyCloud
            variant={cloudVariant}
            className="top-[22%] left-[18%] hidden w-[38vw] max-w-[360px] opacity-65 md:block"
            delay={reduce ? 0 : 3}
            duration={reduce ? 0 : 60}
          />
        </>
      )}

      {/* Partly cloudy sun peeking behind clouds */}
      {atmosphere === 'cloud' ? (
        <div className="absolute top-8 right-[12%] h-24 w-24 rounded-full bg-[#ffd27a]/70 blur-xl md:h-32 md:w-32" />
      ) : null}

      {!reduce && (atmosphere === 'rain' || atmosphere === 'storm') ? (
        <RainDrops heavy />
      ) : null}

      {!reduce && atmosphere === 'storm' ? <ThunderFlash /> : null}

      {!reduce && atmosphere === 'snow' ? (
        <div
          className="absolute inset-0 opacity-80 motion-safe:animate-[snow-fall_16s_linear_infinite]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 10%, #fff 0 2.5px, transparent 3px), radial-gradient(circle at 70% 30%, #eef5fb 0 2px, transparent 2.5px), radial-gradient(circle at 40% 60%, #fff 0 2px, transparent 3px), radial-gradient(circle at 85% 70%, #e8f1f8 0 1.5px, transparent 2px)',
            backgroundSize: '140px 180px, 200px 240px, 160px 200px, 120px 160px',
          }}
        />
      ) : null}

      {atmosphere === 'fog' ? (
        <div className="absolute inset-x-0 top-1/3 h-48 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,white_55%,transparent),transparent)] blur-2xl motion-safe:animate-[cloud-drift_36s_ease-in-out_infinite_alternate]" />
      ) : null}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,color-mix(in_oklab,var(--wirt-bg)_35%,transparent)_70%,var(--wirt-bg)_100%)]" />
    </div>
  )
}
