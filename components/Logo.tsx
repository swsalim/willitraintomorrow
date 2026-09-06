import { BrandMark } from '@/components/BrandMark'

/** @deprecated Prefer BrandMark. Kept for any leftover imports. */
export default function HomeLogo({ className }: { className?: string }) {
  return <BrandMark showWordmark={false} className={className} />
}
