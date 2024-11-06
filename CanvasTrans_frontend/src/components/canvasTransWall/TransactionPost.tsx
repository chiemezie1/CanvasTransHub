'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { getUserProfile } from "@/contracts/contractInteractions"
import TransactionPostDetails from './TransactionPostDetails'
import TransactionPostActions from './TransactionPostActions'
import UserProfileModal from './UserProfileModal'
import { UserProfileModalProps } from '@/types/types'

interface TransactionPostProps extends UserProfileModalProps {
  isLoading: boolean
}

interface TransactionResult<T> {
  success: boolean;
  data?: T;
  message?: string;
}

interface UserProfile {
  name: string;
  bio: string;
  profilePicture: string;
}

export default function TransactionPost({ item, isLoading }: TransactionPostProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isContentLoading, setIsContentLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsContentLoading(true)
      try {
        const profileResult: TransactionResult<UserProfile> = await getUserProfile(item.creator)
        if (profileResult.success && profileResult.data) {
          setUserProfile(profileResult.data)
        } else {
          setUserProfile(null)
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error)
        setUserProfile(null)
      } finally {
        setIsContentLoading(false)
      }
    }
    fetchUserProfile()
  }, [item.creator])

  if (isLoading || isContentLoading) {
    return (
      <div className="mt-16 bg-background dark:bg-background-dark rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="mt-16 bg-background dark:bg-background-dark rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6 space-y-6">
        <div className="flex items-start space-x-4">
          {userProfile && (
            <img
              src={`https://gateway.pinata.cloud/ipfs/${userProfile.profilePicture}`}
              alt="User Profile"
              className="w-12 h-12 rounded-full cursor-pointer"
              onClick={() => setIsProfileModalOpen(true)}
            />
          )}
          <TransactionPostDetails item={item} />
        </div>
        <TransactionPostActions item={item} />
      </div>
      {isProfileModalOpen && (
        <UserProfileModal
          userAddress={item.creator}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </div>
  )
}