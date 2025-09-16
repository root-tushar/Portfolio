"use client";
import { useState } from "react";
import { Terminal, Bot, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Chatbot from "./Chatbot";
import TerminalComp from "./Terminal";

export default function FloatingActions() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [sound, setSound] = useState(true);

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        {/* Terminal */}
        <button
          onClick={() => setShowTerminal(!showTerminal)}
          className="p-4 rounded-full bg-black border border-green-500 shadow-lg hover:scale-110 hover:shadow-green-500 transition-all text-green-400"
        >
          <Terminal />
        </button>

        {/* Chatbot */}
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="p-4 rounded-full bg-black border border-blue-500 shadow-lg hover:scale-110 hover:shadow-blue-500 transition-all text-blue-400"
        >
          <Bot />
        </button>

        {/* Sound */}
        <button
          onClick={() => setSound(!sound)}
          className="p-4 rounded-full bg-black border border-purple-500 shadow-lg hover:scale-110 hover:shadow-purple-500 transition-all text-purple-400"
        >
          {sound ? <Volume2 /> : <VolumeX />}
        </button>
      </div>

      {/* Render Chatbot & Terminal */}
      <AnimatePresence>
        {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
        {showTerminal && <TerminalComp onClose={() => setShowTerminal(false)} />}
      </AnimatePresence>
    </>
  );
}
