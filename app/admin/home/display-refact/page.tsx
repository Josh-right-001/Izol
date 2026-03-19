'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hand, Edit3, Wand2, Save, X, Loader2, ExternalLink, Image as ImageIcon, Copy, Check } from 'lucide-react'
import Image from 'next/image'

interface EditingElement {
  selector: string
  content: string
  type: 'text' | 'image' | 'html'
  original: string
}

export default function DisplayRefactPage() {
  const [mode, setMode] = useState<'hand' | 'edit' | 'animation' | 'media'>('hand')
  const [selectedElement, setSelectedElement] = useState<EditingElement | null>(null)
  const [editingContent, setEditingContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveProgress, setSaveProgress] = useState(0)
  const [saveComplete, setSaveComplete] = useState(false)
  const [panelPosition, setPanelPosition] = useState({ x: 200, y: 400 })
  const [isDragging, setIsDragging] = useState(false)
  const [previewURL, setPreviewURL] = useState('/')
  const panelRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Draggable control panel
  const handlePanelDragStart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    setIsDragging(true)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      setPanelPosition({
        x: e.clientX - (panelRef.current?.offsetWidth || 0) / 2,
        y: e.clientY - (panelRef.current?.offsetHeight || 0) / 2,
      })
    }

    const handleMouseUp = () => setIsDragging(false)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  // Handle edit mode - enable element selection and editing
  useEffect(() => {
    if (!iframeRef.current) return

    const iframeDoc = iframeRef.current.contentDocument
    if (!iframeDoc) return

    if (mode === 'edit') {
      // Disable animations
      iframeDoc.body.style.pointerEvents = 'auto'
      
      // Add click handler for element selection
      const handleIframeClick = (e: MouseEvent) => {
        e.stopPropagation()
        const target = e.target as HTMLElement
        
        if (!target || target === iframeDoc.body || target === iframeDoc.documentElement) return

        // Highlight selected element
        const allElements = iframeDoc.querySelectorAll('*')
        allElements.forEach(el => {
          (el as HTMLElement).style.outline = 'none'
        })

        target.style.outline = '3px solid #D4AF37'
        target.style.outlineOffset = '2px'

        // Extract content
        let content = ''
        let type: 'text' | 'image' | 'html' = 'html'

        if (target.tagName === 'IMG') {
          type = 'image'
          content = (target as HTMLImageElement).src
        } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          type = 'text'
          content = (target as HTMLInputElement | HTMLTextAreaElement).value
        } else {
          type = 'text'
          content = target.textContent || ''
        }

        setSelectedElement({
          selector: target.tagName.toLowerCase(),
          content,
          type,
          original: content,
        })
        setEditingContent(content)
      }

      iframeDoc.addEventListener('click', handleIframeClick)
      return () => iframeDoc.removeEventListener('click', handleIframeClick)
    } else {
      // Reset when exiting edit mode
      const allElements = iframeDoc.querySelectorAll('*')
      allElements.forEach(el => {
        (el as HTMLElement).style.outline = 'none'
      })
    }
  }, [mode, iframeRef])

  // Save editing changes
  const handleSaveEdit = async () => {
    if (!selectedElement || !iframeRef.current) return

    try {
      const iframeDoc = iframeRef.current.contentDocument
      if (!iframeDoc) return

      // Find and update the element
      const elements = iframeDoc.querySelectorAll(selectedElement.selector)
      if (elements.length > 0) {
        const element = elements[0] as HTMLElement

        if (selectedElement.type === 'text') {
          if (element.tagName === 'IMG') {
            (element as HTMLImageElement).src = editingContent
          } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            (element as HTMLInputElement | HTMLTextAreaElement).value = editingContent
          } else {
            element.textContent = editingContent
          }
        }

        // Reset outline
        element.style.outline = 'none'
        setSelectedElement(null)
        setEditingContent('')
      }
    } catch (error) {
      console.error('[v0] Error saving edit:', error)
    }
  }

  // Save functionality with auto-deployment
  const handleSave = async () => {
    setIsSaving(true)
    setSaveProgress(0)

    try {
      // Simulate save progress
      const progressSteps = [20, 50, 80, 100]
      for (const step of progressSteps) {
        await new Promise((resolve) => setTimeout(resolve, 600))
        setSaveProgress(step)
      }

      // Call API to save and deploy
      const response = await fetch('/api/admin/save-and-deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          changes: { 
            mode, 
            selectedElement,
            content: editingContent,
            timestamp: new Date().toISOString()
          },
        }),
      })

      if (!response.ok) throw new Error('Save failed')

      setSaveProgress(100)
      setSaveComplete(true)

      // Show success for 2 seconds, then open preview
      setTimeout(() => {
        window.open('/', '_blank')
        setSaveComplete(false)
        setIsSaving(false)
        setMode('hand')
      }, 2000)
    } catch (error) {
      console.error('[v0] Save error:', error)
      alert('Error saving changes. Please try again.')
      setIsSaving(false)
    }
  }

  const ControlPanel = (
    <motion.div
      ref={panelRef}
      onMouseDown={handlePanelDragStart}
      className="fixed z-40 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-yellow-500/30 rounded-2xl shadow-2xl p-6 w-96"
      style={{
        x: panelPosition.x,
        y: panelPosition.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        backdropFilter: 'blur(10px)',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-yellow-500/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
          <h3 className="font-bold text-white text-lg">Page Editor</h3>
        </div>
        <button 
          onClick={() => setMode('hand')}
          className="p-2 hover:bg-gray-700 rounded-lg transition"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Mode buttons */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {[
          { mode: 'hand' as const, icon: Hand, label: 'Hand', color: 'from-blue-500 to-blue-600' },
          { mode: 'edit' as const, icon: Edit3, label: 'Edit', color: 'from-purple-500 to-purple-600' },
          { mode: 'animation' as const, icon: Wand2, label: 'Animation', color: 'from-pink-500 to-pink-600' },
          { mode: 'media' as const, icon: ImageIcon, label: 'Media', color: 'from-cyan-500 to-cyan-600' },
        ].map(({ mode: m, icon: Icon, label, color }) => (
          <motion.button
            key={m}
            onClick={() => setMode(m)}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
              mode === m 
                ? `bg-gradient-to-r ${color} text-white shadow-lg` 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            disabled={isSaving}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-4 h-4" />
            {label}
          </motion.button>
        ))}
      </div>

      {/* Mode info */}
      <div className="mb-4 p-3 bg-gray-700/50 rounded-lg text-sm text-gray-300 border border-gray-600/50">
        {mode === 'hand' && 'Click and drag to navigate. Switch to Edit to modify content.'}
        {mode === 'edit' && (selectedElement ? `Editing: ${selectedElement.selector}` : 'Click elements in preview to edit them')}
        {mode === 'animation' && 'AI suggests animations based on content'}
        {mode === 'media' && 'Add or replace images and media'}
      </div>

      {/* Edit input for text */}
      {mode === 'edit' && selectedElement && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 space-y-2"
        >
          <label className="text-xs font-semibold text-gray-400 uppercase">
            {selectedElement.type === 'text' ? 'Edit Text' : 'Edit URL'}
          </label>
          <div className="relative">
            <input
              type="text"
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 backdrop-blur-md"
              placeholder="Enter new content..."
            />
            <motion.button
              onClick={handleSaveEdit}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-white hover:shadow-lg transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Check className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Save button */}
      <motion.button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-semibold transition disabled:opacity-50 shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {isSaving ? 'Saving...' : 'Save & Deploy'}
      </motion.button>
    </motion.div>
  )

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header with logo */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Image
                src="/isolele-logo-transparent.png"
                alt="ISOLELE"
                width={40}
                height={40}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Display Refact</h1>
              <p className="text-sm text-gray-400">Live editing with visual inspector</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Current Mode</p>
              <p className="text-lg font-semibold text-yellow-500 capitalize">{mode}</p>
            </div>
            <motion.button
              onClick={() => window.open('/', '_blank')}
              className="p-2 hover:bg-gray-700 rounded-lg transition text-gray-400 hover:text-white"
              whileHover={{ scale: 1.1 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-900">
        <motion.div 
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl h-full overflow-hidden border border-gray-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Preview iframe */}
          <iframe
            ref={iframeRef}
            src={previewURL}
            className={`w-full h-full rounded-2xl border-0 ${mode === 'edit' ? 'cursor-crosshair' : 'cursor-auto'}`}
            title="Public site preview"
            style={{
              pointerEvents: mode === 'hand' ? 'none' : 'auto',
            }}
          />
        </motion.div>
      </div>

      {/* Control panel */}
      <AnimatePresence>
        {!isSaving && ControlPanel}
      </AnimatePresence>

      {/* Save progress modal */}
      <AnimatePresence>
        {isSaving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 w-96 shadow-2xl border border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-white">Saving & Deploying</h2>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-500"
                    animate={{ width: `${saveProgress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <p className="text-center text-sm text-gray-400 mt-3 font-semibold">{saveProgress}%</p>
              </div>

              {/* Status */}
              <div className="space-y-3 text-sm mb-6">
                {[
                  { label: 'Collecting changes', threshold: 20 },
                  { label: 'Syncing to GitHub', threshold: 50 },
                  { label: 'Deploying to Vercel', threshold: 80 },
                ].map(({ label, threshold }, idx) => (
                  <motion.div key={idx} className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: saveProgress > threshold ? 1 : 0.8, opacity: saveProgress > threshold ? 1 : 0.5 }}
                      className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"
                    />
                    <span className={saveProgress > threshold ? 'text-white' : 'text-gray-500'}>
                      {saveProgress > threshold ? '✓' : '○'} {label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Success message */}
              {saveComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg text-center"
                >
                  <p className="font-semibold text-green-400">Changes deployed successfully!</p>
                  <p className="text-sm text-green-300 mt-1">Preview opening in new tab...</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
