import type { Metadata } from 'next'
import Water from '@/images/water-glass-solid.svg'

import { siteConfig } from '@/config/site'
import ImageKit from '@/components/ImageKit'
import { PageHeader } from '@/components/PageHeader'
import { TableWaterIntake } from '@/components/TableWaterIntake'
import { WaterIntakeCalculator } from '@/components/WaterIntakeCalculator'

// export const revalidate = 60 // revalidate at most every minute
// export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: siteConfig.title,
}

export default async function Home() {
  return (
    <div className="container grid place-content-center">
      <ImageKit
        src="coming-soon-resized.png"
        width={800}
        height={800}
        alt="Will It Rain Tomorrow Coming Soon"
      />
    </div>
  )
}
