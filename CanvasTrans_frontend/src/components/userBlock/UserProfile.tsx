'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, User, FileText, Boxes, Users } from 'lucide-react'
import ProfileUpdateForm from './ProfileUpdateForm'
import UserFeed from './UserFeed'
import UserBlocks from './UserBlocks'
import { CanvasTransLogo } from '@/components/CanvasTransLogo'
import Link from 'next/link'
import { useAccount } from "wagmi"
import { getUserProfile, getUserTransactions, getUserBlocks, getFollowers, getFollowing } from "@/contracts/contractInteractions"
import { MessageAlert } from '@/components/MessageAlert'

interface UserProfileData {
  username: string
  bio: string
  profilePicture: string
  walletAddress?: string
  followers: number
  following: number
}

interface CanvasTransItem {
  id: string
  ipfsHash: string
  title: string
  content: string
  type: string
  likes: number
  comments: number
  timestamp: number
  transBlock: number
  blockCategory: string | null
  blockId: string | null
}

interface Block {
  id: string
  name: string
  description: string
  category: string
  owner: string
  transactionIds: bigint[]
  posts: Post[]
}

interface Post {
  id: string
  title: string
  type: string
  likes: number
}

interface TransactionResult<T> {
  success: boolean
  data?: T
  message?: string
}

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null)
  const [transactions, setTransactions] = useState<CanvasTransItem[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [activeTab, setActiveTab] = useState('profile')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [alertState, setAlertState] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error' | null }>({ message: '', type: null })
  const [isLoading, setIsLoading] = useState(true)

  const { address, isConnected } = useAccount()

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const darkModeEnabled = storedTheme === 'dark'
    setIsDarkMode(darkModeEnabled)
    document.documentElement.classList.toggle('dark', darkModeEnabled)

    const fetchUserProfile = async () => {
      if (isConnected && address) {
        setIsLoading(true)
        try {
          const profileResult: TransactionResult<[string, string, string]> = await getUserProfile(address)
          const followersResult: TransactionResult<readonly string[]> = await getFollowers(address)
          const followingResult: TransactionResult<readonly string[]> = await getFollowing(address)
  
          if (profileResult.success && profileResult.data) {
            setUserProfile({
              username: profileResult.data[0] || 'canvaTrans User',
              bio: profileResult.data[1] || 'Set up a profile for more personalisation',
              profilePicture: profileResult.data[2],
              walletAddress: address,
              followers: followersResult.success && followersResult.data ? followersResult.data.length : 0,
              following: followingResult.success && followingResult.data ? followingResult.data.length : 0
            })

            // Fetch user transactions and blocks
            const transactionsResult: TransactionResult<readonly CanvasTransItem[]> = await getUserTransactions(address)
            if (transactionsResult.success && transactionsResult.data) {
              setTransactions([...transactionsResult.data])
            } else {
              setAlertState({ message: "Failed to fetch user transactions", type: 'error' })
            }

            const blocksResult: TransactionResult<readonly Block[]> = await getUserBlocks(address)
            if (blocksResult.success && blocksResult.data) {
              setBlocks([...blocksResult.data])
            } else {
              setAlertState({ message: "Failed to fetch user blocks", type: 'error' })
            }
          } else {
            setAlertState({ message: "Failed to fetch user profile", type: 'error' })
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
          setAlertState({ message: "An error occurred while fetching user data", type: 'error' })
        } finally {
          setIsLoading(false)
        }
      } else {
        setAlertState({ message: "Please connect your wallet to view your profile", type: 'warning' })
        setIsLoading(false)
      }
    }
    
    fetchUserProfile()
  }, [address, isConnected])      

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode
    setIsDarkMode(newDarkModeState)
    localStorage.setItem('theme', newDarkModeState ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newDarkModeState)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
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
            <Link href="/canvas-trans-hub" className="text-purple-700 bg-gray-300 font-semibold text-lg text-end mr-3 border-2 border-gray-600 rounded-lg px-2 py-3">
              Trans Hub
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
            {userProfile && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <img
                        src={userProfile.profilePicture ? `https://gateway.pinata.cloud/ipfs/${userProfile.profilePicture}` : '/placeholder-user.jpg'}
                        alt={userProfile.username || 'User Profile Picture'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-3xl font-bold mb-2">{userProfile.username}</h2>
                      <p className={`text-gray-600 dark:text-gray-400 mb-4 ${userProfile.bio === 'Set up a profile for more personalisation' ? 'text-red-500' : ''}`}>
                        {userProfile.bio}
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-primary dark:text-primary-light" />
                          <span>{getShortenedAddress(userProfile.walletAddress)}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-primary dark:text-primary-light" />
                          <span>{transactions.length} Transactions</span>
                        </div>
                        <div className="flex items-center">
                          <Boxes className="w-4 h-4 mr-2 text-primary dark:text-primary-light" />
                          <span>{blocks.length} Blocks</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-green-700 dark:text-text-green-400" />
                          <span>{userProfile.followers} Followers</span>
                        </div>
                        <div className="flex items-center">
                          <Users  className="w-4 h-4 mr-2  text-green-700 dark:text-text-green-400" />
                          <span>{userProfile.following} Following</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                      className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'profile' ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      Profile
                    </button>
                    <button
                      className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'feed' ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                      onClick={() => setActiveTab('feed')}
                    >
                      Feed
                    </button>
                    <button
                      className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'blocks' ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                      onClick={() => setActiveTab('blocks')}
                    >
                      Blocks
                    </button>
                  </div>
                  <div className="p-6">
                    {activeTab === 'profile' && <ProfileUpdateForm onProfileUpdate={setUserProfile} />}
                    {activeTab === 'feed' && <UserFeed transactions={transactions} />}
                    {activeTab === 'blocks' && <UserBlocks blocks={blocks} />}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      {alertState.type && (
        <MessageAlert
          message={alertState.message}
          onClose={() => setAlertState({ message: '', type: null })}
          type={alertState.type}
        />
      )}
    </div>
  )
}

// Helper function to shorten the wallet address
const getShortenedAddress = (address?: string) => {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'No wallet address';
};