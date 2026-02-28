'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Menu, X, MessageCircle, Home } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

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
          {(window.innerWidth >= 1024 || mobileMenuOpen) && (
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
                <div className="rounded-lg p-4" style={{ backgroundColor: `${currentTheme.colors.accentPrimary}20` }}>
                  <h3 className="font-bold mb-2" style={{ color: currentTheme.colors.textPrimary }}>
                    {currentLanguage.code === 'en' ? 'Quick Tips' : 'Astuces Rapides'}
                  </h3>
                  <ul className="text-sm space-y-2" style={{ color: currentTheme.colors.textSecondary }}>
                    <li>• Ask about characters</li>
                    <li>• Explore the story</li>
                    <li>• Shop recommendations</li>
                    <li>• Learn African mythology</li>
                  </ul>
                </div>

                <div className="rounded-lg p-4" style={{ backgroundColor: `${currentTheme.colors.accentSecondary}20` }}>
                  <h3 className="font-bold mb-2" style={{ color: currentTheme.colors.textPrimary }}>
                    Popular Topics
                  </h3>
                  <div className="space-y-2">
                    {['Zaire', 'Bambula', 'Kimoya', 'ISOLELE Universe'].map(topic => (
                      <button
                        key={topic}
                        onClick={() => setInput(topic)}
                        className="block w-full text-left text-sm p-2 rounded hover:bg-white/5 transition-colors"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex gap-3 max-w-2xl",
                  message.sender === 'user' && "ml-auto flex-row-reverse"
                )}
              >
                {message.sender === 'assistant' && (
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: currentTheme.colors.accentPrimary }}
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div
                  className="rounded-lg px-4 py-3 max-w-md"
                  style={{
                    backgroundColor: message.sender === 'user' 
                      ? currentTheme.colors.accentPrimary
                      : currentTheme.colors.backgroundSecondary,
                    color: message.sender === 'user'
                      ? '#FFFFFF'
                      : currentTheme.colors.textPrimary,
                    border: message.sender === 'assistant' 
                      ? `1px solid ${currentTheme.colors.accentPrimary}30`
                      : 'none'
                  }}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: currentTheme.colors.accentPrimary }}
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div 
                  className="rounded-lg px-4 py-3"
                  style={{ backgroundColor: currentTheme.colors.backgroundSecondary }}
                >
                  <div className="flex gap-2">
                    <motion.div 
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: currentTheme.colors.accentPrimary }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div 
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: currentTheme.colors.accentPrimary }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <motion.div 
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: currentTheme.colors.accentPrimary }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div 
            className="border-t p-4"
            style={{ borderColor: `${currentTheme.colors.accentPrimary}20` }}
          >
            <div className="flex gap-2 max-w-4xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={currentLanguage.code === 'en' ? 'Ask anything...' : 'Posez une question...'}
                className="flex-1 px-4 py-3 rounded-lg outline-none"
                style={{
                  backgroundColor: currentTheme.colors.backgroundSecondary,
                  color: currentTheme.colors.textPrimary,
                  border: `1px solid ${currentTheme.colors.accentPrimary}30`
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="px-4 py-3 rounded-lg flex items-center gap-2 font-medium transition-opacity disabled:opacity-50"
                style={{ backgroundColor: currentTheme.colors.accentPrimary, color: '#FFFFFF' }}
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
