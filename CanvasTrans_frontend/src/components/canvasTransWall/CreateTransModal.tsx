import { useState } from 'react'
import { X } from 'lucide-react'
import { CanvasTransItem } from '@/types/types'

interface CreateTransModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (newItem: CanvasTransItem) => void
}

export default function CreateTransModal({ isOpen, onClose, onCreate }: CreateTransModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [contentType, setContentType] = useState<'text' | 'image' | 'video'>('text')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem: CanvasTransItem = {
      id: Date.now().toString(),
      ipfsHash: 'Qm...newHash', // This would be generated after uploading to IPFS
      title,
      description,
      creator: {
        address: '0x1234...5678', // This would come from the user's wallet
        name: 'Current User' // This would come from the user's profile
      },
      likes: 0,
      timestamp: Date.now(),
      totalDonations: 0,
      contentType
    }
    onCreate(newItem)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Trans</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content Type</label>
            <select
              id="contentType"
              value={contentType}
              onChange={(e) => setContentType(e.target.value as 'text' | 'image' | 'video')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          {contentType !== 'text' && (
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload File</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark dark:text-gray-400 dark:file:bg-primary-light dark:file:text-gray-800 dark:hover:file:bg-primary"
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary  hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Trans
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}