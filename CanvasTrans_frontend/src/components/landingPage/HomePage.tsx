import { useEffect, useState } from 'react'
import Header from "@/components/landingPage/Header"
import Hero from "./Hero"
import Features from "./Features"
import HowItWorks from "./HowItWorks"
import Creators from "./Creators"
import TransactionFeed from './TransactionFeed'
import Footer from "@/components/Footer"

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    setIsDarkMode(storedTheme === 'dark')
    document.documentElement.classList.toggle('dark', storedTheme === 'dark')
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark')
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main>
        <Hero />
        <TransactionFeed />
        <Features />
        <HowItWorks />
        <Creators />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage;