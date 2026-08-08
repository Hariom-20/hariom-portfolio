"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HeroScene from "./HeroScene";
import MagneticButton from "./ui/MagneticButton";
import { profile, personaCopy } from "@/lib/data";
import { usePersona } from "./PersonaContext";

const line1 = "BUILDING DIGITAL";
const line2 = "EXPERIENCES THAT WORK.";

function AnimatedHeadline() {
  const reduce = useReducedMotion();
  const words = [...line1.split(" "), "\n", ...line2.split(" ")];

  return (
    <h1 className="text-[2.6rem] font-semibold leading-[0.98] tracking-tightest text-gradient sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
      {words.map((word, i) =>
        word === "\n" ? (
          <br key={`br-${i}`} />
        ) : (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={reduce ? { opacity: 0 } : { y: "110%" }}
              animate={reduce ? { opacity: 1 } : { y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.3 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word === "EXPERIENCES" ? (
                <span className="text-gradient-accent">{word}</span>
              ) : (
                word
              )}
              {i !== words.length - 1 && " "}
            </motion.span>
          </span>
        )
      )}
    </h1>
  );
}

export default function Hero() {
  const { persona } = usePersona();
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <div className="grid-texture pointer-events-none absolute inset-0" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Left: copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </motion.div>

          <AnimatedHeadline />

          <div className="mt-7 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={persona}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-base leading-relaxed text-white/55 md:text-lg"
              >
                {personaCopy.heroSubtitle[persona]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-glow transition-shadow hover:shadow-glow-lg"
            >
              <span className="relative z-10">View My Work</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/[0.06]"
            >
              Let&apos;s Connect
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-10 flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-white/35"
          >
            <span>{personaCopy.heroTag[persona]}</span>
            <span className="h-px w-6 bg-white/20" />
            <span>{profile.location.split(",")[0]}, India</span>
          </motion.div>
        </div>

        {/* Right: 3D scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <HeroScene />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-white/60"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
