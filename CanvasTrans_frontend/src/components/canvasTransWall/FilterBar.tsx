import { Image, FileText, Film } from 'lucide-react'

interface FilterBarProps {
  filter: 'all' | 'image' | 'text' | 'video'
  setFilter: (filter: 'all' | 'image' | 'text' | 'video') => void
}

export default function FilterBar({ filter, setFilter }: FilterBarProps) {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <button
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded-full ${
          filter === 'all'
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter('image')}
        className={`px-4 py-2 rounded-full flex items-center ${
          filter === 'image'
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        <Image className="w-4 h-4 mr-2 hidden sm:inline-block" />
        Images
      </button>
      <button
        onClick={() => setFilter('text')}
        className={`px-4 py-2 rounded-full flex items-center ${
          filter === 'text'
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        <FileText className="w-4 h-4 mr-2 hidden sm:inline-block" />
        Text
      </button>
      <button
        onClick={() => setFilter('video')}
        className={`px-4 py-2 rounded-full flex items-center ${
          filter === 'video'
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        <Film className="w-4 h-4 mr-2 hidden sm:inline-block" />
        Videos
      </button>
    </div>
  )
}
