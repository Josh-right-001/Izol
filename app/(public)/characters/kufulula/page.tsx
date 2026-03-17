'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Share2 } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

export default function KufululaPage() {
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/King%20kufulula-AwyQTUu7D9V45Zw8nIi0inoUUR25JP.jpg"
              alt="King Kufulula"
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
              THE ETERNAL KING
            </motion.span>
            <h1 className="text-5xl font-bold mb-4">KING KUFULULA</h1>
            <p className="text-2xl opacity-70 mb-6">Ruler of the Kingdom</p>

            <div className="space-y-4 mb-8">
              <p className="text-lg leading-relaxed">
                King Kufulula is the legendary ruler whose reign shaped the destiny of millions. His wisdom transcends time, and his legacy echoes through every heartbeat of his people.
              </p>
              <p className="text-lg leading-relaxed opacity-80">
                With the crown as his burden and compassion as his guide, Kufulula represents the pinnacle of African leadership—a king who rules not for power, but for the prosperity of all.
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
            { label: 'Power Level', value: '10/10' },
            { label: 'Kingdom', value: 'Kongo' },
            { label: 'Era', value: 'Golden Age' },
            { label: 'Legacy', value: 'Eternal' },
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
          <h2 className="text-3xl font-bold mb-4">The Golden Age</h2>
          <div className="space-y-4 text-lg leading-relaxed opacity-90">
            <p>
              In the time of King Kufulula, the kingdoms of Africa flourished. Trade routes connected continents, arts and sciences reached unprecedented heights, and respect for African leadership echoed across the world.
            </p>
            <p>
              Kufulula's reign became synonymous with peace, prosperity, and pride. He established laws that protected the vulnerable, wisdom councils that guided the kingdom, and traditions that strengthened the bonds of his people.
            </p>
            <p>
              Though time has passed, the memory of King Kufulula remains eternal—a testament to what African kingdoms could achieve when led by true visionaries.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
