'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookCard {
  id: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  cta: {
    text: string;
    link: string;
  };
}

const bookCards: BookCard[] = [
  {
    id: 'zaiire',
    title: 'THE GOLDEN AGE OF BLACK AFRICAN COMICS',
    description: 'Experience the epic first chapter of the Isolele Universe. A thrilling adventure echoing the spirit of The Lion King and Black Panther.',
    tag: 'ZAIIRE: PRINCE OF KONGO',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260308-WA0059-OkF8yRzmgCR4tSL82YID7CB8nYzZsD.jpg',
    cta: { text: 'DISCOVER NOW', link: '/shop/zaiire' }
  },
  {
    id: 'kimoya',
    title: 'KIMOYA - THE RISING KANDAKE',
    description: 'An epic tale of sovereignty and wisdom. Follow Kimoya as she rises to claim her throne and restore ancient glory through courage and ancestral magic.',
    tag: 'KIMOYA: THE RISING KANDAKE',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KIMOYA%20-%20THE%20RISING%20KANDAKE-KPVfRjZKSMT6VuFheyzKCy1xBQpZnR.jpg',
    cta: { text: 'EXPLORE STORY', link: '/shop/kimoya' }
  },
  {
    id: 'mokele',
    title: 'MOKELE - CROWNED BY THE STREETS',
    description: 'From the #1 House of African Royalty Bestselling Author. A story of power, destiny, and street justice in the heart of the continent.',
    tag: 'MOKELE: PRINCE OF THE STREETS',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mokele-DaZAw5lGSh5dXaIlmNIwLSZM5rkRXa.jpg',
    cta: { text: 'READ NOW', link: '/shop/mokele' }
  }
];

export function BookHeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentBook = bookCards[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bookCards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + bookCards.length) % bookCards.length);
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('${currentBook.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          />

          {/* Premium Gradient Overlay - Transparent Top to Dark Bottom */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `linear-gradient(
                180deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.2) 30%,
                rgba(0, 0, 0, 0.5) 60%,
                rgba(0, 0, 0, 0.9) 100%
              )`,
            }}
          />

          {/* Left Accent Gradient */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `linear-gradient(
                90deg,
                rgba(212, 175, 55, 0.15) 0%,
                rgba(212, 175, 55, 0) 40%
              )`,
            }}
          />

          {/* Content - Full Screen Flex Layout */}
          <div className="absolute inset-0 w-full h-full flex flex-col justify-between items-start p-8 md:p-12 lg:p-16">
            {/* Top Logo Area */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 z-20"
            >
              <div className="w-12 h-12 rounded-lg border-2 border-[#FFD000] flex items-center justify-center">
                <div className="w-6 h-6 rounded-sm bg-[#FFD000]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-wider" style={{ fontFamily: 'Montserrat, sans-serif', color: '#FFD000' }}>
                  ISOLELE
                </h1>
                <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mt-1">
                  The Chosen Ones
                </p>
              </div>
            </motion.div>

            {/* Bottom Content Area */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl z-20 mb-8"
            >
              {/* Tag */}
              <motion.div
                className="inline-block px-4 py-2 rounded-full border border-[#FFD000]"
                style={{ backgroundColor: '#FFD00020' }}
              >
                <p className="text-sm font-bold tracking-wider uppercase" style={{ color: '#FFD000' }}>
                  {currentBook.tag}
                </p>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mt-6 text-white"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                  letterSpacing: '-0.02em',
                }}
              >
                {currentBook.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg md:text-xl text-gray-300 mt-6 leading-relaxed max-w-xl"
              >
                {currentBook.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8"
              >
                <Link
                  href={currentBook.cta.link}
                  className="inline-block px-8 py-4 bg-[#FFD000] text-black font-bold text-lg uppercase tracking-wider rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {currentBook.cta.text}
                </Link>
              </motion.div>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-6 z-20">
              {/* Dots Indicator */}
              <div className="flex gap-3">
                {bookCards.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="h-2 rounded-full transition-all duration-300"
                    animate={{
                      width: index === currentIndex ? 24 : 8,
                      backgroundColor: index === currentIndex ? '#FFD000' : 'rgba(255, 208, 0, 0.4)',
                    }}
                  />
                ))}
              </div>

              {/* Arrow Buttons */}
              <div className="flex gap-3 ml-6">
                <motion.button
                  onClick={handlePrev}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full border-2 border-[#FFD000] flex items-center justify-center text-[#FFD000] hover:bg-[#FFD00020] transition-colors"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full border-2 border-[#FFD000] flex items-center justify-center text-[#FFD000] hover:bg-[#FFD00020] transition-colors"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Counter - Top Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 right-8 z-30 text-right"
      >
        <p className="text-sm text-gray-400 tracking-wider font-mono">
          <span className="text-[#FFD000] font-bold text-lg">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="text-gray-600"> / </span>
          <span className="text-lg font-bold">{String(bookCards.length).padStart(2, '0')}</span>
        </p>
      </motion.div>
    </div>
  );
}
