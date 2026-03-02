"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [phase, setPhase] = useState<'intro' | 'loading' | 'complete'>('intro')

  useEffect(() => {
    // Intro phase: 1.5s
    const introTimer = setTimeout(() => {
      setPhase('loading')
    }, 1500)

    return () => clearTimeout(introTimer)
  }, [])

  useEffect(() => {
    if (phase !== 'loading') return

    const duration = 2500 // Smooth 2.5 second load
    const interval = 40
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setPhase('complete')
          return 100
        }
        return Math.min(prev + increment, 100)
      })
    }, interval)

    return () => clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase === 'complete') {
      setTimeout(() => {
        setIsComplete(true)
        setTimeout(onComplete, 600)
      }, 800)
    }
  }, [phase, onComplete])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.6, ease: "easeIn" }
    }
  }

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.23, 1, 0.320, 1], // cubic-bezier ease
        delay: 0.2
      }
    }
  }

  const glowVariants = {
    pulse: {
      boxShadow: [
        "0 0 30px rgba(212,175,55,0.15), 0 0 60px rgba(212,175,55,0.08)",
        "0 0 50px rgba(212,175,55,0.25), 0 0 100px rgba(212,175,55,0.12)",
        "0 0 30px rgba(212,175,55,0.15), 0 0 60px rgba(212,175,55,0.08)",
      ],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      }
    }
  }

  const progressVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.6,
        delay: 1.5,
        ease: "easeOut"
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 2.0,
        ease: "easeOut"
      }
    },
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      }
    }
  }

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)"
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Subtle background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-transparent to-orange-400" />
          </div>

          {/* Decorative circles - very subtle */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl"
            style={{ background: "rgba(212, 175, 55, 0.05)" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl"
            style={{ background: "rgba(179, 84, 30, 0.05)" }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Main content */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8 px-4"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-16 rounded-full"
              variants={glowVariants}
              animate="pulse"
              style={{ pointerEvents: "none" }}
            />

            {/* Logo */}
            <motion.div
              className="relative"
              animate={phase === 'intro' ? {} : { y: [0, -4, 0] }}
              transition={
                phase === 'intro'
                  ? {}
                  : {
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }
              }
            >
              <Image
                src="/isolele-logo-transparent.png"
                alt="ISOLELE"
                width={240}
                height={240}
                className="object-contain"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '240px',
                  filter: 'drop-shadow(0 10px 40px rgba(212, 175, 55, 0.15))'
                }}
                priority
              />
            </motion.div>

            {/* Progress bar - appears after intro */}
            {phase !== 'intro' && (
              <motion.div
                className="w-48 sm:w-64 h-1 bg-gray-200 rounded-full overflow-hidden"
                variants={progressVariants}
                initial="hidden"
                animate="visible"
                style={{ originX: 0 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #D4AF37 0%, #B3541E 50%, #D4AF37 100%)",
                    backgroundSize: "200% 100%"
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </motion.div>
            )}

            {/* Loading text */}
            {phase !== 'intro' && (
              <motion.div
                className="flex flex-col items-center gap-2"
                variants={textVariants}
                initial="hidden"
                animate={["visible", "animate"]}
              >
                <motion.p
                  className="text-xs sm:text-sm font-light tracking-widest text-center"
                  style={{ color: "#666666" }}
                >
                  {progress < 100 ? "UNLOCKING THE AFRICAN MYTHOLOGY" : "WELCOME TO ISOLELE"}
                </motion.p>
                {progress < 100 && (
                  <motion.p
                    className="text-xs font-mono"
                    style={{ color: "#D4AF37" }}
                  >
                    {Math.round(progress)}%
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Success message */}
            {phase === 'complete' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center"
              >
                <motion.p
                  className="text-sm tracking-widest font-light"
                  style={{ color: "#333333" }}
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.8 }}
                >
                  WELCOME TO ISOLELE
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
