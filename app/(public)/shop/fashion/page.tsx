'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2, Bookmark, Play, Volume2, VolumeX, ArrowDown, X } from 'lucide-react'

const fashionVideos = [
  {
    id: 1,
    title: 'Royal Golden Crown',
    description: 'Premium golden crown accessory with intricate patterns and royal design',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0021-gtTE1FKIqHREoscLmcpydLPt09nn5M.jpg',
    price: 245.00,
    creator: '@isolele_official',
    category: 'Accessories',
    likes: 1240,
    comments: 156,
    shares: 89,
    favorites: 342
  },
  {
    id: 2,
    title: 'Zaiire Character Cap Premium',
    description: 'Exclusive limited edition cap featuring Zaiire the Prince of Kongo',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0026-4lJtHXPlKDW0ETYoKxj3uOCscFCFaS.jpg',
    price: 89.99,
    creator: '@isolele_official',
    category: 'Hats',
    likes: 892,
    comments: 123,
    shares: 67,
    favorites: 245
  },
  {
    id: 3,
    title: 'African Mask Spirit',
    description: 'Traditional ceremonial mask with vibrant colors and cultural significance',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0019-lIccvDFS0C5Trkq38r6VUxlbFh2pNM.jpg',
    price: 199.99,
    creator: '@isolele_official',
    category: 'Masks',
    likes: 1567,
    comments: 234,
    shares: 145,
    favorites: 478
  },
  {
    id: 4,
    title: 'Premium Panthera Sneaker',
    description: 'High-performance sneaker with colorful geometric design',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260114-WA0050-0EvGwiQ882fDOlbsmBN4uqEYvV1ET4.jpg',
    price: 159.99,
    creator: '@isolele_official',
    category: 'Sneakers',
    likes: 2134,
    comments: 312,
    shares: 198,
    favorites: 612
  },
  {
    id: 5,
    title: 'Golden Lion Mask Collection',
    description: 'Stunning golden lion mask with ceremonial crown and detailed craftsmanship',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0018-b7vCEEV8dcj2HcSPNAvy2GMLnu1ltK.jpg',
    price: 229.99,
    creator: '@isolele_official',
    category: 'Masks',
    likes: 1834,
    comments: 267,
    shares: 123,
    favorites: 534
  },
  {
    id: 6,
    title: 'Isolele Premium Black Belt',
    description: 'Premium black leather belt with golden ISO buckle - luxury accessory',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0027-Zaxp5cCFMz8JCYzEoJuO1GvaU2vSMV.jpg',
    price: 129.99,
    creator: '@isolele_official',
    category: 'Accessories',
    likes: 1021,
    comments: 145,
    shares: 87,
    favorites: 289
  },
  {
    id: 7,
    title: 'ZAIIRE Luxury Perfume',
    description: 'Luxury fragrance inspired by Prince Zaiire - exquisite scent profile',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0022-0AnfJyAKrcoziXwMQgRd3Msy6tcEhY.jpg',
    price: 99.99,
    creator: '@isolele_official',
    category: 'Fragrances',
    likes: 1456,
    comments: 198,
    shares: 112,
    favorites: 389
  },
  {
    id: 8,
    title: 'Lionpard White Cap Edition',
    description: 'White premium cap with Lionpard emblem - exclusive limited edition',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0024-Qmafphzz2kmhWoxGu8DlqLvrwgNdrU.jpg',
    price: 84.99,
    creator: '@isolele_official',
    category: 'Hats',
    likes: 756,
    comments: 98,
    shares: 56,
    favorites: 201
  }
]

interface VideoInteractions {
  [key: number]: {
    liked: boolean
    favorited: boolean
    commentCount: number
  }
}

