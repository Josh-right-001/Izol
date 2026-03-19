'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Home, Wallet, Settings, Search, Heart, Star, Truck, ShieldCheck, CreditCard, ArrowRight, X, Plus, Minus, Volume2, Send } from 'lucide-react'
import { NetflixCarousel } from '@/components/netflix-carousel'
import { useLanguage, languages } from '@/lib/language-context'

// Products Data
const allProducts = [
  // Comics Section
  { id: 'comic1', name: 'ZAIIRE: Prince of Kongo Vol.1', category: 'Comics', price: 16.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260308-WA0059-OkF8yRzmgCR4tSL82YID7CB8nYzZsD.jpg', rating: 4.9, reviews: 245, inStock: true },
  { id: 'comic2', name: 'KIMOYA: The Rising Kandake', category: 'Comics', price: 18.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0025-zDnbqzZHrJbuM1puyg17A6Fn3GGjYJ.jpg', rating: 4.8, reviews: 189, inStock: true },
  { id: 'comic3', name: 'ZATTAR: The Blood Architect', category: 'Comics', price: 19.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0026-KsdQ6cFRJai917jif4Megu98G43PyT.jpg', rating: 5.0, reviews: 156, inStock: true },
  { id: 'comic4', name: 'Complete Isolele Collection', category: 'Comics', price: 89.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260308-WA0059-OkF8yRzmgCR4tSL82YID7CB8nYzZsD.jpg', rating: 4.95, reviews: 487, inStock: true },
  { id: 'comic5', name: 'Art of Isolele: Behind the Scenes', category: 'Comics', price: 39.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0025-zDnbqzZHrJbuM1puyg17A6Fn3GGjYJ.jpg', rating: 4.7, reviews: 123, inStock: true },
  { id: 'comic6', name: 'The Chosen Ones: Official Guide', category: 'Comics', price: 44.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0026-KsdQ6cFRJai917jif4Megu98G43PyT.jpg', rating: 4.85, reviews: 201, inStock: true },

  // Accessories Section - Premium Collection (18 items)
  { id: 'acc1', name: 'Lionpard White Cap', category: 'Accessories', price: 84.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0024-PTyKioNdMd7zYsJi4IVX185yfLHH7x.jpg', rating: 4.95, reviews: 178, inStock: true },
  { id: 'acc2', name: 'Isolele Premium Sneaker Purple', category: 'Accessories', price: 189.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260114-WA0050-RQVIgqEeFWEiZTH0ZKIzJC4QIycN2H.jpg', rating: 4.9, reviews: 156, inStock: true },
  { id: 'acc3', name: 'African Tribal Mask Gold', category: 'Accessories', price: 219.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0019-JdWgj1mRb9mtwcIJZTa9CsJSEXTFRu.jpg', rating: 5.0, reviews: 142, inStock: true },
  { id: 'acc4', name: 'Royal Golden Crown Bottle', category: 'Accessories', price: 245.00, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0021-UM1srzyiV1FY2XEgVA9d0OmKHwW16g.jpg', rating: 4.95, reviews: 201, inStock: true },
  { id: 'acc5', name: 'Roiroyal Black Sunglasses', category: 'Accessories', price: 159.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0016-ttUVpeMTiwMjIw0mK2eBBBQQl6Xz8o.jpg', rating: 4.85, reviews: 134, inStock: true },
  { id: 'acc6', name: 'Premium Sneaker Blend Cream', category: 'Accessories', price: 179.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0018-sJdbOo23H2uG49qJQYwSj1ZcmcIxwy.jpg', rating: 4.88, reviews: 167, inStock: true },
  { id: 'acc7', name: 'Panthera Golden Lion Mask', category: 'Accessories', price: 229.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0018-sJdbOo23H2uG49qJQYwSj1ZcmcIxwy.jpg', rating: 4.95, reviews: 189, inStock: true },
  { id: 'acc8', name: 'ZAIIRE Premium Perfume Crown', category: 'Accessories', price: 129.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0023-Y2aUaQd0ltf6OoSXY05mCBoWOvoWuP.jpg', rating: 4.9, reviews: 215, inStock: true },
  { id: 'acc9', name: 'Panthera Black Cap Premium', category: 'Accessories', price: 99.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260114-WA0035-rAKjX0p65zftiqQjbjh1gUWSg7ymnU.jpg', rating: 4.8, reviews: 156, inStock: true },
  { id: 'acc10', name: 'Isolele White Cap Logo', category: 'Accessories', price: 84.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260114-WA0040-xj7hQixkIMza6zNORtVgYdVrQxPTWR.jpg', rating: 4.85, reviews: 178, inStock: true },
  { id: 'acc11', name: 'Luxury Airplane Sneaker Cream', category: 'Accessories', price: 249.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0017-dWEUyT9LHaQSWmFTuSZffZS5hNA2bz.jpg', rating: 4.92, reviews: 201, inStock: true },
  { id: 'acc12', name: 'Roiroyal Square Sunglasses', category: 'Accessories', price: 169.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0028-pB2xVCrb5Fl9Pph4AaM09INWPj7maW.jpg', rating: 4.87, reviews: 145, inStock: true },
  { id: 'acc13', name: 'Premium Sneaker Blend Purple', category: 'Accessories', price: 199.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260308-WA0001-QrVZTtkAVYn3mWY88n6vJ9CV4Ohnaj.jpg', rating: 4.91, reviews: 189, inStock: true },
  { id: 'acc14', name: 'Sneaker Cream Beige Green', category: 'Accessories', price: 189.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0020-71W79kwvoXaNmPl632UdjPaMcfeON9.jpg', rating: 4.86, reviews: 167, inStock: true },
  { id: 'acc15', name: 'Isolele Premium Belt Black', category: 'Accessories', price: 139.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0027-C7jiViIgJCjv5wSexjfhnMQjLmKlup.jpg', rating: 4.9, reviews: 198, inStock: true },
  { id: 'acc16', name: 'ZAIIRE Prince Perfume Bottle', category: 'Accessories', price: 159.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0022-8Ay87m0csZL4OfMgx8yd72hygYrVMB.jpg', rating: 4.93, reviews: 213, inStock: true },
  { id: 'acc17', name: 'Zaiire Character Cap Black', category: 'Accessories', price: 94.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0025-iDNm79Ha7Vy6lNh8Y6nesEzVhOkDqS.jpg', rating: 4.82, reviews: 134, inStock: true },
  { id: 'acc18', name: 'Zaiire Warrior Character Cap', category: 'Accessories', price: 104.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260304-WA0026-EnAOyZxJZplbmaBdmt0bxcQ8l1R7ik.jpg', rating: 4.88, reviews: 156, inStock: true },
  { id: 'acc19', name: 'Lion King Golden Mask', category: 'Accessories', price: 279.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260308-WA0004-qGqDLI2gzqKHnoXg5IYR57vFrhQfTu.jpg', rating: 4.96, reviews: 224, inStock: true },

  // Fashion Section
  { id: 'fashion1', name: 'Ceremonial Robe Deluxe', category: 'Fashion', price: 425.00, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0073-CENE1zQHLu9ymMqgGZ66aICSO0bfMT.jpg', rating: 5.0, reviews: 201, inStock: true },
  { id: 'fashion2', name: 'Flame Heritage Vest', category: 'Fashion', price: 299.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0071-bufysoFw95vpyBrNbUwoqxhq7HdG1F.jpg', rating: 4.8, reviews: 167, inStock: true },
  { id: 'fashion3', name: 'Beaded Heritage Jacket', category: 'Fashion', price: 379.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0076-cpHU65HQFsw4mpD5Ec8Gzd0Ic5BWHN.jpg', rating: 4.9, reviews: 234, inStock: true },
  { id: 'fashion4', name: 'Minimalist Cream Collection', category: 'Fashion', price: 249.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0069-EuegoQTFGgiK1gYg6XHvtBqpsr9sHx.jpg', rating: 4.6, reviews: 89, inStock: true },
  { id: 'fashion5', name: 'Night Runway Ensemble', category: 'Fashion', price: 549.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0072-5jS7sfr7ncbO0riemesMxVLTXah9Ce.jpg', rating: 5.0, reviews: 312, inStock: true },
  { id: 'fashion6', name: 'Woven Masterpiece Cape', category: 'Fashion', price: 649.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0078-wHjaMSAcNSGJfqLeJnkjpICzbSAQ.jpg', rating: 4.95, reviews: 178, inStock: true },
  { id: 'fashion7', name: 'Haute Couture Evening Gown', category: 'Fashion', price: 899.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0063-bgpBMx05R5HyUqrzC6HHA5qE1XW1LU.jpg', rating: 4.85, reviews: 267, inStock: true },
  { id: 'fashion8', name: 'Royal Fashion Complete Set', category: 'Fashion', price: 1299.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0073-CENE1zQHLu9ymMqgGZ66aICSO0bfMT.jpg', rating: 4.9, reviews: 423, inStock: true },
  { id: 'fashion9', name: 'Fashion Runway Collection', category: 'Fashion', price: 799.99, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0073-CENE1zQHLu9ymMqgGZ66aICSO0bfMT.jpg', rating: 4.75, reviews: 189, inStock: true },
]

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function ShopPage() {
  const [activeNav, setActiveNav] = useState<'home' | 'wallet' | 'bag' | 'settings'>('home')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [language, setLanguage] = useState('en')
  const [chatOpen, setChatOpen] = useState(false)
  const [aiMessages, setAiMessages] = useState<Array<{role: 'user'|'ai', text: string}>>([])
  const [checkoutStep, setCheckoutStep] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const chatInputRef = useRef<HTMLInputElement>(null)

  const categories = ['All', 'Comics', 'Accessories', 'Fashion']
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
  ]

  const filteredProducts = allProducts.filter(p => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const addToCart = (product: typeof allProducts[0]) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      }])
    }
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ))
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingCost = cartTotal > 200 ? 0 : 25

  const handleAIMessage = (msg: string) => {
    if (!msg.trim()) return
    setAiMessages([...aiMessages, { role: 'user', text: msg }])
    setTimeout(() => {
      setAiMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'I can help you negotiate prices or find the perfect item! What would you like?' 
      }])
    }, 500)
    if (chatInputRef.current) chatInputRef.current.value = ''
  }

  const bgColor = isDarkMode ? 'bg-black' : 'bg-white'
  const textColor = isDarkMode ? 'text-white' : 'text-black'
  const cardBg = isDarkMode ? 'bg-gray-900' : 'bg-gray-50'

  return (
    <div className={`${bgColor} ${textColor} min-h-screen transition-colors duration-300`}>
      {/* Logo Top-Left */}
      <div className="fixed top-4 left-4 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center font-black text-black text-sm">
        ISO
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeNav === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-32">
            {/* Search Bar */}
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-yellow-500/20 p-4">
              <div className="max-w-2xl mx-auto flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${cardBg} border border-yellow-500/30 focus:border-yellow-400 outline-none`}
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="sticky top-16 z-40 backdrop-blur-xl bg-black/30 p-4 border-b border-yellow-500/20">
              <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto">
                {categories.map(cat => (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    whileHover={{ scale: 1.05 }}
                    className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-yellow-400 text-black'
                        : `${cardBg} border border-yellow-500/30 hover:border-yellow-400`
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-6xl mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`${cardBg} rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300`}
                  >
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg line-clamp-2">{product.name}</h3>
                      <p className="text-yellow-400 text-sm mb-2">{product.category}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating} ({product.reviews} reviews)</span>
                      </div>

                      {/* Price */}
                      <p className="text-2xl font-black text-yellow-400 mb-4">${product.price.toFixed(2)}</p>

                      {/* Add to Cart */}
                      <motion.button
                        onClick={() => addToCart(product)}
                        whileHover={{ scale: 1.05, backgroundColor: '#FBBF24' }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg transition-all"
                      >
                        ADD TO CART
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeNav === 'wallet' && (
          <motion.div key="wallet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto p-4 pb-32">
            <h1 className="text-3xl font-bold mt-8 mb-6">My Wallet</h1>
            <div className={`${cardBg} rounded-2xl p-6 border border-yellow-500/30`}>
              <p className="text-gray-400 mb-4">Balance: <span className="text-yellow-400 font-bold text-xl">$0.00</span></p>
              <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg mb-4">ADD FUNDS</button>
              <button className="w-full py-3 border border-yellow-500/50 text-yellow-400 font-bold rounded-lg">TRANSACTION HISTORY</button>
            </div>
          </motion.div>
        )}

        {activeNav === 'bag' && (
          <motion.div key="bag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto p-4 pb-32">
            <h1 className="text-3xl font-bold mt-8 mb-6">Shopping Bag</h1>
            
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">Your bag is empty</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`${cardBg} rounded-lg p-4 flex gap-4`}
                    >
                      <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-yellow-400">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-800 rounded">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-800 rounded">
                            <Plus className="w-4 h-4" />
                          </button>
                          <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-400 hover:text-red-300">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Checkout Section */}
                <div className={`${cardBg} rounded-2xl p-6 border border-yellow-500/30 space-y-4`}>
                  <div className="flex justify-between py-2 border-b border-yellow-500/20">
                    <span>Subtotal:</span>
                    <span className="font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-yellow-500/20">
                    <span>Shipping: {shippingCost === 0 ? '(FREE)' : ''}</span>
                    <span className="font-bold text-green-400">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-3 text-lg">
                    <span>Total:</span>
                    <span className="font-black text-yellow-400">${(cartTotal + shippingCost).toFixed(2)}</span>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-bold text-gray-400">SELECT PAYMENT METHOD</p>
                    {[
                      { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                      { id: 'crypto', name: 'Crypto/Web3', icon: Volume2 },
                      { id: 'apple', name: 'Apple Pay / Google Pay', icon: ArrowRight },
                    ].map(method => (
                      <motion.button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        whileHover={{ scale: 1.02 }}
                        className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${
                          paymentMethod === method.id
                            ? 'border-yellow-400 bg-yellow-500/10'
                            : `border-yellow-500/30 ${cardBg}`
                        }`}
                      >
                        <method.icon className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold">{method.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Checkout Button with Process */}
                  <motion.button
                    onClick={() => setCheckoutStep(checkoutStep === 0 ? 1 : checkoutStep === 1 ? 2 : 0)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black rounded-lg mt-4 text-lg"
                  >
                    {checkoutStep === 0 && 'PROCEED TO CHECKOUT'}
                    {checkoutStep === 1 && 'VERIFY & CONFIRM'}
                    {checkoutStep === 2 && 'ORDER CONFIRMED ✓'}
                  </motion.button>

                  {/* Checkout Progress */}
                  {checkoutStep > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30"
                    >
                      <p className="text-sm font-bold mb-3">
                        Step {checkoutStep} of 3: {checkoutStep === 1 ? 'Verify Order' : checkoutStep === 2 ? 'Process Payment' : ''}
                      </p>
                      <div className="w-full h-2 bg-yellow-500/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-yellow-400 to-amber-500"
                          animate={{ width: `${(checkoutStep / 3) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}

        {activeNav === 'settings' && (
          <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto p-4 pb-32">
            <h1 className="text-3xl font-bold mt-8 mb-6">Settings</h1>

            {/* Theme Toggle */}
            <div className={`${cardBg} rounded-2xl p-6 border border-yellow-500/30 mb-4`}>
              <h2 className="font-bold text-lg mb-4">Display</h2>
              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                whileHover={{ scale: 1.02 }}
                className="w-full p-4 bg-yellow-500 text-black font-bold rounded-lg"
              >
                Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
              </motion.button>
            </div>

            {/* Language Selection */}
            <div className={`${cardBg} rounded-2xl p-6 border border-yellow-500/30 mb-4`}>
              <h2 className="font-bold text-lg mb-4">Language</h2>
              <div className="grid grid-cols-2 gap-3">
                {languages.map(lang => (
                  <motion.button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    whileHover={{ scale: 1.05 }}
                    className={`p-3 rounded-lg font-bold transition-all ${
                      language === lang.code
                        ? 'bg-yellow-400 text-black'
                        : `${cardBg} border border-yellow-500/30`
                    }`}
                  >
                    {lang.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* AI Negotiator Bot */}
            <div className={`${cardBg} rounded-2xl p-6 border border-yellow-500/30`}>
              <h2 className="font-bold text-lg mb-4">AI Price Negotiator</h2>
              <motion.button
                onClick={() => setAiMessages([{ role: 'ai', text: 'Hello! I can help you find discounts and negotiate prices on Isolele products. What are you interested in?' }]) || setAiMessages(prev => [{ role: 'ai', text: 'Hello! I can help you find discounts and negotiate prices on Isolele products. What are you interested in?' }])}
                whileHover={{ scale: 1.02 }}
                className="w-full p-4 bg-yellow-500 text-black font-bold rounded-lg mb-4"
              >
                START AI CHAT
              </motion.button>

              {/* Chat Box */}
              {aiMessages.length > 0 && (
                <div className={`border border-yellow-500/30 rounded-lg h-64 overflow-y-auto p-4 mb-4 bg-black/50 space-y-3`}>
                  {aiMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-yellow-500/30 text-white'
                          : 'bg-yellow-500/10 border border-yellow-500/30'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  placeholder="Ask for a discount..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAIMessage(chatInputRef.current?.value || '')
                    }
                  }}
                  className={`flex-1 p-2 rounded-lg ${cardBg} border border-yellow-500/30 focus:border-yellow-400 outline-none`}
                />
                <button
                  onClick={() => handleAIMessage(chatInputRef.current?.value || '')}
                  className="p-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fashion Section with Netflix Carousel */}
      {activeNav === 'home' && (
        <div className="max-w-7xl mx-auto px-4 pb-32 mt-8">
          <NetflixCarousel
            title="Featured Fashion & Accessories"
            items={allProducts.filter(p => p.category === 'Fashion' || p.category === 'Accessories').map(p => ({
              id: p.id,
              title: p.name,
              description: `Premium ${p.category} - Rating: ${p.rating}⭐`,
              image: p.image,
              price: p.price,
              category: p.category
            }))}
            onItemClick={(item) => console.log('[v0] Clicked:', item)}
          />

          <NetflixCarousel
            title="Top-Rated Comics Collection"
            items={allProducts.filter(p => p.category === 'Comics').map(p => ({
              id: p.id,
              title: p.name,
              description: `Exclusive comic - Rating: ${p.rating}⭐`,
              image: p.image,
              price: p.price,
              category: p.category
            }))}
            onItemClick={(item) => console.log('[v0] Clicked:', item)}
          />
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-yellow-500/20 backdrop-blur-xl bg-black/80">
        <div className="max-w-2xl mx-auto flex justify-around">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'wallet', icon: Wallet, label: 'Wallet' },
            { id: 'bag', icon: ShoppingCart, label: 'Bag', badge: cart.length },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map(nav => (
            <motion.button
              key={nav.id}
              onClick={() => setActiveNav(nav.id as any)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex-1 py-4 flex flex-col items-center gap-2 font-bold transition-all relative ${
                activeNav === nav.id ? 'text-yellow-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <nav.icon className="w-6 h-6" />
              <span className="text-xs">{nav.label}</span>
              {nav.badge ? (
                <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-black">
                  {nav.badge}
                </span>
              ) : null}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
