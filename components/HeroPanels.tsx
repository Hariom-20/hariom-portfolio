"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import type { Persona } from "@/lib/data";

/**
 * A floating, layered-glass product composition — the hero centrepiece.
 * Frosted panels sit at different depths (translateZ) so the parent's cursor
 * tilt produces genuine layered parallax. Panels drift gently, enter in a
 * stagger, and spread apart on hover. Premium, minimal, interactive.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function Panel({
  dx,
  dy,
  dz,
  spread,
  delay,
  bobDur,
  className = "",
  children,
}: {
  dx: number;
  dy: number;
  dz: number;
  spread: boolean;
  delay: number;
  bobDur: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const depth = dz * (spread ? 1.22 : 1);

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transformStyle: "preserve-3d",
        transform: `translate(-50%,-50%) translate(${dx}px, ${dy}px) translateZ(${depth}px)`,
        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* entrance */}
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {/* idle float */}
        <motion.div
          animate={reduce ? {} : { y: [0, -9, 0] }}
          transition={{ duration: bobDur, repeat: Infinity, ease: "easeInOut", delay }}
          className={className}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

const glass =
  "sheen relative overflow-hidden rounded-2xl border border-white/10 " +
  "bg-gradient-to-br from-white/[0.08] to-white/[0.02] " +
  "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl";

function MacDots() {
  return (
    <div className="flex gap-1.5">
      <span className="h-2 w-2 rounded-full bg-white/25" />
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="h-2 w-2 rounded-full bg-white/10" />
    </div>
  );
}

/* ---------- individual panels ---------- */

