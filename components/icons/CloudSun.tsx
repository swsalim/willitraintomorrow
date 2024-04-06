'use client'

import { draw } from '@/utils'
import { motion } from 'framer-motion'

interface iconProps {
  className?: string
}

export default function CloudSun(props: iconProps) {
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
      <motion.path variants={draw} custom={0.5} d="M12 2v2" stroke="#f59e0b" />
      <motion.path
        variants={draw}
        custom={0.75}
        d="m4.93 4.93 1.41 1.41"
        stroke="#f59e0b"
      />
      <motion.path variants={draw} custom={1} d="M20 12h2" stroke="#f59e0b" />
      <motion.path
        variants={draw}
        custom={1}
        d="m19.07 4.93-1.41 1.41"
        stroke="#f59e0b"
      />
      <motion.path
        variants={draw}
        custom={1}
        d="M15.947 12.65a4 4 0 0 0-5.925-4.128"
        stroke="#d97706"
      />
      <motion.path
        variants={draw}
        custom={1}
        d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"
        stroke="#94a3b8"
      />
    </motion.svg>
  )
}
