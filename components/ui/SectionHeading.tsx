"use client";

import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: Props) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-gradient-to-r from-accent-glow/70 to-transparent" />
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-accent-glow/80">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-4 text-4xl font-semibold tracking-tighter2 text-gradient sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
