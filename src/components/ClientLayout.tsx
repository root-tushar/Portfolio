"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { InteractiveProvider } from "@/components/providers/interactive-provider";
import Terminal from "@/components/ui/Terminal";
import Chatbot from "@/components/ui/Chatbot";
import { FloatingMenu } from "@/components/ui/FloatingMenu";
import { ChatbotButton } from "@/components/ui/ChatbotButton";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <InteractiveProvider>
      {children}

      {/* Interactive Elements */}
      <AnimatePresence>
        <Terminal />
        <Chatbot />
      </AnimatePresence>
      
      {/* Floating Menu */}
      <FloatingMenu />
      
      {/* Dedicated Chatbot Button - Always Visible */}
      <ChatbotButton />
    </InteractiveProvider>
  );
}