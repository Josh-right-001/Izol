"use client"

import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, ShoppingCart, ArrowLeft } from "lucide-react"

export default function ZaiirePage() {
  const { currentTheme } = useTheme()
  const { t, currentLanguage } = useLanguage()

  const book = {
    title: "ZAIIRE - PRINCE OF KONGO",
    titleFr: "ZAIIRE - PRINCE DU KONGO",
    author: "ISOLELE Universe",
    price: 24.99,
    rating: 4.8,
    reviews: 156,
    category: "Fantasy Comics",
    image: "/characters/zaire-official.jpg",
    description: "A thrilling and edifying adventure echoing the spirit of The Lion King and Black Panther, offering young readers a celebration of heritage, courage, and self-discovery.",
    descriptionFr: "Une aventure palpitante et édifiante qui fait écho à l'esprit du Roi Lion et de Black Panther, offrant aux jeunes lecteurs une célébration du patrimoine, du courage et de la découverte de soi.",
    fullDescription: "Journey into the mystical realm of Kongo where Zaiire discovers his destiny as the Prince foretold by ancient prophecies. Bound to the legendary Necklace of Destiny, young Zaiire must overcome powerful adversaries, unlocking mystical powers passed down through generations. With breathtaking artwork and compelling storytelling, this epic adventure explores themes of identity, courage, and the strength found in cultural heritage.",
    pages: 156,
    language: "English/Français",
    format: "Digital Comic / Hardcover",
    isbn: "978-0-ISOLELE-001",
    tags: ["African Mythology", "Coming of Age", "Fantasy", "Superhero", "African Culture"]
  }

  const reviews = [
    { name: "Amara K.", rating: 5, text: "A groundbreaking comic series that celebrates African culture with stunning visuals!" },
    { name: "Kwame M.", rating: 5, text: "My kids loved Zaiire's journey. Inspiring and beautifully illustrated." },
    { name: "Zainab L.", rating: 4, text: "Great storytelling. Zaiire is a character kids can relate to and be proud of." },
  ]

  return (
    <div style={{ background: currentTheme.colors.background, color: currentTheme.colors.textPrimary }} className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/shop">
          <motion.button
            className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all"
            style={{
              color: currentTheme.colors.accentPrimary,
              backgroundColor: `${currentTheme.colors.accentPrimary}10`,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <ArrowLeft size={20} />
            Back to Shop
          </motion.button>
        </Link>

        {/* Book Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Book Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-sm aspect-[2/3]">
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 30vw"
              />
            </div>
          </motion.div>

          {/* Book Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div>
              <p style={{ color: currentTheme.colors.accentPrimary }} className="font-bold text-sm tracking-widest">
                AFRICAN MYTHOLOGY
              </p>
              <h1 className="text-4xl font-black tracking-wider mb-2">
                {currentLanguage.code === 'fr' ? book.titleFr : book.title}
              </h1>
              <p style={{ color: currentTheme.colors.textSecondary }} className="text-lg">
                {book.author}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < Math.floor(book.rating) ? currentTheme.colors.accentPrimary : `${currentTheme.colors.accentPrimary}30`}
                    color={currentTheme.colors.accentPrimary}
                  />
                ))}
              </div>
              <span style={{ color: currentTheme.colors.textSecondary }}>
                {book.rating} ({book.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold" style={{ color: currentTheme.colors.accentPrimary }}>
              ${book.price}
            </div>

            {/* Description */}
            <p style={{ color: currentTheme.colors.textSecondary }} className="text-lg leading-relaxed">
              {currentLanguage.code === 'fr' ? book.descriptionFr : book.description}
            </p>

            {/* Add to Cart Button */}
            <motion.button
              className="flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-bold w-full justify-center"
              style={{
                backgroundColor: currentTheme.colors.accentPrimary,
                color: currentTheme.colors.background,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={24} />
              Add to Cart
            </motion.button>
          </motion.div>
        </div>

        {/* Detailed Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About This Book</h2>
            <p style={{ color: currentTheme.colors.textSecondary }} className="text-lg leading-relaxed mb-6">
              {book.fullDescription}
            </p>

            {/* Book Details */}
            <div className="grid grid-cols-2 gap-4 p-6 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}>
              <div>
                <p style={{ color: currentTheme.colors.textSecondary }} className="text-sm">Pages</p>
                <p className="text-xl font-bold">{book.pages}</p>
              </div>
              <div>
                <p style={{ color: currentTheme.colors.textSecondary }} className="text-sm">Format</p>
                <p className="text-xl font-bold">{book.format}</p>
              </div>
              <div>
                <p style={{ color: currentTheme.colors.textSecondary }} className="text-sm">Language</p>
                <p className="text-xl font-bold">{book.language}</p>
              </div>
              <div>
                <p style={{ color: currentTheme.colors.textSecondary }} className="text-sm">ISBN</p>
                <p className="text-xl font-bold">{book.isbn}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${currentTheme.colors.accentPrimary}20`,
                    color: currentTheme.colors.accentPrimary,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-8">Reader Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div key={idx} className="p-6 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{review.name}</h3>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill={currentTheme.colors.accentPrimary} color={currentTheme.colors.accentPrimary} />
                    ))}
                  </div>
                </div>
                <p style={{ color: currentTheme.colors.textSecondary }}>{review.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
