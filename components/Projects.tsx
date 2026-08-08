"use client";

import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import SectionHeading from "./ui/SectionHeading";
import MagneticButton from "./ui/MagneticButton";
import { EcommerceMockup, JobPortalMockup } from "./BrowserMockup";
import { projects, type Project } from "@/lib/data";

function LinkButton({
  href,
  children,
  primary,
  icon,
}: {
  href: string | null;
  children: React.ReactNode;
  primary?: boolean;
  icon: React.ReactNode;
}) {
  const disabled = !href;
  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all";
  const cls = primary
    ? "bg-white text-ink-950 hover:shadow-glow"
    : "border border-white/15 bg-white/[0.03] text-white hover:border-white/30 hover:bg-white/[0.06]";

  if (disabled) {
    return (
      <span
        className={`${base} ${
          primary
            ? "cursor-not-allowed bg-white/40 text-ink-950/70"
            : "cursor-not-allowed border border-dashed border-white/12 text-white/35"
        }`}
        title="Link coming soon"
      >
        {icon}
        {children}
        <span className="ml-0.5 text-[10px] uppercase tracking-wide opacity-70">
          Soon
        </span>
      </span>
    );
  }

  return (
    <MagneticButton
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${cls}`}
    >
      {icon}
      {children}
    </MagneticButton>
  );
}

function CaseStudyRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-t border-white/8 py-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent-glow/70">
        {label}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-white/60">{text}</p>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  const Mockup = index === 0 ? EcommerceMockup : JobPortalMockup;

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Visual */}
      <Reveal
        className={`group ${reversed ? "lg:order-2" : ""}`}
        y={40}
      >
        <div className="relative" style={{ perspective: 1400 }}>
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${project.accent}40, transparent 70%)`,
            }}
          />
          <TiltCard max={9} glare={false}>
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Mockup accent={project.accent} />
            </motion.div>
          </TiltCard>
        </div>
      </Reveal>

      {/* Copy */}
      <Reveal delay={0.1} className={reversed ? "lg:order-1" : ""}>
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-sm"
            style={{ color: project.accent }}
          >
            PROJECT {project.index}
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {project.title}
        </h3>

        <p className="mt-4 max-w-lg leading-relaxed text-white/60">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-white/60"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5">
          {project.features.map((f) => (
            <span
              key={f}
              className="flex items-center gap-1.5 text-xs text-white/45"
            >
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: project.accent }}
              />
              {f}
            </span>
          ))}
        </div>

        {/* Case study */}
        <div className="mt-6">
          <CaseStudyRow label="Problem" text={project.problem} />
          <CaseStudyRow label="Solution" text={project.solution} />
          <CaseStudyRow label="Technology" text={project.technology} />
          <CaseStudyRow label="Result" text={project.result} />
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-wrap gap-3">
          <LinkButton
            href={project.demoUrl}
            primary
            icon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            }
          >
            Live Demo
          </LinkButton>
          <LinkButton
            href={project.githubUrl}
            icon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.68.92.68 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 12 2Z" />
              </svg>
            }
          >
            GitHub
          </LinkButton>
        </div>
      </Reveal>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects, up close."
          description="A closer look at what I've been building — from full-featured commerce to a modern job platform."
        />

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-40">
          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
