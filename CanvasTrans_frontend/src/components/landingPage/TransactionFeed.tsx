'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronUp, ChevronDown, Activity } from 'lucide-react'

interface Transaction {
  id: string
  from: string
  to: string
  amount: string
  timestamp: number
}

export default function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const generateTransaction = useCallback((): Transaction => ({
    id: Math.random().toString(36).substr(2, 9),
    from: `0x${Math.random().toString(36).substr(2, 8)}`,
    to: `0x${Math.random().toString(36).substr(2, 8)}`,
    amount: (Math.random() * 10).toFixed(4),
    timestamp: Date.now(),
  }), [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions(prev => [generateTransaction(), ...prev.slice(0, 9)])
    }, 5000)

    return () => clearInterval(interval)
  }, [generateTransaction])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 left-4 z-50 md:mb-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`bg-gradient-to-br from-blue-600/80 to-purple-600/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-80' : 'w-56'
        }`}
      >
        <div 
          className="bg-white/10 p-3 text-sm font-semibold flex justify-between items-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-white animate-pulse" />
            <span className="text-white">Live Transactions</span>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-white" />
          ) : (
            <ChevronUp className="w-4 h-4 text-white" />
          )}
        </div>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
            >
              {transactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between py-2 border-b border-white/20 last:border-b-0"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-xs">
                      <div className="text-white font-medium">{tx.from.slice(0, 6)}...{tx.from.slice(-4)}</div>
                      <div className="text-blue-200">{tx.amount} ETH</div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-200">
                    {new Date(tx.timestamp).toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {!isExpanded && (
          <motion.div 
            className="p-2 flex items-center justify-between"
            initial={false}
            animate={isHovered ? { y: -5 } : { y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs text-white">
              <div className="font-medium">{transactions[0]?.from.slice(0, 6)}...{transactions[0]?.from.slice(-4)}</div>
              <div className="text-blue-200">{transactions[0]?.amount} ETH</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}