'use client'

import { useState, useEffect } from 'react'

interface TypewriterProps {
  texts: string[]
  speed?: number
  delay?: number
}

export default function Typewriter({ texts, speed = 100, delay = 2000 }: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[currentTextIndex]
    
    if (isDeleting) {
      if (currentCharIndex > 0) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex - 1)
        }, speed / 2)
        return () => clearTimeout(timeout)
      } else {
        setIsDeleting(false)
        setCurrentTextIndex((currentTextIndex + 1) % texts.length)
      }
    } else {
      if (currentCharIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex + 1)
        }, speed)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, delay)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentTextIndex, currentCharIndex, isDeleting, texts, speed, delay])

  const currentText = texts[currentTextIndex]
  const displayText = currentText.substring(0, currentCharIndex)

  return (
    <span className="inline-block min-w-[300px]">
      {displayText}
      <span className="animate-blink border-r-2 border-current ml-1">|</span>
    </span>
  )
} 