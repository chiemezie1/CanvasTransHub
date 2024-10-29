'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { X } from 'lucide-react'
import uploadToPinata from "@/lib/PinataService"
import { createTransaction, createBlock } from '@/contracts/contractInteractions'

interface CreateTransModalProps {
  isOpen: boolean
  onClose: () => void
}

type ContentType = 'text' | 'image' | 'video'

export default function CreateTransModal({ isOpen, onClose }: CreateTransModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'text' as ContentType,
    file: null as File | null,
    blockName: '',
    blockDescription: '',
  })
  const [isCreateBlock, setIsCreateBlock] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, file }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isCreateBlock) {
        await handleBlockCreation()
      } else {
        await handleTransactionCreation()
      }
      onClose()
    } catch (error) {
      console.error("Error:", error)
      alert(`Failed to ${isCreateBlock ? 'create block' : 'create transaction'}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const handleBlockCreation = async () => {
    const { blockName, blockDescription } = formData
    if (!blockName || !blockDescription) {
      throw new Error("Please provide a name and description for the block.")
    }
    await createBlock(blockName, blockDescription)
  }

  const handleTransactionCreation = async () => {
    const { contentType, file, title, description } = formData
    if (contentType !== 'text' && !file) {
      throw new Error("Please upload a file for image or video content.")
    }
    const ipfsHash = file ? await uploadToPinata(file) : ''
    await createTransaction(ipfsHash, title, description)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2" aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" id="modal-title">
            {isCreateBlock ? 'Create New Block' : 'Create New Transaction'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <ToggleButtons isCreateBlock={isCreateBlock} setIsCreateBlock={setIsCreateBlock} />
          <div className="my-3 h-px bg-gray-300 dark:bg-gray-600"></div>
          {isCreateBlock ? (
            <BlockForm formData={formData} handleInputChange={handleInputChange} />
          ) : (
            <TransactionForm 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleFileChange={handleFileChange} 
            />
          )}
          <SubmitButton loading={loading} isCreateBlock={isCreateBlock} />
        </form>
      </div>
    </div>
  )
}

function ToggleButtons({ isCreateBlock, setIsCreateBlock }: { isCreateBlock: boolean, setIsCreateBlock: (value: boolean) => void }) {
  return (
    <div className="flex space-x-4">
      <button
        type="button"
        onClick={() => setIsCreateBlock(false)}
        className={`flex-1 py-1 px-4 rounded ${!isCreateBlock ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
      >
        Create Transaction
      </button>
      <button
        type="button"
        onClick={() => setIsCreateBlock(true)}
        className={`flex-1 py-1 px-4 rounded ${isCreateBlock ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
      >
        Create Block
      </button>
    </div>
  )
}

function BlockForm({ formData, handleInputChange }: { formData: any, handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) {
  return (
    <>
      <FormField
        label="Block Name"
        id="blockName"
        value={formData.blockName}
        onChange={handleInputChange}
        required
      />
      <FormField
        label="Block Description"
        id="blockDescription"
        value={formData.blockDescription}
        onChange={handleInputChange}
        required
        textarea
      />
    </>
  )
}

function TransactionForm({ formData, handleInputChange, handleFileChange }: { formData: any, handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void, handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <>
      <div>
        <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content Type</label>
        <select
          id="contentType"
          name="contentType"
          value={formData.contentType}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>
      <FormField
        label="Title"
        id="title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <FormField
        label="Description"
        id="description"
        value={formData.description}
        onChange={handleInputChange}
        required
        textarea
      />
      {formData.contentType !== 'text' && (
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload File</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark dark:text-gray-400 dark:file:bg-primary-light dark:file:text-gray-800 dark:hover:file:bg-primary"
          />
        </div>
      )}
    </>
  )
}

function FormField({ label, id, value, onChange, required, textarea = false }: { label: string, id: string, value: string, onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, required: boolean, textarea?: boolean }) {
  const InputComponent = textarea ? 'textarea' : 'input'
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <InputComponent
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        required={required}
        rows={textarea ? 2 : undefined}
      />
    </div>
  )
}

function SubmitButton({ loading, isCreateBlock }: { loading: boolean, isCreateBlock: boolean }) {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className={`bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? (isCreateBlock ? 'Creating Block...' : 'Creating Transaction...') : (isCreateBlock ? 'Create Block' : 'Create Transaction')}
      </button>
    </div>
  )
}