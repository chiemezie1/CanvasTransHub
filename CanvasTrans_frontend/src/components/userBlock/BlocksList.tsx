import { motion } from 'framer-motion'
import { Eye, Package } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"



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

interface BlocksListProps {
  blocks: Block[]
  transactions: Transaction[]
}

export default function BlocksList({ blocks, transactions }: BlocksListProps) {
  const getTransactionsInBlock = (blockId: string) => {
    return transactions.filter(t => t.blockId === blockId)
  }

  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <motion.div
          key={block.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <Package className="w-6 h-6 mr-2 text-purple-500" />
                <h3 className="text-xl font-semibold text-purple-400">{block.name}</h3>
              </div>
              <p className="text-gray-400 mb-4">{block.description}</p>
              <p className="text-sm text-gray-500 mb-2">Owner: {block.owner}</p>
              <p className="text-sm text-gray-500">Transactions: {block.transactionIds.length}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-4 bg-gray-700 text-purple-400 border-purple-500 hover:bg-gray-600">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 text-gray-100">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-purple-500">{block.name}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 space-y-2">
                    <p>{block.description}</p>
                    <p>Owner: {block.owner}</p>
                    <p>Transactions:</p>
                    <ul className="list-disc list-inside pl-4">
                      {getTransactionsInBlock(block.id).map((transaction) => (
                        <li key={transaction.id}>{transaction.title}</li>
                      ))}
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}