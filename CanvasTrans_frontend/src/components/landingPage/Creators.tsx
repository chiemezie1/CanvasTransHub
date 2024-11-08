'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { getPublicTransactions, getUserProfile } from "@/contracts/contractInteractions"
import { MessageAlert } from '@/components/MessageAlert'

interface Creator {
  name: string
  avatar: string
  bio: string
  address: `0x${string}`
}

interface TransactionResult<T> {
  success: boolean
  data?: T
  message?: string
}

interface Transaction {
  id: bigint
  ipfsHash: string
  title: string
  description: string
  mediaType: number
  creator: `0x${string}`
  transBlock: bigint
  likes: bigint
  timestamp: bigint
  totalDonations: bigint
}

const Creators = () => {
  const [creators, setCreators] = useState<Creator[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCreators = useCallback(async () => {
    try {
      const transactions: readonly Transaction[] = await getPublicTransactions()
      
      const uniqueAddresses = Array.from(new Set(transactions.map(tx => tx.creator))).slice(0, 3)

      const creatorProfiles = await Promise.all(
        uniqueAddresses.map(async (address) => {
          const profileResult: TransactionResult<[string, string, string]> = await getUserProfile(address)
          if (profileResult.success && profileResult.data) {
            return {
              name: profileResult.data[0] || 'CanvaTrans User',
              avatar: profileResult.data[2] || '',
              bio: profileResult.data[1] || 'Hi, I am on CanvaTrans',
              address: address,
            }
          }
          return null
        })
      )

      const validProfiles = creatorProfiles.filter((profile): profile is Creator => profile !== null)
      setCreators(validProfiles)

      if (validProfiles.length === 0) {
        setError('No creators found. Be the first to create content!')
      }
    } catch (error) {
      console.error('Error fetching creators:', error)
      setError('Failed to load creators. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const delayedFetchCreators = useCallback(() => {
    setTimeout(() => {
      fetchCreators()
    }, 100)
  }, [fetchCreators])

  useEffect(() => {
    delayedFetchCreators()
  }, [delayedFetchCreators])

  if (isLoading) {
    return (
      <section id="creators" className="py-20 px-4 bg-background dark:bg-background-dark">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground dark:text-foreground-dark">Featured Creators</h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="creators" className="py-20 px-4 bg-background dark:bg-background-dark">
      <div className="container mx-auto p-2">
        <h2 className="text-3xl font-bold mb-12 text-center text-foreground dark:text-foreground-dark">Featured Creators</h2>
        {error ? (
          <MessageAlert message={error} type="error" onClose={() => setError(null)} />
        ) : creators.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {creators.map((creator) => (
              <motion.div
                key={creator.address}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-50 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors duration-300 p-2">
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img
                        src={creator.avatar ? `https://gateway.pinata.cloud/ipfs/${creator.avatar}` : '/placeholder-user.jpg'}
                        alt={`${creator.name}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark">{creator.name}</h3>
                    <p className="text-primary dark:text-primary-light font-medium mt-2">{creator.bio}</p>                
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground dark:text-foreground-dark">No creators found. Be the first to create content!</p>
        )}
      </div>
    </section>
  )
}

export default Creators