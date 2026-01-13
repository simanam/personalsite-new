'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatBotProps {
  isThinking: boolean
  setIsThinking: (value: boolean) => void
}

export default function ChatBot({ isThinking, setIsThinking }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isThinking) return

    setIsThinking(true)
    setError('')
    setResponse('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
      } else {
        setResponse(data.response)
      }
    } catch {
      setError('Failed to connect. Please try again.')
    } finally {
      setIsThinking(false)
      setMessage('')
    }
  }

  const suggestedQuestions = [
    'What does Aman do?',
    'Tell me about his AI experience',
    'How can I contact him?',
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-purple text-white shadow-lg shadow-purple/30 flex items-center justify-center hover:bg-purple/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-purple/10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple to-purple/80 text-white p-4">
              <h3 className="font-semibold text-lg">Ask me about Aman</h3>
              <p className="text-white/80 text-sm">I can answer questions about his career</p>
            </div>

            {/* Response Area */}
            <div className="p-4 min-h-[120px] max-h-[200px] overflow-y-auto bg-gray-50/50">
              <AnimatePresence mode="wait">
                {isThinking ? (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-muted"
                  >
                    <div className="flex gap-1">
                      <motion.span
                        className="w-2 h-2 bg-purple rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-purple rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-purple rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                    <span className="text-sm">Thinking...</span>
                  </motion.div>
                ) : error ? (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.p>
                ) : response ? (
                  <motion.p
                    key="response"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-foreground text-sm leading-relaxed"
                  >
                    {response}
                  </motion.p>
                ) : (
                  <motion.div
                    key="suggestions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <p className="text-muted text-sm mb-3">Try asking:</p>
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setMessage(q)}
                        className="block w-full text-left px-3 py-2 text-sm bg-white rounded-lg border border-purple/10 hover:border-purple/30 hover:bg-purple/5 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about Aman's career..."
                  maxLength={500}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/20 text-sm"
                  disabled={isThinking}
                />
                <motion.button
                  type="submit"
                  disabled={!message.trim() || isThinking}
                  className="px-4 py-2 rounded-xl bg-purple text-white font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
