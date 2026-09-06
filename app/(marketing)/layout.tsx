interface MarketingLayoutProps {
  children: React.ReactNode
}

/** Passthrough: city/home pages own their chrome and atmosphere. */
export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return children
}
