'use client'

import { useState, useEffect } from 'react'
import { getUserProfile, followUser, isFollowing } from "@/contracts/contractInteractions"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UserProfileModalType } from '@/types/types'
import { useAccount } from "wagmi"

export default function UserProfileModal({ userAddress, onClose }: UserProfileModalType) {
  const { address: connectedAccount, isConnected } = useAccount();
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFollowingUser, setIsFollowingUser] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(userAddress)
        setUserProfile(profile)

        if (isConnected && connectedAccount) {
          const followingStatus = await isFollowing(connectedAccount, userAddress)
          setIsFollowingUser(followingStatus)
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error)
        setError("Failed to load user profile")
      }
    }
    fetchUserProfile()
  }, [userAddress, connectedAccount, isConnected])

  const handleFollow = async () => {
    if (userAddress.toLowerCase() === connectedAccount?.toLowerCase()) {
      setError("You cannot follow yourself.")
      return;
    }
    
    setLoading(true)
    try {
      await followUser(userAddress)
      setIsFollowingUser(true) // Update following status
      setError(null)
    } catch (error) {
      console.error("Failed to follow user:", error)
      setError("Failed to follow user. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 border dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-center text-gray-900 dark:text-gray-200">User Profile</DialogTitle>
        </DialogHeader>
        {userProfile ? (
          <div className="space-y-4 p-4">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${userProfile[2]}`}
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 dark:border-gray-600"
            />
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-200">
              {userProfile[0] || 'canvasTrans User'} {/* Default name when not provided */}
            </h2>
            <p className="text-center text-gray-700 dark:text-gray-300">{userProfile[1]}</p>
            <Button
              onClick={handleFollow}
              disabled={loading}
              className={`w-full ${isFollowingUser ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            >
              {loading ? 'Loading...' : isFollowingUser ? 'Following' : 'Follow'}
            </Button>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading user profile...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </DialogContent>
    </Dialog>
  )
}
