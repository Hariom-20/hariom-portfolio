"use client";

import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import Particles from "./ui/Particles";
import { profile } from "@/lib/data";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: (
      <path d="M4 4h16v16H4zM4 6l8 6 8-6" />
    ),
  },
  {
    label: "LinkedIn",
    value: "hariom-sharma2005",
    href: profile.linkedin,
    external: true,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 10v6M8 7v.01M12 16v-3a2 2 0 0 1 4 0v3M12 16v-6" />
      </>
    ),
  },
  {
    label: "GitHub",
    value: "Hariom-20",
    href: profile.github,
    external: true,
    icon: (
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    ),
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: (
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      <Particles className="opacity-50" density={5} />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-indigo/12 blur-[120px]" />

      <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-accent-glow/80">
            Contact
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tightest text-gradient sm:text-7xl lg:text-8xl">
            LET&apos;S BUILD
            <br />
            <span className="text-gradient-accent">SOMETHING.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            Have an idea, project or opportunity? Let&apos;s turn it into
            something real.
          </p>
        </Reveal>

        {/* Magnetic CONNECT button */}
        <Reveal delay={0.24}>
          <div className="mt-12 flex justify-center">
            <MagneticButton
              href={`mailto:${profile.email}`}
              strength={0.5}
              className="group relative flex h-40 w-40 items-center justify-center rounded-full sm:h-48 sm:w-48"
              ariaLabel="Connect via email"
            >
              <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-white/15" />
              <span className="absolute inset-2 rounded-full bg-gradient-to-br from-accent-indigo to-accent-violet opacity-90 shadow-glow-lg transition-all duration-500 group-hover:inset-1 group-hover:shadow-[0_0_90px_-8px_rgba(124,140,255,0.8)]" />
              <span className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.4),transparent_45%)]" />
              <span className="relative z-10 flex flex-col items-center gap-1 text-white">
                <span className="text-lg font-semibold tracking-tight">
                  Connect
                </span>
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </MagneticButton>
          </div>
        </Reveal>

        {/* Channels */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={0.1 + i * 0.08}>
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="group glass sheen relative flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-glow transition-colors group-hover:text-white">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    {c.icon}
                  </svg>
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                  {c.label}
                </span>
                <span className="break-all text-sm text-white/75 transition-colors group-hover:text-white">
                  {c.value}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
