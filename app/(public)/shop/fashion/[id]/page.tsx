'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2, Bookmark, ChevronUp, ChevronDown, X } from 'lucide-react'

const allProducts = [
  { id: 'fashion1', name: 'Ceremonial Robe Deluxe', description: 'Luxurious ceremonial robe with golden embroidery', category: 'Fashion', price: 425.00, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0073-CENE1zQHLu9ymMqgGZ66aICSO0bfMT.jpg', rating: 5.0, reviews: 201 },
  { id: 'fashion2', name: 'Flame Heritage Vest', description: 'Bold vest with flame-inspired patterns', category: 'Fashion', price: 299.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0071-bufysoFw95vpyBrNbUwoqxhq7HdG1F.jpg', rating: 4.8, reviews: 167 },
  { id: 'fashion3', name: 'Beaded Heritage Jacket', description: 'Premium jacket with traditional beading', category: 'Fashion', price: 379.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0076-cpHU65HQFsw4mpD5Ec8Gzd0Ic5BWHN.jpg', rating: 4.9, reviews: 234 },
  { id: 'fashion4', name: 'Minimalist Cream Collection', description: 'Clean elegant cream and earth tone collection', category: 'Fashion', price: 249.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0069-EuegoQTFGgiK1gYg6XHvtBqpsr9sHx.jpg', rating: 4.6, reviews: 89 },
  { id: 'fashion5', name: 'Night Runway Ensemble', description: 'Stunning evening collection inspired by runways', category: 'Fashion', price: 549.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0072-5jS7sfr7ncbO0riemesMxVLTXah9Ce.jpg', rating: 5.0, reviews: 312 },
  { id: 'fashion6', name: 'Woven Masterpiece Cape', description: 'Hand-woven cape with intricate details', category: 'Fashion', price: 649.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0078-wHjaMSAcNSGJfqLeJnkjpICzbSAQ.jpg', rating: 4.95, reviews: 178 },
  { id: 'fashion7', name: 'Haute Couture Evening Gown', description: 'Premium evening gown for special occasions', category: 'Fashion', price: 899.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0063-bgpBMx05R5HyUqrzC6HHA5qE1XW1LU.jpg', rating: 4.85, reviews: 267 },
  { id: 'fashion8', name: 'Royal Fashion Complete Set', description: 'Complete collection featuring royal styles', category: 'Fashion', price: 1299.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0073-CENE1zQHLu9ymMqgGZ66aICSO0bfMT.jpg', rating: 4.9, reviews: 423 },
  { id: 'fashion9', name: 'Fashion Runway Collection', description: 'Exclusive runway-inspired pieces', category: 'Fashion', price: 799.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0073-CENE1zQHLu9ymMqgGZ66aICSO0bfMT.jpg', rating: 4.75, reviews: 189 },
]

export default function FashionViewer({ params }: { params: { id: string } }) {
  const product = allProducts.find(p => p.id === params.id) || allProducts[0]
  const currentIndex = allProducts.findIndex(p => p.id === params.id) || 0
  
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState(0)
  const [shares, setShares] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    // Fetch interaction counts from API
    const fetchInteractions = async () => {
      try {
        const res = await fetch(`/api/fashion/${product.id}/interactions`)
        if (res.ok) {
          const data = await res.json()
          setLikes(data.likes || 0)
          setComments(data.comments || 0)
          setShares(data.shares || 0)
          setHasLiked(data.userLiked || false)
          setIsFavorite(data.userFavorited || false)
        }
      } catch (error) {
        console.log('[v0] Error fetching interactions:', error)
      }
    }

    fetchInteractions()
  }, [product.id])

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/fashion/${product.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liked: !hasLiked })
      })
      if (res.ok) {
        const data = await res.json()
        setLikes(data.likeCount)
        setHasLiked(!hasLiked)
      }
    } catch (error) {
      console.log('[v0] Error toggling like:', error)
    }
  }

  const handleFavorite = async () => {
    try {
      const res = await fetch(`/api/fashion/${product.id}/favorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorited: !isFavorite })
      })
      if (res.ok) {
        const data = await res.json()
        setIsFavorite(!isFavorite)
      }
    } catch (error) {
      console.log('[v0] Error toggling favorite:', error)
    }
  }

  const handleShare = async () => {
    try {
      const res = await fetch(`/api/fashion/${product.id}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.ok) {
        const data = await res.json()
        setShares(data.shareCount)
      }
    } catch (error) {
      console.log('[v0] Error sharing:', error)
    }
  }

  const handleAddComment = async () => {
    if (!commentText.trim()) return

    try {
      const res = await fetch(`/api/fashion/${product.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: commentText })
      })
      if (res.ok) {
        setCommentText('')
        const data = await res.json()
        setComments(data.commentCount)
      }
    } catch (error) {
      console.log('[v0] Error adding comment:', error)
    }
  }

  const nextProduct = allProducts[(currentIndex + 1) % allProducts.length]
  const prevProduct = allProducts[(currentIndex - 1 + allProducts.length) % allProducts.length]

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Close Button */}
      <Link href="/shop">
        <button className="absolute top-4 left-4 z-50 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors">
          <X className="w-6 h-6 text-white" />
        </button>
      </Link>

      {/* Main Content - TikTok Style */}
      <div className="w-full h-screen flex items-center justify-center relative">
        {/* Product Image - Center */}
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full md:w-auto md:h-auto flex items-center justify-center"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover md:object-contain md:w-1/2 md:h-auto"
            priority
          />
        </motion.div>

        {/* Right Sidebar - Interactions (Mobile: Bottom) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-20 right-4 md:bottom-auto md:right-8 md:top-1/2 md:-translate-y-1/2 flex md:flex-col gap-4 z-40"
        >
          {/* Like Button */}
          <motion.button
            onClick={handleLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-col items-center gap-2 p-3 rounded-full transition-all ${
              hasLiked ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Heart className={`w-6 h-6 ${hasLiked ? 'fill-red-500' : ''}`} />
            <span className="text-xs font-bold">{likes}</span>
          </motion.button>

          {/* Comment Button */}
          <motion.button
            onClick={() => setShowComments(!showComments)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-bold">{comments}</span>
          </motion.button>

          {/* Share Button */}
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <Share2 className="w-6 h-6" />
            <span className="text-xs font-bold">{shares}</span>
          </motion.button>

          {/* Favorite Button */}
          <motion.button
            onClick={handleFavorite}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-col items-center gap-2 p-3 rounded-full transition-all ${
              isFavorite ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Bookmark className={`w-6 h-6 ${isFavorite ? 'fill-yellow-500' : ''}`} />
            <span className="text-xs font-bold">Save</span>
          </motion.button>
        </motion.div>

        {/* Product Info - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 md:left-auto md:right-8 md:bottom-1/2 md:translate-y-1/2 md:w-96 md:bg-black/40 md:backdrop-blur-sm md:rounded-lg md:p-4"
        >
          <h2 className="text-2xl md:text-xl font-black text-white mb-2">{product.name}</h2>
          <p className="text-white/70 text-sm mb-3">{product.description}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl md:text-2xl font-black text-yellow-400">${product.price}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-400 text-sm">★ {product.rating}</span>
                <span className="text-white/50 text-sm">({product.reviews} reviews)</span>
              </div>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-bold transition-colors">
              Buy Now
            </button>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <Link href={`/shop/fashion/${prevProduct.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full z-40"
            >
              <ChevronUp className="w-6 h-6 text-white" />
            </motion.button>
          </Link>
        )}

        {currentIndex < allProducts.length - 1 && (
          <Link href={`/shop/fashion/${nextProduct.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full z-40"
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </motion.button>
          </Link>
        )}

        {/* Comments Panel */}
        {showComments && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="absolute inset-0 md:right-0 md:left-auto md:w-96 bg-black md:bg-black/95 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-bold">Comments</h3>
              <button onClick={() => setShowComments(false)} className="text-white/50 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Placeholder comments */}
              <div className="text-white/50 text-sm">Be the first to comment!</div>
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-white/10 text-white rounded-full px-4 py-2 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <motion.button
                  onClick={handleAddComment}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black p-2 rounded-full transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
