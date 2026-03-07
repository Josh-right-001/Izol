"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Zap, BookOpen, Star, Play } from "lucide-react"

interface BDSerie {
  id: string
  title: string
  subtitle: string
  description: string
  episodes: number
  rating: number
  image: string
  color: string
  tags: string[]
  featured: boolean
}

const bdSeries: BDSerie[] = [
  {
    id: "zaiire-saga",
    title: "ZAIIRE: The Necklace Awakens",
    subtitle: "Episode Series",
    description: "Follow Zaiire's journey as he discovers his destiny. Each episode brings new challenges and mythological revelations from the Kingdom of Kongo.",
    episodes: 24,
    rating: 4.9,
    image: "/characters/zaire-official.jpg",
    color: "#D4AF37",
    tags: ["Action", "Fantasy", "Coming of Age"],
    featured: true,
  },
  {
    id: "kimoya-chronicles",
    title: "KIMOYA: Throne of Thunder",
    subtitle: "Episode Series",
    description: "Witness the rise of a queen. Kimoya's path to the throne is paved with trials that test her wisdom, courage, and connection to ancestral magic.",
    episodes: 18,
    rating: 4.8,
    image: "/books/mokele-crowned-by-streets.jpg",
    color: "#B8860B",
    tags: ["Drama", "Fantasy", "Female Hero"],
    featured: true,
  },
  {
    id: "zattar-mysteries",
    title: "ZATTAR: Blood & Blueprints",
    subtitle: "Episode Series",
    description: "Delve into the dark arts. Zattar's mastery of blood magic and ancient runes unveils secrets that could reshape reality itself.",
    episodes: 20,
    rating: 4.7,
    image: "/characters/bakala-baku.jpg",
    color: "#8B4513",
    tags: ["Dark Fantasy", "Mystery", "Magic"],
    featured: false,
  },
  {
    id: "njoko-duality",
    title: "NJOKO TWINS: Balance of Souls",
    subtitle: "Episode Series",
    description: "Two souls, one destiny. Experience the cosmic dance between light and shadow as the twins navigate their eternal connection.",
    episodes: 16,
    rating: 4.8,
    image: "/characters/cast-ensemble.jpg",
    color: "#C0C0C0",
    tags: ["Cosmic", "Drama", "Duality"],
    featured: false,
  },
  {
    id: "imvula-storms",
    title: "IMVULA: Queen of Elements",
    subtitle: "Episode Series",
    description: "Command the heavens. Watch as Queen Imvula harnesses the power of storms to protect her people from ancient evils.",
    episodes: 22,
    rating: 4.9,
    image: "/characters/zariko-tabani.jpg",
    color: "#4169E1",
    tags: ["Action", "Power", "Nature"],
    featured: true,
  },
]

