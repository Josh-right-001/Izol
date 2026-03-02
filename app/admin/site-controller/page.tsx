'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, Eye, EyeOff, Settings, Save, AlertCircle, CheckCircle, 
  Home, BookOpen, ShoppingBag, Users, FileText, Image as ImageIcon,
  Plus, Trash2, Edit, Upload, Link as LinkIcon, Zap
} from 'lucide-react'

interface PageConfig {
  id: string
  name: string
  slug: string
  isPublic: boolean
  isVisible: boolean
  metaTitle: string
  metaDescription: string
  featured: boolean
}

interface SiteSettings {
  siteName: string
  siteDescription: string
  maintenanceMode: boolean
  googleAnalyticsId: string
  faviconUrl: string
  logoUrl: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  enableComments: boolean
  enableAnalytics: boolean
  enableNewsletter: boolean
}

export default function SiteController() {
  const [pages, setPages] = useState<PageConfig[]>([])
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'ISOLELE',
    siteDescription: 'African Heritage & Mythology Universe',
    maintenanceMode: false,
    googleAnalyticsId: '',
    faviconUrl: '/favicon.ico',
    logoUrl: '/isolele-logo-transparent.png',
    primaryColor: '#D4AF37',
    secondaryColor: '#B3541E',
    accentColor: '#C9A542',
    enableComments: true,
    enableAnalytics: true,
    enableNewsletter: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [editingPage, setEditingPage] = useState<string | null>(null)

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      const response = await fetch('/api/admin/pages-config')
      if (response.ok) {
        const data = await response.json()
        setPages(data)
      }
    } catch (error) {
      console.error('Error loading pages:', error)
    }
  }

  const handlePageTogglePublic = async (pageId: string, isPublic: boolean) => {
    const updated = pages.map(p => 
      p.id === pageId ? { ...p, isPublic: !isPublic } : p
    )
    setPages(updated)
    
    try {
      await fetch(`/api/admin/pages-config/${pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublic: !isPublic })
      })
    } catch (error) {
      console.error('Error updating page:', error)
    }
  }

  const handlePageToggleVisible = async (pageId: string, isVisible: boolean) => {
    const updated = pages.map(p => 
      p.id === pageId ? { ...p, isVisible: !isVisible } : p
    )
    setPages(updated)
    
    try {
      await fetch(`/api/admin/pages-config/${pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !isVisible })
      })
    } catch (error) {
      console.error('Error updating page:', error)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setSaveStatus('saving')
    
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      
      if (response.ok) {
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } else {
        setSaveStatus('error')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1524] to-[#1a2540] p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-8 h-8 text-[#C9A542]" />
            <h1 className="text-4xl font-bold text-white">Contrôle du Site</h1>
          </div>
          <p className="text-gray-400">Gérez tous les aspects de votre site public</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Settings */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Site Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a2540]/80 border border-[#C9A542]/20 rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Settings className="w-6 h-6 text-[#C9A542]" />
                Paramètres du Site
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom du Site</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0F1524] border border-[#C9A542]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A542]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#0F1524] border border-[#C9A542]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A542] resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Couleur Primaire</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        className="w-12 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        className="flex-1 px-2 py-1 bg-[#0F1524] border border-[#C9A542]/30 rounded text-white text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Couleur Secondaire</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                        className="w-12 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                        className="flex-1 px-2 py-1 bg-[#0F1524] border border-[#C9A542]/30 rounded text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Couleur Accent</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.accentColor}
                        onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                        className="w-12 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.accentColor}
                        onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                        className="flex-1 px-2 py-1 bg-[#0F1524] border border-[#C9A542]/30 rounded text-white text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Google Analytics ID</label>
                  <input
                    type="text"
                    value={settings.googleAnalyticsId}
                    onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-4 py-2 bg-[#0F1524] border border-[#C9A542]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A542]"
                  />
                </div>

                {/* Feature Toggles */}
                <div className="space-y-3 pt-4 border-t border-[#C9A542]/20">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-gray-300">Mode Maintenance</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableAnalytics}
                      onChange={(e) => setSettings({ ...settings, enableAnalytics: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-gray-300">Activer Analytics</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableNewsletter}
                      onChange={(e) => setSettings({ ...settings, enableNewsletter: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-gray-300">Activer Newsletter</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableComments}
                      onChange={(e) => setSettings({ ...settings, enableComments: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-gray-300">Activer Commentaires</span>
                  </label>
                </div>

                {/* Save Status */}
                {saveStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg flex items-center gap-2 ${
                      saveStatus === 'success' ? 'bg-green-500/20 text-green-400' :
                      saveStatus === 'error' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {saveStatus === 'success' ? <CheckCircle className="w-4 h-4" /> : 
                     saveStatus === 'error' ? <AlertCircle className="w-4 h-4" /> :
                     <Zap className="w-4 h-4" />}
                    <span className="text-sm font-medium">
                      {saveStatus === 'success' ? 'Paramètres sauvegardés!' :
                       saveStatus === 'error' ? 'Erreur lors de la sauvegarde' :
                       'Sauvegarde en cours...'}
                    </span>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#C9A542] to-[#B3541E] text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Sauvegarder les Paramètres
                </motion.button>
              </div>
            </motion.div>

            {/* Pages Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a2540]/80 border border-[#C9A542]/20 rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#C9A542]" />
                Gestion des Pages
              </h2>

              <div className="space-y-3">
                {pages.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">Aucune page trouvée</p>
                ) : (
                  pages.map(page => (
                    <motion.div
                      key={page.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between p-4 bg-[#0F1524] rounded-lg border border-[#C9A542]/20 hover:border-[#C9A542]/40 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{page.name}</h3>
                        <p className="text-gray-400 text-sm">/{page.slug}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handlePageTogglePublic(page.id, page.isPublic)}
                          className={`p-2 rounded-lg transition-colors ${
                            page.isPublic 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                          title={page.isPublic ? 'Public' : 'Privé'}
                        >
                          <LinkIcon className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => handlePageToggleVisible(page.id, page.isVisible)}
                          className={`p-2 rounded-lg transition-colors ${
                            page.isVisible 
                              ? 'bg-blue-500/20 text-blue-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                          title={page.isVisible ? 'Visible' : 'Masquée'}
                        >
                          {page.isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>

                        <button
                          onClick={() => setEditingPage(page.id)}
                          className="p-2 rounded-lg bg-[#C9A542]/20 text-[#C9A542] hover:bg-[#C9A542]/30 transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Quick Access */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a2540]/80 border border-[#C9A542]/20 rounded-lg p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Actions Rapides</h3>
              
              <div className="space-y-2">
                {[
                  { icon: Home, label: 'Accueil', href: '/admin/refact?page=home' },
                  { icon: BookOpen, label: 'Articles', href: '/admin/news' },
                  { icon: Users, label: 'Personnages', href: '/admin/characters' },
                  { icon: ShoppingBag, label: 'Produits', href: '/admin/shop' },
                  { icon: ImageIcon, label: 'Médias', href: '/admin/media' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0F1524] hover:bg-[#C9A542]/10 text-gray-300 hover:text-white transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-[#C9A542] group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Site Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a2540]/80 border border-[#C9A542]/20 rounded-lg p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Statut du Site</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Mode Maintenance</span>
                  <span className={`text-sm font-semibold ${
                    settings.maintenanceMode ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {settings.maintenanceMode ? 'ACTIF' : 'INACTIF'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Pages Publiques</span>
                  <span className="text-sm font-semibold text-[#C9A542]">
                    {pages.filter(p => p.isPublic).length} / {pages.length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Pages Visibles</span>
                  <span className="text-sm font-semibold text-[#C9A542]">
                    {pages.filter(p => p.isVisible).length} / {pages.length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Analytics</span>
                  <span className={`text-sm font-semibold ${
                    settings.enableAnalytics ? 'text-green-400' : 'text-gray-500'
                  }`}>
                    {settings.enableAnalytics ? 'ON' : 'OFF'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
