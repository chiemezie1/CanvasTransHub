'use client'

import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import FilterBar from './FilterBar'
import TransactionPost from './TransactionPost'
import CreateTransModal from './CreateTransModal'
import { CanvasTransItem, Block } from '@/types/types'

const mockData: CanvasTransItem[] = [
  {
    id: '1',
    ipfsHash: 'Qm...1',
    title: 'Digital Dreamscape',
    description: 'A surreal landscape created entirely in digital space.',
    creator: {
      address: '0x1234...5678',
      name: 'CryptoArtist'
    },
    likes: 150,
    timestamp: Date.now() - 86400000,
    totalDonations: 0.5,
    contentType: 'image',
    blockId: '1'
  },
  {
    id: '2',
    ipfsHash: 'Qm...2',
    title: 'The Future of Web3',
    description: 'An essay on the potential impact of Web3 technologies.',
    creator: {
      address: '0x5678...9012',
      name: 'BlockchainPhilosopher'
    },
    likes: 75,
    timestamp: Date.now() - 172800000,
    totalDonations: 0.2,
    contentType: 'text',
    blockId: '2'
  },
  {
    id: '3',
    ipfsHash: 'Qm...3',
    title: 'NFT Revolution',
    description: 'A video exploring the rise of NFTs in the art world.',
    creator: {
      address: '0x9012...3456',
      name: 'CryptoVlogger'
    },
    likes: 200,
    timestamp: Date.now() - 259200000,
    totalDonations: 0.8,
    contentType: 'video',
    blockId: '3'
  }
]

const mockBlocks: Block[] = [
  { 
    id: '1', 
    name: 'Digital Art', 
    description: 'A collection of digital artworks',
    owner: '0x1234...5678',
    transactionIds: ['1']
  },
  { 
    id: '2', 
    name: 'Web3 Essays', 
    description: 'Thought-provoking essays on Web3',
    owner: '0x5678...9012',
    transactionIds: ['2']
  },
  { 
    id: '3', 
    name: 'Crypto Videos', 
    description: 'Educational videos about cryptocurrency',
    owner: '0x9012...3456',
    transactionIds: ['3']
  },
]

export default function CanvasTransWall() {
  const [items, setItems] = useState<CanvasTransItem[]>(mockData)
  const [filter, setFilter] = useState<'all' | 'image' | 'text' | 'video'>('all')
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark')
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  const filteredItems = items.filter(item => 
    (filter === 'all' || item.contentType === filter) &&
    (!selectedBlock || item.blockId === selectedBlock)
  )

  const handleLike = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    ))
  }

  const handleDonate = (id: string, amount: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, totalDonations: item.totalDonations + amount } : item
    ))
  }

  const handleCreateTrans = (newItem: CanvasTransItem) => {
    setItems([newItem, ...items])
    setCreateModalOpen(false)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
        <Navbar 
          onCreateClick={() => setCreateModalOpen(true)} 
          onThemeToggle={toggleDarkMode}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex">
          <Sidebar
            blocks={mockBlocks}
            selectedBlock={selectedBlock}
            setSelectedBlock={setSelectedBlock}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
          <main className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <div className="container mx-auto px-4 py-8">
              <FilterBar filter={filter} setFilter={setFilter} />
              <div className="space-y-6 mt-6">
                {filteredItems.map(item => (
                  <TransactionPost
                    key={item.id}
                    item={item}
                    onLike={handleLike}
                    onDonate={handleDonate}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
        <CreateTransModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onCreate={handleCreateTrans}
        />
      </div>
    </div>
  )
}