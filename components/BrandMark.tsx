import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export function BrandMark({
  className,
  showWordmark = true,
  compact = false,
}: {
  className?: string
  showWordmark?: boolean
  compact?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn(
        'font-display flex min-w-0 items-center gap-2.5 text-sm font-semibold tracking-tight sm:text-base',
        className
      )}
    >
      <Image
        src="/icons/logo.png"
        alt=""
        width={36}
        height={36}
        priority
        className="size-8 shrink-0 rounded-[22%] sm:size-9"
      />
      {showWordmark ? (
        compact ? (
          <>
            <span className="sr-only">Will It Rain Tomorrow?</span>
            <span aria-hidden className="sm:hidden">
              WIRT?
            </span>
            <span aria-hidden className="hidden sm:inline">
              Will It Rain Tomorrow?
            </span>
          </>
        ) : (
          <span>Will It Rain Tomorrow?</span>
        )
      ) : (
        <span className="sr-only">Will It Rain Tomorrow?</span>
      )}
    </Link>
  )
}
