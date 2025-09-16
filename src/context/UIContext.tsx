"use client";
import { createContext, useContext, useState } from "react";

type UIContextType = {
  isTerminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  isChatbotOpen: boolean;
  setChatbotOpen: (v: boolean) => void;
  isSoundOn: boolean;
  setSoundOn: (v: boolean) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isTerminalOpen, setTerminalOpen] = useState(false);
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [isSoundOn, setSoundOn] = useState(false);

  return (
    <UIContext.Provider
      value={{
        isTerminalOpen,
        setTerminalOpen,
        isChatbotOpen,
        setChatbotOpen,
        isSoundOn,
        setSoundOn,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}
