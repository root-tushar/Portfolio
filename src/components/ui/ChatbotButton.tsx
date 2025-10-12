'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInteractive } from '@/components/providers/interactive-provider';

export function ChatbotButton() {
  const { isChatbotOpen, openChatbot, playSoundEffect } = useInteractive();

  const handleClick = () => {
    if (!isChatbotOpen) {
      openChatbot();
      playSoundEffect('click');
    }
  };

  // Don't show the button if chatbot is already open
  if (isChatbotOpen) return null;

  // Hide this button from display (keep code but don't render)
  return null;

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => playSoundEffect('hover')}
      className="fixed bottom-6 left-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-blue-500/50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", damping: 20 }}
      aria-label="Open AI Assistant"
    >
      <MessageCircle size={24} />
      
      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-blue-400"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with Tushar's AI Assistant
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
      </div>
    </motion.button>
  );
}