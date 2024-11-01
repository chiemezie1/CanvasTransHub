import { formatDistanceToNow } from 'date-fns'
import { CanvasTransItem } from '@/types/types'


interface TransactionPostDetailsProps {
  item: CanvasTransItem
}

export default function TransactionPostDetails({ item }: TransactionPostDetailsProps) {
  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold text-foreground dark:text-foreground-dark mb-2">{item.title}</h2>
      <p className="text-foreground dark:text-foreground-dark mb-4">{item.description}</p>
      {item.mediaType == 1 && (
        <img
          src={`https://gateway.pinata.cloud/ipfs/${item.ipfsHash}`}
          alt={item.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      {item.mediaType == 2 && (
        <video
          src={`https://gateway.pinata.cloud/ipfs/${item.ipfsHash}`}
          controls
          className="w-full h-64 object-cover rounded-md mb-4"
        >
          Your browser does not support the video tag.
        </video>
      )}
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {formatDistanceToNow(Number(item.timestamp) * 1000, { addSuffix: true })}
      </span>
    </div>
  )
}