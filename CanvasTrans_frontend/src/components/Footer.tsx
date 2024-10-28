import { CanvasTransLogo } from './CanvasTransLogo'
import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Twitter, Github } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-16 px-4 bg-background dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <CanvasTransLogo />
              <span className="ml-2 text-2xl font-bold text-primary dark:text-primary-light">CanvasTrans</span>
            </div>
            <p className="text-foreground dark:text-foreground-dark mb-4">
              Empowering creators with decentralized innovation. Share, secure, and monetize your content effortlessly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-foreground-dark">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/canvas-trans-hub" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Canvas Hub
              </Link>
              <Link href="/user-block" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Manage your Space
              </Link>
              <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Features
              </Link>
              <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                About Us
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-foreground-dark">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Cookie Policy
              </Link>
              <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {currentYear} CanvasTrans. All rights reserved.
          </p>
          <p className="text-center mt-2">
            <WaveText text="Chiemezie_Agbo" />
          </p>
        </div>
      </div>
    </footer>
  )
}

const WaveText: React.FC<{ text: string }> = ({ text }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i) => ({
      y: [0, -10, 0],
      transition: { duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 5 },
    }))
  }, [controls])

  return (
    <span className="inline-block text-primary dark:text-primary-light">
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          animate={controls}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}