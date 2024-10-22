import { UserProfileData, Transaction, Block } from '@/types/types'

export const mockSmartContract = {
  getUserProfile: async (address: string): Promise<UserProfileData> => ({
    username: 'CryptoCreator',
    bio: 'Passionate about Web3 and digital art',
    profilePicture: 'https://picsum.photos/seed/user/200',
  }),

  updateProfile: async (username: string, bio: string, profilePicture: string): Promise<{ success: boolean }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true }
  },

  getUserTransactions: async (address: string): Promise<Transaction[]> => [
    { id: '1', title: 'Cosmic Voyage', description: 'A journey through the stars', likes: 42, totalDonations: '0.5 ETH', timestamp: Date.now() - 86400000 },
    { id: '2', title: 'Digital Dreams', description: 'Exploring the boundaries of digital art', likes: 38, totalDonations: '0.3 ETH', timestamp: Date.now() - 172800000 },
  ],

  getUserBlocks: async (address: string): Promise<Block[]> => [
    { id: '1', name: 'Sci-Fi Collection', description: 'My best science fiction pieces', owner: '0x1234...5678', transactionIds: ['1', '3', '5'] },
    { id: '2', name: 'Abstract Art', description: 'Pushing the limits of form and color', owner: '0x1234...5678', transactionIds: ['2', '4', '6'] },
  ],
}