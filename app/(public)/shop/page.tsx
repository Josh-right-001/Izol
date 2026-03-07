"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Search, Filter, X, Star, Truck, Shield, CreditCard, Tag, Users, Info } from "lucide-react"
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/json-ld"

interface Product {
  id: string
  title: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  link: string
  inStock: boolean
}

const products: Product[] = [
  {
    id: "zaiire",
    title: "ZAIIRE - PRINCE OF KONGO",
    price: 24.99,
    image: "/characters/zaire-official.jpg",
    category: "comics",
    rating: 4.8,
    reviews: 156,
    link: "/books/zaiire",
    inStock: true,
  },
  {
    id: "kimoya",
    title: "KIMOYA - THE RISING KANDAKE",
    price: 26.99,
    image: "/books/mokele-crowned-by-streets.jpg",
    category: "comics",
    rating: 4.9,
    reviews: 203,
    link: "/books/kimoya",
    inStock: true,
  },
  {
    id: "zattar",
    title: "ZATTAR - THE BLOOD ARCHITECT",
    price: 27.99,
    image: "/characters/bakala-baku.jpg",
    category: "comics",
    rating: 4.7,
    reviews: 142,
    link: "/books/zattar",
    inStock: true,
  },
  {
    id: "njoko",
    title: "THE NJOKO TWINS - BOUND BY DESTINY",
    price: 25.99,
    image: "/characters/cast-ensemble.jpg",
    category: "comics",
    rating: 4.8,
    reviews: 178,
    link: "/books/njoko",
    inStock: true,
  },
  {
    id: "imvula",
    title: "QUEEN IMVULA - THE STORM MAIDEN",
    price: 26.99,
    image: "/characters/zariko-tabani.jpg",
    category: "comics",
    rating: 4.9,
    reviews: 215,
    link: "/books/imvula",
    inStock: true,
  },
  {
    id: "isolele-cap",
    title: "ISOLELE Classic Cap",
    price: 34.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260114-WA0040-XKYM3hrOzVPgBehxtXhIaVEGtrRq2O.jpg",
    category: "apparel",
    rating: 4.8,
    reviews: 45,
    link: "/shop/apparel/cap",
    inStock: true,
  },
  {
    id: "zaiire-cap",
    title: "ZAIIRE Character Cap",
    price: 39.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0025-WefKTwtXVGynxbblsgTFrJ0S37VUH2.jpg",
    category: "apparel",
    rating: 4.9,
    reviews: 67,
    link: "/shop/apparel/zaiire-cap",
    inStock: true,
  },
  {
    id: "lionpard-cap",
    title: "LIONPARD Premium Cap",
    price: 39.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0024-yNBJVYFuGV2qgwIj1Bk1pJcOXG4JE8.jpg",
    category: "apparel",
    rating: 5.0,
    reviews: 89,
    link: "/shop/apparel/lionpard-cap",
    inStock: true,
  },
  {
    id: "panthera-cap",
    title: "PANTHERA Trucker Cap",
    price: 42.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260114-WA0035-usohqqBhloi1PUBjn7syRDdY0Vk6j2.jpg",
    category: "apparel",
    rating: 4.9,
    reviews: 76,
    link: "/shop/apparel/panthera-cap",
    inStock: true,
  },
  {
    id: "royalty-belt",
    title: "ROYALTY Signature Belt",
    price: 89.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0027-hDXXduEV9FQcO2HCdYiOBNfQC8VvKM.jpg",
    category: "apparel",
    rating: 4.9,
    reviews: 54,
    link: "/shop/apparel/belt",
    inStock: true,
  },
  {
    id: "royal-sunglasses",
    title: "ROYALTY Designer Sunglasses",
    price: 149.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0028-H8sJQMWmOvNeFMzj77nerUi9ZzujsQ.jpg",
    category: "apparel",
    rating: 4.95,
    reviews: 112,
    link: "/shop/apparel/sunglasses",
    inStock: true,
  },
  {
    id: "zaire-figure",
    title: "ZAIRE Character Figure",
    price: 59.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260106-WA0013-uGz1WsLuJsQwaeoa9FGYTgKiIf9rZA.jpg",
    category: "collectibles",
    rating: 4.9,
    reviews: 78,
    link: "/shop/collectibles/zaire",
    inStock: true,
  },
  {
    id: "kimoya-collector",
    title: "KIMOYA Premium Collectible",
    price: 79.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260106-WA0010-XZRyXzQwD9znnsx8mxHbTBRNzjmtHm.jpg",
    category: "collectibles",
    rating: 5.0,
    reviews: 92,
    link: "/shop/collectibles/kimoya",
    inStock: true,
  },
  {
    id: "zattar-artifact",
    title: "ZATTAR The Blood Architect",
    price: 89.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260106-WA0011-UqXFP6gWl4Khrn6sXFwj5ZtTTbvkiP.jpg",
    category: "collectibles",
    rating: 4.85,
    reviews: 65,
    link: "/shop/collectibles/zattar",
    inStock: true,
  },
  {
    id: "njoko-twins-set",
    title: "NJOKO Twins Limited Set",
    price: 149.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260106-WA0012-HZAFyQIAHjVxMaTAyLn0TKRpvB9DPc.jpg",
    category: "collectibles",
    rating: 4.98,
    reviews: 156,
    link: "/shop/collectibles/njoko",
    inStock: true,
  },
  {
    id: "imvula-queen-statue",
    title: "QUEEN IMVULA Statue",
    price: 199.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260106-WA0015-ixHtpvXFjUsQoB2wP6rqZlYnT62ir7.jpg",
    category: "collectibles",
    rating: 5.0,
    reviews: 203,
    link: "/shop/collectibles/imvula",
    inStock: true,
  },
  {
    id: "nzingaa-card",
    title: "QUEEN NZINGAA Character Card",
    price: 24.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260114-WA0048-7CheMeB1hkUSenuBOY1qGIjp7O6y9I.jpg",
    category: "collectibles",
    rating: 4.7,
    reviews: 34,
    link: "/shop/collectibles/card-nzingaa",
    inStock: true,
  },
  {
    id: "royality-creator",
    title: "ROYALITY Creator Figurine",
    price: 79.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260106-WA0036-AyEk2JKc2qXJ6XeB4OhTpU8lXY3pzZ.jpg",
    category: "collectibles",
    rating: 4.92,
    reviews: 128,
    link: "/shop/collectibles/royality",
    inStock: true,
  },
]

