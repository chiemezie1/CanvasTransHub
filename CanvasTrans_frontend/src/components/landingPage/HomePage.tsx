// src/pages/HomePage.js

import { useEffect, useState } from 'react'
import Header from "@/components/Header"
import Hero from "./Hero"
import Features from "./Features"
import HowItWorks from "./HowItWorks"
import Creators from "./Creators"
import TransactionFeed from './TransactionFeed'
import Footer from "@/components/Footer"
// import FloatingActionButton from './FloatingActionButton'


const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
    document.documentElement.classList.toggle('dark')
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark')
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main>
        <Hero />
        <TransactionFeed />
        <Features />
        <HowItWorks />
        <Creators />
      </main>
      <Footer />
      {/* <FloatingActionButton openWalletModal={openWalletModal} />
       <WalletConnectModal isOpen={isWalletModalOpen} onClose={closeWalletModal} /> */}
    </div>
  )
}

export default HomePage;
