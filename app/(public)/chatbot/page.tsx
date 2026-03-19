'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Menu, X, MessageCircle, Home, Sparkles, Zap, Users } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

// Typing animation component
function TypingAnimation() {
  return (
    <div className="flex gap-2 items-center">
      <motion.span
        className="h-2 w-2 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.span
        className="h-2 w-2 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
      />
      <motion.span
        className="h-2 w-2 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
      />
    </div>
  )
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

const AFRICAN_RESPONSES = {
  en: {
    greeting: "Jambo! Welcome to ISOLELE's AI Companion. I'm here to help you explore the African superhero universe. How can I assist you today?",
    about: "ISOLELE is a groundbreaking African superhero universe celebrating African mythology, heritage, and culture through compelling stories and characters.",
    zaire: "Zaire is the Prince of Kongo, a powerful superhero wielding ancient African magic and commanding respect across the continent.",
    shop: "Our shop offers exclusive ISOLELE merchandise including comics, clothing, and collectibles celebrating African heritage.",
    characters: "We have incredible characters like Bambula the Warrior, Kimoya the Kandake, and many more powerful African heroes.",
    default: "That's an interesting question! I'm learning about ISOLELE culture. Can you tell me more about what interests you?"
  },
  fr: {
    greeting: "Jambo! Bienvenue dans le Compagnon IA d'ISOLELE. Je suis ici pour vous aider à explorer l'univers des super-héros africains. Comment puis-je vous aider?",
    about: "ISOLELE est un univers de super-héros africain révolutionnaire célébrant la mythologie, l'héritage et la culture africains.",
    zaire: "Zaire est le Prince du Kongo, un puissant super-héros possédant la magie africaine ancienne et commandant le respect.",
    shop: "Notre boutique propose des produits exclusifs ISOLELE incluant des bandes dessinées, des vêtements et des objets de collection.",
    characters: "Nous avons d'incroyables personnages comme Bambula le Guerrier, Kimoya la Kandake et bien d'autres héros africains puissants.",
    default: "C'est une question intéressante! J'apprends la culture ISOLELE. Pouvez-vous me dire plus sur ce qui vous intéresse?"
  }
}

export default function ChatbotPage() {
  const { currentTheme } = useTheme()
  const { currentLanguage, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const lang = currentLanguage.code as 'en' | 'fr'
    const greeting: Message = {
      id: '0',
      text: AFRICAN_RESPONSES[lang].greeting,
      sender: 'assistant',
      timestamp: new Date()
    }
    setMessages([greeting])
  }, [currentLanguage])

  const getResponse = (userMessage: string): string => {
    const lang = currentLanguage.code as 'en' | 'fr'
    const lower = userMessage.toLowerCase()

    if (lower.includes('zaire') || lower.includes('prince') || lower.includes('kongo')) {
      return AFRICAN_RESPONSES[lang].zaire
    } else if (lower.includes('shop') || lower.includes('buy') || lower.includes('merchandise')) {
      return AFRICAN_RESPONSES[lang].shop
    } else if (lower.includes('character') || lower.includes('hero') || lower.includes('bambula') || lower.includes('kimoya')) {
      return AFRICAN_RESPONSES[lang].characters
    } else if (lower.includes('about') || lower.includes('what') || lower.includes('isolele')) {
      return AFRICAN_RESPONSES[lang].about
    }
    
    return AFRICAN_RESPONSES[lang].default
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(input),
        sender: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, response])
      setIsLoading(false)
    }, 800)
  }

  return (
    <div 
      className="min-h-screen pt-20 flex flex-col"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ 
          backgroundColor: currentTheme.colors.background,
          borderColor: `${currentTheme.colors.accentPrimary}20`,
          backdropFilter: "blur(12px)"
        }}
      >
        <div className="flex h-20 items-center justify-between px-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-5 w-5" style={{ color: currentTheme.colors.accentPrimary }} />
            <span className="font-bold" style={{ color: currentTheme.colors.textPrimary }}>
              ISOLELE AI
            </span>
          </Link>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Info */}
        <AnimatePresence>
          {(typeof window !== 'undefined' && window.innerWidth >= 1024 || mobileMenuOpen) && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-80 border-r overflow-y-auto hidden lg:block"
              style={{ 
                borderColor: `${currentTheme.colors.accentPrimary}20`,
                backgroundColor: currentTheme.colors.backgroundSecondary
              }}
            >
              <div className="p-6 space-y-4">
                {/* Welcome Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl p-4 backdrop-blur-md"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.colors.accentPrimary}20 0%, ${currentTheme.colors.accentSecondary}10 100%)`,
                    border: `1px solid ${currentTheme.colors.accentPrimary}30`
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5" style={{ color: currentTheme.colors.accentPrimary }} />
                    <h3 className="font-bold" style={{ color: currentTheme.colors.textPrimary }}>
                      {currentLanguage.code === 'en' ? 'AI Guide' : 'Guide IA'}
                    </h3>
                  </div>
                  <p className="text-sm mb-4" style={{ color: currentTheme.colors.textSecondary }}>
                    {currentLanguage.code === 'en' 
                      ? 'Explore the ISOLELE universe with our smart assistant'
                      : 'Explorez l\'univers ISOLELE avec notre assistant intelligent'}
                  </p>
                </motion.div>

                {/* Quick Tips */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: `${currentTheme.colors.accentPrimary}15` }}
                >
                  <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: currentTheme.colors.textPrimary }}>
                    <Zap className="h-4 w-4" />
                    {currentLanguage.code === 'en' ? 'Quick Tips' : 'Astuces Rapides'}
                  </h3>
                  <ul className="text-sm space-y-2" style={{ color: currentTheme.colors.textSecondary }}>
                    <li>✦ Ask about characters</li>
                    <li>✦ Explore the story</li>
                    <li>✦ Shop recommendations</li>
                    <li>✦ Learn African mythology</li>
                  </ul>
                </motion.div>

                {/* Popular Topics */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: `${currentTheme.colors.accentSecondary}15` }}
                >
                  <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: currentTheme.colors.textPrimary }}>
                    <Users className="h-4 w-4" />
                    {currentLanguage.code === 'en' ? 'Popular Topics' : 'Sujets Populaires'}
                  </h3>
                  <div className="space-y-2">
                    {['Zaire', 'Bambula', 'Kimoya', 'ISOLELE Universe'].map(topic => (
                      <motion.button
                        key={topic}
                        whileHover={{ x: 4 }}
                        onClick={() => setInput(topic)}
                        className="block w-full text-left text-sm p-3 rounded-lg transition-all"
                        style={{
                          color: currentTheme.colors.textSecondary,
                          backgroundColor: `${currentTheme.colors.accentPrimary}10`,
                          border: `1px solid ${currentTheme.colors.accentPrimary}20`
                        }}
                      >
                        → {topic}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-4 lg:space-y-6">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                className={cn(
                  "flex gap-3 max-w-2xl",
                  message.sender === 'user' && "ml-auto flex-row-reverse"
                )}
              >
                {message.sender === 'assistant' && (
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.colors.accentPrimary}, ${currentTheme.colors.accentSecondary})`,
                      boxShadow: `0 4px 12px ${currentTheme.colors.accentPrimary}40`
                    }}
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </motion.div>
                )}
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl px-5 py-4 max-w-md backdrop-blur-sm"
                  style={{
                    background: message.sender === 'user' 
                      ? `linear-gradient(135deg, ${currentTheme.colors.accentPrimary}, ${currentTheme.colors.accentSecondary})`
                      : `linear-gradient(135deg, ${currentTheme.colors.backgroundSecondary}ee, ${currentTheme.colors.background}cc)`,
                    color: message.sender === 'user'
                      ? '#FFFFFF'
                      : currentTheme.colors.textPrimary,
                    border: message.sender === 'assistant' 
                      ? `1.5px solid ${currentTheme.colors.accentPrimary}40`
                      : 'none',
                    boxShadow: message.sender === 'user'
                      ? `0 8px 24px ${currentTheme.colors.accentPrimary}30`
                      : `0 4px 12px rgba(0,0,0,0.1)`
                  }}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-60 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex gap-3 max-w-2xl"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.colors.accentPrimary}, ${currentTheme.colors.accentSecondary})`,
                    boxShadow: `0 4px 12px ${currentTheme.colors.accentPrimary}40`
                  }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl px-5 py-4 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.colors.backgroundSecondary}ee, ${currentTheme.colors.background}cc)`,
                    border: `1.5px solid ${currentTheme.colors.accentPrimary}40`,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.1)`
                  }}
                >
                  <TypingAnimation />
                </motion.div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <motion.div 
            className="border-t backdrop-blur-md p-4 lg:p-6"
            style={{
              borderColor: `${currentTheme.colors.accentPrimary}20`,
              background: `${currentTheme.colors.background}99`
            }}
          >
            <div className="flex gap-2 max-w-4xl mx-auto">
              <motion.input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={currentLanguage.code === 'en' ? '✨ Ask anything about ISOLELE...' : '✨ Posez une question sur ISOLELE...'}
                className="flex-1 px-5 py-3 rounded-2xl outline-none transition-all"
                whileFocus={{ scale: 1.02 }}
                style={{
                  backgroundColor: currentTheme.colors.backgroundSecondary,
                  color: currentTheme.colors.textPrimary,
                  border: `1.5px solid ${currentTheme.colors.accentPrimary}30`,
                  boxShadow: input.trim() ? `0 0 20px ${currentTheme.colors.accentPrimary}20` : 'none'
                }}
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-2xl flex items-center gap-2 font-medium transition-all disabled:opacity-50"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.colors.accentPrimary}, ${currentTheme.colors.accentSecondary})`,
                  color: '#FFFFFF',
                  boxShadow: `0 4px 15px ${currentTheme.colors.accentPrimary}40`
                }}
              >
                <Send className="h-5 w-5" />
                <span className="hidden sm:inline">{currentLanguage.code === 'en' ? 'Send' : 'Envoyer'}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
