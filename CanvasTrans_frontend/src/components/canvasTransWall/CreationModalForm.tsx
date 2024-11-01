import { useState, ChangeEvent, FormEvent } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FormData, ContentType, Category, categories } from './CreationModal'

interface FormProps {
  onSubmit: (formData: FormData) => Promise<void>
  loading: boolean
}

//--------------------------------TransactionForm---------------------------------

export function TransactionForm({ onSubmit, loading }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    contentType: 'Text',
    file: null,
    blockName: '',
    blockDescription: '',
    category: categories[0],
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, file }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="space-y-2">
        <Label htmlFor="contentType" className="text-gray-700 dark:text-gray-200 font-medium text-sm">Content Type</Label>
        <Select
          name="contentType"
          value={formData.contentType}
          onValueChange={(value) => handleSelectChange('contentType', value)}
        >
          <SelectTrigger id="contentType" className="w-full text-gray-700 bg-gray-200 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary">
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 dark:bg-gray-700 rounded-lg shadow-lg">
            <SelectItem value="Text">Text</SelectItem>
            <SelectItem value="Image">Image</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-gray-700 dark:text-gray-200 font-medium text-sm">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full rounded-lg text-gray-700  bg-gray-200 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-700 dark:text-gray-200 font-medium text-sm">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="w-full min-h-[80px] rounded-lg text-gray-700  bg-gray-200 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      {formData.contentType !== 'Text' && (
        <div className="space-y-2">
          <Label htmlFor="file" className="text-gray-700 dark:text-gray-200 font-medium text-sm">Upload File</Label>
          <Input
            id="file"
            type="file"
            name="file"
            onChange={handleFileChange}
            required
            className="w-full rounded-lg text-gray-700  bg-gray-200 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark disabled:bg-gray-400 dark:disabled:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {loading ? 'Creating...' : 'Create Transaction'}
      </Button>
    </form>
  )
}


// -------------------------------------BlockForm---------------------------

export function BlockForm({ onSubmit, loading }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    contentType: 'Text',
    file: null,
    blockName: '',
    blockDescription: '',
    category: categories[0],
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-800 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="space-y-2">
        <Label htmlFor="blockName" className="text-gray-700 dark:text-gray-200 font-medium text-sm">Block Name</Label>
        <Input
          id="blockName"
          name="blockName"
          placeholder="Enter block name"
          value={formData.blockName}
          onChange={handleInputChange}
          required
          className="w-full rounded-lg border text-gray-700  bg-gray-200 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="blockDescription" className="text-gray-700 dark:text-gray-200 font-medium text-sm">Block Description</Label>
        <Textarea
          id="blockDescription"
          name="blockDescription"
          placeholder="Enter block description"
          value={formData.blockDescription}
          onChange={handleInputChange}
          required
          className="w-full min-h-[80px] rounded-lg text-gray-700  bg-gray-200 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-gray-700 dark:text-gray-200 font-medium text-sm">Category</Label>
        <Select
          name="category"
          value={formData.category}
          onValueChange={(value) => handleSelectChange('category', value as Category)}
        >
          <SelectTrigger id="category" className="w-full rounded-lg border bg-gray-200 border-gray-300 dark:border-gray-700 focus:border-primary">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 dark:bg-gray-700 rounded-lg shadow-lg">
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark disabled:bg-gray-400 dark:disabled:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {loading ? 'Creating...' : 'Create Block'}
      </Button>
    </form>
  )
}
