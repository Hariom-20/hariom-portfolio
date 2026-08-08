"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useReducer, useRef, useState } from "react";

/**
 * A real Rubik's cube. 27 cubies live on a 3D lattice; each move rotates a
 * genuine 3x3 slice by 90° (an outer wrapper animates the turn, then the
 * rotation is baked into each cubie's matrix so it stays put). The cube
 * scrambles instantly, solves itself move-by-move, pauses, then repeats.
 */

const S = 54; // cubie size (px)
const SP = 57; // centre-to-centre spacing
const H = S / 2;

type Axis = "x" | "y" | "z";
type Move = { axis: Axis; layer: -1 | 1; dir: -1 | 1 };
type Mat = number[]; // 16, column-major (CSS matrix3d order)

// ---- tiny 4x4 matrix helpers (column-major) ----
const ident = (): Mat => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

function mul(a: Mat, b: Mat): Mat {
  const r = new Array(16).fill(0);
  for (let c = 0; c < 4; c++)
    for (let row = 0; row < 4; row++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + row] * b[c * 4 + k];
      r[c * 4 + row] = s;
    }
  return r;
}

function translate(x: number, y: number, z: number): Mat {
  const m = ident();
  m[12] = x;
  m[13] = y;
  m[14] = z;
  return m;
}

function rot(axis: Axis, deg: number): Mat {
  const r = (deg * Math.PI) / 180;
  const c = Math.cos(r);
  const s = Math.sin(r);
  const m = ident();
  if (axis === "x") {
    m[5] = c;
    m[6] = s;
    m[9] = -s;
    m[10] = c;
  } else if (axis === "y") {
    m[0] = c;
    m[2] = -s;
    m[8] = s;
    m[10] = c;
  } else {
    m[0] = c;
    m[1] = s;
    m[4] = -s;
    m[5] = c;
  }
  return m;
}

// round-trip safe rounding of matrix components (keeps lattice exact)
const clean = (m: Mat): Mat => m.map((v) => Math.round(v * 1000) / 1000);

// ---- cube model ----
type Cubie = { home: [number, number, number] };

const CUBIES: Cubie[] = [];
for (let x = -1; x <= 1; x++)
  for (let y = -1; y <= 1; y++)
    for (let z = -1; z <= 1; z++) CUBIES.push({ home: [x, y, z] });

// Frosted, translucent tints in the cool brand palette — glassy, not colourful.
const FACES = [
  { t: `translateZ(${H}px)`, on: (_x: number, _y: number, z: number) => z === 1, color: "rgba(124,140,255,0.26)" }, // front — indigo
  { t: `rotateY(180deg) translateZ(${H}px)`, on: (_x: number, _y: number, z: number) => z === -1, color: "rgba(139,92,246,0.24)" }, // back — violet
  { t: `rotateY(90deg) translateZ(${H}px)`, on: (x: number) => x === 1, color: "rgba(91,124,250,0.24)" }, // right — blue
  { t: `rotateY(-90deg) translateZ(${H}px)`, on: (x: number) => x === -1, color: "rgba(165,180,252,0.22)" }, // left — light indigo
  { t: `rotateX(90deg) translateZ(${H}px)`, on: (_x: number, y: number) => y === -1, color: "rgba(255,255,255,0.20)" }, // top — frosted white
  { t: `rotateX(-90deg) translateZ(${H}px)`, on: (_x: number, y: number) => y === 1, color: "rgba(99,102,241,0.20)" }, // bottom — deep indigo
];

const AXIS_IDX: Record<Axis, number> = { x: 12, y: 13, z: 14 };

function randMove(prev: Move | null): Move {
  const axes: Axis[] = ["x", "y", "z"];
  let m: Move;
  do {
    m = {
      axis: axes[Math.floor(Math.random() * 3)],
      layer: Math.random() < 0.5 ? -1 : 1,
      dir: Math.random() < 0.5 ? -1 : 1,
    };
  } while (prev && m.axis === prev.axis && m.layer === prev.layer);
  return m;
}

const scramble = (n: number): Move[] => {
  const arr: Move[] = [];
  let prev: Move | null = null;
  for (let i = 0; i < n; i++) {
    const m = randMove(prev);
    arr.push(m);
    prev = m;
  }
  return arr;
};

const invert = (seq: Move[]): Move[] =>
  seq
    .slice()
    .reverse()
    .map((m) => ({ axis: m.axis, layer: m.layer, dir: (-m.dir) as -1 | 1 }));

const TURN_MS = 360;
const GAP = 90;

