'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, ShoppingBag } from 'lucide-react'

export default function CharactersPage() {
  const [activeTab, setActiveTab] = useState<'characters' | 'fashion'>('characters')

  const characters = [
    {
      id: 1,
      name: 'ZAIIRE',
      subtitle: 'Prince of Kongo',
      description: 'The destined heir with ancient power flowing through his veins. Zaiire carries the weight of his kingdom and the hope of a golden age.',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/prince-ox0FdH9wbLoeDdx7mHVckNlMprgvHz.jpg',
      color: 'from-amber-500 to-yellow-600',
      role: 'Protagonist'
    },
    {
      id: 2,
      name: 'KIMOYA',
      subtitle: 'The Rising Kandake',
      description: 'A warrior queen with wisdom beyond her years. Kimoya leads with grace and commands respect from all who cross her path.',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KIMOYA%20-%20THE%20RISING%20KANDAKE-KPVfRjZKSMT6VuFheyzKCy1xBQpZnR.jpg',
      color: 'from-red-500 to-orange-600',
      role: 'Warrior Queen'
    },
    {
      id: 3,
      name: 'MOKELE',
      subtitle: 'Prince of the Streets',
      description: 'Crowned by street justice and raw power. Mokele represents the resilience and strength of the urban kingdom.',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mokele-DaZAw5lGSh5dXaIlmNIwLSZM5rkRXa.jpg',
      color: 'from-slate-700 to-slate-900',
      role: 'Street Legend'
    },
    {
      id: 4,
      name: 'BAMBULA',
      subtitle: 'The Warrior Spirit',
      description: 'A fierce warrior whose spirit burns with ancestral fire. Bambula fights for freedom and the soul of her people.',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bambula-ls0hN70yV5GtjomnOMEfkM1XX9Lkbl.jpg',
      color: 'from-amber-600 to-red-600',
      role: 'Warrior'
    },
    {
      id: 5,
      name: 'KING KUFULULA',
      subtitle: 'The Ancient Ruler',
      description: 'A legendary king whose legacy echoes through generations. Kufulula embodies the golden age of African kingdoms.',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/King%20kufulula-AwyQTUu7D9V45Zw8nIi0inoUUR25JP.jpg',
      color: 'from-yellow-500 to-amber-700',
      role: 'Ancient King'
    }
  ]

  const fashionItems = [
    {
      id: 1,
      name: 'Geometric Crown Collection',
      category: 'High Fashion',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0067-NCVgXUh0AgQMsgHPHvQgPd1lYUCNDh.jpg',
      price: '$2,500'
    },
    {
      id: 2,
      name: 'Urban Leopard Ensemble',
      category: 'Streetwear',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0026-KsdQ6cFRJai917jif4Megu98G43PyT.jpg',
      price: '$1,800'
    },
    {
      id: 3,
      name: 'Golden Pattern Runway',
      category: 'Couture',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0073-CENE1zQHLu9ymMqgGZ66aICSO0bfMT.jpg',
      price: '$3,200'
    },
    {
      id: 4,
      name: 'Ceremonial Flame',
      category: 'Traditional',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0071-bufysoFw95vpyBrNbUwoqxhq7HdG1F.jpg',
      price: '$2,100'
    },
    {
      id: 5,
      name: 'Beaded Heritage',
      category: 'Artisan',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0076-cpHU65HQFsw4mpD5Ec8Gzd0Ic5BWHN.jpg',
      price: '$2,800'
    },
    {
      id: 6,
      name: 'Minimalist Cream',
      category: 'Contemporary',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0069-EuegoQTFGgiK1gYg6XHvtBqpsr9sHx.jpg',
      price: '$1,600'
    },
    {
      id: 7,
      name: 'Night Runway',
      category: 'Evening Wear',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0072-5jS7sfr7ncbO0riemesMxVLTXah9Ce.jpg',
      price: '$2,900'
    },
    {
      id: 8,
      name: 'Woven Masterpiece',
      category: 'Artisan',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0078-wHjaMSAcNSGJfqLeJnkjpICzbSAQ.jpg',
      price: '$3,500'
    },
    {
      id: 9,
      name: 'Haute Couture Evening',
      category: 'Couture',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260311-WA0063-bgpBMx05R5HyUqrzC6HHA5qE1XW1LU.jpg',
      price: '$4,200'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative pt-20 pb-16 px-6 md:px-12 border-b border-yellow-500/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-4">
            THE CHOSEN ONES
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Discover the legendary characters and exclusive fashion of the Isolele Universe
          </p>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-20 z-40 bg-black/90 backdrop-blur-xl border-b border-yellow-500/20">
        <div className="flex justify-center px-6">
          <div className="flex gap-2">
            <motion.button
              onClick={() => setActiveTab('characters')}
              className={`px-8 py-4 font-bold text-lg transition-all flex items-center gap-2 ${
                activeTab === 'characters'
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-5 h-5" />
              CHARACTERS
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('fashion')}
              className={`px-8 py-4 font-bold text-lg transition-all flex items-center gap-2 ${
                activeTab === 'fashion'
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-5 h-5" />
              FASHION MARKET
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'characters' ? (
          <CharactersGrid key="characters" characters={characters} />
        ) : (
          <FashionMarket key="fashion" items={fashionItems} />
        )}
      </AnimatePresence>
    </div>
  )
}

function CharactersGrid({ characters }: { characters: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 md:p-12"
    >
      {characters.map((character, idx) => (
        <motion.div
          key={character.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-900 to-black border border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-300"
        >
          {/* Character Image */}
          <div className="relative h-96 overflow-hidden">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-black text-yellow-400">{character.name}</h3>
                <p className="text-sm text-amber-500 font-bold">{character.subtitle}</p>
              </div>
              <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-xs font-bold text-yellow-300">
                {character.role}
              </span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {character.description}
            </p>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#FBBF24' }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 bg-yellow-500 text-black font-bold rounded-lg transition-all"
            >
              READ STORY
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

function FashionMarket({ items }: { items: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 md:p-12"
    >
      {/* Fashion Filters */}
      <div className="mb-12 flex gap-4 overflow-x-auto pb-4">
        {['All Items', 'High Fashion', 'Streetwear', 'Couture', 'Artisan', 'Traditional'].map((filter) => (
          <motion.button
            key={filter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-sm font-bold text-yellow-400 hover:bg-yellow-500/20 transition-all whitespace-nowrap"
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {/* Fashion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            className="group overflow-hidden rounded-xl bg-gradient-to-b from-gray-900 to-black border border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
            whileHover={{ y: -8 }}
          >
            {/* Fashion Item Image */}
            <div className="relative h-80 overflow-hidden bg-gray-800">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-125 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-4 py-2 bg-yellow-500/90 text-black text-xs font-bold rounded-full">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Fashion Details */}
            <div className="relative p-6">
              <h3 className="text-xl font-black text-yellow-400 mb-2">{item.name}</h3>
              <p className="text-3xl font-black text-white mb-4">{item.price}</p>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#FBBF24' }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-4 bg-yellow-500 text-black font-bold rounded-lg transition-all"
              >
                ADD TO CART
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