const categories = [
  { id: "all", name: "All Products" },
  { id: "comics", name: "Comics & Books" },
  { id: "apparel", name: "Apparel" },
  { id: "art", name: "Art & Prints" },
  { id: "collectibles", name: "Collectibles" },
]

export default function ShopPage() {
  const { currentTheme } = useTheme()
  const { t, currentLanguage } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [cart, setCart] = useState<string[]>([])

  const filtered = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = useCallback((productId: string) => {
    setCart((prev) => [...prev, productId])
  }, [])

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://isolele.com" },
        { name: "Shop", url: "https://isolele.com/shop" }
      ]} />
      
      <ProductJsonLd
        name="ZAIIRE - PRINCE OF KONGO"
        description="A thrilling and edifying adventure echoing the spirit of The Lion King and Black Panther"
        price={24.99}
        image="/characters/zaire-official.jpg"
        availability="InStock"
      />
      
      <main style={{ background: currentTheme.colors.background, color: currentTheme.colors.textPrimary }} className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-wider mb-4">ISOLELE SHOP</h1>
            <p style={{ color: currentTheme.colors.textSecondary }} className="text-lg">
              Discover our collection of African mythology comics and merchandise
            </p>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { icon: Truck, text: "Free Shipping 50+" },
              { icon: Shield, text: "Secure Payment" },
              { icon: CreditCard, text: "Easy Returns" }
            ].map((badge, index) => (
              <div key={index} className="flex items-center gap-2" style={{ color: currentTheme.colors.textSecondary }}>
                <badge.icon size={20} style={{ color: currentTheme.colors.accentPrimary }} />
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-12"
          >
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg pr-10"
                style={{
                  backgroundColor: `${currentTheme.colors.accentPrimary}10`,
                  color: currentTheme.colors.textPrimary,
                  border: `1px solid ${currentTheme.colors.accentPrimary}30`,
                }}
              />
              <Search
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: currentTheme.colors.textSecondary }}
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold md:hidden"
              style={{
                backgroundColor: `${currentTheme.colors.accentPrimary}20`,
                color: currentTheme.colors.accentPrimary,
              }}
            >
              <Filter size={20} />
              Filters
            </button>

            {/* Cart Button */}
            <Link href="/cart">
              <button
                className="relative px-6 py-3 rounded-lg font-bold whitespace-nowrap"
                style={{
                  backgroundColor: currentTheme.colors.accentPrimary,
                  color: currentTheme.colors.background,
                }}
              >
                <ShoppingCart size={20} className="inline mr-2" />
                Cart {cart.length > 0 && `(${cart.length})`}
              </button>
            </Link>
          </motion.div>

          {/* Desktop Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex gap-3 mb-12 flex-wrap"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  selectedCategory === category.id ? "ring-2" : ""
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? currentTheme.colors.accentPrimary : `${currentTheme.colors.accentPrimary}10`,
                  color: selectedCategory === category.id ? currentTheme.colors.background : currentTheme.colors.accentPrimary,
                }}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mb-8 p-4 rounded-lg"
                style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Categories</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setShowFilters(false)
                      }}
                      className="px-4 py-2 rounded-full font-bold transition-all"
                      style={{
                        backgroundColor: selectedCategory === category.id ? currentTheme.colors.accentPrimary : `${currentTheme.colors.accentPrimary}20`,
                        color: selectedCategory === category.id ? currentTheme.colors.background : currentTheme.colors.accentPrimary,
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="group rounded-lg overflow-hidden"
                  style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}
                >
                  {/* Image */}
                  <Link href={product.link}>
                    <div className="relative w-full aspect-[2/3] overflow-hidden cursor-pointer">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-4">
                    <Link href={product.link}>
                      <h3 className="font-bold text-sm leading-tight group-hover:text-yellow-400 transition-colors cursor-pointer mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < Math.floor(product.rating) ? currentTheme.colors.accentPrimary : `${currentTheme.colors.accentPrimary}30`}
                            color={currentTheme.colors.accentPrimary}
                          />
                        ))}
                      </div>
                      <span style={{ color: currentTheme.colors.textSecondary }} className="text-xs">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price and Cart */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold" style={{ color: currentTheme.colors.accentPrimary }}>
                        ${product.price}
                      </span>
                      <motion.button
                        onClick={() => addToCart(product.id)}
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: currentTheme.colors.accentPrimary }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ShoppingCart size={18} style={{ color: currentTheme.colors.background }} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <p style={{ color: currentTheme.colors.textSecondary }} className="text-lg">
                No products found matching your search
              </p>
            </motion.div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 p-8 sm:p-12 rounded-lg text-center"
            style={{
              backgroundColor: `${currentTheme.colors.accentPrimary}10`,
              border: `2px solid ${currentTheme.colors.accentPrimary}`,
            }}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: currentTheme.colors.accentPrimary }}>
              STAY INFORMED
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: currentTheme.colors.textSecondary }}>
              Subscribe to our newsletter for exclusive updates on new releases and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-6 py-3 rounded-lg"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  border: `1px solid ${currentTheme.colors.accentPrimary}`,
                  color: currentTheme.colors.textPrimary,
                }}
              />
              <button
                className="px-8 py-3 font-bold rounded-lg whitespace-nowrap"
                style={{
                  backgroundColor: currentTheme.colors.accentPrimary,
                  color: currentTheme.colors.background,
                }}
              >
                SUBSCRIBE
              </button>
            </div>
          </motion.div>
        </div>

        {/* Professional Floating Bottom Navigation Bar - 5 Icon Buttons */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="fixed bottom-0 left-0 right-0 flex justify-center items-center pb-6 pointer-events-none z-50"
        >
          <div
            className="flex gap-3 px-4 py-3 rounded-full pointer-events-auto backdrop-blur-md"
            style={{
              backgroundColor: `${currentTheme.colors.backgroundSecondary}f0`,
              border: `2px solid ${currentTheme.colors.accentPrimary}`,
              boxShadow: `0 12px 40px ${currentTheme.colors.accentPrimary}30`,
            }}
          >
            {/* Button 1: Shop All */}
            <Link href="/shop">
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  className="p-3 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: `${currentTheme.colors.accentPrimary}15`,
                    color: currentTheme.colors.accentPrimary,
                    border: `1px solid ${currentTheme.colors.accentPrimary}30`,
                  }}
                  title="Shop All"
                >
                  <ShoppingCart size={24} />
                </button>
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div
                    className="px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap"
                    style={{
                      backgroundColor: currentTheme.colors.accentPrimary,
                      color: currentTheme.colors.background,
                    }}
                  >
                    Shop All
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Button 2: Apparel Filter */}
            <motion.div
              className="group relative"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={() => setSelectedCategory("apparel")}
                className="p-3 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: selectedCategory === "apparel" ? currentTheme.colors.accentPrimary : `${currentTheme.colors.accentPrimary}15`,
                  color: selectedCategory === "apparel" ? currentTheme.colors.background : currentTheme.colors.accentPrimary,
                  border: `1px solid ${selectedCategory === "apparel" ? currentTheme.colors.accentPrimary : currentTheme.colors.accentPrimary}30`,
                }}
                title="Apparel"
              >
                <Tag size={24} />
              </button>
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div
                  className="px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap"
                  style={{
                    backgroundColor: currentTheme.colors.accentPrimary,
                    color: currentTheme.colors.background,
                  }}
                >
                  Apparel
                </div>
              </div>
            </motion.div>

            {/* Button 3: Characters */}
            <Link href="/characters">
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  className="p-3 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: `${currentTheme.colors.accentPrimary}15`,
                    color: currentTheme.colors.accentPrimary,
                    border: `1px solid ${currentTheme.colors.accentPrimary}30`,
                  }}
                  title="Characters"
                >
                  <Users size={24} />
                </button>
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div
                    className="px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap"
                    style={{
                      backgroundColor: currentTheme.colors.accentPrimary,
                      color: currentTheme.colors.background,
                    }}
                  >
                    Characters
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Button 4: About */}
            <Link href="/about">
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  className="p-3 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: `${currentTheme.colors.accentPrimary}15`,
                    color: currentTheme.colors.accentPrimary,
                    border: `1px solid ${currentTheme.colors.accentPrimary}30`,
                  }}
                  title="About"
                >
                  <Info size={24} />
                </button>
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div
                    className="px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap"
                    style={{
                      backgroundColor: currentTheme.colors.accentPrimary,
                      color: currentTheme.colors.background,
                    }}
                  >
                    About
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Button 5: Cart with Badge */}
            <Link href="/cart">
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  className="p-3 rounded-lg transition-all duration-300 relative"
                  style={{
                    backgroundColor: currentTheme.colors.accentPrimary,
                    color: currentTheme.colors.background,
                    border: `1px solid ${currentTheme.colors.accentPrimary}`,
                  }}
                  title="Cart"
                >
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full font-bold text-sm"
                      style={{
                        backgroundColor: currentTheme.colors.accentSecondary || '#ff4444',
                        color: currentTheme.colors.background,
                      }}
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </button>
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div
                    className="px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap"
                    style={{
                      backgroundColor: currentTheme.colors.accentPrimary,
                      color: currentTheme.colors.background,
                    }}
                  >
                    Cart {cart.length > 0 && `(${cart.length})`}
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  )
}
