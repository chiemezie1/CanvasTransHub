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
