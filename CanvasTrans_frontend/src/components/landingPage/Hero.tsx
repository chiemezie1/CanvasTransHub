'use client'

import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { chat, chat0, chat1, chat2, chat3, chat4, chat5, chat6, chat8 } from '@/images/index'

const chatIcons = [chat0, chat1, chat2, chat3, chat4, chat5, chat6, chat8]

export default function Hero() {
  const controls = useAnimation()
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false)

  useEffect(() => {
    controls.start(i => ({
      scale: [1, 1.1, 1],
      rotate: [0, 10, -10, 0],
      y: [0, -20, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: i * 0.2,
      },
    }))
  }, [controls])

  return (
    <section className="relative pt-16 sm:pt-24 lg:pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-b from-background to-background/80 dark:from-background-dark dark:to-background-dark/80">
      {/* Animated background chat icons */}
      <div className="absolute inset-0 z-0">
        {chatIcons.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.max(64, Math.random() * 128)}px`,
              height: `${Math.max(64, Math.random() * 128)}px`,
            }}
            custom={index}
            animate={controls}
          >
            <Image
              src={icon}
              alt=""
              layout="fill"
              objectFit="contain"
              className="opacity-60 dark:opacity-70"
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
            Empowering Creators with Decentralized Innovation
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-foreground/80 dark:text-foreground-dark/80">
            A seamless blockchain-powered platform enabling creators to share, secure, and monetize their content effortlessly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
        >
          <Button asChild size="lg" className="rounded-full text-lg group">
            <Link href="/canvas-trans-hub" className="flex items-center">
              Explore Trans Hub
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </motion.svg>
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="rounded-full text-lg group">
            <Link href="/user-block" className="flex items-center">
              Manage Your Space
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <path d="M12 3v18" />
                <path d="M3 12h18" />
              </motion.svg>
            </Link>
          </Button>
        </motion.div>

        {/* Responsive chat image */}
        <motion.div
          className="relative mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isMainImageLoaded ? 1 : 0, y: isMainImageLoaded ? 0 : 50 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Image
            src={chat}
            alt="Girl smiling while chatting"
            width={1200}
            height={800}
            layout="responsive"
            className="rounded-3xl shadow-lg"
            priority
            onLoadingComplete={() => setIsMainImageLoaded(true)}
          />
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent dark:from-background-dark pointer-events-none" aria-hidden="true" />
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-primary rounded-full"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        aria-hidden="true"
      />
    </section>
  )
}