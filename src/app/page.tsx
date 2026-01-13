'use client'

import { useState } from 'react'
import { Navigation, Hero, About, Expertise, Projects, Contact, Footer } from '@/components'

export default function Home() {
  const [isThinking, setIsThinking] = useState(false)

  return (
    <main className="relative">
      <Navigation />
      <Hero isThinking={isThinking} setIsThinking={setIsThinking} />
      <About />
      <Expertise />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
