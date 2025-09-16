export type SoundEffect = "hover" | "click" | "error" | "success" | "typing" | "send" | "notification" | "on" | "off" | "close"

interface InteractiveContext {
  isTerminalOpen: boolean
  isChatbotOpen: boolean
  openTerminal: () => void
  closeTerminal: () => void
  openChatbot: () => void
  closeChatbot: () => void
  playSoundEffect: (type: SoundEffect) => void
}

declare global {
  interface Window {
    interactiveContext?: InteractiveContext
  }
}