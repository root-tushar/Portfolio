export interface MotionProps {
  initial?: {
    opacity?: number
    y?: number
    scale?: number
  }
  animate?: {
    opacity?: number | number[]
    y?: number | number[]
    scale?: number | number[]
    scaleY?: number[]
  }
  transition?: {
    duration?: number
    delay?: number
    ease?: string
    repeat?: number
    type?: string
    stiffness?: number
    damping?: number
    mass?: number
  }
  whileHover?: {
    scale?: number
    y?: number
  }
  viewport?: {
    once?: boolean
    margin?: string
  }
}
