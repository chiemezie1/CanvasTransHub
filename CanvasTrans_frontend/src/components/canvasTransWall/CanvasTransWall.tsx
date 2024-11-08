'use client'

import { useState, useEffect, useCallback } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import TransactionPost from './TransactionPost'
import CreationModal from './CreationModal'
import { CanvasTransItem } from '@/types/types'
import { getPublicTransactions, getAllBlocks } from "@/contracts/contractInteractions"

const categories = [
  'Web3',
  'AI',
  'CareerDevelopment',
  'Jokes',
  'Art',
  'Entertainment',
  'PersonalFinance',
  'TravelAdventures',
  'HealthAndWellness',
  'Food',
  'Books'
] as const

type Category = typeof categories[number]

export default function CanvasTransWall() {
  const [items, setItems] = useState<CanvasTransItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark'
    }
    return false
  })
  const [isLoading, setIsLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true)
    try {
      const transactions = await getPublicTransactions()
      const blocks = await getAllBlocks()

      if (transactions.length === 0 && retryCount < 3) {
        setRetryCount(prevCount => prevCount + 1)
        setTimeout(fetchTransactions, 1000) // Retry after 1 second
        return
      }

      console.log(transactions)
      console.log(blocks)

      const formattedTransactions = (transactions ?? []).map(transaction => ({
        ...transaction,
        likes: transaction.likes,
        timestamp: transaction.timestamp,
        totalDonations: transaction.totalDonations,
      }))

      const formattedBlocks = (blocks ?? []).map(block => ({
        ...block,
        transactionIds: [...block.transactionIds],
      }))

      if (selectedCategory !== null) {
        const categoryBlocks = formattedBlocks.filter(block => block.category === selectedCategory)
        const filteredTransactions = formattedTransactions.filter(transaction => 
          categoryBlocks.some(block => block.transactionIds.includes(transaction.id))
        )
        setItems(filteredTransactions)
      } else {
        setItems(formattedTransactions)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
      setRetryCount(0) // Reset retry count after successful fetch
    }
  }, [selectedCategory, retryCount])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode
      localStorage.setItem('theme', newMode ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', newMode)
      return newMode
    })
  }, [])

  const handleCategoryChange = useCallback((category: Category | null) => {
    setSelectedCategory(category)
  }, [])

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark flex flex-col h-screen">
        <Navbar 
          onCreateClick={() => setCreateModalOpen(true)} 
          onThemeToggle={toggleDarkMode}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
          <main className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
            <div className="container mx-auto px-4 py-4 max-w-4xl">
              <div className="space-y-6">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400">No items found</div>
                ) : (
                  items.map(item => (
                    <TransactionPost
                      key={item.ipfsHash}
                      item={item}
                      userAddress={item.creator}
                      onClose={() => {}}
                      isLoading={false}
                    />
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
        <CreationModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />
      </div>
    </div>
  )
}