'use client'

import { useState, useEffect } from 'react'
import { getUserProfile } from "@/contracts/contractInteractions"
import { X } from 'lucide-react'

interface FollowerModelProps {
  addresses: `0x${string}`[]
  type: 'followers' | 'following'
  onUserClick: (address: `0x${string}`) => void
  onClose: () => void
}

interface UserProfile {
  address: `0x${string}`
  username: string
  profilePicture: string
}

export default function FollowerModel({ addresses, type, onUserClick, onClose }: FollowerModelProps) {
  const [users, setUsers] = useState<UserProfile[]>([])

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const profiles = await Promise.all(
        addresses.map(async (address) => {
          const result = await getUserProfile(address)
          if (result.success && result.data) {
            return {
              address,
              username: result.data[0] || 'CanvasTrans User',
              profilePicture: result.data[2]
            }
          }
          return null
        })
      )
      setUsers(profiles.filter((profile): profile is UserProfile => profile !== null))
    }

    fetchUserProfiles()
  }, [addresses])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{type === 'followers' ? 'Followers' : 'Following'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          {users.map((user) => (
            <div 
              key={user.address} 
              className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={() => onUserClick(user.address)}
            >
              <img
                src={`https://gateway.pinata.cloud/ipfs/${user.profilePicture}`}
                alt={`${user.username}'s profile`}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-200">{user.username}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{`${user.address.slice(0, 6)}...${user.address.slice(-4)}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}