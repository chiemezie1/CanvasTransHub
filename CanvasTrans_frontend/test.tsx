'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Hexagon, Zap, Shield, Users, DollarSign, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectButton } from '@rainbow-me/rainbowkit'

const CanvasTransLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 0L37.3205 10V30L20 40L2.67949 30V10L20 0Z" fill="url(#hexGradient)" />
    <path d="M20 5L32.3205 12.5V27.5L20 35L7.67949 27.5V12.5L20 5Z" stroke="currentColor" strokeWidth="2" />
    <path d="M20 10L27.3205 15V25L20 30L12.6795 25V15L20 10Z" fill="currentColor" />
    <defs>
      <linearGradient id="hexGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--color-primary)" />
        <stop offset="1" stopColor="var(--color-secondary)" />
      </linearGradient>
    </defs>
  </svg>
)

const features = [
  { icon: Hexagon, title: 'Decentralized Content', description: 'Store and manage your content securely on the blockchain.' },
  { icon: Zap, title: 'Instant Transactions', description: 'Lightning-fast content publishing and monetization.' },
  { icon: Shield, title: 'Smart Contract Security', description: 'Your content and earnings protected by audited smart contracts.' },
  { icon: Users, title: 'Community Engagement', description: 'Connect with your audience through likes, comments, and follows.' },
  { icon: DollarSign, title: 'Direct Donations', description: 'Receive support directly from your fans in cryptocurrency.' },
  { icon: ArrowRight, title: 'Seamless Integration', description: 'Easy-to-use platform that works with your existing workflow.' },
]

const creators = [
  { name: 'Alex Rivera', avatar: '/placeholder.svg?height=100&width=100', earnings: '5.2 ETH' },
  { name: 'Samantha Lee', avatar: '/placeholder.svg?height=100&width=100', earnings: '3.7 ETH' },
  { name: 'Michael Chen', avatar: '/placeholder.svg?height=100&width=100', earnings: '2.9 ETH' },
]

const steps = [
  { step: 1, title: 'Connect Your Wallet', description: 'Link your Web3 wallet to start creating and interacting on the platform.' },
  { step: 2, title: 'Create & Share Content', description: 'Upload your digital creations and organize them into customizable blocks.' },
  { step: 3, title: 'Engage & Monetize', description: 'Interact with the community, receive donations, and withdraw your earnings.' },
]

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const darkModeFromStorage = localStorage.getItem('darkMode')
    setIsDarkMode(darkModeFromStorage === 'true')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('darkMode', isDarkMode.toString())
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode)
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="fixed w-full z-50 bg-background/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CanvasTransLogo />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              CanvasTrans
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
            <a href="#creators" className="text-sm font-medium hover:text-primary transition-colors">Creators</a>
          </nav>
          <div className="flex items-center space-x-4">
            <ConnectButton />
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Empowering Creators with Decentralized Innovation
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A seamless blockchain-powered platform enabling creators to share, secure, and monetize their content effortlessly.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col md:flex-row justify-center gap-4"
            >
              <Button
                onClick={() => window.location.href = "/canvas-trans-hub"}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Explore Trans Hub
              </Button>
              <Button
                onClick={() => window.location.href = "/user-block"}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Manage Your Space
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20 px-4 bg-muted dark:bg-gray-800">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Platform Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card dark:bg-gray-700 hover:bg-accent dark:hover:bg-gray-600 transition-colors duration-300">
                    <CardHeader>
                      <CardTitle className="flex flex-col items-center">
                        <feature.icon className="w-8 h-8 mb-4 text-primary" />
                        <span>{feature.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-muted-foreground dark:text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((item) => (
                <motion.div
                  key={item.step}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: item.step * 0.2 }}
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="creators" className="py-20 px-4 bg-muted dark:bg-gray-800">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Creators</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {creators.map((creator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card dark:bg-gray-700 hover:bg-accent dark:hover:bg-gray-600 transition-colors duration-300">
                    <CardContent className="flex flex-col items-center pt-6">
                      <img src={creator.avatar} alt={creator.name} className="w-24 h-24 rounded-full mb-4" />
                      <h3 className="text-xl font-semibold mb-2">{creator.name}</h3>
                      <p className="text-primary">Earnings: {creator.earnings}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <CanvasTransLogo />
              <span className="ml-2 text-xl font-bold">CanvasTrans</span>
            </div>
            <nav className="flex gap-4 mb-4 md:mb-0">
              <a href="#" className="text-sm text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors">
                Contact Us
              </a>
            </nav>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0  003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground dark:text-gray-400">
            © 2024 CanvasTrans. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}