'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Share2 } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

export default function MokelePage() {
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mokele-DaZAw5lGSh5dXaIlmNIwLSZM5rkRXa.jpg"
              alt="Mokele"
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
              THE RISING PRINCE
            </motion.span>
            <h1 className="text-5xl font-bold mb-4">MOKELE</h1>
            <p className="text-2xl opacity-70 mb-6">Prince of the New Era</p>

            <div className="space-y-4 mb-8">
              <p className="text-lg leading-relaxed">
                Mokele represents the future of the kingdom, a young prince rising to prominence with the sacred mark of destiny upon him. Born in turbulent times, he carries both the weight of tradition and the hopes of a new generation.
              </p>
              <p className="text-lg leading-relaxed opacity-80">
                With raw power and unwavering determination, Mokele proves that the spirit of African greatness lives on in the hearts of the young, ready to claim their rightful place in history.
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
            { label: 'Power Level', value: '8.5/10' },
            { label: 'Origin', value: 'Royal House' },
            { label: 'Role', value: 'Rising Hero' },
            { label: 'Status', value: 'Ascending' },
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
          <h2 className="text-3xl font-bold mb-4">The New Generation</h2>
          <div className="space-y-4 text-lg leading-relaxed opacity-90">
            <p>
              Mokele's story is one of youth meeting destiny. While others his age seek comfort and ease, Mokele hears the call of his ancestors and the cry of his people for a champion.
            </p>
            <p>
              Growing up in the shadows of legends has not intimidated him—instead, it has ignited a fire within. Mokele is determined to prove that the strength of African warriors does not diminish with time; it only grows stronger.
            </p>
            <p>
              As the new era unfolds, Mokele stands ready to leave his own mark on history, to carve his own path as a hero worthy of the heroes who came before.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
