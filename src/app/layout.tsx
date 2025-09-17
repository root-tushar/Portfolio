"use client";

import "./globals.css";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Inter, JetBrains_Mono } from "next/font/google";
import { InteractiveProvider } from "@/components/providers/interactive-provider";
import Terminal from "@/components/ui/Terminal";
import Chatbot from "@/components/ui/Chatbot";
import { FloatingMenu } from "@/components/ui/FloatingMenu";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="relative bg-background text-text antialiased">
        <InteractiveProvider>
          {children}

          {/* Interactive Elements */}
          <AnimatePresence>
            <Terminal />
            <Chatbot />
          </AnimatePresence>
          
          {/* Floating Menu */}
          <FloatingMenu />
        </InteractiveProvider>
      </body>
    </html>
  );
}
