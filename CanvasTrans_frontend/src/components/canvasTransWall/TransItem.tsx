import { formatDistanceToNow } from 'date-fns'
import { ThumbsUp, DollarSign } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CanvasTransItem } from './types'

interface TransItemProps {
  item: CanvasTransItem
  onLike: (id: string) => void
  onDonate: (id: string, amount: number) => void
  onClick: () => void
}

export default function TransItem({ item, onLike, onDonate, onClick }: TransItemProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
          {item.totalDonations.toFixed(2)} ETH
        </div>
        {item.contentType === 'image' && (
          <img
            src={`https://ipfs.io/ipfs/${item.ipfsHash}`}
            alt={item.title}
            className="w-full h-48 object-cover mb-4 rounded"
          />
        )}
        <h3 className="text-xl font-semibold mb-2 text-purple-400">{item.title}</h3>
        <div className="flex items-center mb-2">
          <Avatar className="w-6 h-6 mr-2">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.creator.name}`} />
            <AvatarFallback>{item.creator.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{item.creator.name}</span>
        </div>
        <p className="text-xs text-gray-400 mb-2">{item.creator.address}</p>
        <p className="text-sm text-gray-300 mb-4">{item.description.slice(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {formatDistanceToNow(item.timestamp, { addSuffix: true })}
          </span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onLike(item.id)
              }}
              className="bg-gray-700 hover:bg-gray-600"
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              {item.likes}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onDonate(item.id, 0.1)
              }}
              className="bg-gray-700 hover:bg-gray-600"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Donate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}