import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, User, FileText, Boxes } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProfileUpdateForm from './ProfileUpdateForm'
import TransactionsList from './TransactionsList'
import BlocksList from './BlocksList'

interface UserProfileData {
  username: string
  bio: string
  profilePicture: string
  walletAddress: string
  totalTransactions: number
  totalBlocks: number
}

interface Transaction {
  id: string
  title: string
  description: string
  likes: number
  totalDonations: string
  timestamp: number
  blockId: string | null
}

interface Block {
  id: string
  name: string
  description: string
  owner: string
  transactionIds: string[]
}

// Mock smart contract interaction - replace with actual Web3 calls
const mockSmartContract = {
  getUserProfile: async (address: string): Promise<UserProfileData> => ({
    username: 'CryptoCreator',
    bio: 'Passionate about Web3 and digital art',
    profilePicture: 'https://picsum.photos/seed/user/200',
    walletAddress: '0x1234...5678',
    totalTransactions: 15,
    totalBlocks: 3
  }),
  updateProfile: async (data: Partial<UserProfileData>): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true }
  },
  getUserTransactions: async (address: string): Promise<Transaction[]> => [
    { id: '1', title: 'Cosmic Voyage', description: 'A journey through the stars', likes: 42, totalDonations: '0.5 ETH', timestamp: Date.now() - 86400000, blockId: '1' },
    { id: '2', title: 'Digital Dreams', description: 'Exploring the boundaries of digital art', likes: 38, totalDonations: '0.3 ETH', timestamp: Date.now() - 172800000, blockId: '2' },
    { id: '3', title: 'Neon Nights', description: 'A cyberpunk cityscape', likes: 55, totalDonations: '0.7 ETH', timestamp: Date.now() - 259200000, blockId: null },
  ],
  getUserBlocks: async (address: string): Promise<Block[]> => [
    { id: '1', name: 'Sci-Fi Collection', description: 'My best science fiction pieces', owner: '0x1234...5678', transactionIds: ['1'] },
    { id: '2', name: 'Abstract Art', description: 'Pushing the limits of form and color', owner: '0x1234...5678', transactionIds: ['2'] },
  ],
  addTransactionToBlock: async (transactionId: string, blockId: string): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true }
  },
}

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const profile = await mockSmartContract.getUserProfile('0x1234...5678')
        const userTransactions = await mockSmartContract.getUserTransactions('0x1234...5678')
        const userBlocks = await mockSmartContract.getUserBlocks('0x1234...5678')

        setUserProfile(profile)
        setTransactions(userTransactions)
        setBlocks(userBlocks)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleAddTransactionToBlock = async (transactionId: string, blockId: string) => {
    try {
      const result = await mockSmartContract.addTransactionToBlock(transactionId, blockId)
      if (result.success) {
        setTransactions(prevTransactions =>
          prevTransactions.map(t =>
            t.id === transactionId ? { ...t, blockId } : t
          )
        )
        setBlocks(prevBlocks =>
          prevBlocks.map(b =>
            b.id === blockId ? { ...b, transactionIds: [...b.transactionIds, transactionId] } : b
          )
        )
      }
    } catch (error) {
      console.error('Error adding transaction to block:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="w-24 h-24 border-2 border-purple-500">
                <AvatarImage src={userProfile?.profilePicture} alt={userProfile?.username} />
                <AvatarFallback>{userProfile?.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold mb-2">{userProfile?.username}</h1>
                <p className="text-gray-400 mb-4">{userProfile?.bio}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-purple-500" />
                    <span>{userProfile?.walletAddress}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-purple-500" />
                    <span>{userProfile?.totalTransactions} Transactions</span>
                  </div>
                  <div className="flex items-center">
                    <Boxes className="w-4 h-4 mr-2 text-purple-500" />
                    <span>{userProfile?.totalBlocks} Blocks</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileUpdateForm onProfileUpdate={setUserProfile} />
          </TabsContent>
          <TabsContent value="transactions">
            <TransactionsList 
              transactions={transactions} 
              blocks={blocks}
              onAddToBlock={handleAddTransactionToBlock}
            />
          </TabsContent>
          <TabsContent value="blocks">
            <BlocksList blocks={blocks} transactions={transactions} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}