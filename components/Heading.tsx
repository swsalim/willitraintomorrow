import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

type HeadingProps = {
  title: string
  subtitle?: string
  className?: string
}

export const Heading = ({
  title,
  subtitle,
  className,
  ...rest
}: HeadingProps) => {
  return (
    <div className={cn('mx-auto mb-6 text-center md:max-w-4xl', className)}>
      <Balancer as="h1" className="font-heading text-4xl" {...rest}>
        {title}
      </Balancer>
      {subtitle}
    </div>
  )
}
