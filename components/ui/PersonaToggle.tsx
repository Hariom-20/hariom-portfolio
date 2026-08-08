"use client";

import { motion } from "framer-motion";
import { usePersona } from "../PersonaContext";
import type { Persona } from "@/lib/data";

const options: { key: Persona; label: string; hint: string }[] = [
  { key: "hr", label: "HR", hint: "Recruiter-friendly view" },
  { key: "tech", label: "Tech", hint: "Technical deep-dive" },
];

export default function PersonaToggle({
  size = "sm",
  layoutId = "persona-pill",
}: {
  size?: "sm" | "lg";
  layoutId?: string;
}) {
  const { persona, setPersona } = usePersona();

  const pad = size === "lg" ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs";

  return (
    <div
      role="group"
      aria-label="Audience view"
      className="relative flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 backdrop-blur-sm"
    >
      {options.map((opt) => {
        const activeOpt = persona === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => setPersona(opt.key)}
            aria-pressed={activeOpt}
            title={opt.hint}
            className={`relative z-10 rounded-full font-medium transition-colors ${pad} ${
              activeOpt ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            {activeOpt && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-accent-indigo to-accent-violet shadow-glow"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
