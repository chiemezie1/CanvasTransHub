import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, Globe, Home, Mail } from "lucide-react"
import { CanvasTransLogo } from '@/components/CanvasTransLogo'

interface Author {
  name: string
  role: string
  description: string
  avatar: string
  github?: string
  website?: string
  email?: string
}

const authors: Author[] = [
  {
    name: "Chiemezie Agbo",
    role: "Lead Developer",
    description: "Creator and main developer of CanvaTrans. Passionate about blockchain technology and decentralized applications.",
    avatar: "/placeholder.svg?height=200&width=200",
    github: "https://github.com/chiemezie1",
    email: "chiemezie@example.com",
  },
  {
    name: "Jane Doe",
    role: "UI/UX Designer",
    description: "Experienced designer focusing on creating intuitive and beautiful user interfaces for CanvaTrans.",
    avatar: "/placeholder.svg?height=200&width=200",
    website: "https://janedoe.com",
    email: "jane@example.com",
  },
  {
    name: "John Smith",
    role: "Blockchain Specialist",
    description: "Expert in blockchain technologies, ensuring CanvaTrans stays at the cutting edge of decentralized systems.",
    avatar: "/placeholder.svg?height=200&width=200",
    github: "https://github.com/johnsmith",
    website: "https://johnsmith.dev",
    email: "john@example.com",
  },
]

export default function AuthorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center space-x-4 items-center mb-8">
          <CanvasTransLogo />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Authors & Contributors</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Meet the talented individuals behind CanvaTrans</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <Card key={author.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center gap-4 pb-2">
                <Avatar className="w-24 h-24 border-4 border-primary">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <CardTitle className="text-2xl">{author.name}</CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">{author.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-6">{author.description}</p>
                <div className="flex justify-center gap-4">
                  {author.github && (
                    <Link href={author.github} target="_blank" rel="noopener noreferrer" aria-label={`${author.name}'s GitHub`}>
                      <Button variant="outline" size="icon" className="dark:bg-gray-700">
                        <Github className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {author.website && (
                    <Link href={author.website} target="_blank" rel="noopener noreferrer" aria-label={`${author.name}'s Website`}>
                      <Button variant="outline" size="icon" className="dark:bg-gray-700">
                        <Globe className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {author.email && (
                    <Link href={`mailto:${author.email}`} aria-label={`Email ${author.name}`}>
                      <Button variant="outline" size="icon" className="dark:bg-gray-700">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
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