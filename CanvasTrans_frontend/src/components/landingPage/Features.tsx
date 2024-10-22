import { motion } from 'framer-motion'
import { Hexagon, Zap, Shield, Users, DollarSign, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  { icon: Hexagon, title: 'Decentralized Content', description: 'Store and manage your content securely on the blockchain.' },
  { icon: Zap, title: 'Instant Transactions', description: 'Lightning-fast content publishing and monetization.' },
  { icon: Shield, title: 'Smart Contract Security', description: 'Your content and earnings protected by audited smart contracts.' },
  { icon: Users, title: 'Community Engagement', description: 'Connect with your audience through likes, comments, and follows.' },
  { icon: DollarSign, title: 'Direct Donations', description: 'Receive support directly from your fans in cryptocurrency.' },
  { icon: ArrowRight, title: 'Seamless Integration', description: 'Easy-to-use platform that works with your existing workflow.' },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Platform Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card hover:bg-accent transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center">
                    <feature.icon className="w-8 h-8 mb-4 text-primary" />
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}