'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Plus, Image as ImageIcon, Film, FileText } from 'lucide-react'

interface Post {
  id: string
  title: string
  content: string
  type: 'text' | 'image' | 'video'
  likes: number
  comments: number
  timestamp: number
  blockId: string | null
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'My First NFT',
    content: 'Just minted my first NFT! Check it out!',
    type: 'image',
    likes: 42,
    comments: 7,
    timestamp: Date.now() - 86400000,
    blockId: '1'
  },
  {
    id: '2',
    title: 'Thoughts on DeFi',
    content: 'DeFi is revolutionizing finance. Here are my thoughts...',
    type: 'text',
    likes: 38,
    comments: 15,
    timestamp: Date.now() - 172800000,
    blockId: '2'
  },
  {
    id: '3',
    title: 'Crypto Art Showcase',
    content: 'A video showcasing my latest crypto art collection',
    type: 'video',
    likes: 55,
    comments: 23,
    timestamp: Date.now() - 259200000,
    blockId: null
  },
]

export default function UserFeed() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    // Simulating API call to fetch posts
    setPosts(mockPosts)
  }, [])

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-6  h-6 text-blue-500" />
      case 'video':
        return <Film className="w-6 h-6 text-green-500" />
      default:
        return <FileText className="w-6 h-6 text-purple-500" />
    }
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                {getPostIcon(post.type)}
                <span className="ml-2">{post.title}</span>
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 hover:text-primary dark:hover:text-primary-light transition-colors duration-200">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-primary dark:hover:text-primary-light transition-colors duration-200">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
              </div>
              {post.blockId ? (
                <span className="text-primary dark:text-primary-light">In Block</span>
              ) : (
                <button className="flex items-center space-x-1 text-secondary hover:text-secondary-dark dark:hover:text-secondary-light transition-colors duration-200">
                  <Plus className="w-5 h-5" />
                  <span>Add to Block</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}