import { motion } from 'framer-motion'

const steps = [
  { step: 1, title: 'Connect Your Wallet', description: 'Link your Web3 wallet to start creating and interacting on the platform.' },
  { step: 2, title: 'Create & Share Content', description: 'Upload your digital creations and organize them into customizable blocks.' },
  { step: 3, title: 'Engage & Monetize', description: 'Interact with the community, receive donations, and withdraw your earnings.' },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="bg-background dark:bg-background-dark rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground dark:text-foreground-dark">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.step * 0.2 }}
              >
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-foreground-dark">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks;