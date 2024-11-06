'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface MessageAlertProps {
  message: string
  onClose: () => void
  type?: 'info' | 'success' | 'warning' | 'error'
}

export function MessageAlert({ message, onClose, type = 'info' }: MessageAlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000) // Automatically dismiss after 3 seconds

    return () => clearTimeout(timer) // Cleanup timer on component unmount
  }, [onClose])

  const getAlertColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100'
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100'
      case 'error':
        return 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100'
      default:
        return 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between max-w-sm w-full ${getAlertColors()}`}
        role="alert"
      >
        <span className="flex-grow mr-2">{message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-gray-500 transition-colors"
          aria-label="Close alert"
        >
          <X size={18} />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

// Usage example
export default function AlertDemo() {
  const [showAlert, setShowAlert] = React.useState(false)

  return (
    <div className="p-4">
      <button
        onClick={() => setShowAlert(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Show Alert
      </button>
      {showAlert && (
        <MessageAlert
          message="This is a professional message alert!"
          onClose={() => setShowAlert(false)}
          type="info"
        />
      )}
    </div>
  )
}