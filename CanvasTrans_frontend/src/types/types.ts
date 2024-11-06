export interface CanvasTransItem {
  id: bigint
  ipfsHash: string
  title: string
  description: string
  mediaType: number 
  creator: `0x${string}`
  likes: bigint
  timestamp: bigint
  totalDonations: bigint
  blockId?: string
}

export interface Transaction {
  id: string
  title: string
  description: string
  likes: number
  totalDonations: string
  timestamp: number
}

export interface Block {
  id: string
  name: string
  description: string
  category: string
  owner: `0x${string}`
  transactionIds: string[]
}


export interface UserProfile {
  username: string
  bio: string
  profilePicture: string
  followers: string[]
  following: string[]
}

export interface SidebarProps {
  categories: readonly string[]
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  isOpen: boolean
  onToggle: () => void
}

export interface UserProfileData {
  username: string
  bio: string
  profilePicture: string
}

// Add the TransactionResult type
export interface TransactionResult<T> {
  success: boolean;
  data?: T;
  message?: string;
}


export interface TransactionPostActionsProps {
  item: {
      id: bigint;
      creator: string;
      likes: bigint;
  }
}

export interface UserProfileModalProps {
  userAddress: `0x${string}`
  item: CanvasTransItem
  onClose: () => void
}
export interface UserProfileModalType {
  userAddress: `0x${string}`
  onClose: () => void
}


export interface Donor {
  address: `0x${string}`
  amount: number
  name: string
  profilePicture: string
}

export interface Comment {
  index?: bigint
  text: string
  commenter: `0x${string}`
  timestamp: bigint
  name: string
  profilePicture: string
}
