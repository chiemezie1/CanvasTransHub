'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { User, FileText, Upload, Loader2 } from 'lucide-react'
import  uploadToPinata from "@/lib/PinataService";
import { updateProfile } from "@/contracts/contractInteractions";

interface ProfileUpdateFormProps {
  onProfileUpdate: (data: any) => void
}

export default function ProfileUpdateForm({ onProfileUpdate }: ProfileUpdateFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [imageHash, setImageHash] = useState<string | null>(null)

  const watchUsername = watch('username', '')
  const watchBio = watch('bio', '')

  const onSubmit = async (data: any) => {
    setLoading(true)

    try {
      // Upload image to Pinata and store the hash only
      if (profileImageFile) {
        const imageHash = await uploadToPinata(profileImageFile);
        setImageHash(imageHash);
        data.imageHash = imageHash;
      }

      await updateProfile(data.username, data.bio, data.imageHash);

      // Call the onProfileUpdate callback with updated data
      onProfileUpdate(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setProfileImageFile(file);
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="username"
                {...register('username', { required: 'Username is required' })}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Your username"
              />
            </div>
            {errors.username && <p className="mt-1 text-sm text-error">{errors.username.message as string}</p>}
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                id="bio"
                {...register('bio')}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={4}
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-4">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile preview" className="w-full h-full object-cover" />
            ) : (
              imageHash ? (
                <img src={`https://gateway.pinata.cloud/ipfs/${imageHash}`} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400 dark:text-gray-500">
                  {watchUsername.charAt(0).toUpperCase() || '?'}
                </div>
              )
            )}
          </div>
          <label htmlFor="profileImage" className="cursor-pointer bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300">
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">IPFS upload</p>
        </div>
      </div>
      <motion.button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-5 w-5" />
            Updating Profile
          </>
        ) : (
          'Update Profile'
        )}
      </motion.button>
    </form>
  )
}
