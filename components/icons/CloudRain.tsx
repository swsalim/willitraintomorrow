'use client'

import { draw } from '@/utils'
import { motion } from 'framer-motion'

interface iconProps {
  className?: string
}

export default function CloudRain(props: iconProps) {
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
      <motion.path
        variants={draw}
        custom={0}
        d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
        stroke="#94a3b8"
      />
      <motion.path variants={draw} custom={2} d="M16 14v6" stroke="#0ea5e9" />
      <motion.path variants={draw} custom={1.5} d="M8 14v6" stroke="#0ea5e9" />
      <motion.path variants={draw} custom={1} d="M12 16v6" stroke="#0ea5e9" />
    </motion.svg>
  )
}
