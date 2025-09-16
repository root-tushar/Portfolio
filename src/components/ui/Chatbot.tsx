'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { useInteractive } from '@/components/providers/interactive-provider';
import { X, Send, Bot } from 'lucide-react';

interface ChatbotProps {
  onClose?: () => void
}

export default function Chatbot({ onClose }: ChatbotProps) {
  const { isChatbotOpen, closeChatbot, playSoundEffect } = useInteractive();
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([
    { text: "Hello! How can I assist you with your cybersecurity needs today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Auto-focus input when chatbot opens
  useEffect(() => {
    if (isChatbotOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isChatbotOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    // Play sound effect
    playSoundEffect("send" as SoundEffect);
    
    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput(""); // clear after sending
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const responses = [
        "I can help you with that cybersecurity challenge.",
        "That's an interesting question about AI security.",
        "Let me analyze that security concern for you.",
        "I'd recommend implementing additional authentication layers for that.",
        "Your portfolio website is looking great! Any specific security features you'd like to add?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }]);
      playSoundEffect('notification');
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  function startDrag(event: React.PointerEvent<HTMLDivElement>) {
    dragControls.start(event);
  }

  if (!isChatbotOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: "spring", damping: 20 }}
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragListener={false}
      className="fixed bottom-24 right-6 w-80 h-96 bg-black/90 backdrop-blur-md border border-blue-500/50 shadow-xl rounded-lg flex flex-col overflow-hidden z-50"
      style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
    >
      {/* Header - Draggable area */}
      <div 
        className="flex justify-between items-center bg-black/80 border-b border-blue-500/30 px-4 py-3"
        onPointerDown={(e) => {
          dragControls.start(e);
          e.preventDefault();
        }}
      >
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-blue-400" />
          <h3 className="font-semibold text-blue-400 text-sm tracking-wide">AI ASSISTANT</h3>
        </div>
        <button 
          onClick={() => {
            closeChatbot();
            playSoundEffect('click');
          }} 
          className="hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-400/10"
          aria-label="Close chatbot"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`px-3 py-2 rounded-lg max-w-[85%] ${
              msg.sender === 'user' 
                ? 'bg-blue-500/20 text-white ml-auto border border-blue-500/20' 
                : 'bg-gray-800/50 text-blue-100 mr-auto border border-blue-500/10'
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-3 py-2 rounded-lg bg-gray-800/50 text-blue-100 mr-auto border border-blue-500/10 max-w-[85%]"
          >
            <span className="inline-flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
            </span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center border-t border-blue-500/30 p-2 bg-black/80"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-transparent text-white outline-none focus:ring-1 focus:ring-blue-500/30 rounded text-sm"
          autoComplete="off"
          spellCheck="false"
        />
        <button 
          type="submit" 
          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
          onClick={() => playSoundEffect('hover')}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </motion.div>
  );
}
