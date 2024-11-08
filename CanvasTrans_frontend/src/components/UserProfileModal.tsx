'use client'

import { useState, useEffect } from 'react'
import { getUserProfile, followUser, isFollowing, getFollowers, getFollowing } from "@/contracts/contractInteractions"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAccount } from "wagmi"
import { MessageAlert } from './MessageAlert'

type TransactionResult<T> = {
  success: boolean;
  data?: T;
  message?: string;
}

type UserProfileModalType = {
  userAddress: `0x${string}`;
  onClose: () => void;
}

interface UserProfile {
  username: string;
  bio: string;
  profilePicture: string;
  followerCount: number;
  followingCount: number;
}

export default function UserProfileModal({ userAddress, onClose }: UserProfileModalType) {
  const { address: connectedAccount, isConnected } = useAccount();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFollowingUser, setIsFollowingUser] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const result: TransactionResult<[string, string, string]> = await getUserProfile(userAddress)
        const followersResult: TransactionResult<readonly string[]> = await getFollowers(userAddress)
        const followingResult: TransactionResult<readonly string[]> = await getFollowing(userAddress)

        if (result.success && result.data) {
          setUserProfile({
            username: result.data[0],
            bio: result.data[1],
            profilePicture: result.data[2],
            followerCount: followersResult.success && followersResult.data ? followersResult.data.length : 0,
            followingCount: followingResult.success && followingResult.data ? followingResult.data.length : 0
          })
        } else {
          throw new Error(result.message || 'Failed to fetch user profile')
        }

        if (isConnected && connectedAccount) {
          const followingStatus: TransactionResult<boolean> = await isFollowing(connectedAccount, userAddress)
          setIsFollowingUser(followingStatus.success ? followingStatus.data ?? false : false)
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
      const result: TransactionResult<void> = await followUser(userAddress)
      if (result.success) {
        setIsFollowingUser(true)
        setError(null)
        // Update follower count
        setUserProfile(prev => prev ? {...prev, followerCount: prev.followerCount + 1} : null)
      } else {
        throw new Error(result.message || 'Failed to follow user')
      }
    } catch (error) {
      console.error("Failed to follow user:", error)
      setError("Failed to follow user. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCloseError = () => {
    setError(null)
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
              src={`https://gateway.pinata.cloud/ipfs/${userProfile.profilePicture}`}
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 dark:border-gray-600"
            />
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-200">
              {userProfile.username || 'canvasTrans User'}
            </h2>
            <p className="text-center text-gray-700 dark:text-gray-300">{userProfile.bio}</p>
            <div className="flex justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{userProfile.followerCount} Followers</span>
              <span>{userProfile.followingCount} Following</span>
            </div>
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
        {error && (
          <MessageAlert
            message={error}
            onClose={handleCloseError}
            type="error"
          />
        )}
      </DialogContent>
    </Dialog>
  )
}