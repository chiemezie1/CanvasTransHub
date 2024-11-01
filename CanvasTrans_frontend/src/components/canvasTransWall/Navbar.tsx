'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, User, Sun, Moon, Menu, X } from 'lucide-react'
import { CanvasTransLogo } from '@/components/CanvasTransLogo';

interface NavbarProps {
  onCreateClick: () => void
  onThemeToggle: () => void
  onSidebarToggle: () => void
}

export default function Navbar({ onCreateClick, onThemeToggle, onSidebarToggle }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-background dark:bg-background-dark shadow-md z-50 fixed top-0 left-0 right-0 h-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* <button 
              onClick={onSidebarToggle} 
              className="text-foreground hover:text-primary dark:text-foreground-dark dark:hover:text-primary-light mr-4 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button> */}
           <Link href="/" className="flex items-center space-x-2 group">
          <CanvasTransLogo />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">CanvasTrans</span>
        </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-foreground hover:text-primary dark:text-foreground-dark dark:hover:text-primary-light">
              <Home className="h-6 w-6" />
            </Link>
            <Link href="/user-block" className="text-foreground hover:text-primary dark:text-foreground-dark dark:hover:text-primary-light">
              <User className="h-6 w-6" />
            </Link>
            <button
              onClick={onCreateClick}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
            >
              Create Trans
            </button>
            <button onClick={onThemeToggle} className="text-foreground hover:text-primary dark:text-foreground-dark dark:hover:text-primary-light">
              <Sun className="h-6 w-6 hidden dark:block" />
              <Moon className="h-6 w-6 block dark:hidden" />
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-primary dark:text-foreground-dark dark:hover:text-primary-light focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-background dark:bg-background-dark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 dark:text-foreground-dark dark:hover:text-primary-light dark:hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              href="/user-block"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 dark:text-foreground-dark dark:hover:text-primary-light dark:hover:bg-gray-700"
            >
              User Block
            </Link>
            <button
              onClick={onCreateClick}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-primary hover:bg-primary-dark text-white"
            >
              Create Trans
            </button>
            <button
              onClick={onThemeToggle}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 dark:text-foreground-dark dark:hover:text-primary-light dark:hover:bg-gray-700"
            >
              Toggle Theme
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}