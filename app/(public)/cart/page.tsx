"use client"

import { useTheme } from "@/lib/theme-context"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ShoppingCart } from "lucide-react"

export default function CartPage() {
  const { currentTheme } = useTheme()

  return (
    <div style={{ background: currentTheme.colors.background, color: currentTheme.colors.textPrimary }} className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link href="/shop">
            <motion.button
              className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all"
              style={{
                color: currentTheme.colors.accentPrimary,
                backgroundColor: `${currentTheme.colors.accentPrimary}10`,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <ArrowLeft size={20} />
              Back to Shop
            </motion.button>
          </Link>
          <h1 className="text-4xl font-black tracking-wider mb-4">SHOPPING CART</h1>
          <p style={{ color: currentTheme.colors.textSecondary }} className="text-lg">
            Your premium ISOLELE collection awaits
          </p>
        </motion.div>

        {/* Empty Cart State */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-20"
        >
          <div className="flex justify-center mb-6">
            <div
              className="p-8 rounded-lg"
              style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}
            >
              <ShoppingCart
                size={64}
                style={{ color: currentTheme.colors.accentPrimary }}
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p style={{ color: currentTheme.colors.textSecondary }} className="text-lg mb-8">
            Start exploring our collection of African mythology comics and merchandise
          </p>
          <Link href="/shop">
            <motion.button
              className="px-8 py-4 rounded-lg text-lg font-bold"
              style={{
                backgroundColor: currentTheme.colors.accentPrimary,
                color: currentTheme.colors.background,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 p-8 rounded-lg"
          style={{ backgroundColor: `${currentTheme.colors.accentPrimary}10` }}
        >
          <h3 className="font-bold text-xl mb-4">Cart Feature Coming Soon</h3>
          <p style={{ color: currentTheme.colors.textSecondary }} className="mb-4">
            Our full shopping cart system with checkout, payment processing, and order tracking is currently being enhanced. 
            In the meantime, you can browse all our products and prepare your wishlist!
          </p>
          <ul style={{ color: currentTheme.colors.textSecondary }} className="space-y-2 list-disc list-inside">
            <li>Secure checkout with multiple payment options</li>
            <li>Real-time inventory tracking</li>
            <li>Order history and tracking</li>
            <li>Exclusive member benefits</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
