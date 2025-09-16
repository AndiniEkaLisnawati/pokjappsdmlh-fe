"use client"
import { motion } from "framer-motion"

export default function HeroMarquee() {
  const text = " POKJABANGKOM • INNOVATION • COLLABORATION • FUTURE • "

  return (
    <div className="relative overflow-hidden py-6 bg-slate-900 dark:bg-slate-800">
      <div className="flex space-x-10 relative">
        {/* Track teks utama */}
        <motion.div
          className="flex whitespace-nowrap text-5xl font-extrabold bg-clip-text text-transparent 
                     bg-gradient-to-r from-white via-cyan-100 to-white drop-shadow-lg"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          <span>{text.repeat(5)}</span>
        </motion.div>

        {/* Track teks kembar buat seamless */}
        <motion.div
          className="flex whitespace-nowrap text-5xl font-extrabold bg-clip-text text-transparent 
                     bg-gradient-to-r from-white via-cyan-100 to-white drop-shadow-lg"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          <span>{text.repeat(5)}</span>
        </motion.div>
      </div>

      {/* Shimmer effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />
    </div>
  )
}
