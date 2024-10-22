import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

const creators = [
  { name: 'Alex Rivera', avatar: '/placeholder.svg?height=100&width=100', earnings: '5.2 ETH' },
  { name: 'Samantha Lee', avatar: '/placeholder.svg?height=100&width=100', earnings: '3.7 ETH' },
  { name: 'Michael Chen', avatar: '/placeholder.svg?height=100&width=100', earnings: '2.9 ETH' },
]

export default function Creators() {
  return (
    <section id="creators" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Creators</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card hover:bg-accent transition-colors duration-300">
                <CardContent className="flex flex-col items-center pt-6">
                  <img src={creator.avatar} alt={creator.name} className="w-24 h-24 rounded-full mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{creator.name}</h3>
                  <p className="text-primary">Earnings: {creator.earnings}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}