export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type PageItem =
  | {
      slug: string
      title: string
      description: string
      heading: string
      content: string
      category: string[]
      age?: string[]
      tags?: string[]
      limit?: number
      published: boolean
    }
  | undefined

export type PagesConfig = {
  mainNav?: MainNavItem[]
  pages?: PageItem[]
}

export type SiteConfig = {
  title: string
  description: string
  siteName: string
  url: URL
  openGraph: {
    image: string
    imageAlt: string
    width: string
    height: string
  }
  creator: string
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type Product = {
  id: string
  name: string
  brand: string
  brandSlug: string
  category: string[]
  categorySlugs: string[]
  ageGroups: string[]
  ageGroupSlugs: string[]
  tag: string[]
  tagSlugs: string[]
  price: number
  url: string
  isAffiliate?: boolean
  image: string
}

export type Brand = {
  id: string
  name: string
  slug: string
}

export type Category = {
  id: string
  name: string
  slug: string
}

export type AgeGroup = {
  id: string
  name: string
  slug: string
}

export type Tag = {
  id: string
  name: string
  slug: string
}
