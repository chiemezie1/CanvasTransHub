'use client'

import { formatDistanceToNow } from 'date-fns'
import { CanvasTransItem } from '@/types/types'
import { useState, useEffect } from 'react'
import { getUserProfile } from "@/contracts/contractInteractions"
import UserProfileModal from '../UserProfileModal'
import { MessageAlert } from '@/components/MessageAlert'

interface TransactionPostDetailsProps {
  item: CanvasTransItem
}

interface UserProfile {
  username: string;
  bio: string;
  profilePicture: string;
}

export default function TransactionPostDetails({ item }: TransactionPostDetailsProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const result = await getUserProfile(item.creator)
        if (result.success && result.data) {
          setUserProfile({
            username: result.data[0],
            bio: result.data[1],
            profilePicture: result.data[2]
          })
        } else {
          throw new Error(result.message || 'Failed to fetch user profile')
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error)
        setError("Failed to load user profile")
      }
    }
    fetchUserProfile()
  }, [item.creator])

  const showUserProfile = () => {
    setIsModalOpen(true)
  }

  const closeUserProfile = () => {
    setIsModalOpen(false)
  }

  const handleCloseError = () => {
    setError(null)
  }

  return (
    <div className="bg-background dark:bg-background-dark p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {userProfile && (
          <img
            src={`https://gateway.pinata.cloud/ipfs/${userProfile.profilePicture}`}
            alt="User Profile"
            className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
            onClick={showUserProfile}
          />
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground dark:text-foreground-dark mb-2">{item.title}</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(Number(item.timestamp) * 1000, { addSuffix: true })}
          </span>
        </div>
      </div>
      <p className="text-foreground dark:text-foreground-dark mb-4">{item.description}</p>
      {item.mediaType === 1 && (
        <img
          src={`https://gateway.pinata.cloud/ipfs/${item.ipfsHash}`}
          alt={item.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      {item.mediaType === 2 && (
        <video
          src={`https://gateway.pinata.cloud/ipfs/${item.ipfsHash}`}
          controls
          className="w-full h-64 object-cover rounded-md mb-4"
        >
          Your browser does not support the video tag.
        </video>
      )}
      {isModalOpen && (
        <UserProfileModal
          userAddress={item.creator}
          onClose={closeUserProfile}
        />
      )}
      {error && (
        <MessageAlert
          message={error}
          onClose={handleCloseError}
          type="error"
        />
      )}
    </div>
  )
}