"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X, ShoppingBag, Settings, Home, Users, Zap, BookOpen } from "lucide-react"
import { useTheme, themes } from "@/lib/theme-context"
import { useLanguage, languages } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

const characterLinks = [
  { name: "ZAIRE - PRINCE DU KONGO", href: "/characters/zaire" },
  { name: "BAMBULA - LA GARDIENNE", href: "/characters/bambula" },
  { name: "KING KUFULULA - LE ROI", href: "/characters/kufulula" },
  { name: "MOKELE - LE PRINCE", href: "/characters/mokele" },
]

export function SiteHeader() {
  const { currentTheme, setTheme } = useTheme()
  const { currentLanguage, setLanguage, t } = useLanguage()
  const { totalItems, setIsCartOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navItems = [
    { key: "nav_home", href: "/" },
    { key: "nav_about", href: "/about" },
    { key: "nav_founder", href: "/founder" },
    { key: "nav_characters", href: "/characters", hasDropdown: true },
    { key: "nav_shop", href: "/shop" },
    { key: "nav_chatbot", href: "/chatbot" },
  ]

  return (
    <>
      {/* DESKTOP HEADER - HIDDEN on mobile, VISIBLE on lg+ */}
      <header 
        className="hidden lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 lg:block transition-colors duration-300"
        style={{ 
          backgroundColor: `${currentTheme.colors.background}ee`,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${currentTheme.colors.accentPrimary}20`
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/isolele-removebg-preview-zi3rY5icyQmJw3QkQJGevwIOP5gqzT.png"
                alt="ISOLELE"
                width={60}
                height={60}
                className="object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <div 
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium transition-colors"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {t(item.key)} {item.hasDropdown && <ChevronDown className="inline h-4 w-4 ml-1" />}
                  </Link>

                  {item.key === "nav_characters" && activeDropdown === "nav_characters" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 mt-2 w-64 rounded-lg"
                      style={{
                        backgroundColor: `${currentTheme.colors.backgroundSecondary}f0`,
                        border: `1px solid ${currentTheme.colors.accentPrimary}30`
                      }}
                    >
                      <Link href="/characters" className="block px-4 py-3 text-sm font-medium border-b"
                        style={{ color: currentTheme.colors.accentPrimary, borderColor: `${currentTheme.colors.accentPrimary}20` }}>
                        {t("nav_all_characters")}
                      </Link>
                      {characterLinks.map((char) => (
                        <Link key={char.href} href={char.href} className="block px-4 py-2 text-sm hover:bg-white/5"
                          style={{ color: currentTheme.colors.textSecondary }}>
                          {char.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Right Icons */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                  {currentLanguage.code.toUpperCase()} <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded shadow-lg hidden group-hover:block">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2"
                style={{ color: currentTheme.colors.accentPrimary }}
              >
                <ShoppingBag size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Theme Switcher */}
              <div className="relative group">
                <button className="p-2" style={{ color: currentTheme.colors.textSecondary }}>
                  <Zap size={20} />
                </button>
                <div className="absolute right-0 top-full mt-2 flex gap-2 bg-white dark:bg-gray-800 p-2 rounded shadow-lg hidden group-hover:flex">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: theme.colors.accentPrimary }}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAV - VISIBLE on mobile, HIDDEN on lg+ */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 lg:hidden z-40 flex justify-center pb-6 px-4"
      >
        <div
          className="flex gap-3 px-6 py-4 rounded-3xl backdrop-blur-xl"
          style={{
            backgroundColor: `${currentTheme.colors.background}dd`,
            border: `1.5px solid ${currentTheme.colors.accentPrimary}40`,
            boxShadow: `0 8px 32px ${currentTheme.colors.accentPrimary}20`
          }}
        >
          {/* Home */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-2xl transition-all"
              style={{
                backgroundColor: `${currentTheme.colors.accentPrimary}15`,
                color: currentTheme.colors.accentPrimary,
              }}
            >
              <Home size={24} />
            </motion.button>
          </Link>

          {/* Characters */}
          <Link href="/characters">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-2xl transition-all"
              style={{
                backgroundColor: `${currentTheme.colors.accentPrimary}15`,
                color: currentTheme.colors.accentPrimary,
              }}
            >
              <Users size={24} />
            </motion.button>
          </Link>

          {/* Shop */}
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-2xl transition-all"
              style={{
                backgroundColor: `${currentTheme.colors.accentPrimary}15`,
                color: currentTheme.colors.accentPrimary,
              }}
            >
              <ShoppingBag size={24} />
            </motion.button>
          </Link>

          {/* Chatbot */}
          <Link href="/chatbot">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-2xl transition-all"
              style={{
                backgroundColor: `${currentTheme.colors.accentPrimary}15`,
                color: currentTheme.colors.accentPrimary,
              }}
            >
              <BookOpen size={24} />
            </motion.button>
          </Link>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 rounded-2xl transition-all"
            style={{
              backgroundColor: `${currentTheme.colors.accentPrimary}15`,
              color: currentTheme.colors.accentPrimary,
            }}
          >
            <Settings size={24} />
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu - Settings/Language/Theme */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 lg:hidden z-30"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed inset-y-0 right-0 w-80 lg:hidden z-40 overflow-y-auto p-6"
              style={{ backgroundColor: currentTheme.colors.background }}
            >
              <button onClick={() => setMobileMenuOpen(false)} className="mb-6">
                <X size={24} style={{ color: currentTheme.colors.textPrimary }} />
              </button>

              {/* Language Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-bold mb-3" style={{ color: currentTheme.colors.textPrimary }}>
                  {t("language")}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={cn(
                        "py-2 rounded text-sm font-medium transition-all",
                        currentLanguage.code === lang.code
                          ? "ring-2"
                          : ""
                      )}
                      style={{
                        backgroundColor: currentLanguage.code === lang.code ? currentTheme.colors.accentPrimary : `${currentTheme.colors.accentPrimary}15`,
                        color: currentLanguage.code === lang.code ? currentTheme.colors.background : currentTheme.colors.textSecondary,
                        ringColor: currentTheme.colors.accentPrimary
                      }}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selector */}
              <div>
                <h3 className="text-sm font-bold mb-3" style={{ color: currentTheme.colors.textPrimary }}>
                  {t("theme")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      className="p-4 rounded-lg transition-all"
                      style={{
                        backgroundColor: theme.colors.background,
                        border: currentTheme.id === theme.id ? `2px solid ${theme.colors.accentPrimary}` : `1px solid ${theme.colors.accentPrimary}20`
                      }}
                    >
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.accentPrimary }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.accentSecondary }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
