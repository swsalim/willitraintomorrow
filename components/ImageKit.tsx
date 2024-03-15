'use client'

// if using the App router
import React from 'react'
import Image, { ImageProps } from 'next/image'

import { imageKitLoader } from '@/lib/utils'

interface ImageKitProps extends ImageProps {
  src: string
  alt: string
  directory?: string
}

export default function ImageKit({
  src = 'default-image.jpg',
  alt = 'Default image',
  directory = '',
  width = 400,
  height = 400,
  ...props
}: ImageKitProps) {
  const imageSrc = directory ? `${directory}/${src}` : src
  return (
    <Image
      loader={imageKitLoader}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  )
}
