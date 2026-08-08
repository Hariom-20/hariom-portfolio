"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Persona } from "@/lib/data";

type PersonaContextValue = {
  persona: Persona;
  setPersona: (p: Persona) => void;
  mounted: boolean;
};

const PersonaContext = createContext<PersonaContextValue>({
  persona: "tech",
  setPersona: () => {},
  mounted: false,
});

const STORAGE_KEY = "portfolio-persona";

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>("tech");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "hr" || saved === "tech") setPersonaState(saved);
    } catch {
      /* localStorage unavailable — ignore */
    }
    setMounted(true);
  }, []);

  const setPersona = (p: Persona) => {
    setPersonaState(p);
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.dataset.persona = p;
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.persona = persona;
    }
  }, [persona]);

  return (
    <PersonaContext.Provider value={{ persona, setPersona, mounted }}>
      {children}
    </PersonaContext.Provider>
  );
}

export const usePersona = () => useContext(PersonaContext);
