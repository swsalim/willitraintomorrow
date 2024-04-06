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
      <motion.path
        variants={draw}
        custom={0}
        d="M22 12a10.06 10.06 1 0 0-20 0Z"
        stroke="#16a34a"
      />
      <motion.path
        variants={draw}
        custom={1}
        d="M12 12v8a2 2 0 0 0 4 0"
        stroke="#16a34a"
      />
      <motion.path variants={draw} custom={0} d="M12 2v1" stroke="#16a34a" />
    </motion.svg>
  )
}
