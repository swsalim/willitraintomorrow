'use client'

import { draw } from '@/utils'
import { motion } from 'framer-motion'

interface iconProps {
  className?: string
}

export default function Sun(props: iconProps) {
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
      <motion.circle
        variants={draw}
        custom={0}
        cx="12"
        cy="12"
        r="4"
        stroke="#d97706"
      />
      <motion.path variants={draw} custom={1} d="M12 2v2" stroke="#f59e0b" />
      <motion.path variants={draw} custom={1} d="M12 20v2" stroke="#f59e0b" />
      <motion.path
        variants={draw}
        custom={2}
        d="m4.93 4.93 1.41 1.41"
        stroke="#f59e0b"
      />
      <motion.path
        variants={draw}
        custom={2}
        d="m17.66 17.66 1.41 1.41"
        stroke="#f59e0b"
      />
      <motion.path variants={draw} custom={1} d="M2 12h2" stroke="#f59e0b" />
      <motion.path variants={draw} custom={1} d="M20 12h2" stroke="#f59e0b" />
      <motion.path
        variants={draw}
        custom={3}
        d="m6.34 17.66-1.41 1.41"
        stroke="#f59e0b"
      />
      <motion.path
        variants={draw}
        custom={1}
        d="m19.07 4.93-1.41 1.41"
        stroke="#f59e0b"
      />
    </motion.svg>
  )
}
