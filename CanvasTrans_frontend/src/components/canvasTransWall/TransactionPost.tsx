import { formatDistanceToNow } from 'date-fns'
import { ThumbsUp, DollarSign } from 'lucide-react'
import { CanvasTransItem } from '@/types/types'

interface TransactionPostProps {
  item: CanvasTransItem
  onLike: (id: string) => void
  onDonate: (id: string, amount: number) => void
}

export default function TransactionPost({ item, onLike, onDonate }: TransactionPostProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatDistanceToNow(item.timestamp, { addSuffix: true })}
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
      {item.contentType === 'image' && (
        <img
          src={`https://ipfs.io/ipfs/${item.ipfsHash}`}
          alt={item.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      {item.contentType === 'video' && (
        <video
          src={`https://ipfs.io/ipfs/${item.ipfsHash}`}
          controls
          className="w-full h-64 object-cover rounded-md mb-4"
        >
          Your browser does not support the video tag.
        </video>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onLike(item.id)}
            className="flex items-center space-x-1 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light"
          >
            <ThumbsUp className="h-5 w-5" />
            <span>{item.likes}</span>
          </button>
          <button
            onClick={() => onDonate(item.id, 0.1)}
            className="flex items-center space-x-1 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light"
          >
            <DollarSign className="h-5 w-5" />
            <span>{item.totalDonations.toFixed(2)} ETH</span>
          </button>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          by {item.creator.name}
        </div>
      </div>
    </div>
  )
}