'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CreditCard, Send, TrendingUp, History, ArrowLeft, Plus } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'
import Link from 'next/link'

export default function WalletPage() {
  const { currentTheme } = useTheme()
  const [balance] = useState(1250.50)
  const [transactions] = useState([
    { id: 1, type: 'purchase', amount: 89.99, description: 'Fashion Item - Ceremonial Robe', date: '2024-03-15', status: 'completed' },
    { id: 2, type: 'refund', amount: 25.00, description: 'Return - Sunglasses', date: '2024-03-14', status: 'completed' },
    { id: 3, type: 'purchase', amount: 249.99, description: 'Comic Book Collection', date: '2024-03-13', status: 'completed' },
    { id: 4, type: 'purchase', amount: 45.50, description: 'Accessories Bundle', date: '2024-03-12', status: 'completed' },
  ])

  return (
    <div className="min-h-screen w-full pt-24 pb-20" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="max-w-3xl mx-auto px-6">
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

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-lg mb-8"
          style={{ background: `linear-gradient(135deg, ${currentTheme.colors.accentPrimary}, ${currentTheme.colors.accentSecondary})` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70 mb-2">Total Balance</p>
              <h2 className="text-5xl font-bold" style={{ color: currentTheme.colors.background }}>
                ${balance.toFixed(2)}
              </h2>
            </div>
            <CreditCard size={64} style={{ color: currentTheme.colors.background }} opacity={0.3} />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-lg font-semibold flex items-center justify-center gap-2"
            style={{
              backgroundColor: currentTheme.colors.accentPrimary,
              color: currentTheme.colors.background,
            }}
          >
            <Plus size={20} />
            Add Funds
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-lg font-semibold flex items-center justify-center gap-2"
            style={{
              backgroundColor: `${currentTheme.colors.accentSecondary}`,
              color: currentTheme.colors.background,
            }}
          >
            <Send size={20} />
            Send Money
          </motion.button>
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-lg mb-8"
          style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CreditCard size={20} />
            Payment Methods
          </h3>
          <div className="space-y-2">
            <div className="p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.background }}>
              <p className="font-semibold">•••• •••• •••• 4242</p>
              <p className="text-sm opacity-50">Visa - Expires 12/25</p>
            </div>
            <button className="w-full p-4 rounded-lg font-semibold" style={{ backgroundColor: `${currentTheme.colors.accentPrimary}20` }}>
              + Add New Payment Method
            </button>
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-lg"
          style={{ backgroundColor: `${currentTheme.colors.accentSecondary}10` }}
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <History size={20} />
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <motion.div
                key={tx.id}
                className="p-4 rounded-lg flex items-center justify-between"
                style={{ backgroundColor: currentTheme.colors.background }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.accentPrimary}20` }}>
                    {tx.type === 'purchase' ? <TrendingUp size={20} /> : <Send size={20} />}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{tx.description}</p>
                    <p className="text-xs opacity-50">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.type === 'refund' ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.type === 'refund' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </p>
                  <p className="text-xs opacity-50 capitalize">{tx.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
