import { useInView } from 'react-intersection-observer'

interface UseScrollRevealOptions {
  threshold?: number
  triggerOnce?: boolean
  delay?: number
}

export function useScrollReveal({
  threshold = 0.15,
  triggerOnce = true,
}: UseScrollRevealOptions = {}) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  })

  return { ref, inView }
}
