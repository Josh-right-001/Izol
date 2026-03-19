'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sun, Moon, MessageCircle, LogOut, ArrowLeft } from 'lucide-react'
import { useTheme, themes } from '@/lib/theme-context'
import { useLanguage, languages } from '@/lib/language-context'
import Link from 'next/link'

export default function SettingsPage() {
  const { currentTheme, setTheme } = useTheme()
  const { currentLanguage, setLanguage } = useLanguage()
  const [isDark, setIsDark] = useState(currentTheme.name === 'dark')
  const [showAIBot, setShowAIBot] = useState(false)
  const [botMessage, setBotMessage] = useState('Hello! I am your AI Price Negotiator. How can I help you today?')

  const handleThemeToggle = () => {
    setIsDark(!isDark)
    const newTheme = isDark ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
  }

  return (
    <div className="min-h-screen w-full pt-24 pb-20" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg transition-all"
              style={{ backgroundColor: `${currentTheme.colors.accentPrimary}20` }}
            >
              <ArrowLeft size={24} style={{ color: currentTheme.colors.accentPrimary }} />
            </motion.button>
          </Link>
          <Image 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ROYALITY%20LOGO%20PNG%201-oXxaPZHKWdeJZRprgYoFnE4I6cFtI6.png" 
            alt="ISOLELE" 
            width={80} 
            height={30} 
            className="object-contain"
          />
          <div className="w-10" />
        </div>

        {/* Settings Container */}
        <div className="space-y-6">
          {/* Theme Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg"
            style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDark ? <Moon size={24} /> : <Sun size={24} />}
                <div>
                  <h3 className="text-lg font-bold">Theme</h3>
                  <p className="text-sm opacity-70">Switch between dark and light mode</p>
                </div>
              </div>
              <button
                onClick={handleThemeToggle}
                className="px-6 py-2 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: currentTheme.colors.accentPrimary,
                  color: currentTheme.colors.background,
                }}
              >
                {isDark ? 'Light' : 'Dark'}
              </button>
            </div>
          </motion.div>

          {/* Language Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-lg"
            style={{ backgroundColor: `${currentTheme.colors.accentSecondary}10` }}
          >
            <h3 className="text-lg font-bold mb-4">Language</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg font-semibold transition-all text-sm"
                  style={{
                    backgroundColor:
                      currentLanguage.code === lang.code
                        ? currentTheme.colors.accentPrimary
                        : `${currentTheme.colors.textSecondary}20`,
                    color:
                      currentLanguage.code === lang.code
                        ? currentTheme.colors.background
                        : currentTheme.colors.textPrimary,
                  }}
                >
                  {lang.nativeName}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* AI Negotiator Bot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-lg"
            style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MessageCircle size={24} />
                <h3 className="text-lg font-bold">AI Price Negotiator</h3>
              </div>
              <motion.button
                onClick={() => setShowAIBot(!showAIBot)}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-lg font-semibold"
                style={{
                  backgroundColor: showAIBot
                    ? currentTheme.colors.accentPrimary
                    : `${currentTheme.colors.accentPrimary}20`,
                  color: showAIBot ? currentTheme.colors.background : currentTheme.colors.textPrimary,
                }}
              >
                {showAIBot ? 'Close' : 'Open'}
              </motion.button>
            </div>

            {showAIBot && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 rounded-lg"
                style={{ backgroundColor: `${currentTheme.colors.background}` }}
              >
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.accentPrimary}20` }}>
                    <p className="text-sm">{botMessage}</p>
                  </div>
                  <p className="text-xs opacity-50 italic">AI Bot ready to help negotiate better prices on fashion items. Ask me anything!</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-lg"
            style={{ backgroundColor: `${currentTheme.colors.accentSecondary}10` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LogOut size={24} />
                <div>
                  <h3 className="text-lg font-bold">Account</h3>
                  <p className="text-sm opacity-70">Manage your account settings</p>
                </div>
              </div>
              <button
                className="px-6 py-2 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: `${currentTheme.colors.accentPrimary}20`,
                  color: currentTheme.colors.accentPrimary,
                }}
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
