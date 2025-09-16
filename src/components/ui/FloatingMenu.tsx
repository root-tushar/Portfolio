'use client';

import { useState, useEffect } from 'react';
import { Terminal, Bot, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInteractive } from '@/components/providers/interactive-provider';

export function FloatingMenu() {
  const { 
    isTerminalOpen, 
    isChatbotOpen, 
    openTerminal, 
    closeTerminal, 
    openChatbot, 
    closeChatbot, 
    soundEnabled, 
    toggleSound, 
    playSoundEffect 
  } = useInteractive();
  
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
    playSoundEffect('click');
  };

  const handleTerminalClick = () => {
    if (isTerminalOpen) {
      closeTerminal();
    } else {
      openTerminal();
    }
    setIsExpanded(false);
  };

  const handleChatbotClick = () => {
    if (isChatbotOpen) {
      closeChatbot();
    } else {
      openChatbot();
    }
    setIsExpanded(false);
  };

  const handleSoundClick = () => {
    toggleSound();
    setIsExpanded(false);
  };

  // Handle hover sound effect
  const handleHover = () => {
    playSoundEffect('hover');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main floating button */}
      <motion.button
        onClick={toggleMenu}
        onMouseEnter={handleHover}
        className="p-4 rounded-full bg-background-secondary border border-accent-cta shadow-lg hover:shadow-accent-cta/50 transition-all text-accent-cta"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <span className="block w-1 h-1 bg-accent-cta rounded-full"></span>
          <span className="block w-1 h-1 bg-accent-cta rounded-full ml-1"></span>
          <span className="block w-1 h-1 bg-accent-cta rounded-full ml-1"></span>
        </div>
      </motion.button>

      {/* Menu items */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Terminal button */}
            <motion.button
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -60 }}
              exit={{ opacity: 0, y: 0 }}
              onClick={handleTerminalClick}
              onMouseEnter={handleHover}
              className={`p-4 rounded-full absolute right-0 bg-black border shadow-lg hover:scale-110 hover:shadow-green-500/50 transition-all ${isTerminalOpen ? 'border-green-500 text-green-400' : 'border-green-500/50 text-green-400/70'}`}
              whileTap={{ scale: 0.95 }}
            >
              <Terminal className="w-5 h-5" />
            </motion.button>

            {/* Chatbot button */}
            <motion.button
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -120 }}
              exit={{ opacity: 0, y: 0 }}
              onClick={handleChatbotClick}
              onMouseEnter={handleHover}
              className={`p-4 rounded-full absolute right-0 bg-black border shadow-lg hover:scale-110 hover:shadow-blue-500/50 transition-all ${isChatbotOpen ? 'border-blue-500 text-blue-400' : 'border-blue-500/50 text-blue-400/70'}`}
              whileTap={{ scale: 0.95 }}
            >
              <Bot className="w-5 h-5" />
            </motion.button>

            {/* Sound toggle button */}
            <motion.button
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -180 }}
              exit={{ opacity: 0, y: 0 }}
              onClick={handleSoundClick}
              onMouseEnter={handleHover}
              className={`p-4 rounded-full absolute right-0 bg-black border shadow-lg hover:scale-110 hover:shadow-purple-500/50 transition-all ${soundEnabled ? 'border-purple-500 text-purple-400' : 'border-purple-500/50 text-purple-400/70'}`}
              whileTap={{ scale: 0.95 }}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}