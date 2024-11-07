import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Scale } from "lucide-react"
import { CanvasTransLogo } from '@/components/CanvasTransLogo'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
      <div className="flex justify-center space-x-4 items-center mb-8 ">
      <CanvasTransLogo />
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">Terms of Service</h1>
        </div>
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Scale className="w-6 h-6" />
              CanvaTrans Terms of Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
              <p>By accessing or using CanvaTrans, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">2. Use of Service</h2>
              <p>You agree to use CanvaTrans only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your wallet and all activities that occur under your account.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">3. Content</h2>
              <p>You retain ownership of the content you create and share on CanvaTrans. By posting content, you grant CanvaTrans a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection with the service.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">4. Prohibited Activities</h2>
              <p>You agree not to engage in any of the following activities:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on the intellectual property rights of others</li>
                <li>Uploading or transmitting viruses or malicious code</li>
                <li>Attempting to gain unauthorized access to CanvaTrans systems or user accounts</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
              <p>We reserve the right to terminate or suspend your access to CanvaTrans at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">6. Disclaimers</h2>
              <p>CanvaTrans is provided "as is" without any warranties, expressed or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, CanvaTrans shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes by posting a notice on our website.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
              <p>These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">10. Contact</h2>
              <p>If you have any questions about these Terms of Service, please contact us at legal@canvatrans.com.</p>
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