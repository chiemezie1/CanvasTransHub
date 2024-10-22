import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { Eye, ThumbsUp, DollarSign, Plus } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Transaction {
  id: string
  title: string
  description: string
  likes: number
  totalDonations: string
  timestamp: number
  blockId: string | null
}

interface Block {
  id: string
  name: string
  description: string
  owner: string
  transactionIds: string[]
}

interface TransactionsListProps {
  transactions: Transaction[]
  blocks: Block[]
  onAddToBlock: (transactionId: string, blockId: string) => void
}

export default function TransactionsList({ transactions, blocks, onAddToBlock }: TransactionsListProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const getBlockName = (blockId: string | null) => {
    if (!blockId) return 'Not in a block'
    const block = blocks.find(b => b.id === blockId)
    return block ? block.name : 'Unknown block'
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <motion.div
          key={transaction.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-purple-400">{transaction.title}</h3>
              <p className="text-gray-400 mb-4">{transaction.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1 text-purple-500" />
                    {transaction.likes}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-purple-500" />
                    {transaction.totalDonations}
                  </span>
                </div>
                <span>{formatDistanceToNow(transaction.timestamp, { addSuffix: true })}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Block: {getBlockName(transaction.blockId)}</span>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-gray-700 text-purple-400 border-purple-500 hover:bg-gray-600">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 text-gray-100">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-purple-500">{transaction.title}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-2">
                        <p>{transaction.description}</p>
                        <p>Likes: {transaction.likes}</p>
                        <p>Total Donations: {transaction.totalDonations}</p>
                        <p>Created: {new Date(transaction.timestamp).toLocaleString()}</p>
                        <p>Block: {getBlockName(transaction.blockId)}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-gray-700 text-purple-400 border-purple-500 hover:bg-gray-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Block
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 text-gray-100">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-purple-500">Add to Block</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-4">
                        <p>Select a block to add "{transaction.title}" to:</p>
                        <Select onValueChange={(blockId) => onAddToBlock(transaction.id, blockId)}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100">
                            <SelectValue placeholder="Select a block" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600 text-gray-100">
                            {blocks.map((block) => (
                              <SelectItem key={block.id} value={block.id}>{block.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}