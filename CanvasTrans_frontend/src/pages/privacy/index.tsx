import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Shield } from "lucide-react"
import { CanvasTransLogo } from '@/components/CanvasTransLogo'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
      <div className="flex justify-center space-x-4 items-center mb-8 ">
      <CanvasTransLogo />
        <h1 className="text-4xl font-boldtext-center text-gray-900 dark:text-gray-100">Privacy Policy</h1>
        </div>
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6" />
              CanvaTrans Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you use our services, including:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Wallet address</li>
                <li>Content you create, share, or interact with</li>
                <li>Transaction data</li>
                <li>Communications with us</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
              <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">4. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Access the personal information we hold about you</li>
                <li>Request that your personal information be corrected or deleted</li>
                <li>Object to or restrict the processing of your personal information</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">5. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
              <p>If you have any questions about this privacy policy, please contact us at privacy@canvatrans.com.</p>
            </section>
          </CardContent>
        </Card>
        <div className="mt-8 text-center">
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