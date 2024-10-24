import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'

interface Block {
  id: string
  name: string
}

interface SidebarProps {
  blocks: Block[]
  selectedBlock: string | null
  setSelectedBlock: (blockId: string | null) => void
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ blocks, selectedBlock, setSelectedBlock, isOpen, onToggle }: SidebarProps) {
  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Blocks</h2>
        <button onClick={onToggle} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          <li>
            <button
              onClick={() => setSelectedBlock(null)}
              className={`w-full text-left px-4 py-2 ${!selectedBlock ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              All Blocks
            </button>
          </li>
          {blocks.map((block) => (
            <li key={block.id}>
              <button
                onClick={() => setSelectedBlock(block.id)}
                className={`w-full text-left px-4 py-2 ${selectedBlock === block.id ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {block.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}