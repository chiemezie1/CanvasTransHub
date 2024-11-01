'use client'

import { useState, useEffect, useCallback } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import TransactionPost from './TransactionPost'
import CreationModal from './CreationModal'
import { CanvasTransItem } from '@/types/types'
import { getPublicTransactions, getAllBlocks } from "@/contracts/contractInteractions"
import { Loader2 } from 'lucide-react'

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
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchTransactions = useCallback(async (category: Category | null) => {
    setIsLoading(true)
    try {
      const transactions = (await getPublicTransactions() ?? []).map(transaction => ({
        ...transaction,
        likes: (transaction.likes),
        timestamp: (transaction.timestamp),
        totalDonations: (transaction.totalDonations),
      }))

      if (category !== null) {
        const blocks = (await getAllBlocks() ?? []).map(block => ({
          ...block,
          transactionIds: [...block.transactionIds],
        }))

        const categoryBlocks = blocks.filter(block => block.category === category)
        const filteredTransactions = transactions.filter(transaction => 
          categoryBlocks.some(block => block.transactionIds.includes(transaction.id))
        )
        setItems(filteredTransactions)
      } else {
        setItems(transactions)
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTransactions(selectedCategory)
  }, [selectedCategory, fetchTransactions])

  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category)
    setIsLoading(true)
  }

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

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
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map(item => (
                    <TransactionPost
                      key={item.ipfsHash}
                      item={item}
                      userAddress={item.creator}
                      onClose={() => {}}
                    />
                  ))}
                </div>
              )}
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