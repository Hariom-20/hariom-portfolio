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
import HeroCube from "./HeroCube";
import { usePersona } from "./PersonaContext";

const codeFragments = [
  { text: "const app = express()", x: "-58%", y: "-30%", z: 90, delay: 0 },
  { text: "await mongoose.connect()", x: "42%", y: "-42%", z: 70, delay: 0.4 },
  { text: "jwt.sign(payload)", x: "54%", y: "28%", z: 110, delay: 0.8 },
  { text: "res.status(200).json()", x: "-60%", y: "34%", z: 60, delay: 1.2 },
  { text: "<Component />", x: "-44%", y: "2%", z: 130, delay: 0.6 },
  { text: "useEffect(() => {})", x: "40%", y: "-6%", z: 40, delay: 1.6 },
];

export default function HeroScene() {
  const reduce = useReducedMotion();
  const { persona } = usePersona();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), {
    stiffness: 120,
    damping: 18,
  });

  useEffect(() => {
    if (reduce) return;
    const handle = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set(e.clientX / w - 0.5);
      my.set(e.clientY / h - 0.5);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my, reduce]);

  return (
    <div
      ref={ref}
      className="relative flex h-[440px] w-full items-center justify-center sm:h-[520px] lg:h-[600px]"
      style={{ perspective: 1200 }}
    >
      <Particles className="opacity-70" density={6} />

      {/* Ambient orb behind cube */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-accent-indigo/25 blur-[90px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-40 w-40 rounded-full bg-accent-violet/20 blur-[70px]" />

      <motion.div
        className="preserve-3d relative h-[280px] w-[280px] sm:h-[320px] sm:w-[320px]"
        style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry }}
      >
        {/* Interactive Rubik's-style cube */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <HeroCube />
        </div>

        {/* Floating code fragments — technical view only */}
        {persona === "tech" &&
          codeFragments.map((frag, i) => (
          <motion.div
            key={frag.text}
            className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono text-[10px] text-accent-glow/90 shadow-lg backdrop-blur-md sm:text-xs"
            style={{
              x: frag.x,
              y: frag.y,
              translateZ: frag.z,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              reduce
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: [0, 1, 1, 0.85],
                    scale: 1,
                    translateY: [0, -8, 0],
                  }
            }
            transition={{
              opacity: { duration: 1, delay: 0.6 + i * 0.15 },
              scale: { duration: 0.6, delay: 0.6 + i * 0.15 },
              translateY: {
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: frag.delay,
              },
            }}
          >
            {frag.text}
          </motion.div>
        ))}
      </motion.div>

      {/* Reflection */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 h-24 w-52 -translate-x-1/2 rounded-[50%] bg-accent-indigo/10 blur-2xl" />
    </div>
  );
}
