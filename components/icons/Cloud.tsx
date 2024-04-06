'use client'

import { draw } from '@/utils'
import { motion } from 'framer-motion'

interface iconProps {
  className?: string
}

export default function Cloud(props: iconProps) {
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
        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        stroke="#94a3b8"
      />
    </motion.svg>
  )
}
