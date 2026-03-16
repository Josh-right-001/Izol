'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Home, Wallet, Settings, Search, Heart, Star, Truck, ShieldCheck, CreditCard, ArrowRight, Menu, X } from 'lucide-react'

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  rating: number
  reviews: number
  inStock: boolean
}

const products: Product[] = [
  {
    id: '1',
    name: 'Royal Golden Crown',
    category: 'Accessories',
    price: 245,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0026-KsdQ6cFRJai917jif4Megu98G43PyT.jpg',
    rating: 4.9,
    reviews: 128,
    inStock: true,
  },
  {
    id: '2',
    name: 'Isolele Comic Vol. 1',
    category: 'Comics',
    price: 34.99,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0025-zDnbqzZHrJbuM1puyg17A6Fn3GGjYJ.jpg',
    rating: 4.8,
    reviews: 89,
    inStock: true,
  },
  {
    id: '3',
    name: 'Ceremonial Robe',
    category: 'Fashion',
    price: 890,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0073-CENE1zQHLu9ymMqgGZ66aICSO0bfMT.jpg',
    rating: 5.0,
    reviews: 64,
    inStock: true,
  },
  {
    id: '4',
    name: 'Flame Heritage Vest',
    category: 'Fashion',
    price: 650,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0071-bufysoFw95vpyBrNbUwoqxhq7HdG1F.jpg',
    rating: 4.7,
    reviews: 45,
    inStock: true,
  },
  {
    id: '5',
    name: 'Beaded Heritage Jacket',
    category: 'Fashion',
    price: 780,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0076-cpHU65HQFsw4mpD5Ec8Gzd0Ic5BWHN.jpg',
    rating: 4.9,
    reviews: 73,
    inStock: true,
  },
  {
    id: '6',
    name: 'Minimalist Cream Collection',
    category: 'Fashion',
    price: 560,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0069-EuegoQTFGgiK1gYg6XHvtBqpsr9sHx.jpg',
    rating: 4.6,
    reviews: 52,
    inStock: true,
  },
  {
    id: '7',
    name: 'Night Runway Ensemble',
    category: 'Fashion',
    price: 1290,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0072-5jS7sfr7ncbO0riemesMxVLTXah9Ce.jpg',
    rating: 5.0,
    reviews: 91,
    inStock: true,
  },
  {
    id: '8',
    name: 'Woven Masterpiece Cape',
    category: 'Fashion',
    price: 1650,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0078-wHjaMSAcNSGJfqLeJnkjpICzbSAQ.jpg',
    rating: 4.95,
    reviews: 156,
    inStock: true,
  },
  {
    id: '9',
    name: 'Haute Couture Gown',
    category: 'Fashion',
    price: 2450,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0063-bgpBMx05R5HyUqrzC6HHA5qE1XW1LU.jpg',
    rating: 4.8,
    reviews: 203,
    inStock: true,
  },
]

const categories = ['All', 'Fashion', 'Comics', 'Accessories']

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState<string[]>([])
  const [showCart, setShowCart] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const cartTotal = cartItems.reduce((sum, id) => {
    const product = products.find(p => p.id === id)
    return sum + (product?.price || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-black">
            ISOLELE SHOP
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search heroes, crowns, collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="p-2 text-gray-600 hover:text-black transition">
              <Home size={20} />
            </Link>
            <button className="p-2 text-gray-600 hover:text-black transition">
              <Wallet size={20} />
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 text-gray-600 hover:text-black transition"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button className="p-2 text-gray-600 hover:text-black transition">
              <Settings size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm"
              />
            </div>
            <div className="flex gap-4">
              <Link href="/" className="flex-1 py-2 text-center bg-gray-50 rounded-lg hover:bg-gray-100">
                Home
              </Link>
              <button className="flex-1 py-2 text-center bg-gray-50 rounded-lg hover:bg-gray-100">
                Wallet
              </button>
              <button className="flex-1 py-2 text-center bg-gray-50 rounded-lg hover:bg-gray-100">
                Bag ({cartItems.length})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4">THE CHOSEN LUXE</h1>
          <p className="text-gray-600 text-lg">Discover premium African-inspired fashion and collectibles</p>
        </div>

        {/* Categories - Pill Style */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative h-80 bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.rating >= 4.9 && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                        BESTSELLER
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-bold text-black mb-3 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price & Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-black">
                        ${product.price}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCartItems([...cartItems, product.id])}
                        className="bg-black text-white p-3 rounded-lg hover:bg-gray-900 transition"
                      >
                        <ShoppingCart size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-3 z-40">
        <Link href="/" className="flex flex-col items-center gap-1 text-gray-600 hover:text-black">
          <Home size={24} />
          <span className="text-xs">Home</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-black">
          <Wallet size={24} />
          <span className="text-xs">Wallet</span>
        </button>
        <button
          onClick={() => setShowCart(true)}
          className="relative flex flex-col items-center gap-1 text-gray-600 hover:text-black"
        >
          <ShoppingCart size={24} />
          <span className="text-xs">Bag</span>
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-black">
          <Settings size={24} />
          <span className="text-xs">Settings</span>
        </button>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCart(false)}
            className="fixed inset-0 bg-black/50 z-50"
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Your Bag</h2>
                  <button onClick={() => setShowCart(false)} className="p-2">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 mb-8">
                  {cartItems.length > 0 ? (
                    cartItems.map((id, idx) => {
                      const product = products.find(p => p.id === id)
                      return product ? (
                        <div key={idx} className="flex gap-4 pb-4 border-b border-gray-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-lg font-bold text-yellow-600">${product.price}</p>
                          </div>
                          <button
                            onClick={() => setCartItems(cartItems.filter((_, i) => i !== idx))}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : null
                    })
                  ) : (
                    <p className="text-center text-gray-500 py-8">Your bag is empty</p>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="space-y-4 border-t border-gray-100 pt-6">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-yellow-600">${cartTotal.toFixed(2)}</span>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-600">Payment Method</p>
                      <button className="w-full flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-black transition">
                        <CreditCard size={20} />
                        <span>Card</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-black transition">
                        <Wallet size={20} />
                        <span>Crypto / Web3</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-black transition">
                        <ShieldCheck size={20} />
                        <span>Apple Pay / Google Pay</span>
                      </button>
                    </div>

                    {/* Checkout Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition"
                    >
                      CHECKOUT
                      <ArrowRight size={20} />
                    </motion.button>

                    {/* Trust Badges */}
                    <div className="flex gap-2 text-xs text-gray-600">
                      <ShieldCheck size={16} />
                      <span>Secure checkout powered by global payment networks</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
