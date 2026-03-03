'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Edit3,
  Save,
  CheckCircle,
  Eye,
  RotateCcw,
  ChevronRight,
  Home,
  FileText,
  AlertCircle,
  Loader2,
  Monitor
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PageData {
  path: string
  title: string
  type: 'page' | 'component'
  description: string
  image?: string
  edited?: boolean
}

const PAGES_STRUCTURE: PageData[] = [
  // Public Pages
  { path: '/', title: 'Accueil', type: 'page', description: 'Page d\'accueil principale', image: '/art/zaire-prince-kongo.jpg' },
  { path: '/about', title: 'À Propos', type: 'page', description: 'Informations sur ISOLELE' },
  { path: '/founder', title: 'Fondateur', type: 'page', description: 'Portrait du fondateur - H.R.M King Kufulula', image: '/founder.jpg' },
  { path: '/characters', title: 'Personnages', type: 'page', description: 'Tous les héros de l\'univers ISOLELE' },
  { path: '/news', title: 'Actualités', type: 'page', description: 'Dernières nouvelles et articles' },
  { path: '/shop', title: 'Boutique', type: 'page', description: 'Boutique en ligne' },
  { path: '/supporters', title: 'Supporteurs', type: 'page', description: 'Nos supporters' },
  { path: '/supporters/become', title: 'Devenir Supporter', type: 'page', description: 'Rejoignez notre communauté' },
  { path: '/press', title: 'Presse', type: 'page', description: 'Ressources presse' },
  { path: '/contact', title: 'Contact', type: 'page', description: 'Nous contacter' },
  { path: '/faq', title: 'FAQ', type: 'page', description: 'Questions fréquemment posées' },
  { path: '/careers', title: 'Carrières', type: 'page', description: 'Offres d\'emploi' },
  { path: '/privacy', title: 'Politique de Confidentialité', type: 'page', description: 'Politique de confidentialité' },
  { path: '/terms', title: 'Conditions d\'Utilisation', type: 'page', description: 'Conditions d\'utilisation' },
  { path: '/chatbot', title: 'Chatbot IA', type: 'page', description: 'Assistant IA interne' },
]

