'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ZAIIRE%20-%20PRINCE%20OF%20KONGO-5rfaF1Sj04RYxoqpyiUghbmqVm4XRK.jpg',
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
    <div className="bg-black min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-[70px] bg-black flex items-center px-5 border-b border-gray-800">
        <div className="flex flex-col">
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: 700, letterSpacing: '2px', color: '#F6B800' }}>
            ISOLELE
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#d0d0d0', textTransform: 'uppercase', fontWeight: 600 }}>
            THE CHOSEN ONES
          </div>
        </div>
      </header>

      {/* Book Hero Container */}
      <div className="flex-1 flex flex-col gap-[60px] p-6 md:p-10 overflow-y-auto">
        {/* Book Card */}
        <motion.div
          key={currentBook.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full h-screen md:h-[600px] flex items-center rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url('${currentBook.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Dark Overlay - Reduced opacity for better image visibility */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.5) 100%)'
            }}
          />

          {/* Content Container */}
          <div className="relative z-20 px-6 md:px-12 w-full flex flex-col justify-center max-w-2xl">
            {/* Book Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block w-fit"
              style={{
                display: 'inline-block',
                background: 'var(--theme-accent)',
                color: '#000',
                fontSize: '13px',
                fontWeight: 700,
                padding: '8px 14px',
                borderRadius: '3px',
                letterSpacing: '1px',
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              {currentBook.tag}
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(28px, 8vw, 38px)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: '#FFFFFF',
                marginTop: '18px',
                textTransform: 'uppercase',
                textShadow: '0 3px 10px rgba(0,0,0,0.7)'
              }}
            >
              {currentBook.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#E6E6E6',
                maxWidth: '85%',
                marginTop: '14px',
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              {currentBook.description}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6"
            >
              <Link
                href={currentBook.cta.link}
                style={{
                  display: 'inline-block',
                  background: 'var(--theme-accent)',
                  color: '#000',
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '14px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontFamily: 'Montserrat, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffdb33';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--theme-accent)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {currentBook.cta.text}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between px-6 md:px-12 gap-4">
          <button
            onClick={handlePrev}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
            aria-label="Previous book"
          >
            ← PREVIOUS
          </button>

          <div className="flex gap-2">
            {bookCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-yellow-500 w-8' : 'bg-gray-600'
                }`}
                aria-label={`Go to book ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
            aria-label="Next book"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
