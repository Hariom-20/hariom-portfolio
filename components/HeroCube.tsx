"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A restrained, premium 3D cube — frosted glass faces, hairline borders and a
 * single accent node that calmly traverses each face. shadcn-flavoured:
 * neutral surfaces, one accent, quiet motion. Hover to slow it and lift it;
 * respects reduced motion.
 */

const SIZE = 208; // px
const HALF = SIZE / 2;

// Each face offsets the traveling highlight so the whole object feels alive.
const FACES = [
  { transform: `translateZ(${HALF}px)`, offset: 0 },
  { transform: `rotateY(180deg) translateZ(${HALF}px)`, offset: 5 },
  { transform: `rotateY(90deg) translateZ(${HALF}px)`, offset: 2 },
  { transform: `rotateY(-90deg) translateZ(${HALF}px)`, offset: 7 },
  { transform: `rotateX(90deg) translateZ(${HALF}px)`, offset: 3 },
  { transform: `rotateX(-90deg) translateZ(${HALF}px)`, offset: 8 },
];

// A calm spiral path around the 3x3 grid for the accent node.
const PATH = [0, 1, 2, 5, 8, 7, 6, 3, 4];

function Face({
  transform,
  activeTile,
}: {
  transform: string;
  activeTile: number;
}) {
  return (
    <div
      className="absolute rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.015] p-2.5 backdrop-blur-md"
      style={{
        width: SIZE,
        height: SIZE,
        left: `calc(50% - ${HALF}px)`,
        top: `calc(50% - ${HALF}px)`,
        transform,
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 40px -12px rgba(0,0,0,0.6)",
      }}
    >
      {/* top-left hairline bracket — a quiet shadcn-ish detail */}
      <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 rounded-tl-md border-l border-t border-white/25" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 rounded-br-md border-b border-r border-white/25" />

      <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-2">
        {Array.from({ length: 9 }).map((_, i) => {
          const active = i === activeTile;
          return (
            <div
              key={i}
              className="rounded-lg border"
              style={{
                borderColor: active
                  ? "rgba(124,140,255,0.55)"
                  : "rgba(255,255,255,0.07)",
                background: active
                  ? "linear-gradient(160deg, rgba(124,140,255,0.30), rgba(139,92,246,0.14))"
                  : "rgba(255,255,255,0.025)",
                boxShadow: active
                  ? "0 0 18px -2px rgba(124,140,255,0.65), inset 0 1px 0 rgba(255,255,255,0.25)"
                  : "inset 0 1px 0 rgba(255,255,255,0.05)",
                transition:
                  "background 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.6s ease, box-shadow 0.6s ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function HeroCube() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((s) => s + 1), 620);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div
      className="relative"
      style={{ width: SIZE, height: SIZE, transformStyle: "preserve-3d" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role="img"
      aria-label="Rotating frosted-glass cube with a moving accent light"
    >
      {/* soft floor reflection / grounding shadow */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 h-10 w-40 -translate-x-1/2 rounded-[50%] bg-black/50 blur-2xl" />

      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reduce
            ? { rotateX: -24, rotateY: -30 }
            : { rotateY: [0, 360], rotateX: [-22, -28, -22] }
        }
        transition={
          reduce
            ? {}
            : {
                rotateY: {
                  duration: hover ? 60 : 30,
                  repeat: Infinity,
                  ease: "linear",
                },
                rotateX: { duration: 14, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        {FACES.map((face, i) => (
          <Face
            key={i}
            transform={face.transform}
            activeTile={reduce ? 4 : PATH[(step + face.offset) % PATH.length]}
          />
        ))}
      </motion.div>

      {/* restrained ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.45), transparent 68%)",
          opacity: hover ? 0.75 : 0.42,
        }}
      />
    </div>
  );
}
