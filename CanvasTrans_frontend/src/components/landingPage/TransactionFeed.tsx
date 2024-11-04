'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronUp, ChevronDown, Activity, ExternalLink } from 'lucide-react'
import { 
  useTransactionCreatedListener,
  useBlockCreatedListener,
  useBlockDetailsUpdatedListener,
  useCommentAddedListener,
  useDonationMadeListener,
  useDonationsWithdrawnListener,
  useFollowedListener,
  useTransactionAddedToBlockListener,
  useTransactionLikedListener 
} from '@/contracts/watchContractEvent'

interface Notification {
  id: string
  type: string
  message: string
  timestamp: number
  transactionHash: string
}

export default function ContractNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const { transactionCreated, transactionHash: transactionCreatedHash } = useTransactionCreatedListener()
  const { blockCreated, transactionHash: blockCreatedHash } = useBlockCreatedListener()
  const { blockDetailsUpdated, transactionHash: blockDetailsUpdatedHash } = useBlockDetailsUpdatedListener()
  const { commentAdded, transactionHash: commentAddedHash } = useCommentAddedListener()
  const { donationMade, transactionHash: donationMadeHash } = useDonationMadeListener()
  const { donationsWithdrawn, transactionHash: donationsWithdrawnHash } = useDonationsWithdrawnListener()
  const { followed, transactionHash: followedHash } = useFollowedListener()
  const { transactionAddedToBlock, transactionHash: transactionAddedToBlockHash } = useTransactionAddedToBlockListener()
  const { transactionLiked, transactionHash: transactionLikedHash } = useTransactionLikedListener()

  const addNotification = useCallback((type: string, message: string, hash: string) => {
    setNotifications(prev => {
      const newNotification = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        message,
        timestamp: Date.now(),
        transactionHash: hash
      }
      return [newNotification, ...prev].slice(0, 10) // Keep only the latest 10 notifications
    })
  }, [])

  useEffect(() => {
    if (transactionCreated && transactionCreatedHash) {
      addNotification('TransactionCreated', `New transaction created by ${transactionCreated.creator.slice(0, 6)}...${transactionCreated.creator.slice(-4)}`, transactionCreatedHash)
    }
    if (blockCreated && blockCreatedHash) {
      addNotification('BlockCreated', `New block created by ${blockCreated.owner.slice(0, 6)}...${blockCreated.owner.slice(-4)}`, blockCreatedHash)
    }
    if (blockDetailsUpdated && blockDetailsUpdatedHash) {
      addNotification('BlockDetailsUpdated', `Block ${blockDetailsUpdated.blockId} details updated`, blockDetailsUpdatedHash)
    }
    if (commentAdded && commentAddedHash) {
      addNotification('CommentAdded', `New comment added to transaction ${commentAdded.transactionId}`, commentAddedHash)
    }
    if (donationMade && donationMadeHash) {
      addNotification('DonationMade', `Donation made to transaction ${donationMade.transactionId}`, donationMadeHash)
    }
    if (donationsWithdrawn && donationsWithdrawnHash) {
      addNotification('DonationsWithdrawn', `Donations withdrawn by ${donationsWithdrawn.creator.slice(0, 6)}...${donationsWithdrawn.creator.slice(-4)}`, donationsWithdrawnHash)
    }
    if (followed && followedHash) {
      addNotification('Followed', `${followed.follower.slice(0, 6)}...${followed.follower.slice(-4)} followed ${followed.user.slice(0, 6)}...${followed.user.slice(-4)}`, followedHash)
    }
    if (transactionAddedToBlock && transactionAddedToBlockHash) {
      addNotification('TransactionAddedToBlock', `Transaction ${transactionAddedToBlock.transactionId} added to block ${transactionAddedToBlock.blockId}`, transactionAddedToBlockHash)
    }
    if (transactionLiked && transactionLikedHash) {
      addNotification('TransactionLiked', `Transaction ${transactionLiked.transactionId} liked by ${transactionLiked.liker.slice(0, 6)}...${transactionLiked.liker.slice(-4)}`, transactionLikedHash)
    }
  }, [addNotification, transactionCreated, blockCreated, blockDetailsUpdated, commentAdded, donationMade, donationsWithdrawn, followed, transactionAddedToBlock, transactionLiked,
      transactionCreatedHash, blockCreatedHash, blockDetailsUpdatedHash, commentAddedHash, donationMadeHash, donationsWithdrawnHash, followedHash, transactionAddedToBlockHash, transactionLikedHash])

  const handleTransactionClick = (hash: string) => {
    window.open(`https://sepolia.arbiscan.io/tx/${hash}`, '_blank')
  }

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
            <span className="text-white">Contract Events</span>
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
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between py-2 border-b border-white/20 last:border-b-0"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-xs">
                      <div className="text-white font-medium">{notification.type}</div>
                      <div className="text-blue-200">{notification.message}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xs text-blue-200">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </div>
                    <button
                      onClick={() => handleTransactionClick(notification.transactionHash)}
                      className="mt-1 text-xs text-blue-200 hover:text-white transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {!isExpanded && notifications.length > 0 && (
          <motion.div 
            className="p-2 flex items-center justify-between"
            initial={false}
            animate={isHovered ? { y: -5 } : { y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs text-white">
              <div className="font-medium">{notifications[0].type}</div>
              <div className="text-blue-200">{notifications[0].message}</div>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleTransactionClick(notifications[0].transactionHash)}
                className="mt-1 text-xs text-blue-200 hover:text-white transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}