"use client";

import Reveal from "./ui/Reveal";
import Counter from "./ui/Counter";
import SectionHeading from "./ui/SectionHeading";
import { profile, stats } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="About Me" title="Behind the code." />
          </div>

          <div className="lg:pt-4">
            <Reveal>
              <p className="text-xl font-light leading-relaxed text-white/80 md:text-2xl md:leading-relaxed">
                {profile.aboutIntro}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl leading-relaxed text-white/50">
                I care about clean code, performance and solving real-world
                problems — from designing resilient APIs to shipping polished,
                responsive interfaces and managing deployments end to end.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] md:mt-24 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="group relative bg-ink-950/40 p-6 transition-colors hover:bg-white/[0.03] md:p-8"
            >
              <div className="text-4xl font-semibold tracking-tight text-gradient-accent md:text-5xl">
                {stat.display ? (
                  stat.display
                ) : (
                  <Counter value={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div className="mt-2 text-sm text-white/45">{stat.label}</div>
              <span className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-accent-glow/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
