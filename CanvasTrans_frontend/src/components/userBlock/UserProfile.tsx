'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, User, FileText, Boxes } from 'lucide-react'
import ProfileUpdateForm from './ProfileUpdateForm'
import UserFeed from './UserFeed'
import UserBlocks from './UserBlocks'
import {CanvasTransLogo} from '@/components/CanvasTransLogo'
import Link from 'next/link';

interface UserProfileData {
  username: string
  bio: string
  profilePicture: string
  walletAddress: string
  totalPosts: number
  totalBlocks: number
}

const mockSmartContract = {
  getUserProfile: async (address: string): Promise<UserProfileData> => ({
    username: 'CryptoCreator',
    bio: 'Passionate about Web3 and digital art',
    profilePicture: '/placeholder.svg?height=200&width=200',
    walletAddress: '0x1234...5678',
    totalPosts: 15,
    totalBlocks: 3
  })
}

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null)
  const [activeTab, setActiveTab] = useState('profile')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    setIsDarkMode(storedTheme === 'dark')
    document.documentElement.classList.toggle('dark', storedTheme === 'dark')

    const fetchUserProfile = async () => {
      const profile = await mockSmartContract.getUserProfile('0x1234...5678')
      setUserProfile(profile)
    }
    fetchUserProfile()
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark')
    document.documentElement.classList.toggle('dark', !isDarkMode)
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <CanvasTransLogo />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">CanvasTrans</span>
        </Link>
        <div>
        <Link href="/canvas-trans-hub" className="text-purple-700 bg-gray-300 font-semibold text-lg text-end mr-3 border-2 border-gray-600 rounded-lg px-2 py-3 ">
        Explore Trans Hub
        </Link>
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>  
        </div>         
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={userProfile?.username}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={userProfile?.profilePicture}
                    alt={userProfile?.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-3xl font-bold mb-2">{userProfile?.username}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{userProfile?.bio}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-primary dark:text-primary-light" />
                      <span>{userProfile?.walletAddress}</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-primary dark:text-primary-light" />
                      <span>{userProfile?.totalPosts} Posts</span>
                    </div>
                    <div className="flex items-center">
                      <Boxes className="w-4 h-4 mr-2 text-primary dark:text-primary-light" />
                      <span>{userProfile?.totalBlocks} Blocks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === 'profile'
                      ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === 'feed'
                      ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab('feed')}
                >
                  Feed
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === 'blocks'
                      ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab('blocks')}
                >
                  Blocks
                </button>
              </div>
              <div className="p-6">
                {activeTab === 'profile' && <ProfileUpdateForm onProfileUpdate={setUserProfile} />}
                {activeTab === 'feed' && <UserFeed />}
                {activeTab === 'blocks' && <UserBlocks />}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}