export default function BandeDessinee() {
  const { currentTheme } = useTheme()
  const { t, currentLanguage } = useLanguage()
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const featured = bdSeries.filter((s) => s.featured)
  const other = bdSeries.filter((s) => !s.featured)

  const selected = bdSeries.find((s) => s.id === selectedSeries)

  return (
    <div style={{ background: currentTheme.colors.background, color: currentTheme.colors.textPrimary }} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.colors.accentPrimary}15 0%, ${currentTheme.colors.background}00 100%)`,
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-wider mb-6">
              BANDE DESSINÉE
            </h1>
            <p style={{ color: currentTheme.colors.textSecondary }} className="text-xl sm:text-2xl mb-4 font-semibold">
              African Mythology in Motion
            </p>
            <p style={{ color: currentTheme.colors.textSecondary }} className="text-lg max-w-2xl mx-auto">
              Experience epic tales from the ISOLELE universe through breathtaking episodes. Each series brings African mythology to life with stunning visuals and compelling narratives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Series */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black tracking-wider mb-12"
          >
            Featured Series
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featured.map((series, idx) => (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredCard(series.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedSeries(series.id)}
                className="cursor-pointer group"
              >
                <div
                  className="relative overflow-hidden rounded-xl aspect-video"
                  style={{
                    backgroundColor: `${series.color}20`,
                    border: `2px solid ${series.color}40`,
                  }}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={series.image}
                      alt={series.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"
                  />

                  {/* Play Button */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: hoveredCard === series.id ? 1 : 0.8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-6 rounded-full"
                      style={{
                        backgroundColor: series.color,
                        boxShadow: `0 0 40px ${series.color}80`,
                      }}
                    >
                      <Play size={32} fill="black" color="black" />
                    </motion.button>
                  </motion.div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < Math.floor(series.rating) ? series.color : `${series.color}30`}
                            color={series.color}
                          />
                        ))}
                      </div>
                      <span style={{ color: series.color }} className="font-bold">
                        {series.rating}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black tracking-wider mb-2" style={{ color: series.color }}>
                      {series.title}
                    </h3>
                    <p className="text-sm text-white/80 mb-3">{series.episodes} Episodes</p>
                    <div className="flex gap-2 flex-wrap">
                      {series.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: `${series.color}40`,
                            color: series.color,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Series Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: `${currentTheme.colors.accentPrimary}05` }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black tracking-wider mb-12"
          >
            Complete Collection
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bdSeries.map((series, idx) => (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredCard(series.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedSeries(series.id)}
                className="cursor-pointer group rounded-lg overflow-hidden"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  border: `1px solid ${series.color}30`,
                }}
              >
                <div className="relative w-full aspect-square overflow-hidden bg-black">
                  <Image
                    src={series.image}
                    alt={series.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  {/* Mini Play Button */}
                  <motion.div
                    animate={{ scale: hoveredCard === series.id ? 1 : 0.8, opacity: hoveredCard === series.id ? 1 : 0.6 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-4 rounded-full"
                      style={{
                        backgroundColor: series.color,
                        boxShadow: hoveredCard === series.id ? `0 0 30px ${series.color}80` : "none",
                      }}
                    >
                      <Play size={24} fill="black" color="black" />
                    </motion.button>
                  </motion.div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg line-clamp-2">{series.title}</h3>
                  </div>
                  <p style={{ color: currentTheme.colors.textSecondary }} className="text-sm mb-4 line-clamp-2">
                    {series.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} style={{ color: series.color }} />
                      <span className="text-sm font-bold">{series.episodes} eps</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} fill={series.color} color={series.color} />
                      <span className="text-sm font-bold">{series.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSeries(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-xl overflow-hidden"
              style={{ backgroundColor: currentTheme.colors.background }}
            >
              <div
                className="relative w-full aspect-video bg-black overflow-hidden"
                style={{
                  backgroundColor: `${selected.color}20`,
                }}
              >
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-6 rounded-full"
                    style={{
                      backgroundColor: selected.color,
                      boxShadow: `0 0 40px ${selected.color}80`,
                    }}
                  >
                    <Play size={40} fill="black" color="black" />
                  </motion.button>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-black tracking-wider mb-2" style={{ color: selected.color }}>
                      {selected.title}
                    </h2>
                    <p style={{ color: currentTheme.colors.textSecondary }} className="text-lg">
                      {selected.subtitle}
                    </p>
                  </div>
                </div>

                <p style={{ color: currentTheme.colors.textSecondary }} className="text-lg leading-relaxed mb-6">
                  {selected.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-lg" style={{ backgroundColor: `${selected.color}10` }}>
                  <div>
                    <p style={{ color: currentTheme.colors.textSecondary }} className="text-sm">Episodes</p>
                    <p className="text-2xl font-bold" style={{ color: selected.color }}>
                      {selected.episodes}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: currentTheme.colors.textSecondary }} className="text-sm">Rating</p>
                    <p className="text-2xl font-bold" style={{ color: selected.color }}>
                      {selected.rating}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: currentTheme.colors.textSecondary }} className="text-sm">Status</p>
                    <p className="text-2xl font-bold" style={{ color: selected.color }}>
                      Active
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full text-sm font-bold"
                      style={{
                        backgroundColor: `${selected.color}20`,
                        color: selected.color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: selected.color,
                    color: "black",
                  }}
                >
                  <Zap size={24} />
                  WATCH EPISODES
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black tracking-wider mb-6">Subscribe to the ISOLELE Universe</h2>
            <p style={{ color: currentTheme.colors.textSecondary }} className="text-lg mb-8 max-w-2xl mx-auto">
              Get unlimited access to all Bande Dessinée episodes, exclusive behind-the-scenes content, and early access to new releases.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-lg font-bold text-lg flex items-center gap-2 mx-auto"
              style={{
                backgroundColor: currentTheme.colors.accentPrimary,
                color: currentTheme.colors.background,
              }}
            >
              START FREE TRIAL
              <ChevronRight size={24} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
