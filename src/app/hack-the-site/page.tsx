import { Metadata } from 'next'
import { HackingGame } from '@/components/games/HackingGame'

export const metadata: Metadata = {
  title: 'System Access - 403 Forbidden',
  description: 'Access Denied',
  robots: 'noindex, nofollow'
}

export default function HackPage() {
  return <HackingGame />
}
