'use client';

import React from "react";
import { AnimatePresence } from "framer-motion";
import { InteractiveProvider } from "@/components/providers/interactive-provider";
import Terminal from "@/components/ui/Terminal";
import Chatbot from "@/components/ui/Chatbot";
import { FloatingMenu } from "@/components/ui/FloatingMenu";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <InteractiveProvider>
      <AnimatePresence>
        <FloatingMenu />
        <Terminal />
        <Chatbot />
        {children}
      </AnimatePresence>
    </InteractiveProvider>
  );
}