"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import Counter from "./Counter";
import type { Stat } from "@/lib/data";

const icons = [
  // 0 — time / experience
  <path key="i0" d="M12 7v5l3 2M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />,
  // 1 — layers / stack
  <path key="i1" d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" />,
  // 2 — rocket / projects
  <path
    key="i2"
    d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.8-.8.8-2 0-3s-2.2-.8-3 0Zm4-2 4 4M9 13a12 12 0 0 1 8-9c2 0 3 1 3 3a12 12 0 0 1-9 8m-2-2 2 2"
  />,
  // 3 — cloud
  <path
    key="i3"
    d="M7 18a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.6-1.02A4 4 0 0 1 17 18H7Z"
  />,
];

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  return (
    <div className="group/cell relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:bg-white/[0.03] md:p-7">
      {/* hover glow */}
      <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover/cell:opacity-100 [background:radial-gradient(220px_circle_at_50%_0%,rgba(124,140,255,0.14),transparent_70%)]" />

      <span className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-glow transition-all duration-300 group-hover/cell:-translate-y-0.5 group-hover/cell:border-accent-glow/40 group-hover/cell:text-white group-hover/cell:shadow-glow">
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icons[index % icons.length]}
        </svg>
      </span>

      <div>
        <div className="text-4xl font-semibold tracking-tight text-gradient-accent transition-transform duration-300 group-hover/cell:scale-[1.04] md:text-5xl">
          {stat.display ? (
            stat.display
          ) : (
            <Counter value={stat.value} suffix={stat.suffix} />
          )}
        </div>
        <div className="mt-2 text-sm text-white/45 transition-colors group-hover/cell:text-white/70">
          {stat.label}
        </div>
      </div>

      {/* animated underline */}
      <span className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-glow via-accent-violet to-transparent transition-transform duration-500 group-hover/cell:scale-x-100" />
    </div>
  );
}

export default function StatsGrid({ stats }: { stats: Stat[] }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mx}% ${my}%, rgba(124,140,255,0.10), transparent 60%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div
      onMouseMove={onMove}
      className="group relative mt-16 overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-1.5 md:mt-24"
    >
      {/* cursor-follow spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {/* top sheen */}
      <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative grid grid-cols-2 gap-1.5 md:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCell key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </div>
  );
}
