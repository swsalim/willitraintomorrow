import { cn } from '@/lib/utils'
import ImageKit from '@/components/ImageKit'

export default function HomeLogo({ className }: { className?: string }) {
  return (
    <>
      <span className="sr-only">wateraday.com</span>
      <div className={cn('relative size-7 overflow-hidden', className)}>
        <ImageKit
          src="logo.svg"
          width={20}
          height={27}
          alt="wateraday.com"
          className="object-contain"
        />
      </div>
    </>
  )
}
