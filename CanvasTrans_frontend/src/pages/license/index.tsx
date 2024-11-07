import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, FileText } from "lucide-react"
import { CanvasTransLogo } from '@/components/CanvasTransLogo'

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
      <div className="flex justify-center space-x-4 items-center mb-8">
      <CanvasTransLogo />
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">License</h1>
        </div>
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="w-6 h-6" />
              MIT License
            </CardTitle>
            <CardDescription>
              CanvaTrans is released under the MIT License, a permissive open source license that allows for free use, modification, and distribution of the software.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
              <pre className="whitespace-pre-wrap text-sm">
{`MIT License

Copyright (c) ${new Date().getFullYear()} CanvaTrans

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
              </pre>
            </div>
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold">What this means for you:</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You can freely use, modify, and distribute CanvaTrans.</li>
                <li>You can use CanvaTrans in commercial projects.</li>
                <li>You don't have to share your modifications to CanvaTrans, but it's encouraged.</li>
                <li>You must include the original copyright notice and license in any copy of CanvaTrans or substantial portion of it.</li>
                <li>The authors of CanvaTrans provide no warranties or guarantees for the software.</li>
              </ul>
            </div>
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