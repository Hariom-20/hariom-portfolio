"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import SectionHeading from "./ui/SectionHeading";
import { experiences, personaCopy } from "@/lib/data";
import { usePersona } from "./PersonaContext";

function ExperienceItem({
  exp,
  index,
  persona,
}: {
  exp: (typeof experiences)[number];
  index: number;
  persona: "tech" | "hr";
}) {
  const isLeft = index % 2 === 0;
  // md+ alignment helpers
  const alignText = isLeft ? "md:text-right" : "md:text-left";
  const alignRow = isLeft ? "md:justify-end" : "md:justify-start";

  return (
    <div className="relative pl-12 md:pl-0">
      {/* Node dot on the central rail */}
      <div className="absolute left-[15px] top-7 -translate-x-1/2 md:left-1/2">
        <span className="relative flex h-4 w-4 items-center justify-center">
          {exp.current && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-glow/50" />
          )}
          <span
            className={`relative h-3.5 w-3.5 rounded-full border-2 ${
              exp.current
                ? "border-accent-glow bg-accent-glow shadow-glow"
                : "border-white/40 bg-ink-900"
            }`}
          />
        </span>
      </div>

      {/* Branch connector from rail to card (desktop only) */}
      <span
        aria-hidden
        className={`absolute top-[34px] hidden h-px w-8 md:block ${
          isLeft
            ? "right-1/2 mr-2 bg-gradient-to-l from-accent-glow/60 to-transparent"
            : "left-1/2 ml-2 bg-gradient-to-r from-accent-glow/60 to-transparent"
        }`}
      />

      <div className="md:grid md:grid-cols-2 md:gap-x-16">
        <Reveal
          x={isLeft ? -40 : 40}
          className={isLeft ? "md:col-start-1" : "md:col-start-2"}
        >
          <TiltCard max={6} className="group">
            <div className="sheen glass relative overflow-hidden rounded-2xl p-6 shadow-glass transition-colors md:p-7">
              <div className={`flex items-center gap-2 text-xs ${alignRow}`}>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-medium text-accent-glow/90">
                  {exp.period}
                </span>
                {exp.current && (
                  <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 font-medium text-emerald-300">
                    Current
                  </span>
                )}
              </div>

              <h3 className={`mt-4 text-xl font-semibold tracking-tight text-white md:text-2xl ${alignText}`}>
                {exp.role}
              </h3>
              <p className={`mt-1 text-sm text-white/55 ${alignText}`}>
                {exp.company}
                {exp.location ? ` — ${exp.location}` : ""}
              </p>

              <ul className={`mt-5 space-y-2.5 text-sm leading-relaxed text-white/60 ${alignText}`}>
                {exp.points.map((p) => (
                  <li key={p} className="text-white/60">
                    {p}
                  </li>
                ))}
              </ul>

              {/* Live links — proof of work, shown in both views */}
              {exp.links && exp.links.length > 0 && (
                <div className={`mt-5 flex flex-wrap gap-2 ${alignRow}`}>
                  {exp.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 rounded-md border border-accent-glow/25 bg-accent-glow/[0.06] px-2.5 py-1 text-[11px] text-accent-glow/90 transition-colors hover:border-accent-glow/50 hover:text-white"
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-glow/60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-glow" />
                      </span>
                      {link.label}
                      <svg
                        className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}

              {/* Technical stack tags — technical view only */}
              {persona === "tech" && (
                <div className={`mt-4 flex flex-wrap gap-2 ${alignRow}`}>
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/55 transition-colors group-hover:border-white/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
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
  const { persona } = usePersona();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 55%", "end 75%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative overflow-x-clip py-16 md:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked."
          description={personaCopy.experienceDesc[persona]}
        />

        <div ref={ref} className="relative mt-16 md:mt-24">
          {/* Central rail */}
          <div className="absolute left-[15px] top-0 h-full w-px -translate-x-1/2 bg-white/8 md:left-1/2">
            <motion.div
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent-glow via-accent-violet to-accent-glow/0"
              style={{ height: reduce ? "100%" : height }}
            />
          </div>

          <div className="space-y-12 md:space-y-20">
            {experiences.map((exp, i) => (
              <ExperienceItem
                key={exp.company + exp.period}
                exp={exp}
                index={i}
                persona={persona}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