export function DashboardPanel() {
  return (
    <div className={`${glass} w-[290px] p-4 sm:w-[320px]`}>
      <div className="flex items-center justify-between">
        <MacDots />
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          live
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            Activity
          </div>
          <div className="mt-1 h-2 w-24 rounded-full bg-gradient-to-r from-white/40 to-white/10" />
        </div>
        <div className="text-accent-glow/80">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 17l6-6 4 4 7-8" />
            <path d="M17 3h4v4" />
          </svg>
        </div>
      </div>

      {/* area chart */}
      <div className="relative mt-3 h-[76px] w-full">
        <svg viewBox="0 0 280 80" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7c8cff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#7c8cff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#a5b4fc" />
              <stop offset="1" stopColor="#c4b5fd" />
            </linearGradient>
          </defs>
          <path
            d="M0 62 C 30 58, 45 40, 70 44 S 110 66, 140 50 S 185 20, 210 30 S 255 44, 280 26"
            fill="none"
            stroke="url(#stroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M0 62 C 30 58, 45 40, 70 44 S 110 66, 140 50 S 185 20, 210 30 S 255 44, 280 26 L 280 80 L 0 80 Z"
            fill="url(#fill)"
          />
          <motion.circle
            cx="280"
            cy="26"
            r="3.5"
            fill="#fff"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </div>

      {/* mini tech tiles — icon + label + live bar */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          {
            c: "#6366f1",
            label: "React",
            w: "82%",
            icon: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />,
          },
          {
            c: "#8b5cf6",
            label: "Mongo",
            w: "64%",
            icon: (
              <>
                <ellipse cx="12" cy="6" rx="7" ry="3" />
                <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
                <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
              </>
            ),
          },
          {
            c: "#5b7cfa",
            label: "Cloud",
            w: "91%",
            icon: <path d="M7 18a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.6-1.02A4 4 0 0 1 17 18H7Z" />,
          },
        ].map((tile, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-lg border border-white/8 bg-white/[0.03] p-2.5"
          >
            <div className="flex items-center gap-1.5" style={{ color: tile.c }}>
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {tile.icon}
              </svg>
              <span className="text-[9px] font-semibold uppercase tracking-wide text-white/60">
                {tile.label}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${tile.c}, ${tile.c}99)` }}
                initial={{ width: 0 }}
                whileInView={{ width: tile.w }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 + i * 0.15, ease: EASE }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodePanel() {
  const line = "text-[11px] leading-[1.7]";
  return (
    <div className={`${glass} w-[220px] p-3.5`}>
      <div className="flex items-center gap-2">
        <MacDots />
        <span className="font-mono text-[10px] text-white/35">server.js</span>
      </div>
      <pre className="mt-3 overflow-hidden font-mono">
        <code className={`block ${line}`}>
          <span className="text-[#a5b4fc]">const</span>{" "}
          <span className="text-white/80">app</span>{" "}
          <span className="text-white/40">=</span>{" "}
          <span className="text-[#c4b5fd]">express</span>
          <span className="text-white/40">()</span>
        </code>
        <code className={`block ${line}`}>
          <span className="text-white/80">app</span>
          <span className="text-white/40">.</span>
          <span className="text-[#c4b5fd]">use</span>
          <span className="text-white/40">(</span>
          <span className="text-[#6ee7b7]">auth</span>
          <span className="text-white/40">)</span>
        </code>
        <code className={`block ${line}`}>
          <span className="text-[#a5b4fc]">await</span>{" "}
          <span className="text-white/80">mongoose</span>
          <span className="text-white/40">.</span>
          <span className="text-[#c4b5fd]">connect</span>
          <span className="text-white/40">(uri)</span>
        </code>
        <code className={`block ${line}`}>
          <span className="text-white/80">app</span>
          <span className="text-white/40">.</span>
          <span className="text-[#c4b5fd]">listen</span>
          <span className="text-white/40">(</span>
          <span className="text-[#6ee7b7]">5000</span>
          <span className="text-white/40">)</span>
        </code>
      </pre>
    </div>
  );
}

export function StatusPanel() {
  return (
    <div className={`${glass} flex w-[196px] items-center gap-3 p-3`}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/15">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/25" />
        <svg className="relative h-4 w-4 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <div>
        <div className="text-sm font-semibold text-white">Deployed</div>
        <div className="text-[11px] text-white/45">Vercel · Render</div>
      </div>
    </div>
  );
}

function BadgePanel() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-20 w-20">
      {/* spinning conic ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(124,140,255,0.7), transparent 60%)",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
        }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className={`${glass} absolute inset-1 flex items-center justify-center rounded-full`}>
        <span className="bg-gradient-to-br from-white to-accent-glow bg-clip-text font-mono text-lg font-bold text-transparent">
          &lt;/&gt;
        </span>
      </div>
    </div>
  );
}

/**
 * Simplified, mobile-friendly hero visual — the Activity dashboard card with
 * the Deploy chip, laid out in normal flow (no wide floating spread) so it
 * fits phone widths without overflow or empty gaps.
 */
export function HeroMobileVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto mt-10 w-full max-w-[330px]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-indigo/20 blur-[80px]" />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        className="relative"
      >
        {/* deploy chip, right-aligned above the card */}
        <motion.div
          animate={reduce ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 -mb-3 ml-auto w-fit"
        >
          <StatusPanel />
        </motion.div>
        {/* activity dashboard card */}
        <motion.div
          animate={reduce ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="relative z-10"
        >
          <DashboardPanel />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HeroPanels({ persona }: { persona: Persona }) {
  const [spread, setSpread] = useState(false);

  return (
    <div
      className="preserve-3d absolute inset-0 scale-[0.72] sm:scale-90 lg:scale-100"
      onMouseEnter={() => setSpread(true)}
      onMouseLeave={() => setSpread(false)}
    >
      <Panel dx={4} dy={-6} dz={0} spread={spread} delay={0.35} bobDur={7}>
        <DashboardPanel />
      </Panel>

      {persona === "tech" && (
        <Panel dx={-132} dy={96} dz={80} spread={spread} delay={0.6} bobDur={6}>
          <CodePanel />
        </Panel>
      )}

      <Panel dx={118} dy={-118} dz={110} spread={spread} delay={0.5} bobDur={6.5}>
        <StatusPanel />
      </Panel>

      <Panel dx={150} dy={92} dz={140} spread={spread} delay={0.75} bobDur={5.5}>
        <BadgePanel />
      </Panel>
    </div>
  );
}
