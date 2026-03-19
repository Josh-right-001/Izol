'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Share2 } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

export default function BambulaPage() {
  const { currentTheme } = useTheme()

  return (
    <div className="min-h-screen pt-20 pb-20" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/characters">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg"
            style={{ backgroundColor: `${currentTheme.colors.accentPrimary}20` }}
          >
            <ArrowLeft size={20} />
            Back to Characters
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          <div className="relative h-96 lg:h-full rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bambula-ls0hN70yV5GtjomnOMEfkM1XX9Lkbl.jpg"
              alt="Bambula"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-bold mb-2"
              style={{ color: currentTheme.colors.accentPrimary }}
            >
              THE GUARDIAN
            </motion.span>
            <h1 className="text-5xl font-bold mb-4">BAMBULA</h1>
            <p className="text-2xl opacity-70 mb-6">The Warrior Spirit</p>

            <div className="space-y-4 mb-8">
              <p className="text-lg leading-relaxed">
                Bambula is a fierce warrior whose spirit burns with ancestral fire. She fights not for glory, but for the soul of her people and the preservation of their sacred traditions.
              </p>
              <p className="text-lg leading-relaxed opacity-80">
                With strength that echoes through generations and a heart devoted to freedom, Bambula stands as a beacon of resistance and hope for all who believe in African power.
              </p>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold"
                style={{
                  backgroundColor: currentTheme.colors.accentPrimary,
                  color: currentTheme.colors.background,
                }}
              >
                <Heart size={20} />
                Follow
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold"
                style={{
                  backgroundColor: `${currentTheme.colors.accentSecondary}20`,
                  color: currentTheme.colors.accentSecondary,
                }}
              >
                <Share2 size={20} />
                Share
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: 'Power Level', value: '9.6/10' },
            { label: 'Origin', value: 'Free Lands' },
            { label: 'Role', value: 'Warrior' },
            { label: 'Status', value: 'Active' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg"
              style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}
            >
              <p className="text-sm opacity-70 mb-1">{stat.label}</p>
              <p className="font-bold text-lg">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-lg"
          style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}
        >
          <h2 className="text-3xl font-bold mb-4">Rise of a Warrior</h2>
          <div className="space-y-4 text-lg leading-relaxed opacity-90">
            <p>
              Born from struggle and forged in the fires of resistance, Bambula embodies the spirit of every African who has fought for freedom and dignity.
            </p>
            <p>
              Her journey is one of transformation—from a young girl witnessing injustice to a warrior who stands unwavering against tyranny and oppression.
            </p>
            <p>
              Bambula proves that true power comes not from weapons or conquest, but from an unbreakable connection to one's roots and an unwavering commitment to liberation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
