import { motion } from 'framer-motion'

const steps = [
  { step: 1, title: 'Connect Your Wallet', description: 'Link your Web3 wallet to start creating and interacting on the platform.' },
  { step: 2, title: 'Create & Share Content', description: 'Upload your digital creations and organize them into customizable blocks.' },
  { step: 3, title: 'Engage & Monetize', description: 'Interact with the community, receive donations, and withdraw your earnings.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted">
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
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}