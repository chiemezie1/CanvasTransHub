import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2, Edit2, User, FileText, Image } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserProfileData } from '@/types/types'
import { mockSmartContract } from './mockSmartContract'

interface ProfileUpdateFormProps {
  onProfileUpdate: (profile: UserProfileData) => void
}

export default function ProfileUpdateForm({ onProfileUpdate }: ProfileUpdateFormProps) {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserProfileData>()

  const onSubmit = async (data: UserProfileData) => {
    setUpdating(true)
    setError(null)
    try {
      const result = await mockSmartContract.updateProfile(data.username, data.bio, data.profilePicture)
      if (result.success) {
        onProfileUpdate(data)
        reset()
      } else {
        setError("Failed to update profile. Please try again.")
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setUpdating(false)
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-400">Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-200">Username</Label>
            <div className="relative">
              <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="username"
                {...register('username', { required: 'Username is required' })}
                className="pl-8 bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                placeholder="New Username"
              />
            </div>
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-200">Bio</Label>
            <div className="relative">
              <FileText className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Textarea
                id="bio"
                {...register('bio')}
                className="pl-8 bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                placeholder="New Bio"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profilePicture" className="text-gray-200">Profile Picture URL</Label>
            <div className="relative">
              <Image className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="profilePicture"
                {...register('profilePicture')}
                className="pl-8 bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Profile Picture URL"
              />
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            disabled={updating}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            {updating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Update Profile
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}