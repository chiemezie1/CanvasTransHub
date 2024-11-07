import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Wallet, DollarSign, Users, Zap, Shield } from "lucide-react"
import { CanvasTransLogo } from '@/components/CanvasTransLogo'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
      <div className="flex justify-center space-x-4 items-center mb-8">
          <CanvasTransLogo />
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">About CanvaTrans</h1>
        </div>
        <Card className="w-full shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Revolutionizing Content Sharing with Web3 Technology</CardTitle>
            <CardDescription>Empowering creators in the digital age</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              CanvaTrans is redefining digital content sharing, taking inspiration from platforms like Pinterest but with a powerful Web3 twist. In a space where creators often struggle to earn fair compensation and ownership over their work, CanvaTrans offers a unique, blockchain-backed solution that prioritizes transparency, direct earnings, and creator autonomy.
            </p>
            <p>
              As a decentralized content-sharing platform built on Web3 technology, CanvaTrans enables users to create, manage, and monetize their digital content in an entirely new way. Unlike traditional social media where content is centralized and monetization often relies on external ads, CanvaTrans empowers creators by turning every post ("Trans") into a blockchain transaction.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Wallet className="w-6 h-6 text-primary" />
                Wallet-Based Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Users simply connect their wallets to start creating posts or "Trans." The platform allows them to categorize these "Trans" within different themes, effectively creating "blocks" that act as thematic collections.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                Direct Monetization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Without intermediaries, users can earn from their content directly through donations from fans and followers. CanvaTrans offers creators an impressive 95% revenue share, surpassing the rates of any Web2 social platform.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Seamless Profile Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Users can build a profile with their picture, bio, and other personal details, giving them full control over their identity without compromising their privacy or ownership over their content.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Instant Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                CanvaTrans's transaction-based structure and direct wallet payouts eliminate the delay and complexity that creators face on Web2 platforms, providing instantaneous, secure access to earnings.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="w-full shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              The Future of Content Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              CanvaTrans isn't just a platform—it's a movement toward a future where creators are empowered, rewarded fairly, and connected with fans in meaningful ways. By leveraging the power of Web3, CanvaTrans provides the first truly creator-centric platform, setting a new standard for how we create, share, and earn.
            </p>
            <p>
              With the creator economy projected to exceed $104 billion in 2024, CanvaTrans is well-positioned to make a substantial impact. We're here to ensure that creators don't just share content but truly own it.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="inline-flex items-center dark:bg-gray-700">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}