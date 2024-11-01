'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Folder, FileText, Image, Film } from 'lucide-react'
import { getUserBlocks, getATransactions } from "@/contracts/contractInteractions"
import { useAccount } from "wagmi"

interface Post {
  id: string
  title: string
  type: string
  likes: number
}

interface Block {
  id: string
  name: string
  description: string
  category: string
  owner: string
  transactionIds: number[]
  posts: Post[]
}

export default function UserBlocks() {
  const { address, isConnected } = useAccount()
  const [blocks, setBlocks] = useState<Block[]>([])
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserBlocks = async () => {
      if (!isConnected || !address) {
        alert("Please connect your wallet first.")
        setIsLoading(false)
        return
      }
      try {
        setIsLoading(true)
        const userBlockDetails = await getUserBlocks(address)
        
        const userBlocks = await Promise.all(userBlockDetails.map(async (userBlockDetail: any) => {
          const id = userBlockDetail.id.toString()
          const name = userBlockDetail.name || 'Untitled User Block'
          const description = userBlockDetail.description || 'No description provided.'
          const category = userBlockDetail.category || 'Uncategorized'
          const owner = userBlockDetail.owner || 'Unknown Owner'
          const transactionIds = userBlockDetail.transactionIds || []

          const posts = await Promise.all(transactionIds.map(async (txId: bigint) => {
            const transactionDetail = await getATransactions(txId)
            return {
              id: txId.toString(),
              title: transactionDetail[2] || "Untitled Post",
              type: transactionDetail[4]?.toString() === '1' ? 'image' : transactionDetail[4]?.toString() === '2' ? 'video' : 'text',
              likes: transactionDetail[7] || 0
            }
          }))

          return {
            id,
            name,
            description,
            category,
            owner,
            transactionIds,
            posts,
          }
        }))

        setBlocks(userBlocks.filter(Boolean))
        console.log("User Blocks:", userBlocks)
      } catch (error) {
        console.error("Error fetching user blocks:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserBlocks()
  }, [address, isConnected])

  const toggleExpand = (id: string) => {
    setExpandedBlock(expandedBlock === id ? null : id)
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-4 h-4 text-blue-500 dark:text-blue-400" />
      case 'video':
        return <Film className="w-4 h-4 text-green-500 dark:text-green-400" />
      default:
        return <FileText className="w-4 h-4 text-purple-500 dark:text-purple-400" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {blocks.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">No blocks found.</div>
      ) : (
        blocks.map((block) => (
          <motion.div
            key={block.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div
              className="p-6 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 group"
              onClick={() => toggleExpand(block.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
                  <Folder className="w-6 h-6 mr-3 text-primary dark:text-primary-light" />
                  {block.name}
                </h3>
                <motion.div
                  animate={{ rotate: expandedBlock === block.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200" />
                </motion.div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">{block.description}</p>
              <div className="text-sm font-medium text-primary dark:text-primary-light">
                {block.posts.length} post{block.posts.length !== 1 ? 's' : ''}
              </div>
            </div>
            <AnimatePresence>
              {expandedBlock === block.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 dark:bg-gray-700 px-6 py-4"
                >
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Posts in this block:</h4>
                  <ul className="space-y-2">
                    {block.posts.map((post) => (
                      <li key={post.id} className="flex items-center text-sm text-gray-600 dark:text-gray-400 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                        {getPostIcon(post.type)}
                        <span className="ml-3 flex-grow">{post.title}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{post.likes} likes</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))
      )}
    </div>
  )
}