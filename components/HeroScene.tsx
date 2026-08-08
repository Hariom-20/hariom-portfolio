"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Particles from "./ui/Particles";
import HeroPanels from "./HeroPanels";
import { usePersona } from "./PersonaContext";

export default function HeroScene() {
  const reduce = useReducedMotion();
  const { persona } = usePersona();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 110,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), {
    stiffness: 110,
    damping: 20,
  });

  useEffect(() => {
    if (reduce) return;
    const handle = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my, reduce]);

  return (
    <div
      ref={ref}
      className="relative flex h-[440px] w-full items-center justify-center sm:h-[520px] lg:h-[580px]"
      style={{ perspective: 1500 }}
    >
      <Particles className="opacity-50" density={5} />

      {/* Ambient lighting */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-accent-indigo/20 blur-[110px]" />
      <div className="pointer-events-none absolute right-[22%] top-[28%] h-44 w-44 rounded-full bg-accent-violet/20 blur-[80px]" />

      <motion.div
        className="preserve-3d relative h-full w-full"
        style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry }}
      >
        <HeroPanels persona={persona} />
      </motion.div>
    </div>
  );
}
