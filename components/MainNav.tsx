'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import { MainNavItem } from 'types'
import { marketingNavLinks } from '@/config/marketing-nav'
import { BrandMark } from '@/components/BrandMark'
import { CitySearch } from '@/components/CitySearch'
import { cn } from '@/lib/utils'

function navItemActive(href: string, pathname: string | null) {
  if (!pathname) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

interface MainNavProps {
  items?: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const navItems: MainNavItem[] = items ?? [...marketingNavLinks]
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const activeIndex = navItems.findIndex(
    (item) => !item.disabled && navItemActive(item.href, pathname)
  )
  const pillIndex =
    hoveredIndex !== null ? hoveredIndex : activeIndex >= 0 ? activeIndex : null

  const desktopLinkClass = (href: string) =>
    cn(
      'font-display relative rounded-lg px-3 py-2 text-sm font-medium transition sm:text-base',
      navItemActive(href, pathname)
        ? 'text-white'
        : 'text-white/70 hover:text-white'
    )

  const mobileLinkClass = (href: string) =>
    cn(
      'font-display rounded-lg px-3 py-2 text-sm font-medium transition sm:text-base',
      navItemActive(href, pathname)
        ? 'bg-white/10 text-white'
        : 'text-white/70 hover:bg-white/5 hover:text-white'
    )

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        <BrandMark compact />

        <nav
          className="hidden items-center md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.disabled ? '#' : item.href}
              className={cn(
                desktopLinkClass(item.href),
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
              onMouseEnter={() => setHoveredIndex(item.disabled ? null : index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {pillIndex === index && !item.disabled ? (
                <motion.span
                  layoutId="hoverBackgroundID"
                  className="pointer-events-none absolute inset-0 rounded-lg bg-white/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              ) : null}
              <span className="relative z-10">{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden min-w-0 flex-1 justify-end md:flex md:pl-4 lg:max-w-md">
          <CitySearch
            className="w-full max-w-sm"
            onNavigate={() => setMobileOpen(false)}
          />
        </div>

        <button
          type="button"
          className="ml-auto flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="main-nav-mobile"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div
          id="main-nav-mobile"
          className="border-t border-white/10 bg-slate-950 px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.disabled ? '#' : item.href}
                className={mobileLinkClass(item.href)}
                onClick={() => setMobileOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            <CitySearch onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}
    </header>
  )
}
