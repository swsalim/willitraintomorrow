'use client'

import { draw } from '@/utils'
import { motion } from 'framer-motion'

interface iconProps {
  className?: string
}

export default function CloudSunRain(props: iconProps) {
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
      <motion.path variants={draw} custom={2} d="M12 2v2" stroke="#f59e0b" />
      <motion.path
        variants={draw}
        custom={1.75}
        d="m4.93 4.93 1.41 1.41"
        stroke="#f59e0b"
      />
      <motion.path
        variants={draw}
        custom={2.25}
        d="M20 12h2"
        stroke="#f59e0b"
      />
      <motion.path
        variants={draw}
        custom={2.5}
        d="m19.07 4.93-1.41 1.41"
        stroke="#f59e0b"
      />
      <motion.path
        variants={draw}
        custom={1.5}
        d="M15.947 12.65a4 4 0 0 0-5.925-4.128"
        stroke="#d97706"
      />
      <motion.path
        variants={draw}
        custom={0}
        d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"
        stroke="#94a3b8"
      />
      <motion.path variants={draw} custom={1} d="M11 20v2" stroke="#0ea5e9" />
      <motion.path variants={draw} custom={1} d="M7 19v2" stroke="#0ea5e9" />
    </motion.svg>
  )
}
