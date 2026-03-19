"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import Image from "next/image"

// Typing animation component
function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1))
        index++
        if (index >= text.length) clearInterval(interval)
      }, 80)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay])

  return <span>{displayedText}</span>
}

export function HeroSection() {
  const { currentTheme } = useTheme()
  const { t } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)

  const toggleSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? 1 : 0))
  }, [])

  useEffect(() => {
    const interval = setInterval(toggleSlide, 5000)
    return () => clearInterval(interval)
  }, [toggleSlide])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Full background - ZAIIRE ensemble image or fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Isolele%20ZAIIRE-dZ9qgcCZdyxMpgkCfSlSGCAMD2rMVC.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Subtle radial gradient overlay - mostly transparent to show image */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${currentTheme.colors.background}01 0%, ${currentTheme.colors.background}03 50%, ${currentTheme.colors.background}08 100%)`,
        }}
      />

      {/* Animated Kongo patterns overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-64 w-64 border rotate-45"
            style={{
              borderColor: currentTheme.colors.accentPrimary,
              left: `${i * 20 - 10}%`,
              top: `${(i % 3) * 30}%`,
            }}
            animate={{
              rotate: [45, 90, 45],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Lightning effects */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-96"
        style={{ backgroundColor: currentTheme.colors.accentPrimary }}
        animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
        transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
      />
      <motion.div
        className="absolute top-20 right-1/3 w-px h-64"
        style={{ backgroundColor: currentTheme.colors.accentSecondary }}
        animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
        transition={{ duration: 0.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 7, delay: 2 }}
      />

      {/* Slide Content */}
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {/* SLIDE 1: Default hero content */}
          {activeSlide === 0 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20 lg:py-0"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1
                  className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-wider mb-4 min-h-[1.2em]"
                  style={{
                    color: currentTheme.colors.textPrimary,
                    textShadow: `0 0 40px ${currentTheme.colors.accentPrimary}40`,
                  }}
                >
                  <TypingText text="ZAIIRE" delay={300} />
                </h1>
                <p
                  className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-widest mb-2"
                  style={{ color: currentTheme.colors.accentPrimary }}
                >
                  PRINCE DU KONGO
                </p>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-wide mb-6"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Le Collier de la Destinee
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                {
                  "Une aventure palpitante et édifiante qui fait écho à l'esprit du Roi Lion et de Black Panther, tout en offrant aux jeunes lecteurs une célébration du patrimoine, du courage et de la découverte de soi."
                }
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/shop">
                  <motion.button
                    className="px-8 py-4 rounded-lg text-lg font-bold tracking-wider transition-all"
                    style={{
                      backgroundColor: currentTheme.colors.accentPrimary,
                      color: currentTheme.colors.background,
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 30px ${currentTheme.colors.accentPrimary}80`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("hero_buy_now")}
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    className="px-8 py-4 rounded-lg text-lg font-bold tracking-wider transition-all border-2"
                    style={{
                      borderColor: currentTheme.colors.accentPrimary,
                      color: currentTheme.colors.accentPrimary,
                      backgroundColor: "transparent",
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${currentTheme.colors.accentPrimary}20`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("hero_discover")}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          )}

          {/* SLIDE 2: "What is Isolele?" full image */}
          {activeSlide === 1 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex items-center justify-center w-full min-h-screen px-4"
            >
              <div className="relative w-full max-w-2xl mx-auto aspect-[2/3] sm:aspect-[3/4] lg:max-w-3xl">
                <Image
                  src="/universe/full-cast.jpg"
                  alt="What is Isolele? A visionary African universe born to reclaim memory, mythology, and power."
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 70vw, 50vw"
                  priority
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {[0, 1].map((idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: activeSlide === idx ? "28px" : "10px",
              height: "10px",
              backgroundColor:
                activeSlide === idx
                  ? currentTheme.colors.accentPrimary
                  : `${currentTheme.colors.textSecondary}50`,
            }}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div
          className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
          style={{ borderColor: currentTheme.colors.textSecondary }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full"
            style={{ backgroundColor: currentTheme.colors.accentPrimary }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}
