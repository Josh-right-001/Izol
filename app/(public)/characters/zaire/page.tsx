'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Share2, Download } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

export default function ZairePage() {
  const { currentTheme } = useTheme()

  return (
    <div className="min-h-screen pt-20 pb-20" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation */}
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Image */}
          <div className="relative h-96 lg:h-full rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/prince-ox0FdH9wbLoeDdx7mHVckNlMprgvHz.jpg"
              alt="Zaiire"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-bold mb-2"
              style={{ color: currentTheme.colors.accentPrimary }}
            >
              THE CHOSEN ONE
            </motion.span>
            <h1 className="text-5xl font-bold mb-4">ZAIIRE</h1>
            <p className="text-2xl opacity-70 mb-6">Prince of Kongo</p>

            <div className="space-y-4 mb-8">
              <p className="text-lg leading-relaxed">
                Zaiire is the destined heir of the kingdom of Kongo, blessed with ancient powers flowing through his veins. Born under a golden constellation, he bears the responsibility of restoring his people to their rightful place in the world.
              </p>
              <p className="text-lg leading-relaxed opacity-80">
                With the Necklace of Destiny around his neck and the wisdom of his ancestors guiding him, Zaiire rises to meet the challenges that will define not just his kingdom, but the entire African continent.
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: 'Power Level', value: '9.8/10' },
            { label: 'Kingdom', value: 'Kongo' },
            { label: 'Role', value: 'Protagonist' },
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

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-lg"
          style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}
        >
          <h2 className="text-3xl font-bold mb-4">The Prince's Journey</h2>
          <div className="space-y-4 text-lg leading-relaxed opacity-90">
            <p>
              In the heart of the Congo, a prince rises. Zaiire is not born to rule, but to transform. His childhood tales whisper of prophecies and destinies, of necklaces that glow with ancestral power, of kingdoms waiting for their true heir.
            </p>
            <p>
              But destiny is never simple. As Zaiire grows into manhood, he discovers that being chosen means bearing the weight of millions. It means standing against forces that seek to erase African history, African pride, and African power from the world.
            </p>
            <p>
              With each challenge overcome, Zaiire becomes more than a prince. He becomes a symbol of African resilience, a beacon of hope for all who believe that greatness still lives in African blood.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
