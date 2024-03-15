import React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

export function PageHeader({
  tag = 'h1',
  title,
  intro,
  className,
}: {
  tag?: React.ElementType
  title: string
  intro: string
  className: string
}) {
  return (
    <header className={cn('max-w-5xl', className)}>
      <Balancer
        as={tag}
        className="text-foreground font-heading text-4xl tracking-tight [word-spacing:4px] sm:text-5xl"
      >
        {title}
      </Balancer>
      <p className="mt-6 text-2xl font-medium text-stone-500">{intro}</p>
    </header>
  )
}
