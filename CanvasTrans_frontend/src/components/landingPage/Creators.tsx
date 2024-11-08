'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { getPublicTransactions, getUserProfile } from "@/contracts/contractInteractions"

interface Creator {
  name: string
  avatar: string
  bio: string
  address: `0x${string}`
}

const Creators = () => {
  const [creators, setCreators] = useState<Creator[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const transactions = await getPublicTransactions()
        const uniqueAddresses = Array.from(new Set(transactions.map(tx => tx.creator))).slice(0, 3)

        const creatorProfiles = await Promise.all(
          uniqueAddresses.map(async (address) => {
            const profileResult = await getUserProfile(address)
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

        setCreators(creatorProfiles.filter((profile): profile is Creator => profile !== null))
      } catch (error) {
        console.error('Error fetching creators:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCreators()
  }, [])

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
      </div>
    </section>
  )
}

export default Creators