'use client'

import { draw } from '@/utils'
import { motion } from 'framer-motion'

interface iconProps {
  className?: string
}

export default function UmbrellaOff(props: iconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      animate="visible"
      {...props}
    >
      <motion.path variants={draw} custom={0} d="M12 2v1" stroke="#16a34a" />
      <motion.path
        variants={draw}
        custom={0}
        d="M15.5 21a1.85 1.85 0 0 1-3.5-1v-8H2a10 10 0 0 1 3.428-6.575"
        stroke="#16a34a"
      />
      <motion.path
        variants={draw}
        custom={0}
        d="M17.5 12H22A10 10 0 0 0 9.004 3.455"
        stroke="#16a34a"
      />
      <motion.path variants={draw} custom={1} d="m2 2 20 20" stroke="#dc2626" />
    </motion.svg>
  )
}
