// 'use client'

// import { useState } from 'react'
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { TransactionForm, BlockForm } from './CreationModalForm'
// import { createTransaction, createBlock } from '@/contracts/contractInteractions'
// import uploadToPinata from "@/lib/PinataService"

// export interface CreateTransModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export type ContentType = 'Text' | 'Image' | 'Video'

// export const categories = [
//   'Web3',
//   'AI',
//   'CareerDevelopment',
//   'Jokes',
//   'Art',
//   'Entertainment',
//   'PersonalFinance',
//   'TravelAdventures',
//   'HealthAndWellness',
//   'Food',
//   'Books'
// ] as const

// export type Category = typeof categories[number]

// export interface FormData {
//   title: string
//   description: string
//   contentType: ContentType
//   file: File | null
//   blockName: string
//   blockDescription: string
//   category: Category
// }

// export default function CreationModal({ isOpen, onClose }: CreateTransModalProps) {
//   const [loading, setLoading] = useState(false)
//   const [selectedTab, setSelectedTab] = useState<'transaction' | 'block'>('transaction')

//   const handleTransactionSubmit = async (formData: FormData) => {
//     setLoading(true)
//     try {
//       const { contentType, file, title, description } = formData
//       if (contentType !== 'Text' && !file) {
//         throw new Error("Please upload a file for image or video content.")
//       }
//       const ipfsHash = file ? await uploadToPinata(file) : ''
//       await createTransaction(ipfsHash, title, description, contentType)
//       onClose()
//     } catch (error) {
//       console.error("Error:", error)
//       alert('Failed to create transaction. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleBlockSubmit = async (formData: FormData) => {
//     setLoading(true)
//     try {
//       const { blockName, blockDescription, category } = formData
//       if (!blockName || !blockDescription) {
//         throw new Error("Please provide a name and description for the block.")
//       }
//       await createBlock(blockName, blockDescription, category)
//       onClose()
//     } catch (error) {
//       console.error("Error:", error)
//       alert('Failed to create block. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px] bg-gray-100 dark:bg-gray-900 text-foreground dark:text-foreground-dark">
//         <DialogHeader>
//           <DialogTitle className="text-2xl text-center font-bold">Create New Content</DialogTitle>
//         </DialogHeader>
//         <Tabs defaultValue="transaction" onValueChange={(value: string) => setSelectedTab(value as 'transaction' | 'block')} className="w-full">
//           <TabsList className="grid w-full grid-cols-2 mb-4">
//             <TabsTrigger
//               value="transaction"
//               className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${selectedTab === 'transaction' ? 'border-b-2 border-blue-500' : 'border-b border-transparent'}`}
//             >
//               Transaction
//             </TabsTrigger>
//             <TabsTrigger
//               value="block"
//               className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${selectedTab === 'block' ? 'border-b-2 border-blue-500' : 'border-b border-transparent'}`}
//             >
//               Block
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="transaction">
//             <TransactionForm onSubmit={handleTransactionSubmit} loading={loading} />
//           </TabsContent>
//           <TabsContent value="block">
//             <BlockForm onSubmit={handleBlockSubmit} loading={loading} />
//           </TabsContent>
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   )
// }
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionForm, BlockForm } from './CreationModalForm'
import { createTransaction, createBlock } from '@/contracts/contractInteractions'
import uploadToPinata from "@/lib/PinataService"
import { useAccount } from "wagmi"
import { MessageAlert } from '../MessageAlert'

export interface CreateTransModalProps {
  isOpen: boolean
  onClose: () => void
}

enum MediaType {
  Text = 0,
  Image = 1,
  Video = 2
}

export type ContentType = keyof typeof MediaType

export const categories = [
  'Web3',
  'AI',
  'CareerDevelopment',
  'Jokes',
  'Art',
  'Entertainment',
  'PersonalFinance',
  'TravelAdventures',
  'HealthAndWellness',
  'Food',
  'Books'
] as const

export type Category = typeof categories[number]

export interface FormData {
  title: string
  description: string
  contentType: ContentType
  file: File | null
  blockName: string
  blockDescription: string
  category: Category
}

export default function CreationModal({ isOpen, onClose }: CreateTransModalProps) {
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'transaction' | 'block'>('transaction')
  const { address, isConnected } = useAccount()
  const [alertState, setAlertState] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error' | null }>({ message: '', type: null })

  const handleTransactionSubmit = async (formData: FormData) => {
    setLoading(true)
    if (!isConnected || !address) {
      setAlertState({ message: "Please connect your wallet first.", type: 'warning' })
      setLoading(false)
      return
    }
    try {
      const { contentType, file, title, description } = formData
      if (contentType !== 'Text' && !file) {
        setAlertState({ message: "Please upload a file for non-text content.", type: 'warning' })
        setLoading(false)
        return
      }
      const ipfsHash = file ? await uploadToPinata(file) : ''
      const mediaType = MediaType[contentType] as number  // Ensure mediaType is a number
      const result = await createTransaction(ipfsHash, title, description, mediaType)
      if (result.success) {
        setAlertState({ message: "Transaction created successfully!", type: 'success' })
        setTimeout(() => {
          setAlertState({ message: '', type: null })
          onClose()
        }, 2000)
      } else {
        setAlertState({ message: result.message, type: 'error' })
      }
    } catch (error) {
      console.error("Error:", error)
      setAlertState({ message: "An error occurred while creating the transaction. Please try again.", type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleBlockSubmit = async (formData: FormData) => {
    setLoading(true)
    if (!isConnected || !address) {
      setAlertState({ message: "Please connect your wallet first.", type: 'warning' })
      setLoading(false)
      return
    }
    try {
      const { blockName, blockDescription, category } = formData
      if (!blockName || !blockDescription) {
        setAlertState({ message: "Please fill in all required fields.", type: 'warning' })
        setLoading(false)
        return
      }
      const result = await createBlock(blockName, blockDescription, category)
      if (result.success) {
        setAlertState({ message: "Block created successfully!", type: 'success' })
        setTimeout(() => {
          setAlertState({ message: '', type: null })
          onClose()
        }, 2000)
      } else {
        setAlertState({ message: result.message, type: 'error' })
      }
    } catch (error) {
      console.error("Error:", error)
      setAlertState({ message: "An error occurred while creating the block. Please try again.", type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-100 dark:bg-gray-900 text-foreground dark:text-foreground-dark">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">Create New Content</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="transaction" onValueChange={(value: string) => setSelectedTab(value as 'transaction' | 'block')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger
              value="transaction"
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${selectedTab === 'transaction' ? 'border-b-2 border-blue-500' : 'border-b border-transparent'}`}
            >
              Transaction
            </TabsTrigger>
            <TabsTrigger
              value="block"
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${selectedTab === 'block' ? 'border-b-2 border-blue-500' : 'border-b border-transparent'}`}
            >
              Block
            </TabsTrigger>
          </TabsList>
          <TabsContent value="transaction">
            <TransactionForm onSubmit={handleTransactionSubmit} loading={loading} />
          </TabsContent>
          <TabsContent value="block">
            <BlockForm onSubmit={handleBlockSubmit} loading={loading} />
          </TabsContent>
        </Tabs>
        {alertState.type && (
          <MessageAlert
            message={alertState.message}
            onClose={() => setAlertState({ message: '', type: null })}
            type={alertState.type}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