export default function RefactPage() {
  const [selectedPage, setSelectedPage] = useState<PageData | null>(PAGES_STRUCTURE[0])
  const [activeTab, setActiveTab] = useState<'refact' | 'display'>('refact')
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [content, setContent] = useState<Record<string, any>>({})
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    if (selectedPage) {
      loadPageContent(selectedPage.path)
    }
  }, [selectedPage])

  const loadPageContent = async (path: string) => {
    try {
      setError(null)
      const response = await fetch(`/api/admin/pages?path=${encodeURIComponent(path)}`)
      if (!response.ok) throw new Error('Failed to load page')
      
      const data = await response.json()
      setContent(data)
    } catch (err) {
      setError('Erreur lors du chargement de la page')
      console.error('[v0] Error loading page:', err)
    }
  }

  const handleSave = async () => {
    if (!selectedPage) return
    
    setSaving(true)
    try {
      setError(null)
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: selectedPage.path,
          title: selectedPage.title,
          description: selectedPage.description,
          content: content,
        }),
      })
      
      if (!response.ok) throw new Error('Failed to save page')
      
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError('Erreur lors de la sauvegarde')
      console.error('[v0] Error saving:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    loadPageContent(selectedPage?.path || '/')
    setError(null)
  }

  return (
    <div className="min-h-screen space-y-6">
      {/* Header with logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/isolele-logo-transparent.png"
            alt="ISOLELE"
            width={40}
            height={40}
            className="object-contain"
            style={{ width: 'auto', height: 'auto' }}
          />
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Refact - Éditeur Avancé</h1>
            <p className="text-gray-400">Gérez et prévisualisez toutes les pages publiques</p>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('refact')}
          className={`px-6 py-3 font-medium transition-all border-b-2 ${
            activeTab === 'refact'
              ? 'text-white border-b-yellow-500'
              : 'text-gray-400 border-b-transparent hover:text-white'
          }`}
        >
          Refact Editor
        </button>
        <Link href="/admin/home/display-refact">
          <button
            onClick={() => setActiveTab('display')}
            className="px-6 py-3 font-medium transition-all border-b-2 text-gray-400 border-b-transparent hover:text-white"
          >
            Display Refact (Live Preview)
          </button>
        </Link>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Sidebar - Pages List */}
        <div className="lg:col-span-2 rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'rgba(15,21,36,0.95)', borderColor: 'rgba(201,165,66,0.2)' }}>
          <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
            <FileText size={16} style={{ color: '#C9A542' }} />
            Pages Publiques
          </h3>
          
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {PAGES_STRUCTURE.map((page) => (
              <motion.button
                key={page.path}
                onClick={() => setSelectedPage(page)}
                whileHover={{ x: 4 }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                style={{
                  backgroundColor: selectedPage?.path === page.path ? 'rgba(201,165,66,0.2)' : 'transparent',
                  borderLeft: selectedPage?.path === page.path ? '2px solid #C9A542' : '2px solid transparent',
                  color: selectedPage?.path === page.path ? '#C9A542' : '#9CA3AF',
                }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    {page.path === '/' ? <Home size={14} /> : <FileText size={14} />}
                    <span className="truncate">{page.title}</span>
                  </div>
                  {selectedPage?.path === page.path && <ChevronRight size={14} />}
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{page.path}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Content - Editor & Preview */}
        <div className="lg:col-span-3 space-y-4 min-h-[700px]">
          
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border" style={{ backgroundColor: 'rgba(15,21,36,0.95)', borderColor: 'rgba(201,165,66,0.3)' }}>
            <motion.button
              onClick={() => setMode('view')}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: mode === 'view' ? '#C9A542' : 'rgba(201,165,66,0.08)',
                color: mode === 'view' ? '#0A0E1A' : '#9CA3AF',
              }}>
              <Eye size={16} />
              Aperçu
            </motion.button>
            
            <motion.button
              onClick={() => setMode('edit')}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: mode === 'edit' ? '#C9A542' : 'rgba(201,165,66,0.08)',
                color: mode === 'edit' ? '#0A0E1A' : '#9CA3AF',
              }}>
              <Edit3 size={16} />
              Éditer
            </motion.button>

            <div className="flex-1" />

            <motion.button
              onClick={handleSave}
              disabled={saving}
              whileHover={{ scale: !saving ? 1.05 : 1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
              style={{
                backgroundColor: saved ? '#4ade80' : '#C9A542',
                color: '#0A0E1A',
                opacity: saving ? 0.7 : 1,
              }}>
              {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
              {saving ? 'Sauvegarde...' : saved ? 'Sauvegardé!' : 'Enregistrer'}
            </motion.button>

            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all"
              style={{ borderColor: 'rgba(201,165,66,0.3)', color: '#C9A542' }}>
              <RotateCcw size={16} />
              Réinitialiser
            </motion.button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-lg border"
              style={{ backgroundColor: 'rgba(220,38,38,0.1)', borderColor: 'rgba(220,38,38,0.3)', color: '#fca5a5' }}>
              <AlertCircle size={16} />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {/* View Mode - Page Preview */}
          {mode === 'view' && selectedPage && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border overflow-hidden"
              style={{ backgroundColor: 'rgba(15,21,36,0.95)', borderColor: 'rgba(201,165,66,0.2)', minHeight: '600px' }}>
              
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  
                  {/* Header */}
                  <div className="space-y-4">
                    {selectedPage.image && (
                      <div className="relative h-80 rounded-lg overflow-hidden border" style={{ borderColor: 'rgba(201,165,66,0.3)' }}>
                        <Image
                          src={selectedPage.image}
                          alt={selectedPage.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-2">{selectedPage.title}</h2>
                      <p className="text-gray-400">{selectedPage.description}</p>
                      <p className="text-xs text-gray-500 mt-3 font-mono">{selectedPage.path}</p>
                    </div>
                  </div>

                  {/* Page Info */}
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-lg border" style={{ backgroundColor: 'rgba(201,165,66,0.05)', borderColor: 'rgba(201,165,66,0.2)' }}>
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="text-white font-medium">{selectedPage.type === 'page' ? 'Page Publique' : 'Composant'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Dernière modification</p>
                      <p className="text-white font-medium">{new Date().toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>

                  {/* Live Preview Link */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-lg border cursor-pointer transition-all"
                    style={{ backgroundColor: 'rgba(201,165,66,0.08)', borderColor: 'rgba(201,165,66,0.3)' }}>
                    <Link
                      href={selectedPage.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[#C9A542] hover:text-white transition">
                      <Monitor size={18} />
                      <span className="font-medium">Voir la page en direct →</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Edit Mode - Editor Panel */}
          {mode === 'edit' && selectedPage && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border p-6 space-y-6"
              style={{ backgroundColor: 'rgba(15,21,36,0.95)', borderColor: 'rgba(201,165,66,0.2)' }}>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-2">Titre de la Page</label>
                  <input
                    type="text"
                    defaultValue={selectedPage.title}
                    className="w-full p-3 rounded-lg bg-[#0A0E1A] border text-white text-sm"
                    style={{ borderColor: 'rgba(201,165,66,0.3)' }}
                    placeholder="Titre..."
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-2">Description</label>
                  <textarea
                    defaultValue={selectedPage.description}
                    rows={4}
                    className="w-full p-3 rounded-lg bg-[#0A0E1A] border text-white text-sm resize-none"
                    style={{ borderColor: 'rgba(201,165,66,0.3)' }}
                    placeholder="Description..."
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-2">Contenu Principal</label>
                  <textarea
                    defaultValue="Contenu éditable..."
                    rows={8}
                    className="w-full p-3 rounded-lg bg-[#0A0E1A] border text-white text-sm resize-none font-mono"
                    style={{ borderColor: 'rgba(201,165,66,0.3)' }}
                    placeholder="Contenu..."
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg border" style={{ backgroundColor: 'rgba(201,165,66,0.05)', borderColor: 'rgba(201,165,66,0.2)' }}>
                <p className="text-xs text-gray-400">
                  💡 <strong>Conseil:</strong> Les modifications seront sauvegardées dans la base de données et visibles sur la page publique immédiatement.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Status Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-3 p-4 rounded-lg border text-sm"
        style={{ backgroundColor: 'rgba(201,165,66,0.07)', borderColor: 'rgba(201,165,66,0.2)', color: '#C9A542' }}>
        <span className="w-2 h-2 rounded-full bg-[#C9A542] animate-pulse" />
        {selectedPage ? (
          <>
            En édition: <strong className="ml-1">{selectedPage.title}</strong>
            <span className="text-gray-400 ml-2">({PAGES_STRUCTURE.length} pages disponibles)</span>
          </>
        ) : (
          <>Sélectionnez une page pour commencer</>
        )}
      </motion.div>
    </div>
  )
}
