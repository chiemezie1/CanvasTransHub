import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

const creators = [
  { name: 'Alex Rivera', avatar: '/placeholder.svg?height=100&width=100', earnings: '5.2 ETH' },
  { name: 'Samantha Lee', avatar: '/placeholder.svg?height=100&width=100', earnings: '3.7 ETH' },
  { name: 'Jordan Patel', avatar: '/placeholder.svg?height=100&width=100', earnings: '2.1 ETH' },
]

const Creators = () => {
  return (
    <section id="creators" className="py-20 px-4 bg-background dark:bg-background-dark">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-foreground dark:text-foreground-dark">Top Creators</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {creators.map((creator) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-50 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors duration-300">
                <CardContent className="flex flex-col items-center p-6">
                  <img src={creator.avatar} alt={`${creator.name}'s avatar`} className="w-24 h-24 rounded-full mb-4" />
                  <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark">{creator.name}</h3>
                  <p className="text-primary dark:text-primary-light font-medium mt-2">{creator.earnings}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Creators