export default function FashionTikTokPage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [interactions, setInteractions] = useState<VideoInteractions>({})
  const [showComments, setShowComments] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentVideo = fashionVideos[currentVideoIndex]

  const handleNextVideo = () => {
    if (currentVideoIndex < fashionVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1)
    }
  }

  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1)
    }
  }

  const toggleLike = async () => {
    const videoId = currentVideo.id
    setInteractions(prev => ({
      ...prev,
      [videoId]: {
        ...prev[videoId],
        liked: !prev[videoId]?.liked
      }
    }))

    try {
      await fetch('/api/fashion-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, action: 'like', value: !interactions[videoId]?.liked })
      })
    } catch (error) {
      console.log('[v0] Like failed:', error)
    }
  }

  const toggleFavorite = async () => {
    const videoId = currentVideo.id
    setInteractions(prev => ({
      ...prev,
      [videoId]: {
        ...prev[videoId],
        favorited: !prev[videoId]?.favorited
      }
    }))

    try {
      await fetch('/api/fashion-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, action: 'favorite', value: !interactions[videoId]?.favorited })
      })
    } catch (error) {
      console.log('[v0] Favorite failed:', error)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: currentVideo.title,
          text: currentVideo.description,
          url: window.location.href
        })
      }

      await fetch('/api/fashion-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId: currentVideo.id, action: 'share' })
      })
    } catch (error) {
      console.log('[v0] Share failed:', error)
    }
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) handleNextVideo()
      else if (e.deltaY < 0) handlePrevVideo()
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentVideoIndex])

  return (
    <div className="w-full h-screen bg-black overflow-hidden" ref={containerRef}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideoIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full relative"
        >
          {/* Video Background */}
          <div className="w-full h-full relative bg-black flex items-center justify-center">
            <Image
              src={currentVideo.image}
              alt={currentVideo.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>

          {/* Left Navigation */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-40">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevVideo}
              disabled={currentVideoIndex === 0}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowDown className="w-6 h-6 text-white rotate-180" />
            </motion.button>
          </div>

          {/* Right Interactive Buttons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-40">
            {/* Like Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLike}
              className="flex flex-col items-center gap-2 group"
            >
              <motion.div
                className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                  interactions[currentVideo.id]?.liked
                    ? 'bg-red-500 shadow-lg shadow-red-500/50'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <Heart
                  className={`w-6 h-6 transition-all ${
                    interactions[currentVideo.id]?.liked
                      ? 'fill-white text-white'
                      : 'text-white'
                  }`}
                />
              </motion.div>
              <span className="text-white text-sm font-bold">{currentVideo.likes + (interactions[currentVideo.id]?.liked ? 1 : 0)}</span>
            </motion.button>

            {/* Comment Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowComments(!showComments)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-sm font-bold">{currentVideo.comments}</span>
            </motion.button>

            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-sm font-bold">{currentVideo.shares}</span>
            </motion.button>

            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavorite}
              className="flex flex-col items-center gap-2 group"
            >
              <motion.div
                className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                  interactions[currentVideo.id]?.favorited
                    ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <Bookmark
                  className={`w-6 h-6 transition-all ${
                    interactions[currentVideo.id]?.favorited
                      ? 'fill-black text-black'
                      : 'text-white'
                  }`}
                />
              </motion.div>
              <span className="text-white text-sm font-bold">{currentVideo.favorites}</span>
            </motion.button>

            {/* Mute Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 z-30">
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <p className="text-white/80 text-sm mb-1">{currentVideo.creator}</p>
                <h2 className="text-white text-2xl font-bold mb-2">{currentVideo.title}</h2>
                <p className="text-white/70 text-sm mb-4">{currentVideo.description}</p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-yellow-400 font-bold text-lg">${currentVideo.price}</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold backdrop-blur-sm">
                    {currentVideo.category}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-full whitespace-nowrap ml-4"
              >
                BUY NOW
              </motion.button>
            </div>
          </div>

          {/* Next Video Indicator */}
          {currentVideoIndex < fashionVideos.length - 1 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextVideo}
              className="absolute right-4 bottom-4 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <ArrowDown className="w-6 h-6 text-white" />
            </motion.button>
          )}

          {/* Video Counter */}
          <div className="absolute top-4 left-4 text-white font-bold text-sm backdrop-blur-sm bg-white/20 px-4 py-2 rounded-full">
            {currentVideoIndex + 1} / {fashionVideos.length}
          </div>

          {/* Comments Drawer */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, x: 400 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 400 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 top-0 bottom-0 w-96 bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-white font-bold">Comments</h3>
                  <button onClick={() => setShowComments(false)} className="text-white/60 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="text-white/80 text-sm">
                      <p className="font-bold text-white mb-1">@user_{i}</p>
                      <p>Amazing product! 🔥 Definitely buying this!</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/10">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
