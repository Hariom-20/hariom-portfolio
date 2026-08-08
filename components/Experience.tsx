"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import SectionHeading from "./ui/SectionHeading";
import { experiences } from "@/lib/data";

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  return (
    <div className="relative pl-10 md:pl-0">
      {/* Node dot */}
      <div className="absolute left-[9px] top-2 md:left-1/2 md:-translate-x-1/2">
        <span className="relative flex h-4 w-4 items-center justify-center">
          {exp.current && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-glow/50" />
          )}
          <span
            className={`relative h-3 w-3 rounded-full border-2 ${
              exp.current
                ? "border-accent-glow bg-accent-glow shadow-glow"
                : "border-white/40 bg-ink-900"
            }`}
          />
        </span>
      </div>

      <div
        className={`md:grid md:grid-cols-2 md:gap-12 ${
          index % 2 === 0 ? "" : "md:[direction:rtl]"
        }`}
      >
        <Reveal
          className={`[direction:ltr] ${
            index % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"
          }`}
        >
          <TiltCard max={6} className="group">
            <div className="sheen glass relative overflow-hidden rounded-2xl p-6 shadow-glass transition-colors md:p-7">
              <div
                className={`flex items-center gap-2 text-xs ${
                  index % 2 === 0 ? "md:justify-end" : ""
                }`}
              >
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-medium text-accent-glow/90">
                  {exp.period}
                </span>
                {exp.current && (
                  <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 font-medium text-emerald-300">
                    Current
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-xl font-semibold tracking-tight text-white md:text-2xl">
                {exp.role}
              </h3>
              <p className="mt-1 text-sm text-white/55">
                {exp.company} — {exp.location}
              </p>

              <ul
                className={`mt-5 space-y-2.5 text-sm leading-relaxed text-white/60 ${
                  index % 2 === 0 ? "md:text-right" : ""
                }`}
              >
                {exp.points.map((p) => (
                  <li key={p} className="text-white/60">
                    {p}
                  </li>
                ))}
              </ul>

              <div
                className={`mt-5 flex flex-wrap gap-2 ${
                  index % 2 === 0 ? "md:justify-end" : ""
                }`}
              >
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/55 transition-colors group-hover:border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 70%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked."
          description="A track record of building full-stack applications, customizing platforms and shipping to the cloud."
        />

        <div ref={ref} className="relative mt-16 md:mt-24">
          {/* Timeline rail */}
          <div className="absolute left-[15px] top-0 h-full w-px bg-white/8 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent-glow via-accent-violet to-transparent"
              style={{ height: reduce ? "100%" : height }}
            />
          </div>

          <div className="space-y-14 md:space-y-24">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.company + exp.period} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
