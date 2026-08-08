"use client";

import Reveal from "./ui/Reveal";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="glass sheen relative flex flex-col gap-6 overflow-hidden rounded-3xl p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-glow">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                  <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.24em] text-accent-glow/70">
                  Education
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
                  {education.degree}
                </h3>
                <p className="mt-1 text-sm text-white/55">{education.school}</p>
              </div>
            </div>
            <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-white/60">
              {education.period}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
