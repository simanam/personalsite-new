'use client'

import { useState } from 'react'
import { Navigation, Hero, About, Expertise, Projects, Contact, Footer } from '@/components'
import ChatBot from '@/components/ChatBot'

export default function Home() {
  const [isThinking, setIsThinking] = useState(false)

  return (
    <main className="relative">
      <Navigation />
      <Hero isThinking={isThinking} />
      <About />
      <Expertise />
      <Projects />
      <Contact />
      <Footer />
      <ChatBot isThinking={isThinking} setIsThinking={setIsThinking} />
    </main>
  )
}