function Sticker({ color }: { color: string }) {
  return (
    <span
      className="absolute inset-[5px] rounded-[7px] border border-white/15"
      style={{
        background: `linear-gradient(150deg, ${color}, rgba(255,255,255,0.03))`,
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.30), 0 0 12px -4px rgba(124,140,255,0.5)",
      }}
    />
  );
}

function CubieView({
  cubie,
  mat,
  wrapper,
  animating,
}: {
  cubie: Cubie;
  mat: Mat;
  wrapper: string;
  animating: boolean;
}) {
  const [hx, hy, hz] = cubie.home;
  return (
    <div
      className="absolute left-0 top-0"
      style={{
        transformStyle: "preserve-3d",
        transform: wrapper,
        transition: animating ? `transform ${TURN_MS}ms cubic-bezier(0.45,0.05,0.2,1)` : "none",
      }}
    >
      <div style={{ transformStyle: "preserve-3d", transform: `matrix3d(${mat.join(",")})` }}>
        {FACES.map((f, i) => {
          const lit = f.on(hx, hy, hz);
          return (
            <div
              key={i}
              className="absolute rounded-[9px]"
              style={{
                width: S,
                height: S,
                left: -H,
                top: -H,
                transform: f.t,
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {lit && <Sticker color={f.color} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HeroCube() {
  const reduce = useReducedMotion();
  const matsRef = useRef<Mat[]>(
    CUBIES.map((c) => translate(c.home[0] * SP, c.home[1] * SP, c.home[2] * SP))
  );
  const [, force] = useReducer((x) => x + 1, 0);
  const [turn, setTurn] = useState<{ ids: Set<number>; wrapper: string } | null>(
    null
  );
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let queue: Move[] = [];

    const affected = (m: Move) => {
      const idx = AXIS_IDX[m.axis];
      const ids = new Set<number>();
      matsRef.current.forEach((mat, i) => {
        if (Math.round(mat[idx] / SP) === m.layer) ids.add(i);
      });
      return ids;
    };

    const bake = (m: Move, ids: Set<number>) => {
      const R = rot(m.axis, m.dir * 90);
      ids.forEach((i) => {
        matsRef.current[i] = clean(mul(R, matsRef.current[i]));
      });
    };

    const refill = () => {
      const seq = scramble(18);
      seq.forEach((m) => bake(m, affected(m)));
      force();
      queue = invert(seq);
    };

    const wrapperFor = (m: Move) => {
      const deg = m.dir * 90;
      return m.axis === "x"
        ? `rotateX(${deg}deg)`
        : m.axis === "y"
        ? `rotateY(${deg}deg)`
        : `rotateZ(${deg}deg)`;
    };

    const step = () => {
      if (cancelled) return;
      if (queue.length === 0) {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            refill();
            timers.push(setTimeout(step, 500));
          }, 1500)
        );
        return;
      }
      const move = queue.shift() as Move;
      const ids = affected(move);
      setTurn({ ids, wrapper: wrapperFor(move) });
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          bake(move, ids);
          setTurn(null);
          timers.push(setTimeout(step, GAP));
        }, TURN_MS)
      );
    };

    refill();
    timers.push(setTimeout(step, 700));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  const EXTENT = 2 * SP + S;

  return (
    <div
      className="relative"
      style={{ width: EXTENT, height: EXTENT, transformStyle: "preserve-3d" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role="img"
      aria-label="A Rubik's cube solving itself, turning one layer at a time"
    >
      {/* grounding shadow */}
      <div className="pointer-events-none absolute -bottom-8 left-1/2 h-8 w-40 -translate-x-1/2 rounded-[50%] bg-black/55 blur-2xl" />

      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ transformStyle: "preserve-3d", rotateX: -26 }}
        animate={reduce ? { rotateY: -34 } : { rotateY: [0, 360] }}
        transition={
          reduce
            ? {}
            : {
                rotateY: {
                  duration: hover ? 60 : 30,
                  repeat: Infinity,
                  ease: "linear",
                },
              }
        }
      >
        {CUBIES.map((cubie, i) => {
          const isTurning = turn?.ids.has(i) ?? false;
          return (
            <CubieView
              key={i}
              cubie={cubie}
              mat={matsRef.current[i]}
              wrapper={isTurning ? (turn as { wrapper: string }).wrapper : "none"}
              animating={isTurning}
            />
          );
        })}
      </motion.div>

      {/* restrained ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.4), transparent 68%)",
          opacity: hover ? 0.7 : 0.4,
        }}
      />
    </div>
  );
}
