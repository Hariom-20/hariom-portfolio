"use client";

import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import StatsGrid from "./ui/StatsGrid";
import { personaCopy, statsTech, statsHr } from "@/lib/data";
import { usePersona } from "./PersonaContext";

export default function About() {
  const { persona } = usePersona();
  const stats = persona === "hr" ? statsHr : statsTech;
  return (
    <section id="about" className="relative py-16 md:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="About Me" title="Behind the code." />
          </div>

          <div className="lg:pt-4">
            <Reveal>
              <p className="text-xl font-light leading-relaxed text-white/80 md:text-2xl md:leading-relaxed">
                {personaCopy.aboutIntro[persona]}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl leading-relaxed text-white/50">
                {personaCopy.aboutSecondary[persona]}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <Reveal>
          <StatsGrid key={persona} stats={stats} />
        </Reveal>
      </div>
    </section>
  );
}
