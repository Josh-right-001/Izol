'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hand, Edit3, Wand2, Save, X, Loader2, ExternalLink, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

export default function DisplayRefactPage() {
  const [mode, setMode] = useState<'hand' | 'edit' | 'animation' | null>('hand')
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveProgress, setSaveProgress] = useState(0)
  const [saveComplete, setSaveComplete] = useState(false)
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Draggable control panel
  const handlePanelDragStart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    setIsDragging(true)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      setPanelPosition({
        x: e.clientX - panelRef.current!.offsetWidth / 2,
        y: e.clientY - panelRef.current!.offsetHeight / 2,
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

  // Save functionality with auto-deployment
  const handleSave = async () => {
    setIsSaving(true)
    setSaveProgress(0)

    try {
      // Simulate save progress
      for (let i = 0; i <= 100; i += 10) {
        setSaveProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      // Call API to save and deploy
      const response = await fetch('/api/admin/save-and-deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          changes: { mode, selectedElement },
          timestamp: new Date().toISOString(),
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
      }, 2000)
    } catch (error) {
      console.error('Save error:', error)
      alert('Error saving changes. Please try again.')
      setIsSaving(false)
    }
  }

  const ControlPanel = (
    <motion.div
      ref={panelRef}
      drag={!isSaving}
      dragElastic={0.1}
      onMouseDown={handlePanelDragStart}
      className="fixed bottom-8 right-8 z-40 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 w-80"
      style={{
        x: panelPosition.x,
        y: panelPosition.y,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b">
        <h3 className="font-bold text-gray-900">Page Editor</h3>
        <button className="p-1 hover:bg-gray-100 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Mode buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setMode('hand')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
            mode === 'hand' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          disabled={isSaving}
        >
          <Hand className="w-4 h-4" />
          Hand
        </button>

        <button
          onClick={() => setMode('edit')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
            mode === 'edit' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          disabled={isSaving}
        >
          <Edit3 className="w-4 h-4" />
          Edit
        </button>

        <button
          onClick={() => setMode('animation')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
            mode === 'animation' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          disabled={isSaving}
        >
          <Wand2 className="w-4 h-4" />
          Animation
        </button>

        <button
          onClick={() => setMode(null)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
            mode === null ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          disabled={isSaving}
        >
          <ImageIcon className="w-4 h-4" />
          Media
        </button>
      </div>

      {/* Mode info */}
      {mode === 'hand' && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
          Click elements to select them for editing.
        </div>
      )}

      {mode === 'edit' && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
          {selectedElement ? `Editing: ${selectedElement}` : 'Select an element to edit'}
        </div>
      )}

      {mode === 'animation' && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
          AI will suggest animations based on content
        </div>
      )}

      {mode === null && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
          Add or replace media on your page
        </div>
      )}

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition disabled:opacity-50"
      >
        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {isSaving ? 'Saving...' : 'Save & Deploy'}
      </button>
    </motion.div>
  )

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header with logo */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
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
            <h1 className="text-2xl font-bold text-gray-900">Display Refact - Live Preview</h1>
          </div>
          <div className="text-sm text-gray-600">
            Mode: <span className="font-semibold capitalize">{mode || 'media'}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg shadow-lg h-full">
          {/* Preview iframe */}
          <iframe
            src="/"
            className="w-full h-full rounded-lg border-0"
            title="Public site preview"
          />
        </div>
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
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-8 w-96 shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-6 text-center">Saving & Deploying</h2>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600"
                    animate={{ width: `${saveProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">{saveProgress}%</p>
              </div>

              {/* Status */}
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: saveProgress > 20 ? 1 : 0.8 }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  <span>{saveProgress > 20 ? '✓' : '○'} Collecting changes</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: saveProgress > 50 ? 1 : 0.8 }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  <span>{saveProgress > 50 ? '✓' : '○'} Syncing to GitHub</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: saveProgress > 80 ? 1 : 0.8 }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  <span>{saveProgress > 80 ? '✓' : '○'} Deploying to Vercel</span>
                </div>
              </div>

              {/* Success message */}
              {saveComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center"
                >
                  <p className="font-semibold text-green-700">Changes deployed successfully!</p>
                  <p className="text-sm text-green-600 mt-1">Preview opening in new tab...</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
