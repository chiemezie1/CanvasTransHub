import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import WalletConnectButton from './WalletConnectButton'
import { CanvasTransLogo } from './CanvasTransLogo'

interface HeaderProps {
  toggleDarkMode: () => void
  openWalletModal: () => void
}

export default function Header({ toggleDarkMode, openWalletModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md bg-background/70 border-b border-border' : ''
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CanvasTransLogo />
          <span className="text-xl font-bold">CanvasTrans</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
          <a href="#creators" className="hover:text-primary transition-colors">Creators</a>
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <WalletConnectButton onClick={openWalletModal} />
        </div>
      </div>
    </header>
  )
}