import { Image, FileText, Film, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface FilterBarProps {
  filter: 'all' | 'image' | 'text' | 'video'
  setFilter: (filter: 'all' | 'image' | 'text' | 'video') => void
}

export default function FilterBar({ filter, setFilter }: FilterBarProps) {
  return (
    <div className="flex justify-center space-x-2">
      <Button
        variant={filter === 'all' ? 'default' : 'outline'}
        onClick={() => setFilter('all')}
        className="bg-gray-700 hover:bg-gray-600"
      >
        <Filter className="w-4 h-4 mr-2" />
        All
      </Button>
      <Button
        variant={filter === 'image' ? 'default' : 'outline'}
        onClick={() => setFilter('image')}
        className="bg-gray-700 hover:bg-gray-600"
      >
        <Image className="w-4 h-4 mr-2" />
        Images
      </Button>
      <Button
        variant={filter === 'text' ? 'default' : 'outline'}
        onClick={() => setFilter('text')}
        className="bg-gray-700 hover:bg-gray-600"
      >
        <FileText className="w-4 h-4 mr-2" />
        Text
      </Button>
      <Button
        variant={filter === 'video' ? 'default' : 'outline'}
        onClick={() => setFilter('video')}
        className="bg-gray-700 hover:bg-gray-600"
      >
        <Film className="w-4 h-4 mr-2" />
        Videos
      </Button>
    </div>
  )
}