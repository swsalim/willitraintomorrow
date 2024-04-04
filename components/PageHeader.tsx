import React from 'react'
import { cn } from '@/utils'
import Balancer from 'react-wrap-balancer'

export function PageHeader({
  tag = 'h1',
  title,
  intro,
  className,
}: {
  tag?: React.ElementType
  title: string
  intro?: string
  className?: string
}) {
  return (
    <header className={cn('max-w-5xl', className)}>
      <Balancer
        as={tag}
        className="mb-4 text-center font-heading text-4xl font-black capitalize md:text-6xl"
      >
        {title}
      </Balancer>
      {intro && (
        <p className="mt-6 text-2xl font-medium text-gray-500">{intro}</p>
      )}
    </header>
  )
}
