'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Plus } from 'lucide-react'

interface CarouselItem {
  id: string | number
  title: string
  description: string
  image: string
  price?: number
  category?: string
}

interface NetflixCarouselProps {
  title: string
  items: CarouselItem[]
  onItemClick?: (item: CarouselItem) => void
}

export function NetflixCarousel({ title, items, onItemClick }: NetflixCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 0)
      setShowRightArrow(
        scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
      )
    }
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6 px-4">{title}</h2>

      <div className="relative group px-4">
        {/* Left Arrow */}
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>
        )}

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-scroll scrollbar-hide"
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onItemClick?.(item)}
              className="relative flex-shrink-0 w-80 h-48 rounded-lg overflow-hidden cursor-pointer group/item"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover/item:scale-110 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm line-clamp-2">{item.title}</h3>
                    <p className="text-white/70 text-xs mt-1 line-clamp-2">{item.description}</p>
                  </div>
                  {item.price && (
                    <span className="text-yellow-400 font-bold text-sm whitespace-nowrap ml-2">
                      ${item.price}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-sm"
                  >
                    <Play className="w-4 h-4 text-white fill-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-sm"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </div>
    </div>
  )
}
