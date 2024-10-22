import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

interface HeroProps {
  openWalletModal: () => void
}

export default function Hero({ openWalletModal }: HeroProps) {
  return (
    <section className="py-20 px-4">
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
          className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground"
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
            onClick={() => window.location.href = "/trans-wall"}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            aria-label="Explore Trans Hub"
          >
            Explore Trans Hub
          </Button>
          <Button
            onClick={() => window.location.href = "/user-block"}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            aria-label="Manage Your Space"
          >
            Manage Your Space
          </Button>
        </motion.div>
      </div>
    </section>
  )
}