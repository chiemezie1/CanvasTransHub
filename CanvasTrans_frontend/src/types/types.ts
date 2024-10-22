export interface CanvasTransItem {
  id: string
  ipfsHash: string
  title: string
  description: string
  creator: {
    address: string
    name: string
  }
  likes: number
  timestamp: number
  totalDonations: number
  contentType: 'image' | 'text' | 'video'
}


export interface UserProfileData {
  username: string
  bio: string
  profilePicture: string
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
  owner: string
  transactionIds: string[]
}