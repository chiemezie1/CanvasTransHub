'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Folder, FileText } from 'lucide-react'

interface Post {
  id: string
  title: string
  type: 'text' | 'image' | 'video'
}

interface Block {
  id: string
  name: string
  description: string
  posts: Post[]
}

const mockBlocks: Block[] = [
  {
    id: '1',
    name: 'NFT Collection',
    description: 'My curated NFT collection',
    posts: [
      { id: '1', title: 'First NFT', type: 'image' },
      { id: '2', title: 'NFT Showcase', type: 'video' },
    ]
  },
  {
    id: '2',
    name: 'DeFi Insights',
    description: 'Thoughts and analysis on DeFi',
    posts: [
      { id: '3', title: 'DeFi Explained', type: 'text' },
      { id: '4', title: 'Yield Farming Strategies', type: 'text' },
    ]
  },
]

export default function UserBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null)

  useEffect(() => {
    // Simulating API call to fetch blocks
    setBlocks(mockBlocks)
  }, [])

  const toggleExpand = (id: string) => {
    setExpandedBlock(expandedBlock === id ? null : id)
  }

  return (
    <div className="space-y-6">
      {blocks.map((block) => (
        <motion.div
          key={block.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div
            className="p-6 cursor-pointer"
            onClick={() => toggleExpand(block.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <Folder className="w-6 h-6 mr-2 text-primary dark:text-primary-light" />
                {block.name}
              </h3>
              {expandedBlock === block.id ? (
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{block.description}</p>
            <div className="text-sm font-medium text-primary dark:text-primary-light">
              {block.posts.length} posts
            </div>
          </div>
          <AnimatePresence>
            {expandedBlock === block.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 dark:bg-gray-700 px-6 py-4"
              >
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Posts in this block:</h4>
                <ul className="space-y-2">
                  {block.posts.map((post) => (
                    <li key={post.id} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FileText className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {post.title}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}