'use client'

import { useState } from 'react'
import Link from 'next/link'
import emailjs from '@emailjs/browser'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Home, Mail, MapPin, Twitter, Send, Loader2 } from 'lucide-react'
import { CanvasTransLogo } from '@/components/CanvasTransLogo'

interface FormState {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertState, setAlertState] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        { ...formState },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      )
      console.log('Email sent successfully:', response)
      setFormState({ name: '', email: '', message: '' })
      setAlertState({ message: 'Thank you for your message. We will get back to you soon!', type: 'success' })
    } catch (error) {
      console.error('Failed to send the email:', error)
      setAlertState({ message: 'Failed to send the email. Please try again later.', type: 'error' })
    } finally {
      setIsSubmitting(false)
    }

    setTimeout(() => setAlertState({ message: '', type: null }), 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
        <div className="flex justify-center space-x-4 items-center mb-4">
        <CanvasTransLogo />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Contact Us</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">We&apos;d love to hear from you. Let&apos;s start a conversation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formState.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="Your name"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formState.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="your@email.com"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formState.message} 
                    onChange={handleChange} 
                    required 
                    placeholder="Your message here..."
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Other ways to reach us</CardTitle>
              <CardDescription>If you prefer, you can reach out to us through these channels:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">support@canvatrans.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-green-500" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">123 Blockchain Street, Web3 City, Crypto Country</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Twitter className="h-6 w-6 text-blue-400" />
                <div>
                  <h3 className="font-semibold">Social Media</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Follow us on Twitter: @CanvaTrans</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {alertState.type && (
          <Alert className={`mt-8 ${alertState.type === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <AlertTitle>{alertState.type === 'success' ? 'Success!' : 'Error'}</AlertTitle>
            <AlertDescription>{alertState.message}</AlertDescription>
          </Alert>
        )}
        <div className="mt-12 text-center ">
          <Link href="/">
            <Button variant="outline" className="inline-flex items-center dark:bg-gray-700">
              <Home className="mr-2 h-4 w-4 " />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}