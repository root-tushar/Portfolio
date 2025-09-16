import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function generateCyberPattern() {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(46, 204, 113, 0.1)" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
    </svg>
  `)}`
}

export function createGlowFilter(color: string = '#2ECC71', intensity: number = 1) {
  return `drop-shadow(0 0 ${5 * intensity}px ${color}33) 
          drop-shadow(0 0 ${10 * intensity}px ${color}22) 
          drop-shadow(0 0 ${15 * intensity}px ${color}11)`
}

export function typewriterEffect(text: string, speed: number = 50): Promise<string> {
  return new Promise((resolve) => {
    let result = '';
    let index = 0;
    
    const interval = setInterval(() => {
      result += text[index];
      index++;
      
      if (index === text.length) {
        clearInterval(interval);
        resolve(result);
      }
    }, speed);
  });
}

export function generateMatrixCharacters(length: number = 50): string {
  const matrix = '0123456789ABCDEF';
  return Array.from({ length }, () => matrix[Math.floor(Math.random() * matrix.length)]).join('');
}

interface Position {
  x: number;
  y: number;
}

export function calculateGlowIntensity(mousePos: Position, elementPos: Position, maxDistance: number = 200): number {
  const distance = Math.sqrt(
    Math.pow(mousePos.x - elementPos.x, 2) + 
    Math.pow(mousePos.y - elementPos.y, 2)
  );
  return Math.max(0, 1 - distance / maxDistance);
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
