"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A premium Rubik's-style cube that endlessly scrambles and "solves" itself.
 * Pure CSS 3D — six 3x3 faces of glass tiles. Click to solve instantly;
 * hover to pause the spin and intensify the glow. Respects reduced motion.
 */

const SIZE = 200; // px
const HALF = SIZE / 2;

const FACES = [
  { name: "front", color: "#6366f1", transform: `translateZ(${HALF}px)` },
  { name: "back", color: "#8b5cf6", transform: `rotateY(180deg) translateZ(${HALF}px)` },
  { name: "right", color: "#5b7cfa", transform: `rotateY(90deg) translateZ(${HALF}px)` },
  { name: "left", color: "#818cf8", transform: `rotateY(-90deg) translateZ(${HALF}px)` },
  { name: "top", color: "#a5b4fc", transform: `rotateX(90deg) translateZ(${HALF}px)` },
  { name: "bottom", color: "#4f46e5", transform: `rotateX(-90deg) translateZ(${HALF}px)` },
];

const PALETTE = FACES.map((f) => f.color);

function tileColor(faceIdx: number, tileIdx: number, solved: boolean, seed: number) {
  if (solved) return FACES[faceIdx].color;
  return PALETTE[(faceIdx * 5 + tileIdx * 7 + seed * 3) % PALETTE.length];
}

function Face({
  faceIdx,
  transform,
  solved,
  seed,
}: {
  faceIdx: number;
  transform: string;
  solved: boolean;
  seed: number;
}) {
  return (
    <div
      className="absolute rounded-xl border border-white/10 bg-black/40 p-1.5 shadow-[0_0_30px_-8px_rgba(124,140,255,0.5)] backdrop-blur-sm"
      style={{
        width: SIZE,
        height: SIZE,
        left: `calc(50% - ${HALF}px)`,
        top: `calc(50% - ${HALF}px)`,
        transform,
      }}
    >
      <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, tileIdx) => {
          const r = Math.floor(tileIdx / 3);
          const c = tileIdx % 3;
          const color = tileColor(faceIdx, tileIdx, solved, seed);
          return (
            <div
              key={tileIdx}
              className="relative overflow-hidden rounded-md"
              style={{
                background: color,
                boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.14), inset 0 8px 14px -8px rgba(255,255,255,0.55), 0 0 12px -4px ${color}`,
                transition: "background 0.7s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${(r + c) * 55}ms`,
              }}
            >
              {/* glossy corner highlight */}
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.5),transparent_45%)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RubikCube() {
  const reduce = useReducedMotion();
  const [solved, setSolved] = useState(true);
  const [seed, setSeed] = useState(1);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setSolved((prev) => {
        if (prev) {
          // was solved -> scramble with a fresh pattern
          setSeed((s) => (s % 5) + 1);
          return false;
        }
        return true; // was scrambled -> solve
      });
    }, 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const handleClick = () => {
    setSolved(true);
    setSeed((s) => (s % 5) + 1);
  };

  return (
    <div
      className="relative cursor-pointer"
      style={{ width: SIZE, height: SIZE, transformStyle: "preserve-3d" }}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role="img"
      aria-label="Animated cube that scrambles and solves itself"
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reduce
            ? { rotateX: -22, rotateY: -32 }
            : {
                rotateY: [0, 360],
                rotateX: [-18, -26, -18],
              }
        }
        transition={
          reduce
            ? {}
            : {
                rotateY: {
                  duration: hover ? 44 : 22,
                  repeat: Infinity,
                  ease: "linear",
                },
                rotateX: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
        }
      >
        {FACES.map((face, i) => (
          <Face
            key={face.name}
            faceIdx={i}
            transform={face.transform}
            solved={solved}
            seed={seed}
          />
        ))}
      </motion.div>

      {/* proximity glow that reacts to hover */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(124,140,255,0.55), transparent 65%)",
          opacity: hover ? 0.9 : 0.5,
        }}
      />
    </div>
  );
}
