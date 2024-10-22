import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Sidebar from './Sidebar'
import FilterBar from './FilterBar'
import TransItem from './TransItem'
import TransItemModal from './TransItemModal'
import { CanvasTransItem, Block } from './types'

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
    contentType: 'image'
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
    contentType: 'text'
  },
  // Add more mock data as needed
]

const mockBlocks: Block[] = [
  { id: '1', name: 'Digital Art' },
  { id: '2', name: 'Web3 Essays' },
  { id: '3', name: 'Crypto Memes' },
]

export default function CanvasTransWall() {
  const [items, setItems] = useState<CanvasTransItem[]>(mockData)
  const [selectedItem, setSelectedItem] = useState<CanvasTransItem | null>(null)
  const [filter, setFilter] = useState<'all' | 'image' | 'text' | 'video'>('all')
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredItems = items.filter(item => 
    (filter === 'all' || item.contentType === filter) &&
    (!selectedBlock || item.id === selectedBlock)
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

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <Sidebar
        blocks={mockBlocks}
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold text-purple-400">CanvasTrans Wall</h1>
          </div>

          <FilterBar filter={filter} setFilter={setFilter} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TransItem
                  item={item}
                  onLike={handleLike}
                  onDonate={handleDonate}
                  onClick={() => setSelectedItem(item)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {selectedItem && (
        <TransItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onLike={handleLike}
          onDonate={handleDonate}
        />
      )}
    </div>
  )
}