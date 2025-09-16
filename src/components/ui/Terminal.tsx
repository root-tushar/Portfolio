"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { Terminal as TerminalIcon, X, ArrowRight } from "lucide-react";
import { useInteractive } from "@/components/providers/interactive-provider";

export default function Terminal() {
  const { isTerminalOpen, closeTerminal } = useInteractive();
  
  // Don't render if terminal is not open
  if (!isTerminalOpen) return null;
  
  const [logs, setLogs] = useState<string[]>([
    "Welcome to Portfolio Terminal v1.0",
    "Type 'help' for available commands"
  ]);
  const [command, setCommand] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isTerminalOpen]);

  // Scroll to bottom when logs update
  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs]);

  const runCommand = () => {
    if (!command.trim()) return;
    
    // Add command to logs
    setLogs((prev) => [...prev, `> ${command}`]);
    
    // Process command
    const cmd = command.toLowerCase().trim();
    
    // Simple command processing
    if (cmd === "help") {
      setLogs(prev => [...prev, "Available commands:", "- help: Show this help", "- clear: Clear terminal", "- about: About this portfolio", "- skills: List skills", "- contact: Contact information"]);
    } else if (cmd === "clear") {
      setLogs([]);
    } else if (cmd === "about") {
      setLogs(prev => [...prev, "Portfolio Website - A showcase of my work and skills"]);
    } else if (cmd === "skills") {
      setLogs(prev => [...prev, "Skills: React, Next.js, TypeScript, Tailwind CSS, Framer Motion"]);
    } else if (cmd === "contact") {
      setLogs(prev => [...prev, "Email: your.email@example.com", "GitHub: github.com/yourusername"]);
    } else {
      setLogs(prev => [...prev, `Command not found: ${command}`]);
    }
    
    setCommand("");
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand();
    } else if (e.key === "Escape") {
      closeTerminal();
    }
  };

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
      className="fixed bottom-24 right-6 w-96 h-72 bg-black border border-green-500/30 text-green-400 font-mono rounded-lg shadow-xl shadow-green-500/10 flex flex-col overflow-hidden z-50"
      style={{ boxShadow: "0 0 15px rgba(74, 222, 128, 0.2)" }}
    >
      {/* Header - Draggable area */}
      <div 
        className="flex justify-between items-center bg-black border-b border-green-500/30 px-3 py-2 text-green-400"
        onPointerDown={(e) => {
          dragControls.start(e);
          e.preventDefault();
        }}
      >
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} />
          <span className="text-sm font-semibold tracking-wide">TERMINAL</span>
        </div>
        <button 
          onClick={() => closeTerminal()} 
          className="hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-400/10"
          aria-label="Close terminal"
        >
          <X size={16} />
        </button>
      </div>

      {/* Logs */}
      <div 
        ref={logsRef}
        className="flex-1 p-3 overflow-y-auto text-sm space-y-1 scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent"
      >
        {logs.map((log, i) => (
          <div 
            key={i} 
            className={`font-mono ${log.startsWith(">") ? "text-white" : "text-green-400"}`}
          >
            {log}
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runCommand();
        }}
        className="flex items-center border-t border-green-500/30 bg-black/80 px-2"
      >
        <ArrowRight size={14} className="text-green-500 mr-1" />
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command..."
          className="flex-1 py-2 px-1 bg-transparent text-green-400 outline-none text-sm"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </motion.div>
  );
}
