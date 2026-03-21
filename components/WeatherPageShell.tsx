'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'
import type { WeatherVisual } from '@/lib/weather-visuals'

export function WeatherPageShell({
  visual,
  children,
}: {
  visual: WeatherVisual
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-4xl border border-white/15 bg-slate-950/50 ring-1 ring-amber-500/20"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative min-h-[34vh] sm:min-h-[42vh] lg:min-h-[min(64vh,700px)]">
        <Image
          src={visual.imageSrc}
          alt={visual.imageAlt ?? 'Weather backdrop for this city and forecast'}
          fill
          priority
          className="motion-safe:animate-weather-kenburns object-cover object-center"
          sizes="(max-width: 1280px) 100vw, 1200px"
        />
        <div
          className={cn(
            'motion-safe:animate-gradient-shift absolute inset-0 mix-blend-multiply',
            visual.overlayClassName
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute top-0 -left-1/4 h-[120%] w-[70%] rounded-full blur-[100px]',
            visual.orbClassName
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute -right-1/4 bottom-0 h-[90%] w-[60%] rounded-full blur-[90px]',
            visual.orbClassName
          )}
          style={{ animationDelay: '1.2s' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.5)_100%)]" />

        <div className="relative z-10 px-5 pt-2 pb-10 sm:px-8 sm:pb-12 md:px-10 lg:px-12 lg:pb-14">
          {visual.attribution ? (
            <div className="mb-3 flex justify-end sm:mb-4">
              <div className="max-w-xs rounded-lg border border-white/15 bg-black/40 px-2.5 py-1.5 text-[10px] leading-snug text-white/80 backdrop-blur-sm sm:text-xs">
                <a
                  href={visual.attribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/40 underline-offset-2 hover:text-white"
                >
                  Photo: {visual.attribution.name}
                </a>
              </div>
            </div>
          ) : null}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
