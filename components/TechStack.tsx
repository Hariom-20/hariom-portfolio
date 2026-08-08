"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState } from "react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Particles from "./ui/Particles";
import { technologies, type Tech } from "@/lib/data";

const groupColors: Record<Tech["group"], string> = {
  Frontend: "#6366f1",
  Backend: "#8b5cf6",
  Database: "#5b7cfa",
  Cloud: "#7c8cff",
  Tools: "#9d8cff",
  CMS: "#6d7cff",
};

function TechPill({ tech, index }: { tech: Tech; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
    setHover(false);
  };

  const color = groupColors[tech.group];
  const floatDur = 5 + (index % 5);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="relative"
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -7, 0] }}
        transition={{
          duration: floatDur,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
      >
        <div
          className="sheen relative flex cursor-default items-center gap-2 rounded-full border px-5 py-2.5 backdrop-blur-md transition-all duration-300"
          style={{
            borderColor: hover ? `${color}80` : "rgba(255,255,255,0.1)",
            background: hover
              ? `linear-gradient(180deg, ${color}22, rgba(255,255,255,0.02))`
              : "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            boxShadow: hover ? `0 0 30px -6px ${color}99` : "none",
            transform: hover ? "scale(1.06)" : "scale(1)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full transition-all"
            style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          />
          <span className="text-sm font-medium text-white/90">{tech.name}</span>
        </div>

        {/* Tooltip */}
        <motion.div
          initial={false}
          animate={{
            opacity: hover ? 1 : 0,
            y: hover ? 0 : 6,
            scale: hover ? 1 : 0.95,
          }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-white/10 bg-black/80 px-3 py-1.5 text-center text-xs text-white/70 backdrop-blur-md"
        >
          <span className="mb-0.5 block text-[10px] uppercase tracking-wider" style={{ color }}>
            {tech.group}
          </span>
          {tech.blurb}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="relative overflow-hidden py-28 md:py-36">
      <Particles className="opacity-40" density={4} linked={false} />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Technology"
          title="The stack I build with."
          description="A constellation of the frontend, backend, database and cloud tools I use to ship production-ready applications. Hover to explore."
        />

        <Reveal delay={0.15} className="mt-16">
          <div className="relative rounded-3xl border border-white/8 bg-white/[0.015] p-8 md:p-14">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-indigo/10 blur-[100px]" />
            <div className="relative flex flex-wrap items-center justify-center gap-4 md:gap-5">
              {technologies.map((tech, i) => (
                <TechPill key={tech.name} tech={tech} index={i} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Legend */}
        <Reveal delay={0.2} className="mt-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/40">
            {(Object.keys(groupColors) as Tech["group"][]).map((g) => (
              <span key={g} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: groupColors[g] }}
                />
                {g}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
