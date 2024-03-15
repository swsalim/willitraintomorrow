import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Use the asChild prop to compose Radix's functionality onto alternative element types or your own React components. */
  asChild?: boolean
}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md duration-200 ease-in-out',
  {
    variants: {
      variant: {
        primary:
          'border border-solid border-transparent bg-blue-600 text-white hover:bg-blue-800 hover:text-white focus:border-blue-800 focus:outline-none active:bg-blue-800',
        secondary:
          'border border-solid border-zinc-300 bg-white text-stone-500 hover:border-zinc-700 hover:text-stone-800 focus:border-zinc-700 active:border-zinc-700 active:bg-zinc-50 active:text-stone-800',
        outline:
          'border border-zinc-300/50 bg-white text-stone-500 hover:border-zinc-300 hover:bg-zinc-100 hover:text-stone-700 focus:border-blue-300 active:bg-zinc-100 active:text-stone-700',
        ghost:
          'bg-transparent text-stone-700 hover:bg-zinc-100 hover:text-stone-700 border-transparent border-solid border-[1px] focus:border-amber-300 active:bg-amber-100 active:text-amber-700',
        danger:
          'border border-solid border-transparent bg-red-600 text-white hover:bg-red-800 hover:text-white focus:border-red-800 focus:outline-none active:bg-red-800',
      },
      size: {
        default: 'px-4 py-2',
        full: 'w-full px-4 py-2',
        medium: 'px-8 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
