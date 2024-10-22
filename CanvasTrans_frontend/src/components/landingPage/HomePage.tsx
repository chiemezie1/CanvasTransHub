import { useState } from 'react'
import Header from '../Header'
import Hero from './Hero'
import Features from './Features'
import HowItWorks from './HowItWorks'
import Creators from './Creators'
import Footer from '../Footer'
import TransactionFeed from './TransactionFeed'
import FloatingActionButton from './FloatingActionButton'
import WalletConnectModal from './WalletConnectModal'

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  const openWalletModal = () => setIsWalletModalOpen(true)
  const closeWalletModal = () => setIsWalletModalOpen(false)

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-b from-background to-background/80 text-foreground">
        <Header toggleDarkMode={toggleDarkMode} openWalletModal={openWalletModal} />
        <main>
          <Hero openWalletModal={openWalletModal} />
          <TransactionFeed />
          <Features />
          <HowItWorks />
          <Creators />
        </main>
        <Footer />
        <FloatingActionButton openWalletModal={openWalletModal} />
        <WalletConnectModal isOpen={isWalletModalOpen} onClose={closeWalletModal} />
      </div>
    </div>
  )
}