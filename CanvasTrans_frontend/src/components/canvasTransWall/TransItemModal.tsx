import { formatDistanceToNow } from 'date-fns'
import { ThumbsUp, DollarSign } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CanvasTransItem } from './types'

interface TransItemModalProps {
  item: CanvasTransItem
  onClose: () => void
  onLike: (id: string) => void
  onDonate: (id: string, amount: number) => void
}

export default function TransItemModal({ item, onClose, onLike, onDonate }: TransItemModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-gray-100 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-400">{item.title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-sm">
            {item.totalDonations.toFixed(2)} ETH
          </div>
          {item.contentType === 'image' && (
            <img
              src={`https://ipfs.io/ipfs/${item.ipfsHash}`}
              alt={item.title}
              
              className="w-full max-h-96 object-cover mb-4 rounded"
            />
          )}
          <p className="text-gray-300 mb-4">{item.description}</p>
          <div className="flex items-center mb-2">
            <Avatar className="w-8 h-8 mr-2">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.creator.name}`} />
              <AvatarFallback>{item.creator.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{item.creator.name}</p>
              <p className="text-xs text-gray-400">{item.creator.address}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-400">
              {formatDistanceToNow(item.timestamp, { addSuffix: true })}
            </span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => onLike(item.id)}
                className="bg-gray-700 hover:bg-gray-600"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                {item.likes}
              </Button>
              <Button
                variant="outline"
                className="bg-gray-700 hover:bg-gray-600"
                onClick={() => onDonate(item.id, 0.1)}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Donate
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="donationAmount">Custom Donation Amount (ETH)</Label>
            <div className="flex mt-2">
              <Input
                id="donationAmount"
                type="number"
                placeholder="0.1"
                className="bg-gray-700 border-gray-600 text-gray-100 mr-2"
              />
              <Button
                onClick={() => {
                  const amount = parseFloat((document.getElementById('donationAmount') as HTMLInputElement).value)
                  if (!isNaN(amount)) {
                    onDonate(item.id, amount)
                  }
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}