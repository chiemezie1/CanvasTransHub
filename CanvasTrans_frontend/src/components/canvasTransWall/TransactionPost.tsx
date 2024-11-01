'use client'

import { useState, useEffect } from 'react'
import { getUserProfile } from "@/contracts/contractInteractions"
import TransactionPostDetails from './TransactionPostDetails'
import TransactionPostActions from './TransactionPostActions'
import UserProfileModal from './UserProfileModal'
import { UserProfileModalProps } from '@/types/types'

export default function TransactionPost({ item }: UserProfileModalProps) {
  const [userProfile, setUserProfile] = useState<{ profilePicture: string } | null>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(item.creator)
        if (profile) {
          setUserProfile({ profilePicture: profile[2] || '' })
        } else {
          setUserProfile(null)
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error)
        setUserProfile(null)
      }
    }
    fetchUserProfile()
  }, [item.creator])

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