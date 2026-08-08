"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { services } from "@/lib/data";

export default function Services() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative py-16 md:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="What I Build"
          title="Services & focus."
          description="End-to-end product work — from interface to API to cloud."
        />

        <div className="mt-14 border-t border-white/8">
          {services.map((service, i) => (
            <Reveal key={service.index} delay={i * 0.06}>
              <div
                onMouseEnter={() => setActive(service.index)}
                onMouseLeave={() => setActive(null)}
                className="group relative flex flex-col gap-3 border-b border-white/8 py-8 transition-colors md:flex-row md:items-center md:gap-8 md:py-10"
              >
                {/* hover fill */}
                <motion.span
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-white/[0.04] to-transparent"
                  initial={false}
                  animate={{ opacity: active === service.index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <span className="font-mono text-sm text-accent-glow/70 md:w-16">
                  {service.index}
                </span>

                <h3 className="flex-1 text-2xl font-medium tracking-tight text-white/85 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white md:text-4xl">
                  {service.title}
                </h3>

                <p className="max-w-sm text-sm leading-relaxed text-white/50 md:text-right">
                  {service.desc}
                </p>

                <svg
                  className="hidden h-6 w-6 flex-shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-glow md:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
